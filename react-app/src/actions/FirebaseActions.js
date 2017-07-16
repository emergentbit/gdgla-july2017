import firebaseApp from '../common/FirebaseConfig';

export const dbActionTypes = {
  GetSetsPending: 'GET_DB_SETS_PENDING',
  GetSetsRejected: 'GET_DB_SETS_REJECTED',
  GetSetsFulfilled: 'GET_DB_SETS_FULFILLED'
}

export function getSetsData() {
  return dispatch => {
    dispatch(getSetsAction());
    return firebaseApp.database().ref(`/v1/sets`).once('value').then(function(snapshot){
      let sets = snapshot.val();
      dispatch(getSetsActonFulfilled(sets));
    })
    .catch((error) => {
      console.error(error);
      dispatch(getSetsActionRejected());
    })
  }
}

function getSetsAction() {
  return {
    type: dbActionTypes.GetSetsPending
  }
}

function getSetsActionRejected() {
  return {
    type: dbActionTypes.GetSetsRejected
  }
}

function getSetsActonFulfilled(setData) {
  return {
    type: dbActionTypes.GetSetsFulfilled,
    data: setData
  }
}