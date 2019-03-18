const state = {
  user: {
    account: '',
    password: '',
    name: '',
    phone: '',
    thumbnail: '',
  },
  stores: [
    {
      name: '',
      thumbnail: '',
    },
    {
      name: '',
      thumbnail: '',
    },
    {
      name: '',
      thumbnail: '',
    },
  ],
  wallets: [
    {
      currencyName: '',
      availBalance: 0,
    },
    {
      currencyName: '',
      availBalance: 0,
    },
    {
      currencyName: '',
      availBalance: 0,
    },
  ],
  notifications: [
    { time: '', thumbnail: '', content: ''},
    {},
    {},
  ],
  curWallet: {
    transHistory: [
      { time: '', amount: '', relatedName: '', comment: '' },
      {},
      {},
    ],
  },
  curStore: {
    ads: [
      { image: '', title: '', subtitle: '',},
      { image: '', title: '', subtitle: '',},
    ],
    coupons: [
      { id: '', thumbnail: '', title: '', subtitle: '' },
      { id: '', thumbnail: '', title: '', subtitle: '' },
    ],
  },
};
