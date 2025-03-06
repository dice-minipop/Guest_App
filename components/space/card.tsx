import { Image } from 'expo-image';
import { useRouter } from 'expo-router';
import React from 'react';
import { Text, View, Pressable } from 'react-native';

import CustomPressable from '@/components/common/customPressable';
import { SpaceItem } from '@/server/space/response';

import Icon from '../icon/icon';

interface CardComponentProps {
  spaceData: SpaceItem;
  toggleLike: (id: number) => void;
}

const CardComponent: React.FC<CardComponentProps> = ({ spaceData, toggleLike }) => {
  const router = useRouter();

  return (
    <CustomPressable onPress={() => router.push(`/space/${spaceData.id}`)} disabled={false}>
      <View className="border border-stroke rounded-lg bg-white">
        <Image
          source={spaceData.imageUrl}
          style={{ width: '100%', aspectRatio: 2, borderTopLeftRadius: 8, borderTopRightRadius: 8 }}
        />

        <View className="flex flex-row items-start justify-between p-4 pr-0 pt-2">
          <View className="gap-y-4">
            <View>
              <Text className="font-CAP1 text-CAP1 leading-CAP1 text-medium_gray">
                {spaceData.address}
              </Text>

              <Text className="font-SUB1 text-SUB1 leading-SUB1 text-black">{spaceData.name}</Text>

              <Text className="font-CAP2 text-CAP2 leading-CAP2 text-light_gray">
                {spaceData.capacity}m² · {spaceData.capacity}명 수용 가능
              </Text>
            </View>

            <View className="flex flex-col">
              <Text className="font-CAP1 text-CAP1 leading-CAP1 text-light_gray">1일 대여</Text>

              <View className="flex flex-row items-center gap-x-1.5">
                <Text className="font-SUB2 text-SUB2 leading-SUB2 text-purple">
                  {spaceData.discountRate}%
                </Text>
                <Text className="font-SUB1 text-SUB1 leading-SUB1 text-black">
                  {spaceData.discountPrice.toLocaleString()}원
                </Text>
              </View>
            </View>
          </View>

          <Pressable
            onPress={() => toggleLike(spaceData.id)}
            className="flex flex-col items-center p-3"
          >
            {spaceData.isLiked ? <Icon.FilledLike /> : <Icon.Like />}
            <Text className="font-CAP2 text-CAP2 leading-CAP2 text-semiLight_gray">
              {spaceData.likeCount}
            </Text>
          </Pressable>
        </View>
      </View>
    </CustomPressable>
  );
};

export default CardComponent;
