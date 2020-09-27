export const FETCHING = "FETCHING";
export const ERROR = "ERROR";
export const SUCCESS = "SUCCESS";

export const initialState = {
  story: {},
  fetching: true,
  error: false
};

const storyReducer = (state, action) => {
  switch (action.type) {
    case FETCHING:
      return initialState;
    case ERROR:
      return {
        ...state,
        fetching: false,
        error: true
      };
    case SUCCESS: {
      return {
        story: action.story,
        fetching: false,
        error: false
      };
    }
    default:
      return {
        ...state,
        error: true
      };
  }
};

export default storyReducer;
