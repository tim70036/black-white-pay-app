import user from './user';
import storeList from './storeList';
import curStore from './curStore';

// Redux persist
const rehydrated = (state = false, action) => {
  switch (action.type) {
    case 'persist/REHYDRATE':
      return true;
    default:
      return state;
  }
};

// Will be used by redux combineReducer, using es6 object short hand => produce state object 
export default {
  rehydrated,
  user,
  storeList,
  curStore,
};
