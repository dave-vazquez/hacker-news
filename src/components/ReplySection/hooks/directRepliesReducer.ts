interface ActionFetch {
  type: "fetching";
  directReplies: Array<null>;
}

interface ActionError {
  type: "error";
}

interface ActionSuccess {
  type: "success";
  directReplies: Array<any>;
}

type Action = ActionFetch | ActionError | ActionSuccess;

type State = {
  directReplies: Array<any>;
  fetching: boolean;
  error: boolean;
};

export const initialState = {
  directReplies: [],
  fetching: false,
  error: false
};

const directRepliesReducer = (state: State, action: Action) => {
  switch (action.type) {
    case "fetching":
      return {
        ...initialState,
        directReplies: action.directReplies,
        fetching: true
      };
    case "error":
      return {
        ...state,
        fetching: false,
        error: true
      };
    case "success": {
      return {
        directReplies: action.directReplies,
        fetching: false,
        error: false
      };
    }
    default:
      return state;
  }
};

export default directRepliesReducer;
