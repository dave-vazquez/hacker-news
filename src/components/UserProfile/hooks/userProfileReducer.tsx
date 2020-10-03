interface ActionFetch {
  type: "fetching";
}
interface ActionError {
  type: "error";
}
interface ActionSuccess {
  type: "success";
  profile: any;
}

type Action = ActionFetch | ActionError | ActionSuccess;

type State = {
  profile: any;
  fetching: boolean;
  error: boolean;
};

export const initialState: State = {
  profile: null,
  fetching: true,
  error: false
};

const storyReducer = (state: State, action: Action) => {
  switch (action.type) {
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
        profile: action.profile,
        fetching: false,
        error: false
      };
    }
    default:
      return state;
  }
};

export default storyReducer;
