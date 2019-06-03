import { AsyncStorage, Platform } from 'react-native';
import { Permissions, Notifications, ImagePicker } from 'expo';
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
    response = await fetch( `${config.apiUrl}/info/notification/push-token`, {
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

async function getCameraRollImage() {
  // Init image data
  const imageData = new FormData();

  // Check permission first
  const { status: existingStatus } = await Permissions.getAsync(Permissions.CAMERA_ROLL);
  let finalStatus = existingStatus;

  // only ask if permissions have not already been determined, because
  // iOS won't necessarily prompt the user a second time.
  if (existingStatus !== 'granted') {
    // Android remote notification permissions are granted during the app
    // install, so this will only ask on iOS
    const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
    finalStatus = status;
  }

  // Stop here if the user did not grant permissions
  if (finalStatus !== 'granted') {
    return imageData;
  }

  // Start image picker
  const result = await ImagePicker.launchImageLibraryAsync({
    allowsEditing: true,
    aspect: [3, 3],
  });

  // Stop here if the user cancel
  if (result.cancelled) {
    return imageData;
  }

  const uri = Platform.OS === 'android' ? result.uri : result.uri.replace('file://', '');
  const name = uri.split('/').pop();
  const match = /\.(\w+)$/.exec(name);
  const type = match ? `image/${match[1]}` : 'image';
  imageData.append('userThumbnail', {
    name: name,
    type: type,
    uri: uri,
  });

  return imageData;
}

export {
  registerForNotifications,
  getCameraRollImage,
};
