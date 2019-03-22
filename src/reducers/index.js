import user from './user';
import stores from './stores';
import curStore from './curStore';
import status from './status';

// Redux persist
const rehydrated = (state = false, action) => {
  // Action logger
  console.log(`action: ${action.type}`);
  console.log('data: ');
  console.log(action.data);
  console.log('------------------------------------------------')

  switch (action.type) {
    case 'persist/REHYDRATE':
      return true;
    default:
      return state;
  }
};

// Will be used by redux combineReducer, using es6 object short hand => produce state object 
export default {
  rehydrated: rehydrated,
  user: user,
  stores: stores,
  curStore: curStore,
  status: status,
};
