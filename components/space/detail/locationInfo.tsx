import * as Clipboard from 'expo-clipboard';
import { useRouter } from 'expo-router';
import { useRef } from 'react';
import { Alert, Text, View } from 'react-native';
import WebView from 'react-native-webview';

import MarkerIcon from '@/assets/icons/spaceDetail/marker.svg';
import OpacityPressable from '@/components/common/opacityPressable';
import { SpaceDetailComponentProps } from '@/types/space';
import { generateHtmlContent } from '@/utils/mapWebView';

export default function SpaceLocationInfoComponent({ data }: SpaceDetailComponentProps) {
  const router = useRouter();

  const smallMapRef = useRef<WebView>(null);

  return (
    <View>
      <View className="gap-y-[16px]">
        <View className="px-[20px] gap-y-[16px]">
          <Text className="SUB2 text-black">위치 안내</Text>

          <View className="flex flex-row justify-between items-center">
            <View className="flex-1 flex flex-row items-center gap-x-[2px]">
              <MarkerIcon />
              <Text numberOfLines={1} className="flex-1 BODY1 text-dark_gray">
                {data.city} {data.district} {data.address} {data.detailAddress}
              </Text>
            </View>

            <OpacityPressable
              onPress={async () => {
                await Clipboard.setStringAsync(
                  `${data.city} ${data.district} ${data.address} ${data.detailAddress}`,
                );
                Alert.alert('주소가 복사되었습니다.');
              }}
              className="px-[8px] shrink-0"
            >
              <Text className="CAP2 text-medium_gray underline">주소 복사</Text>
            </OpacityPressable>
          </View>

          <OpacityPressable
            onPress={() => router.push(`/space/${data.id}/map`)}
            className="w-full h-[160px] rounded-xl"
          >
            <WebView
              ref={smallMapRef}
              style={{ borderRadius: 12 }}
              source={{ html: generateHtmlContent(data.latitude, data.longitude, false) }}
              javaScriptEnabled={true}
            />
          </OpacityPressable>
        </View>
      </View>

      <View className="h-[8px] bg-back_gray my-[24px]" />
    </View>
  );
}
