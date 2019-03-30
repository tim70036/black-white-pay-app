import { AsyncStorage } from 'react-native';
import { Permissions, Notifications } from 'expo';
import config from '../../constants/config';

async function registerForNotifications() {
  const previousToken = await AsyncStorage.getItem(config.tokenStorageKey);
  console.log(previousToken);

  // Token
  let token;
  if (previousToken) {
    token = previousToken;
  } else {
    const { status } = await Permissions.askAsync(Permissions.REMOTE_NOTIFICATIONS);
    if (status !== 'granted') return;
    token = await Notifications.getExponentPushTokenAsync();
  }


  // Post token to server
  let response;
  try {
    response = await fetch( `${config.apiUrl}/user/push-token`, {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        token: token,
      }),
    });
    response = await response.json();
    console.log(response);
  } catch (error) {
    console.log(error.message);
  }

  // Process response
  if (response.errCode === 0) {

  } else if (response.errCode === 87) {

  } else {
    
  }

  // Save in local storage
  AsyncStorage.setItem(config.tokenStorageKey, token);

}

export default registerForNotifications;
