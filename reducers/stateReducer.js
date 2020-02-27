import { SET_RUNNING_STATE } from '../actions/stateActions';

const initialState = {
  isRunning: false,
};

const stateReducer = (state = initialState, action) => {
  switch(action.type) {
    case SET_RUNNING_STATE: 
      return {
        isRunning: action.trueFalse,
      }

    default: 
      return state;
    
  }
}

export default stateReducer;