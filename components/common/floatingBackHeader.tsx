import { useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { Pressable, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import BackArrowIcon from '@/assets/icons/backArrow.svg';

const FloatingBackHeader: React.FC = () => {
  const router = useRouter();
  const { top } = useSafeAreaInsets();

  return (
    <View className="absolute top-0 left-0 w-full z-10">
      <StatusBar style="light" />

      <View style={{ height: top, backgroundColor: '#000000' }} />
      <View className="flex flex-row items-center bg-transparent px-[20px] py-[16px]">
        <Pressable
          onPress={() => router.back()}
          className="bg-black/50 flex justify-center items-center rounded-full w-[36px] h-[36px] p-[6px]"
        >
          <BackArrowIcon />
        </Pressable>
      </View>
    </View>
  );
};

export default FloatingBackHeader;
