import user from './user';
import announcements from './announcements';
import stores from './stores';
import curStore from './curStore';
import wallets from './wallets';
import curWallet from './curWallet';
import notifications from './notifications';
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
  announcements: announcements,
  stores: stores,
  curStore: curStore,
  wallets: wallets,
  curWallet: curWallet,
  notifications: notifications,
  status: status,
};
