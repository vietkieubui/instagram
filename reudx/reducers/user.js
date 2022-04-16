const initialState = {
  currentUser: null,
};

export const user = (state = initialState, action) => {
  //this is a reducer
  return {
    ...state,
    currentUser: action.currentUser,
  };
};
