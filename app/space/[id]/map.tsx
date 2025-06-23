import { useLocalSearchParams } from 'expo-router';
import { useRef } from 'react';
import { View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { WebView } from 'react-native-webview';

import FloatingBackHeader from '@/components/common/floatingBackHeader';
import { useGetSpaceDetailData } from '@/hooks/space/space';
import { generateHtmlContent } from '@/utils/mapWebView';

export default function SpaceDetailMap() {
  const { id } = useLocalSearchParams();

  // TODO : 서버 데이터로 변경
  // const { data } = useGetSpaceDetailData(Number(id));
  const data = {
    latitude: 37.5665,
    longitude: 126.978,
  };

  const webviewRef = useRef<WebView>(null);

  return (
    <View className="flex-1 bg-white">
      <WebView
        ref={webviewRef}
        source={{ html: generateHtmlContent(data.latitude, data.longitude, true) }}
        javaScriptEnabled={true}
      />
      <FloatingBackHeader />

      <SafeAreaView edges={['bottom']} className="bg-black" />
    </View>
  );
}
