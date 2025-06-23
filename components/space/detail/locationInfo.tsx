import * as Clipboard from 'expo-clipboard';
import { useRouter } from 'expo-router';
import { useRef } from 'react';
import { Alert, Pressable, Text, View } from 'react-native';
import WebView from 'react-native-webview';

import MarkerIcon from '@/assets/icons/spaceDetail/marker.svg';
import { SpaceDetailComponentProps } from '@/types/space';
import { generateHtmlContent } from '@/utils/mapWebView';

const SpaceLocationInfoComponent: React.FC<SpaceDetailComponentProps> = ({ data }) => {
  const router = useRouter();

  const smallMapRef = useRef<WebView>(null);

  return (
    <View className="gap-y-[16px]">
      <View className="px-[20px] gap-y-[16px]">
        <Text className="SUB2 text-black">위치 안내</Text>

        <View className="flex flex-row justify-between items-center">
          <View className="flex flex-row items-center gap-x-[2px]">
            <MarkerIcon />
            <Text numberOfLines={1} className="BODY1 text-dark_gray">
              {data.city} {data.district} {data.address} {data.detailAddress} {data.detailAddress}
            </Text>
          </View>

          <Pressable
            onPress={async () => {
              await Clipboard.setStringAsync(
                `${data.city} ${data.district} ${data.address} ${data.detailAddress} ${data.detailAddress}`,
              );
              Alert.alert('주소가 복사되었습니다.');
            }}
            className="px-[8px]"
          >
            <Text className="CAP2 text-medium_gray underline">주소 복사</Text>
          </Pressable>
        </View>

        <Pressable
          onPress={() => router.push(`/space/${data.id}/map`)}
          className="w-full h-[160px] rounded-xl"
        >
          <WebView
            ref={smallMapRef}
            style={{ borderRadius: 12 }}
            source={{ html: generateHtmlContent(data.latitude, data.longitude, false) }}
            javaScriptEnabled={true}
          />
        </Pressable>
      </View>
    </View>
  );
};

export default SpaceLocationInfoComponent;
