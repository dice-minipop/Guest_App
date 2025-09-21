import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  getMessaging,
  requestPermission,
  getToken as getMessagingToken,
  AuthorizationStatus,
} from '@react-native-firebase/messaging';
import { PermissionsAndroid, Platform } from 'react-native';

import { saveFCMToken } from '@/server/fcm/fcm';

const messaging = getMessaging();

export const getToken = async () => {
  try {
    const token = await getMessagingToken(messaging);
    if (token) {
      console.log('📦 FCM token:', token);
      await AsyncStorage.setItem('fcmToken', token);
      // await saveFCMToken({ token });
    } else {
      console.warn('⚠️ getToken returned null or undefined');
    }

    return token;
  } catch (error) {
    console.error('❌ Error getting FCM token:', error);
    return null;
  }
};

export const requestUserPermission = async () => {
  if (Platform.OS === 'android') {
    const hasPermission = await PermissionsAndroid.check(
      PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS,
    );
    if (!hasPermission) {
      await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS);
    }

    await getToken(); // Android는 바로 호출 가능
    return;
  }

  // iOS: 권한 요청
  const authStatus = await requestPermission(messaging);
  const enabled =
    authStatus === AuthorizationStatus.AUTHORIZED || authStatus === AuthorizationStatus.PROVISIONAL;

  if (!enabled) {
    console.warn('⚠️ iOS Messaging permission not granted');
    return;
  }

  // iOS: APNS 토큰 수신 대기
  messaging().onAPNSTokenReceived(async (apnsToken) => {
    console.log('✅ APNS token received:', apnsToken);
    await getToken(); // FCM 토큰 안전하게 요청
  });
};
