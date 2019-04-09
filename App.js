import React from 'react';
import Root from './src/native/index';
import configureStore from './src/store/index';

const { persistor, store } = configureStore();

export default function App() {
  // console.disableYellowBox = true;
  return <Root store={store} persistor={persistor} />;
}
