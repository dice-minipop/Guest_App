import React from 'react';
import { Text, View, Pressable, StyleSheet } from 'react-native';
import { Image } from 'expo-image';

import CustomPressable from '@/components/common/customPressable';
import { SpaceItem } from '@/types/space';
import { useToggleLike } from '@/hooks/like/like';
import { useRouter } from 'expo-router';

// import LikeIcon from '@assets/popUp/like.svg';
// import FilledLikeIcon from '@assets/popUp/filled-like.svg';

interface CardComponentProps {
  storeData: SpaceItem;
}

const CardComponent: React.FC<CardComponentProps> = ({ storeData }) => {
  const router = useRouter();

  const { mutateAsync: spaceLike } = useToggleLike();

  return (
    <CustomPressable onPress={() => router.push(`/popUpDetail/${storeData.id}`)} disabled={false}>
      <View style={styles.container}>
        <Image
          source={storeData.imageUrl}
          style={{ width: 335, height: 188 }}
          className="aspect-[2/1] rounded-t-lg"
        />

        <View className="flex flex-row items-start justify-between p-4 pr-0 pt-2">
          <View className="gap-y-4">
            <View>
              <Text className="font-CAP1 text-CAP1 leading-CAP1 text-medium_gray">
                {storeData.address}
              </Text>

              <Text className="font-SUB1 text-SUB1 leading-SUB1 text-black">{storeData.name}</Text>

              <Text className="font-CAP2 text-CAP2 leading-CAP2 text-light_gray">
                {storeData.capacity}m² · {storeData.capacity}명 수용 가능
              </Text>
            </View>

            <View className="flex flex-col">
              <Text className="font-CAP1 text-CAP1 leading-CAP1 text-light_gray">1일 대여</Text>

              <View className="flex flex-row items-center gap-x-1.5">
                <Text className="font-SUB2 text-SUB2 leading-SUB2 text-purple">
                  {storeData.discountRate}%
                </Text>
                <Text className="font-SUB1 text-SUB1 leading-SUB1 text-black">
                  {storeData.discountPrice.toLocaleString()}원
                </Text>
              </View>
            </View>
          </View>

          <Pressable
            onPress={() => spaceLike(storeData.id)}
            className="flex flex-col items-center p-3"
          >
            {/* {storeData.isLiked ? <FilledLikeIcon /> : <LikeIcon />} */}
            <Text className="font-CAP2 text-CAP2 leading-CAP2 text-semiLight_gray">
              {storeData.likeCount}
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
