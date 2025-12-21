import { useLocalSearchParams } from 'expo-router';
import { useRef } from 'react';
import { Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { WebView } from 'react-native-webview';

import MapIcon from '@/assets/icons/spaceDetail/map.svg';
import FloatingBackHeader from '@/components/common/floatingBackHeader';
import OpacityPressable from '@/components/common/opacityPressable';
import { useGetSpaceDetailData } from '@/hooks/space/space';
import { generateHtmlContent } from '@/utils/mapWebView';
import { openWebSite } from '@/utils/website';

export default function SpaceDetailMap() {
  const { id } = useLocalSearchParams();

  // TODO : 서버 데이터로 변경
  const { data } = useGetSpaceDetailData(Number(id));

  const latitude = data?.latitude || 37.5665;
  const longitude = data?.longitude || 126.978;

  const webviewRef = useRef<WebView>(null);

  const handleOpenKakaoMap = () => {
    const kakaoMapUrl = `https://map.kakao.com/link/map/${latitude},${longitude}`;
    openWebSite(kakaoMapUrl);
  };

  return (
    <View className="flex-1 bg-white">
      <WebView
        ref={webviewRef}
        source={{ html: generateHtmlContent(latitude, longitude, true) }}
        javaScriptEnabled={true}
      />
      <FloatingBackHeader />

      <View className="absolute bottom-0 left-0 right-0">
        <SafeAreaView edges={['bottom']} className="bg-transparent px-[20px] pb-[20px]">
          <OpacityPressable
            onPress={handleOpenKakaoMap}
            className="bg-black/80 flex flex-row items-center justify-center gap-x-[8px] py-[14px] rounded-xl"
          >
            <MapIcon />
            <Text className="BTN1 text-white">카카오맵에서 보기</Text>
          </OpacityPressable>
        </SafeAreaView>
      </View>
    </View>
  );
}
