import { Image } from 'expo-image';
import { useRouter } from 'expo-router';
import { Dimensions, Pressable, Text, View } from 'react-native';

import MagnifierIcon from '@/assets/icons/magnifier.svg';

const HeaderComponent: React.FC = () => {
  const router = useRouter();

  const width = Dimensions.get('screen').width;

  return (
    <View className="relative px-[20px] pt-[64px] pb-[32px] flex flex-col gap-y-[10px]">
      <Image
        source={require('@/assets/image/announcement.png')}
        style={{ width: width, height: 214, position: 'absolute' }}
      />
      <Text className="H1 text-white">모든 지원 공고는{'\n'}여기 다이스에서.</Text>
      <Pressable
        onPress={() => router.push(`/announcement/search`)}
        className="bg-white flex flex-row items-center gap-x-[4px] px-[13px] pt-[13px] pb-[14px] rounded-lg"
      >
        <MagnifierIcon />
        <Text className="BODY2 text-medium_gray">
          원하시는 지역, 모집처, 지원 내용을 검색해보세요
        </Text>
      </Pressable>
    </View>
  );
};

export default HeaderComponent;
