import React from 'react';
import { Icon } from 'expo';

const MenuIcon = () => (
  <Icon.Ionicons name={isAndroid ? 'md-more' : 'ios-more'} size={32} />
);

export default MenuIcon;

