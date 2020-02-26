const initialState = {
  isRunning: false,
};

const stateReducer = (state = initialState, action) => {
  switch(action.type) {
    case 'RUNNING': {
      return {
        ...state,
        isRunning: action.trueFalse,
      }
    }

    default: {
      return state;
    }
  }
}

export default stateReducer;