import React from 'react';
import { Text, View, Pressable } from 'react-native';
import { Portal } from 'react-native-portalize';

import { useGetAnnouncementLists } from '@/hooks/announcement/announcement';
import { useAnnouncementFilteringStore } from '@/zustands/filter/store';

import Icon from '../icon/icon';

import HeaderComponent from './filter/header';
import RegionFilterComponent from './filter/regionFilter';
import StatusFilterComponent from './filter/statusFilter';
import TargetFilterComponent from './filter/targetFilter';

interface FilterContainerProps {
  isVisible: boolean;
  type: string;
  handleType: (text: string) => void;
}

const FilterContainer: React.FC<FilterContainerProps> = ({ isVisible, type, handleType }) => {
  const { filtering, deleteFiltering, clearFiltering } = useAnnouncementFilteringStore();

  const { refetch } = useGetAnnouncementLists(filtering);

  return (
    isVisible && (
      <Portal>
        <View
          className="relative flex h-screen w-screen justify-end bg-black/50"
          onTouchEnd={() => handleType('')}
        >
          <View className="rounded-t-xl bg-white pt-6" onTouchEnd={(e) => e.stopPropagation()}>
            <HeaderComponent type={type} handleType={handleType} onClose={() => handleType('')} />

            <View className="px-5 pt-6 h-[600px]">
              {type === '지역' && <RegionFilterComponent />}
              {type === '지원대상' && <TargetFilterComponent />}
              {type === '모집상태' && <StatusFilterComponent />}
            </View>
          </View>

          <View
            onTouchEnd={(e) => e.stopPropagation()}
            className="absolute bottom-0 z-10 flex w-screen flex-col gap-y-3 bg-white px-5 pb-[34px] pt-4 drop-shadow-basicShadow"
          >
            <View className="flex flex-row gap-x-1.5">
              {'district' in filtering && (
                <Pressable
                  onPress={() => {
                    deleteFiltering('city');
                    deleteFiltering('district');
                  }}
                  className="flex flex-row items-center gap-x-0.5 rounded-full border border-black py-1 pl-2.5 pr-1.5"
                >
                  <Text className="font-CAP1 text-CAP1 leading-CAP1 text-deep_gray">
                    {filtering.district !== null ? filtering.district : '서울 전체'}
                  </Text>
                  <Icon.Delete />
                </Pressable>
              )}

              {/* {filtering.targets.length !== 0 && (
                <Pressable
                  onPress={() => setFiltering({ minPrice: 0, maxPrice: 300000 })}
                  className="flex flex-row items-center gap-x-0.5 rounded-full border border-black py-1 pl-2.5 pr-1.5"
                >
                  <Text className="font-CAP1 text-CAP1 leading-CAP1 text-deep_gray">
                    {handlePrice(filtering.minPrice, filtering.maxPrice)}
                  </Text>
                  <Icon.Delete />
                </Pressable>
              )} */}

              {'status' in filtering && (
                <Pressable
                  onPress={() => deleteFiltering('status')}
                  className="flex flex-row items-center gap-x-0.5 rounded-full border border-black py-1 pl-2.5 pr-1.5"
                >
                  <Text className="font-CAP1 text-CAP1 leading-CAP1 text-deep_gray">
                    {filtering.status === 'RECRUITING' && '모집 중'}
                    {filtering.status === '모집 예정' && '모집 예정'}
                    {filtering.status === 'CLOSED' && '모집 마감'}
                  </Text>
                  <Icon.Delete />
                </Pressable>
              )}
            </View>

            <View className="flex-row items-center gap-x-3">
              <Pressable
                onPress={clearFiltering}
                className="rounded-lg border border-stroke px-4 py-[15.5px]"
              >
                <Text className="text-center font-BTN1 text-BTN1 text-black">초기화</Text>
              </Pressable>

              <Pressable
                onPress={() => {
                  handleType('');
                  refetch();
                }}
                className="flex-1 rounded-lg bg-black px-4 py-[15.5px]"
              >
                <Text className="text-center font-BTN1 text-BTN1 text-white">필터 결과 보기</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Portal>
    )
  );
};

export default FilterContainer;
