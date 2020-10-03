export const RESULTS_PER_PAGE = 30;

interface ActionFetching {
  type: "fetching";
}

interface ActionError {
  type: "error";
}

interface ActionSuccess {
  type: "success";
  storyData: Array<any>;
}

type Action = ActionFetching | ActionError | ActionSuccess;

type State = {
  stories: Array<any>;
  fetching: boolean;
  error: boolean;
};

export const initialState = {
  stories: Array(RESULTS_PER_PAGE).fill(null),
  fetching: true,
  error: false
};

const storyReducer = (state: State, action: Action) => {
  switch (action?.type) {
    case "fetching":
      return initialState;
    case "error":
      return {
        ...state,
        fetching: false,
        error: true
      };
    case "success": {
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
