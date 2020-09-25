export const FETCHING = "FETCHING";
export const ERROR = "ERROR";
export const SUCCESS = "SUCCESS";

export const initialState = {
  directReplies: [],
  fetching: false,
  error: false
};

const directRepliesReducer = (state, action) => {
  switch (action.type) {
    case FETCHING:
      return {
        ...initialState,
        directReplies: action.directReplies,
        fetching: true
      };
    case SUCCESS: {
      return {
        directReplies: action.directReplies,
        fetching: false,
        error: false
      };
    }
    case ERROR:
      return {
        ...state,
        fetching: false,
        error: true
      };
    default:
      return {
        ...state,
        error: true
      };
  }
};

export default directRepliesReducer;
