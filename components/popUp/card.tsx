import React from 'react';
import { Text, View, Pressable, StyleSheet } from 'react-native';
import { Image } from 'expo-image';

import CustomPressable from '@/components/common/customPressable';
import { useRouter } from 'expo-router';
import Icon from '../icon/icon';
import { colors } from '@/constants/Colors';
import { SpaceItem } from '@/server/space/response';

interface CardComponentProps {
  spaceData: SpaceItem;
  toggleLike: (id: number) => void;
}

const CardComponent: React.FC<CardComponentProps> = ({ spaceData, toggleLike }) => {
  const router = useRouter();

  return (
    <CustomPressable onPress={() => router.push(`/space/${spaceData.id}`)} disabled={false}>
      <View style={styles.container}>
        <Image
          source={spaceData.imageUrl}
          style={{ width: 335, height: 188 }}
          className="aspect-[2/1] rounded-t-lg"
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
            {spaceData.liked ? (
              <Icon.Like fill={colors.purple} stroke={colors.purple} />
            ) : (
              <Icon.Like fill="none" stroke={colors.light_gray} />
            )}
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

const styles = StyleSheet.create({
  container: {
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#eeeeee',
    backgroundColor: 'white',
  },
});
