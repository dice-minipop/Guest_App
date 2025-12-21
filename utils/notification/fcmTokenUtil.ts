import AsyncStorage from '@react-native-async-storage/async-storage';
import messaging from '@react-native-firebase/messaging';
import * as Notifications from 'expo-notifications';
import { PermissionsAndroid, Platform } from 'react-native';

export const hasFcmToken = async (): Promise<boolean> => {
  try {
    const fcmToken = await AsyncStorage.getItem('fcmToken');
    return fcmToken !== null;
  } catch (e) {
    console.error('Error checking FCM Token:', e);
    return false;
  }
};

export const setFcmToken = async (fcmToken: string): Promise<boolean> => {
  try {
    await AsyncStorage.setItem('fcmToken', fcmToken);
    return true;
  } catch (e) {
    console.error('Error setting FCM Token:', e);
    return false;
  }
};

export const getFcmToken = async (): Promise<string | null> => {
  try {
    const fcmToken = await AsyncStorage.getItem('fcmToken');
    return fcmToken;
  } catch (e) {
    console.error('Error getting FCM Token:', e);
    return null;
  }
};

export const deleteFcmToken = async (): Promise<boolean> => {
  try {
    await AsyncStorage.removeItem('fcmToken');
    return true;
  } catch (e) {
    console.error('Error deleting FCM Token:', e);
    return false;
  }
};

export const requestUserPermission = async (): Promise<boolean> => {
  try {
    if (Platform.OS === 'android') {
      const hasPermission = await PermissionsAndroid.check(
        PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS,
      );

      if (!hasPermission) {
        const result = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS,
        );

        if (result !== PermissionsAndroid.RESULTS.GRANTED) {
          console.warn('⚠️ 알림 권한 거부됨 (Android)');
          return false;
        }
      }
    } else {
      // iOS: Expo Notifications로 권한 요청
      const { status: existingStatus } = await Notifications.getPermissionsAsync();
      let finalStatus = existingStatus;

      if (existingStatus !== 'granted') {
        const { status } = await Notifications.requestPermissionsAsync();
        finalStatus = status;
      }

      if (finalStatus !== 'granted') {
        console.warn('⚠️ 알림 권한 거부됨 (iOS)');
        return false;
      }

      // Firebase Messaging에 디바이스 등록
      try {
        await messaging().registerDeviceForRemoteMessages();
      } catch (error: any) {
        // 이미 등록된 경우 무시
      }
    }

    // Firebase Messaging 권한 요청
    const authStatus = await messaging().requestPermission();
    const enabled =
      authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
      authStatus === messaging.AuthorizationStatus.PROVISIONAL;

    if (!enabled) {
      console.warn('⚠️ Firebase 메시징 권한 거부됨');
      return false;
    }

    console.log('✅ FCM 권한 획득 완료');
    return true;
  } catch (error: any) {
    console.error('❌ FCM 권한 요청 실패:', error.message);
    return false;
  }
};

export const getFcmTokenFromFirebase = async (): Promise<string | null> => {
  try {
    const token = await messaging().getToken();
    if (token) {
      await setFcmToken(token);
      return token;
    }
    return null;
  } catch (error: any) {
    // iOS에서 APNS 토큰이 아직 준비되지 않은 경우
    if (
      Platform.OS === 'ios' &&
      (error?.code === 'messaging/unknown' || error?.message?.includes('APNS token'))
    ) {
      return null;
    }
    console.error('❌ FCM 토큰 획득 실패:', error?.message);
    return null;
  }
};

export const deactivateFcmToken = async (): Promise<void> => {
  try {
    await messaging().deleteToken();
    await deleteFcmToken();
  } catch (error: any) {
    console.error('❌ FCM 토큰 비활성화 실패:', error.message || error);
  }
};
