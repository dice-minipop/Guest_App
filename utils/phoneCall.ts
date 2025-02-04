import { Linking, Platform } from 'react-native';

export const makeCall = (phoneNumber: string) => {
  if (phoneNumber !== '' && phoneNumber.length > 0) {
    if (Platform.OS === 'android') {
      Linking.openURL(`tel:${phoneNumber}`);
    } else {
      // iOS에서 전화 걸기
      Linking.openURL(`tel://${phoneNumber}`);
    }
  }
};
