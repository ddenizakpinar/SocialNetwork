import { FETCH_MORE_FEED, SET_SINGLE_POST, SET_UPDATED_POST } from '../actions/actionTypes'

const initialState = {
  feed: [],
}

export default function (state = initialState, action) {

  switch (action.type) {

    // Concats new data to state.feed
    case FETCH_MORE_FEED:
      if (state.feed.data) {
        action.payload.data.result = state.feed.data.result.concat([...action.payload.data.result]);
      }
      return {
        ...state,

        feed: action.payload
      };
      
    case SET_SINGLE_POST:
      if (state.feed.data) {
        action.payload.data.result = [action.payload.data.result].concat(state.feed.data.result);
      }

      return {
        ...state,
        feed: action.payload
      };

    // Updates state by new post data
    case SET_UPDATED_POST:
      const newState = state.feed;
      const item = (state.feed.data.result.filter(item => item._id === action.payload.data.result._id))
      newState.data.result[state.feed.data.result.indexOf(...item)] = action.payload.data.result;
      return {
        ...state,
        feed: newState
      }

    default:
      return state;
  }
}