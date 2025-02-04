import * as Clipboard from 'expo-clipboard';
import { Alert } from 'react-native';

export const copyText = async (text: string) => {
  await Clipboard.setStringAsync(text);

  Alert.alert('주소가 복사되었습니다!');

  return;
};
