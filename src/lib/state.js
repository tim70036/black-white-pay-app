const state = {
  user: {
    account: '',
    password: '',
    transPwd: '',
    name: '',
    thumbnail: '',
    authenticated: false,
    sessionId: '',
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
      comment: '',
      address: '',
      phoneNumber: '',
      businesshours: '',
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
      currencySrc: '',
    },
    {
      storeId: 2,
      storeName: '',
      currencyName: '',
      availBalance: 0,
      exchangeRate: 1,
      inflow: 1,
      outflow: 1,
      cuurencySrc: '',
    },
  ],
  gameWallets: [
    {
      gameId: '',
      gameName: '',
      balance: 0,
      frozenBalance: 0,
      currencyName: '',
    },
    {
      gameId: '',
      gameName: '',
      balance: 0,
      frozenBalance: 0,
      currencyName: '',
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
    comment: '',
    availBalance: 0,
    currencySrc: '',
    transHistory: [
      { time: '', amount: '', relatedName: '', comment: '' },
      { time: '', amount: '', relatedName: '', comment: '' },
      { time: '', amount: '', relatedName: '', comment: '' },
    ],
    gameList: [
      { id: '', name: '', code: '', provider: '', imageSrc: '' },
      { id: '', name: '', code: '', provider: '', imageSrc: '' },
      { id: '', name: '', code: '', provider: '', imageSrc: '' },
    ],
  },
  curStore: {
    storeId: 1,
    name: '',
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
    curQrReceive: {
      type: 'receive',
      storeId: -1,
      account: '',
      amount: '',
      comment: '',
    },
    favorite: [
      { id: 0, storeId: -1, currencyName: '聯盟幣', amount: '', comment: '' },
      { storeId: -1, amount: '', comment: '' },
      { storeId: -1, amount: '', comment: '' },
    ],
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