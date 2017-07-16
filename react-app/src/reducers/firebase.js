import {dbActionTypes} from '../actions/FirebaseActions'

const FirebaseDataBase = (state = {}, action) => {
  switch (action.type) {
    case dbActionTypes.GetSetsPending:
      return state
    case dbActionTypes.GetSetsRejected:
      return state
    case dbActionTypes.GetSetsFulfilled:
      return {
        ...state,
        auraSetsData: action.data
      }
    default:
      return state
  }
}

export default FirebaseDataBase