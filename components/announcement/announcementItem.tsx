import React from 'react';
import { Text, View, Pressable } from 'react-native';

import CustomPressable from '@/components/common/customPressable';

import { useRouter } from 'expo-router';
import { AnnouncementItem } from '@/types/announcement';

import Icon from '@/components/icon/icon';
import { colors } from '@/constants/Colors';

interface AnnouncementItemComponentProps {
  recruitItem: AnnouncementItem;
}

export default function RecruitItemComponent({ recruitItem }: AnnouncementItemComponentProps) {
  const router = useRouter();

  const { id, city, source, title, isLiked, likeCount, target, startDate, endDate } = recruitItem;

  return (
    <CustomPressable onPress={() => router.push(`/announcementDetail/${id}`)} disabled={false}>
      <View className="relative h-[108px] w-full rounded-xl border border-stroke p-4">
        <Pressable
          // onPress={() => onLike(id)}
          className="absolute right-[6px] top-2 flex flex-col items-center my-2"
        >
          <View className="mx-[12px]">
            {isLiked ? (
              <Icon.Like fill={colors.purple} stroke={colors.purple} />
            ) : (
              <Icon.Like fill="none" stroke={colors.light_gray} />
            )}
          </View>
          <Text
            className={`text-CAP2 font-CAP2 leading-CAP2 ${
              isLiked ? 'text-purple' : 'text-light_gray'
            }`}
          >
            {likeCount}
          </Text>
        </Pressable>
        <View className="flex flex-row items-center gap-0.5">
          <Text className="font-CAP1 text-CAP1 leading-CAP1 text-medium_gray">{city}</Text>
          <Text className="font-CAP1 text-CAP1 leading-CAP1 text-medium_gray">·</Text>
          <Text className="font-CAP1 text-CAP1 leading-CAP1 text-medium_gray">{source}</Text>
        </View>
        <Text className="mb-2 mt-0.5 font-SUB1 text-SUB1 leading-SUB1">{title}</Text>
        <View className="flex flex-row items-center gap-1">
          <Text className="font-CAP2 text-CAP2 leading-CAP2 text-light_gray">{target} 대상</Text>
          <Text className="font-CAP2 text-CAP2 leading-CAP2 text-light_gray">|</Text>
          <Text className="font-CAP2 text-CAP2 leading-CAP2 text-light_gray">
            {startDate} ~ {endDate}
          </Text>
        </View>
      </View>
    </CustomPressable>
  );
}
