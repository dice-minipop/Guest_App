import { Linking } from 'react-native';

export const openWebSite = (url: string) => {
  Linking.openURL(url);
};
