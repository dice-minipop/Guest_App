import { useRouter } from 'expo-router';
import React from 'react';
import { Text, View, Pressable } from 'react-native';

import CustomPressable from '@/components/common/customPressable';
import Icon from '@/components/icon/icon';
import { AnnouncementItem } from '@/server/announcement/response';
import { translateTime } from '@/utils/time';

interface AnnouncementItemComponentProps {
  recruitItem: AnnouncementItem;
  toggleLike: (id: number) => void;
}

export default function RecruitItemComponent({
  recruitItem,
  toggleLike,
}: AnnouncementItemComponentProps) {
  const router = useRouter();

  const {
    id,
    title,
    city,
    district,
    hostName,
    target,
    recruitmentStartAt,
    recruitmentEndAt,
    likeCount,
    isLiked,
  } = recruitItem;

  return (
    <CustomPressable onPress={() => router.push(`/announcement/${id}`)} disabled={false}>
      <View className="rounded-xl border border-stroke p-4 flex flex-col gap-y-2 relative">
        <View>
          <Text className="font-CAP1 text-CAP1 leading-CAP1 text-medium_gray">
            {city + ' ' + district} · {hostName}
          </Text>

          <Text className="font-SUB1 text-SUB1 leading-SUB1">{title}</Text>
        </View>
        <Text className="font-CAP2 text-CAP2 leading-CAP2 text-light_gray">
          {target} 대상 | {translateTime(recruitmentStartAt)} ~ {translateTime(recruitmentEndAt)}
        </Text>

        <Pressable
          onPress={() => toggleLike(id)}
          className="absolute top-2 right-1.5 flex flex-col items-center p-3"
        >
          {isLiked ? <Icon.FilledLike /> : <Icon.Like />}
          <Text
            className={`text-CAP2 font-CAP2 leading-CAP2 ${
              isLiked ? 'text-purple' : 'text-light_gray'
            }`}
          >
            {likeCount}
          </Text>
        </Pressable>
      </View>
    </CustomPressable>
  );
}
