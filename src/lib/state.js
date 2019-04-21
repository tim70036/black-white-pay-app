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
      currencyName: '',
      availBalance: 0,
    },
    {
      storeId: 2,
      currencyName: '',
      availBalance: 0,
    },
    {
      storeId: 3,
      currencyName: '',
      availBalance: 0,
    },
  ],
  notifications: [
    { time: '', thumbnail: '', content: '', hasRead: false},
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