import { Image } from 'expo-image';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { Pressable, Text, View } from 'react-native';

import FilledLikeIcon from '@/assets/icons/filled-like.svg';
import LikeIcon from '@/assets/icons/like.svg';
import { useToggleSpaceLike } from '@/hooks/like/like';
import { SpaceItem } from '@/types/space';
import { showToast } from '@/utils/toast';

import SpaceBadge from '../spaceBadge/spaceBadge';

interface SpaceItemComponentProps {
  data: SpaceItem;
}

const SpaceItemComponent: React.FC<SpaceItemComponentProps> = ({ data }) => {
  const isStorybook = globalThis.__STORYBOOK__ === true;
  const expoRouter = useRouter();
  const router = isStorybook ? require('@/constants/mockRouter').mockRouter : expoRouter;

  const [isPressed, setIsPressed] = useState<boolean>(false);

  const { mutateAsync: spaceLike } = useToggleSpaceLike(data.id);

  return (
    <Pressable
      onPress={() => router.push(`/space/${data.id}`)}
      onPressIn={() => setIsPressed(true)}
      onPressOut={() => setIsPressed(false)}
      className="border border-stroke rounded-lg bg-white mx-[20px] relative"
    >
      <Image
        source={data.imageUrl}
        style={{ width: '100%', aspectRatio: 2, borderTopLeftRadius: 8, borderTopRightRadius: 8 }}
      />
      <SpaceBadge badgeString="20대 여성 방문 상위 10%" />

      <View className={`pl-[16px] pb-[16px] pr-[6px] gap-y-[8px] ${isPressed && 'opacity-50'}`}>
        <View className="flex flex-row justify-between">
          <View className="flex flex-col mt-[8px]">
            <Text numberOfLines={1} className="max-w-[240px] CAP1 text-medium_gray">
              {data.address}
            </Text>
            <Text numberOfLines={1} className="max-w-[240px] SUB1 text-black">
              {data.name}
            </Text>
            <Text className="CAP2 text-light_gray">
              {data.size}m² · {data.capacity}명 수용 가능
            </Text>
          </View>

          <Pressable
            // onPress={() => spaceLike()}
            onPress={() => {
              showToast(true, 'ㅎㅇ');
              console.log('ㅎㅇ');
            }}
            className="flex flex-col items-center self-start py-[8px]"
          >
            {data.isLiked ? <FilledLikeIcon /> : <LikeIcon />}
            <Text
              className={`CAP2 text-center w-[48px] ${data.isLiked ? 'text-purple' : 'text-semiLight_gray'}`}
            >
              {data.likeCount > 999 ? '999+' : data.likeCount}
            </Text>
          </Pressable>
        </View>

        <View className="flex flex-col items-end mr-[10px]">
          <View className="flex flex-row items-center gap-x-[8px]">
            <Text className="CAP1 text-dark_gray">1일 대여</Text>
            <Text className="CAP1 text-semiLight_gray line-through">
              {data.pricePerDay.toLocaleString()}
            </Text>
          </View>

          <View className="flex flex-row items-center gap-x-[6px]">
            <Text className="SUB2 text-purple">{data.discountRate}%</Text>
            <Text className="SUB1 text-black">{data.discountPrice.toLocaleString()}원</Text>
          </View>
        </View>
      </View>
    </Pressable>
  );
};

export default SpaceItemComponent;
