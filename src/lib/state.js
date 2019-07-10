const state = {
  user: {
    account: '',
    password: '',
    transPwd: '',
    name: '',
    thumbnail: '',
    authenticated: false,
  },
  announcements: [
    { image: '', title: '' },
    { image: '', title: '' },
  ],
  stores: [
    {
      storeId: 1,
      name: '',
      thumbnail: '',
    },
    {
      storeId: 2,
      name: '',
      thumbnail: '',
    },
    {
      storeId: 3,
      name: '',
      thumbnail: '',
    },
  ],
  wallets: [
    {
      storeId: 1,
      storeName: '',
      currencyName: '',
      availBalance: 0,
      exchangeRate: 1,
      inflow: 1,
      outflow: 1,
    },
    {
      storeId: 2,
      storeName: '',
      currencyName: '',
      availBalance: 0,
      exchangeRate: 1,
      inflow: 1,
      outflow: 1,
    },
  ],
  notifications: [
    { time: '', thumbnail: '', content: '', hasRead: false },
    {},
    {},
  ],
  curWallet: {
    storeId: 1,
    currencyName: '',
    availBalance: 0,
    transHistory: [
      { time: '', amount: '', relatedName: '', comment: '' },
      {},
      {},
    ],
  },
  curStore: {
    storeId: 1,
    ads: [
      { image: '', title: '' },
      { image: '', title: '' },
    ],
    coupons: [
      { id: '', thumbnail: '', title: '', subtitle: '' },
      { id: '', thumbnail: '', title: '', subtitle: '' },
    ],
  },
  friend: {
    friends: [
      { account: '', name: '', thumbnail: '', },
      { account: '', name: '', thumbnail: '', },
      { account: '', name: '', thumbnail: '', },
    ],
    invitations: [],
    requests: [],
    curFriend: {
      account: '',
      name: '',
      thumbnail: '',
      isFriend: false,
    },
  },
  qrCodeReceive: {
	  storeId: -1,
	  amount: '',
	  comment: '',
  },
  status: {
    loading: false,
    success: null,
    error: null,
    info: null,
  },
};


const qrCodeData = {
  type: 'pay',
  account: '',
  storeId: -1, // 聯盟幣是 -1
}

const qrCodeData = {
  type: 'receive',
  account: '',
  amount: 1000,
  storeId: 0,
}

const qrCodeData = {
  type: 'friend',
  account: '',
}