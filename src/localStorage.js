export const loadState = () => {
  try {
    const stateSerialized = localStorage.getItem('jwt-token');
    if (stateSerialized == null) {
      return undefined;
    }
      return JSON.parse(stateSerialized);
  } catch (e){
    return undefined;
  }
};

export const saveState = (state) => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem('jwt-token', serializedState);
  } catch (e) {
    // ignore write errors.
  }
};
