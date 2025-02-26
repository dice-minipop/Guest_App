import React from 'react';
import { Text, View, Pressable, Platform } from 'react-native';
import { Portal } from 'react-native-portalize';

import HeaderComponent from '@/components/space/filter/header';
import PeopleFilterComponent from '@/components/space/filter/peopleFilter';
import PriceFilterComponent from '@/components/space/filter/priceFilter';
import RegionFilterComponent from '@/components/space/filter/regionFilter';
import SortFilterComponent from '@/components/space/filter/sortFilter';
import { useGetFilteredSpaceLists } from '@/hooks/space/space';
import { useSpaceFilteringStore } from '@/zustands/filter/store';

import Icon from '../icon/icon';

interface FilterContainerProps {
  isVisible: boolean;
  type: string;
  handleType: (text: string) => void;
}

const FilterContainer: React.FC<FilterContainerProps> = ({ isVisible, type, handleType }) => {
  const { filtering, deleteFiltering, clearFiltering } = useSpaceFilteringStore();

  const { refetch } = useGetFilteredSpaceLists(filtering);

  const handlePrice = (min: number | undefined, max: number | undefined) => {
    if (min === 300000 && max === 300000) {
      return min / 10000 + '만원 이상';
    } else if (min !== undefined && max !== undefined) {
      return min / 10000 + '~' + max / 10000 + '만원';
    }
    return '';
  };

  const handleSortType = (type: string | undefined) => {
    if (type === 'likeCount') {
      return '인기 순';
    } else if (type === 'latest') {
      return '최신 순';
    } else if (type === 'priceAsc') {
      return '낮은 가격 순';
    } else if (type === 'priceDesc') {
      return '높은 가격 순';
    }
  };

  return (
    isVisible && (
      <Portal>
        <View
          className="relative flex h-screen w-screen justify-end bg-black/50"
          onTouchEnd={() => handleType('')}
        >
          <View className="rounded-t-xl bg-white pt-6" onTouchEnd={(e) => e.stopPropagation()}>
            <HeaderComponent type={type} handleType={handleType} onClose={() => handleType('')} />
            {type === '지역' && (
              <View className="px-5 pt-6 min-h-[488px]">
                <RegionFilterComponent />
              </View>
            )}

            {type === '가격' && (
              <View className="px-5 pt-6 h-[320px]">
                <PriceFilterComponent />
              </View>
            )}

            {type === '수용인원' && (
              <View className="px-5 pt-6 h-[316px]">
                <PeopleFilterComponent />
              </View>
            )}

            {type === '정렬' && (
              <View className="px-5 pt-6 h-[430px]">
                <SortFilterComponent />
              </View>
            )}
          </View>

          <View
            onTouchEnd={(e) => e.stopPropagation()}
            className={`absolute z-10 flex w-screen flex-col gap-y-3 bg-white px-5 pt-4 drop-shadow-basicShadow ${Platform.OS === 'ios' ? 'pb-[34px]' : 'bottom-[-34px]'}`}
          >
            <View className="flex flex-row gap-x-1.5 bg-white">
              {'city' in filtering && (
                <Pressable
                  onPress={() => {
                    deleteFiltering('city');
                    deleteFiltering('district');
                  }}
                  className="flex flex-row items-center gap-x-0.5 rounded-full border border-black py-1 pl-2.5 pr-1.5"
                >
                  <Text className="font-CAP1 text-CAP1 leading-CAP1 text-deep_gray">
                    {filtering.city === '전국'
                      ? '전국'
                      : filtering.district !== undefined
                        ? `${filtering.city} ${filtering.district}`
                        : `${filtering.city}`}
                  </Text>
                  <Icon.Delete />
                </Pressable>
              )}

              {('minPrice' in filtering || 'maxPrice' in filtering) && (
                <Pressable
                  onPress={() => {
                    deleteFiltering('minPrice');
                    deleteFiltering('maxPrice');
                  }}
                  className="flex flex-row items-center gap-x-0.5 rounded-full border border-black py-1 pl-2.5 pr-1.5"
                >
                  <Text className="font-CAP1 text-CAP1 leading-CAP1 text-deep_gray">
                    {handlePrice(filtering.minPrice, filtering.maxPrice)}
                  </Text>
                  <Icon.Delete />
                </Pressable>
              )}

              {(filtering.maxCapacity || filtering.minCapacity) && (
                <Pressable
                  onPress={() => {
                    deleteFiltering('maxCapacity');
                    deleteFiltering('minCapacity');
                  }}
                  className="flex flex-row items-center gap-x-0.5 rounded-full border border-black py-1 pl-2.5 pr-1.5"
                >
                  <Text className="font-CAP1 text-CAP1 leading-CAP1 text-deep_gray">
                    {filtering.minCapacity
                      ? `${filtering.minCapacity}명 이상`
                      : `최대 ${filtering.maxCapacity}명`}
                  </Text>
                  <Icon.Delete />
                </Pressable>
              )}

              {'sortBy' in filtering && (
                <Pressable
                  onPress={() => deleteFiltering('sortBy')}
                  className="flex flex-row items-center gap-x-0.5 rounded-full border border-black py-1 pl-2.5 pr-1.5"
                >
                  <Text className="font-CAP1 text-CAP1 leading-CAP1 text-deep_gray">
                    {handleSortType(filtering.sortBy)}
                  </Text>
                  <Icon.Delete />
                </Pressable>
              )}
            </View>

            <View className="flex-row items-center gap-x-3 bg-white">
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
