export const RESULTS_PER_PAGE = 30;
export const FETCHING = "FETCHING";
export const ERROR = "ERROR";
export const SUCCESS = "SUCCESS";

export const initialState = {
  stories: Array(RESULTS_PER_PAGE).fill(null),
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
        stories: action.storyData,
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
