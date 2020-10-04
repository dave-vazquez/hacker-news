## Hacker News Clone

Deployment: https://semantic-hacker-news.herokuapp.com/

---

In October of 2014, [Hacker News](https://news.ycombinator.com/) released a public [API](https://hackernews.api-docs.io/v0/overview/introduction):

> The API is essentially a dump of our in-memory data structures. We know, what works great locally in memory isn't so hot over the network. Many of the awkward things are just the way HN works internally. Want to know the total number of comments on an article? Traverse the tree and count. Want to know the children of an item? Load the item and get their IDs, then load them. The newest page? Starts at item maxid and walks backward, keeping only the top level stories...
>
> ...It's not the ideal public API, but it's the one we could release in the time we had. While awkward, it's possible to implement most of HN using it.
> &mdash; <cite>[Hacker News API ReadMe](https://github.com/HackerNews/API).</cite>

It's now October of 2020, and the HackerNews API is still just as "awkward" to work with as it was in its inception. For developers seeking to integrate this API into their projects, it presents a number of technical challenges for which I'll go into a bit more detail.

But, for those who don't mind a bit of a challenge, working with the Hacker News API to create a React-based clone provides an opportunity to flex some creative front-end, problem-solving skills.

### An Awkward API

To illustrate the complications of working with this API, let's say we want to fetch data for all top stories to re-create the feed on the homepage.

Here's the response we get:

[https://hacker-news.firebaseio.com/v0/topstories.json?print=pretty](https://hacker-news.firebaseio.com/v0/topstories.json?print=pretty)

```js
[
  24615916,
  24616649,
  24615185,
  24617135,
  24617086,
  24615310,
  24614806,
  24604746,
  24617318
  // ... 490 more items
];
```

Not off to a good start.

What we're looking at is an array of story ids. This means to get the _actual_ data we need, we'll need to make 30 additional requests (30 per page) before we can render any content to the feed - and if you were hoping for some optional parameters for pagination or a way to limit the number of results, there aren't any. It's 500 items or nothing at all.

Let's make a fetch for to top story in the list above:

[`https://hacker-news.firebaseio.com/v0/item/24615916.json?print=pretty`](https://hacker-news.firebaseio.com/v0//item/24615916.json?print=pretty)

```json
story

{
    "by": "todsacerdoti",
    "kids": [
        24560456,
        24561900,
        24562039,
        24560484,
        24560317
    ],
    "title": "Zig's New Relationship with LLVM",
    "url": "https://kristoff.it/blog/zig-new-relationship-llvm/",
}
```

It's a pretty straight-forward JSON object. I've left out some of the fields to save space, but notice the field `kids` (think "children"). If you were wondering how we might get the comments for each story, you have your answer: Another array of ids.

...

And, this is really where it starts to get bad because after you make your first fetch for any one of these comments, you'll quickly realize these `kids` only represent the direct replies to each story.

Let's fetch one comment:

[`https://hacker-news.firebaseio.com/v0/item/24615916.json?print=pretty`](https://hacker-news.firebaseio.com/v0//item/24615916.json?print=pretty)

```json
comment

{
    "by": "IgorPartola",
    "kids": [
        24560588,
        24560601,
        24575117,
        24560586
    ],
    "text": "Role clarity is a huge one in my book.",
}
```

Yet again, another array of `kids` representing the direct replies to _this_ comment.

So, to yield all data required to render an entire comment tree would require a series of breadth-first, recursive requests on each and every comment in the tree until the entire tree is exhausted.

We're talking about potentially **hundreds** of network requests depending on how active the comment section is.

...

**And thus, we arrive at the challenge:**

How can we leverage React's component-based architecture to streamline the fetching of data to create both a functional and (reasonably) performant, React-based clone of [Hacker News](https://news.ycombinator.com/)?

---

## The Solution

    Work with the awkwardness, not against it...

### **Story Feed**

So, constructing the story feed is actually pretty straight-forward:

One parent, `StoryFeed` component wrapping a list of child, `Story` components.

To optimize the fetching of story data we have two options to consider:

1. `Promise.all`:

   ```tsx
   function fetchStories(storyIds: Array<number>, pageNum: number) {
     // removes subsection of array determined by page number
     storyIds = slicePage(pageNum, storyIds);

     return Promise.all(
       storyIds.map(async (storyId: number) => {
         try {
           const { data } = await axios.get(`item/${storyId}.json`);
           return data ? data : { error: true };
         } catch (_) {
           return { error: true };
         }
       })
     );
   }
   ```

   The idea here is that `Promise.all` receives the array of story ids to be mapped into an array data for each story.

   Since `storyIds.map` iterates synchronously over each story id, the result is a quick, burst of requests, all resolving at nearly the same time where otherwise the visitor would be waiting for one request to finish before the next could start. The resulting effect is a brief interval between fetching of data and the rendering of content to the page.

   In the case where any one or more promises reject, `Promise.all` will itself reject leaving us with nothing to pass to `StoryFeed`. Since the Hacker News API doesn't actually return `400` errors or the like (always `200`'s with `null` as the data) we'll have to resort to a hacky approach where we pass an replacement object, `{error: true}` to the `Story` component so it can render an error message. We could also just return `null` but I prefer to make it explicit in the code that an error occurred.

   ***

   You can view the implementation of this here:

   `useFetchStories` - [src/components/StoryFeed/hooks/useFetchStories.ts](https://github.com/dave-vazquez/hacker-news/blob/master/src/components/StoryFeed/hooks/useFetchStories.ts)

   `StoryFeed` - [src/components/StoryFeed/StoryFeed.tsx](https://github.com/dave-vazquez/hacker-news/blob/master/src/components/StoryFeed/StoryFeed.tsx)

   `Story` - [src/components/StoryFeed/Story.tsx](https://github.com/dave-vazquez/hacker-news/blob/master/src/components/StoryFeed/Story.tsx)

   ***

   The only slight draw-back to this approach is that while all 30 requests _are_ made synchronously, the reader still has to wait for all 30 requests to resolve before any content can be rendered to the feed. Which leads to the second option:

2. Division of Labor:

   ```
     StoryFeed - fetches all story ids
     |
     └───Story - receives story id as props
         |     - fetches story data
         |
         Story - receives story id as props
         |     - fetch story data
         |
         Story - receives story id as props
         |     - fetch story data
         |
         ...
   ```

   Here's where we can leverage the hierarchy of our components to gain a slight edge on performance. The idea here is that we make `StoryFeed` responsible for fetching the array of story ids, and each `Story` component responsible for fetching its own data from the id passed to it.

   This works similarly to `Promise.all()` in the sense that the requests are made synchronously, except we don't have to wait for all 30 requests before we can render content to the page. Instead, each `Story` component renders it's own content as soon as it receives a response so that no single request holds back the others from fulfilling their purpose.

For a mere 30 requests, either approach results in a fairly quick load-time.

I'm personally fond of having each `Story` component responsible for fetching its own data, but using this approach would have required I break the semantics of my HTML. It's a bit complicated to explain why - but in short, it just wasn't a compromise I was willing to make.

### **Comment Section**

The comment section is a bit trickier, but we'll make use of both approaches above to achieve a similar result.

First, we'll need a parent, `ReplySection` component responsible for fetching the story data, and from it the array of `kids` or ids for the direct replies to the story. We'll call them "comment ids" to keep it simple.

...

This is pretty straight-forward. One fetch for story data and we're good to go:

```
ReplySection         - fetches story data --> comment ids
```

An intermediate component, `DirectReplies`, will be responsible for sending a batch request for the data on each of the comment ids passed to it.

The need for this intermediate component will make sense in a moment, but for batching the requests we'll make use of `Promise.all()` in the same way described earlier.

```
ReplySection         - fetches story data --> comment ids
  |
  └─── DirectReplies - fetches comment data for each comment id
```

Lastly, a list of `Reply` components rendered by `DirectReplies`, will act as the presentational components, displaying the data for each comment to the reader.

```
ReplySection         - fetches story data --> comment ids
  |
  └─── DirectReplies - fetches comment data for each comment id
        |
        ├─── Reply   - renders comment
        |
        ├─── Reply   - renders comment
        |
        ├─── Reply   - renders comment
        |
        ├─── ...
```

Here's where the magic happens.

If the data for the comment passed to `Reply` contains another list of comment ids (direct replies to the comment), in grand recursive fashion, the process repeats whereby `Reply` will render it's own `DirectReplies` component, passing to **it** the list of comment ids to be fetched:

```
  ReplySection         - fetches story data --> comment ids
    |
    └─── DirectReplies - fetches comment data for each comment id
          |
          ├─── Reply   - renders comment and direct replies
          |      |
          |      └─── DirectReplies - fetches comment data for each comment id
          |            |
          |            ├─── Reply   - renders comment
          |            |
          |            ├─── Reply   - renders comment
          |            |
          |            ├─── Reply   - renders comment
          |            |
          |            ...
          |
          ├─── Reply   - renders comment and direct replies
          |      |
          |      └─── DirectReplies - fetches comment data for each comment id
          |            |
          |            ├─── Reply   - renders comment
          |            |
          |            ├─── Reply   - renders comment
          |            |
          |            ├─── Reply   - renders comment
          |            |
          |            ...
          |
          ├─── Reply   - renders comment and direct replies
          |      |
          |      └─── DirectReplies - fetches comment data for each comment id
          |            |
          |            ├─── Reply   - renders comment
          |            |
          |            ├─── Reply   - renders comment
          |            |
          |            ├─── Reply   - renders comment
          |            |
          |            ...
          ├─── ...
```

And, thus what we achieve in the end is a breadth-first render of the entire comment tree, driven by the data passed down through props. So, when the reader first visits the page, they wait briefly for the story and top-level comments to render, then the next level of comments to render, and the next until the entire tree is exhausted.

This provides the reader with something to read/interact with in the meantime. Sub-optimal, but much better than waiting for anywhere between a few and potentially hundreds (even thousands) of network requests to complete before you see anything. And, in the time it takes for all comments to render, the reader will likely have only had the chance to read a few. So the inconvenience is minimal.

---

You can view this component tree here:

`ReplySection` - [src/components/ReplySection/ReplySection.tsx](https://github.com/dave-vazquez/hacker-news/blob/master/src/components/ReplySection/ReplySection.tsx)

`DirectReplies` - [src/components/ReplySection/DirectReplyList.tsx](https://github.com/dave-vazquez/hacker-news/blob/master/src/components/ReplySection/DirectReplyList.tsx)

`useFetchDirectReplies` - [src/components/ReplySection/hooks/useFetchDirectReplies.ts](https://github.com/dave-vazquez/hacker-news/blob/master/src/components/ReplySection/hooks/useFetchDirectReplies.ts)

`Reply` - [src/components/ReplySection/Reply.tsx](https://github.com/dave-vazquez/hacker-news/blob/master/src/components/ReplySection/Reply.tsx)

## Further Considerations

This approach is a step in the right direction, but there are some short-falls.

Consider the case where a story has 100 direct replies and the reader has a slow internet connection. Since we're batching these requests with `Promise.all()` the reader may be waiting longer than their attention can hold, and might leave the site before they ever see any content at all.

One approach to solving this problem might be to batch a smaller fraction of requests, enough to fill say... the viewport height. And only batch more when the user scrolls down.

A similar problem might occur in the other direction where a thread is so deeply nested that there's either not enough room to spare, or it simply takes forever for the tree to render that deep. In this case, we might opt to drop a link after the tree reaches a certain depth where the reader can continue where they left off.

These are both interesting problems to solve, but we'll hold off on those for another day!

## Final Thoughts

While the HackerNews API is probably not the best for making a clone of the site, or any other type of redesign for that matter, it does offer the opportunity to solve problems where the tools at our disposal place very tight constraints on our ability to get the job done.

But, this is literally the situation developers find themselves in nearly every day of their life. Do you ever wonder why we have so many different competing frameworks/libraries, why one fad appears only to be quickly replaced by another?

All of our tools are sub-optimal to some degree. But, that's why we get paid the big bucks work with them. The idea is never really to find the perfect solution for any given problem but merely approach it as best as we can.

So to that I say, when life gives you a terrible API, make some slightly less terrible lemonade!

Someone will hopefully pay you a 6-figure salary for it.

\* _sips to victory_ \*
