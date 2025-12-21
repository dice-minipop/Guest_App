import { useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import BackArrowIcon from '@/assets/icons/backArrow.svg';
import BlackBackArrowIcon from '@/assets/icons/black-backArrow.svg';

import OpacityPressable from './opacityPressable';

interface BackHeaderComponentProps {
  style?: 'BLACK' | 'WHITE';
  hasSafeArea?: boolean;
  title?: string;
  children?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

export default function BackHeaderComponent({
  style = 'BLACK',
  hasSafeArea = true,
  title,
  children,
  rightIcon,
}: BackHeaderComponentProps) {
  const router = useRouter();
  const { top } = useSafeAreaInsets();

  return style === 'BLACK' ? (
    <View className="bg-black z-50">
      <StatusBar style="light" />

      {hasSafeArea && <View style={{ height: top }} />}
      <View className="flex flex-row items-center pl-[3px]">
        <OpacityPressable onPress={() => router.back()} className="p-[12px]">
          <BackArrowIcon />
        </OpacityPressable>

        {title !== undefined && (
          <Text className="BODY1 text-black absolute left-1/2 -translate-x-1/2 py-[12px]">
            {title}
          </Text>
        )}

        {children !== undefined && (
          <View className="absolute left-1/2 -translate-x-1/2 py-[12px] -translate-y-1/2 top-1/2 z-50">
            {children}
          </View>
        )}
      </View>
    </View>
  ) : (
    <View className="bg-white">
      <StatusBar style="dark" />

      {hasSafeArea && <View style={{ height: top }} />}
      <View className="relative flex flex-row w-full items-center px-[3px]">
        {/* 왼쪽: 뒤로가기 아이콘 영역 */}
        <View className="w-[48px]">
          <OpacityPressable onPress={() => router.back()} className="p-[12px]">
            <BlackBackArrowIcon />
          </OpacityPressable>
        </View>

        {/* 가운데: 타이틀 영역 (양옆 아이콘 사이의 중앙) */}
        <View className="flex-1 items-center">
          {title !== undefined && (
            <Text
              numberOfLines={1}
              ellipsizeMode="tail"
              className="BODY1 text-black max-w-[240px] text-center py-[12px]"
            >
              {title}
            </Text>
          )}
        </View>

        {/* 오른쪽: rightIcon 영역 (기본 폭은 맞추되, 내용에 따라 더 넓어질 수 있게) */}
        <View className="min-w-[48px] items-end">
          {rightIcon !== undefined && <View>{rightIcon}</View>}
        </View>

        {/* 기존 children 이 absolute 로 쓰이던 용도 유지 */}
        {children !== undefined && <View className="absolute">{children}</View>}
      </View>
    </View>
  );
}
