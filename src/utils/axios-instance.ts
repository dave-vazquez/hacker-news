import axios from "axios";

export default axios.create({
  baseURL: process.env.REACT_APP_HACKER_NEWS_URL,
  headers: { "Access-Control-Allow-Origin": "*" }
});
