import { Portal } from 'react-native-portalize';
import React, { useRef, useState, ReactNode } from 'react';
import { useFilteringStore } from '@/zustands/filter/store';
import { Text, View, FlatList, Pressable } from 'react-native';

import HeaderComponent from '@/components/popUp/filter/header';
import SortFilterComponent from '@/components/popUp/filter/sortFilter';
import PriceFilterComponent from '@/components/popUp/filter/priceFilter';
import RegionFilterComponent from '@/components/popUp/filter/regionFilter';
import PeopleFilterComponent from '@/components/popUp/filter/peopleFilter';
import Icon from '../icon/icon';

interface FilterContainerProps {
  isVisible: boolean;
  type: string;
  handleType: (text: string) => void;
}

type FilterComponent = {
  key: string;
  component: ReactNode;
};

const FilterContainer: React.FC<FilterContainerProps> = ({ isVisible, type, handleType }) => {
  const { filtering, setFiltering, clearFiltering } = useFilteringStore();

  const filterComponents: FilterComponent[] = [
    { key: 'region', component: <RegionFilterComponent /> },
    { key: 'price', component: <PriceFilterComponent /> },
    { key: 'people', component: <PeopleFilterComponent /> },
    { key: 'sort', component: <SortFilterComponent /> },
  ];

  const handlePrice = (min: number, max: number) => {
    return min / 10000 + '~' + max / 10000 + '만원';
  };

  const [activeIndex, setActiveIndex] = useState<number>(0);
  const flatListRef = useRef<FlatList>(null);

  const handleScrollToIndex = (filterType: string) => {
    const index = filterComponents.findIndex((item) => item.key === filterType);
    if (index !== -1 && flatListRef.current) {
      flatListRef.current.scrollToIndex({
        index,
        animated: true,
        viewOffset: 56,
      });
      setActiveIndex(index);
    }
    handleType(filterType);
  };

  const onScroll = (event: any) => {
    const contentOffsetY = event.nativeEvent.contentOffset.y;
    const index = Math.floor(contentOffsetY / 200);
    if (index !== activeIndex) {
      setActiveIndex(index);
    }
  };

  return (
    isVisible && (
      <Portal>
        <View
          className="relative flex h-screen w-screen justify-end bg-black/50"
          onTouchEnd={() => handleType('')}
        >
          <View
            className="h-[666px] rounded-t-xl bg-white pt-6"
            onTouchEnd={(e) => e.stopPropagation()}
          >
            <FlatList
              bounces={false}
              ref={flatListRef}
              stickyHeaderIndices={[0]}
              data={filterComponents}
              keyExtractor={(item) => item.key}
              renderItem={({ item }) => <View className="px-5 py-6">{item.component}</View>}
              ItemSeparatorComponent={() => <View className="h-2 bg-back_gray" />}
              ListHeaderComponent={() => (
                <HeaderComponent
                  activeIndex={activeIndex}
                  onScroll={handleScrollToIndex}
                  onClose={() => handleType('')}
                />
              )}
              ListFooterComponent={() => <View className="h-[308px]" />}
              onScroll={onScroll}
              scrollEventThrottle={16}
            />
          </View>

          <View
            onTouchEnd={(e) => e.stopPropagation()}
            className="absolute bottom-0 z-10 flex w-screen flex-col gap-y-3 bg-white px-5 pb-[34px] pt-4 drop-shadow-basicShadow"
          >
            <View className="flex flex-row gap-x-1.5">
              {filtering.district !== '' && (
                <Pressable
                  onPress={() => setFiltering({ city: '', district: '' })}
                  className="flex flex-row items-center gap-x-0.5 rounded-full border border-black py-1 pl-2.5 pr-1.5"
                >
                  <Text className="font-CAP1 text-CAP1 leading-CAP1 text-deep_gray">
                    {filtering.district}
                  </Text>
                  <Icon.Delete />
                </Pressable>
              )}

              {!(filtering.minPrice === 0 && filtering.maxPrice === 300000) && (
                <Pressable
                  onPress={() => setFiltering({ minPrice: 0, maxPrice: 300000 })}
                  className="flex flex-row items-center gap-x-0.5 rounded-full border border-black py-1 pl-2.5 pr-1.5"
                >
                  <Text className="font-CAP1 text-CAP1 leading-CAP1 text-deep_gray">
                    {handlePrice(filtering.minPrice, filtering.maxPrice)}
                  </Text>
                  <Icon.Delete />
                </Pressable>
              )}

              {filtering.maxCapacity !== 0 && (
                <Pressable
                  onPress={() => setFiltering({ maxCapacity: 0 })}
                  className="flex flex-row items-center gap-x-0.5 rounded-full border border-black py-1 pl-2.5 pr-1.5"
                >
                  <Text className="font-CAP1 text-CAP1 leading-CAP1 text-deep_gray">
                    최대 {filtering.maxCapacity}명
                  </Text>
                  <Icon.Delete />
                </Pressable>
              )}

              {filtering.sortBy !== '' && (
                <Pressable
                  onPress={() => setFiltering({ sortBy: '' })}
                  className="flex flex-row items-center gap-x-0.5 rounded-full border border-black py-1 pl-2.5 pr-1.5"
                >
                  <Text className="font-CAP1 text-CAP1 leading-CAP1 text-deep_gray">
                    {filtering.sortBy}
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

              <Pressable className="flex-1 rounded-lg bg-black px-4 py-[15.5px]">
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
