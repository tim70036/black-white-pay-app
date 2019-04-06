import { AsyncStorage } from 'react-native';
import { Permissions, Notifications } from 'expo';
import config from '../../constants/config';

async function registerForNotifications() {
  const previousToken = await AsyncStorage.getItem(config.tokenStorageKey);

  // Token
  let token;
  if (previousToken) {
    token = previousToken;
  } else {
    const { status: existingStatus } = await Permissions.getAsync(Permissions.NOTIFICATIONS);
    let finalStatus = existingStatus;

    // only ask if permissions have not already been determined, because
    // iOS won't necessarily prompt the user a second time.
    if (existingStatus !== 'granted') {
      // Android remote notification permissions are granted during the app
      // install, so this will only ask on iOS
      const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
      finalStatus = status;
    }

    // Stop here if the user did not grant permissions
    if (finalStatus !== 'granted') {
      return;
    }

    // Get the token that uniquely identifies this device
    token = await Notifications.getExpoPushTokenAsync();
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
    // Save token in local storage
    AsyncStorage.setItem(config.tokenStorageKey, token);

  } else if (response.errCode === 87) {

  } else {
    
  }
}

export default registerForNotifications;
