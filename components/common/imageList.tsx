import { Image } from 'expo-image';
import { Pressable, ScrollView, Text, View } from 'react-native';

import PlusIcon from '@/assets/icons/myPage/plus.svg';
import RoundXIcon from '@/assets/icons/roundX.svg';

interface HorizontalImageListProps {
  label: string;
  subLabel?: string;
  value: string[];
  setValue: (value: string[]) => void;
}

export default function HorizontalImageList({
  label,
  subLabel,
  value,
  setValue,
}: HorizontalImageListProps) {
  return (
    <View className="overflow-visible">
      <Text className="CAP1 text-dark_gray">
        {label}
        <Text className="text-semiLight_gray">{subLabel}</Text>
      </Text>
      <ScrollView
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{
          flexDirection: 'row',
          columnGap: 6,
          overflow: 'visible',
          paddingTop: 8,
        }}
      >
        <Pressable
          //   onPress={onPressImages}
          className="bg-white flex justify-center items-center rounded-xl border border-light_gray w-[80px] h-[80px]"
        >
          <PlusIcon />
          <Text className="CAP2 text-medium_gray text-center">
            <Text className="text-purple">{value.length}</Text> / 10
          </Text>
        </Pressable>
        {value.map((item) => (
          <View key={item} className="relative">
            <Image source={{ uri: item }} style={{ width: 80, height: 80, borderRadius: 12 }} />
            <Pressable
              //   onPress={() => {
              //     setImageUrls((prev) => prev.filter((url) => url !== item));
              //   }}
              className="absolute -top-2 -right-2 z-10 overflow-visible"
            >
              <RoundXIcon />
            </Pressable>
          </View>
        ))}
      </ScrollView>
    </View>
  );
}
