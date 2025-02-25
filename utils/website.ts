import { Linking } from 'react-native';

export const openWebSite = (url: string) => {
  console.log(url);
  Linking.openURL(url);
};
