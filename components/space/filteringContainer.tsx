import BottomSheet, { BottomSheetBackdrop, BottomSheetScrollView } from '@gorhom/bottom-sheet';
import { useRef, useState } from 'react';
import {
  LayoutChangeEvent,
  NativeScrollEvent,
  NativeSyntheticEvent,
  Pressable,
  ScrollView,
  Text,
  View,
} from 'react-native';
import { Portal } from 'react-native-portalize';

import XIcon from '@/assets/icons/spaceDetail/x.svg';
import { spaceSortByItems } from '@/constants/sortBy';
import { useSpaceFilterStore } from '@/zustands/filter/space';

import ChipItemComponent from '../common/chipItem';

import FootTrafficFiltering from './filtering/footTraffic';
import PriceFilteringComponent from './filtering/price';
import RegionFilteringComponent from './filtering/region';
import SizeFiltering from './filtering/size';
import SortByFilteringComponent from './filtering/sortBy';
import SelectedFilterList from './selectedFilter';

interface FilteringContainerProps {
  items: string[];
}

const FilteringContainer: React.FC<FilteringContainerProps> = ({ items }) => {
  const { spaceFilter, clearSpaceFilter } = useSpaceFilterStore();

  const bottomSheetRef = useRef<BottomSheet>(null);

  const priceText = (price: number) => (price === 0 ? 0 : price / 10000);

  const getFilterLabel = (key: string): string => {
    switch (key) {
      case '지역':
        if (spaceFilter.city || spaceFilter.district) {
          return [spaceFilter.city, spaceFilter.district].filter(Boolean).join(' ');
        }
        break;

      case '가격':
        if (spaceFilter.minPrice || spaceFilter.maxPrice) {
          const min = spaceFilter.minPrice ? `${priceText(spaceFilter.minPrice)}만원` : '';
          const max = spaceFilter.maxPrice ? `${priceText(spaceFilter.maxPrice)}만원` : '';
          return `${min} ~ ${max}`.trim();
        }
        break;

      case '공간크기':
        if (spaceFilter.minSize || spaceFilter.maxSize) {
          const min = spaceFilter.minSize ? `${spaceFilter.minSize}평` : '';
          const max = spaceFilter.maxSize ? `${spaceFilter.maxSize}평` : '';
          return `${min} ~ ${max}`.trim();
        }
        break;

      case '정렬':
        if (spaceFilter.sortBy) {
          const matched = spaceSortByItems.find((item) => item.value === spaceFilter.sortBy);
          return matched ? matched.title : '정렬';
        }
        break;
    }

    return key; // 기본 필터 이름
  };

  const [scrollY, setScrollY] = useState<number[]>([0, 0, 0, 0, 0]);

  const regionRef = useRef<View>(null);
  const footTrafficRef = useRef<View>(null);
  const priceRef = useRef<View>(null);
  const capacityRef = useRef<View>(null);
  const sortRef = useRef<View>(null);

  const scrollRef = useRef<ScrollView>(null);

  const handle = (item: string, index: number) => {
    scrollRef.current?.scrollTo({
      y: scrollY[index] + 1,
      animated: true,
    });
  };

  const handleLayout = (event: LayoutChangeEvent, index: number) => {
    const y = event.nativeEvent.layout.y;
    setScrollY((prev) => {
      const next = [...prev];
      next[index] = y;
      return next;
    });
  };

  const [scrollYPosition, setScrollYPosition] = useState(0);
  const [currentSectionIndex, setCurrentSectionIndex] = useState(0);

  const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const y = event.nativeEvent.contentOffset.y + 1;
    setScrollYPosition(y);

    for (let i = 0; i < scrollY.length; i++) {
      const start = scrollY[i];
      const end = scrollY[i + 1] ?? Infinity; // 마지막 구간은 무한대로
      if (y >= start && y < end) {
        setCurrentSectionIndex(i);
        break;
      }
    }
  };

  return (
    <View className="bg-white">
      <ScrollView
        contentContainerStyle={{
          backgroundColor: '#FFFFFF',
          display: 'flex',
          flexDirection: 'row',
          columnGap: 6,
          paddingHorizontal: 20,
          paddingVertical: 16,
        }}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
      >
        {items.map((item, index) => (
          <Pressable
            key={item}
            onPress={() => {
              bottomSheetRef.current?.expand();
              scrollRef.current?.scrollTo({
                y: scrollY[index],
                animated: true,
              });
            }}
          >
            <ChipItemComponent
              label={getFilterLabel(item)}
              isActive={getFilterLabel(item) !== item}
            />
          </Pressable>
        ))}
      </ScrollView>

      <Portal>
        <BottomSheet
          ref={bottomSheetRef}
          snapPoints={[700]}
          maxDynamicContentSize={600}
          index={-1}
          enableContentPanningGesture={false}
          enablePanDownToClose={true}
          backdropComponent={(props) => (
            <BottomSheetBackdrop
              {...props}
              opacity={0.7}
              disappearsOnIndex={-1}
              appearsOnIndex={0}
            />
          )}
        >
          <View className="flex-1">
            <View className="flex flex-row justify-between items-center pl-[20px] pr-[3px] border-b border-b-stroke">
              <View className="flex flex-row gap-x-[4px]">
                {items.map((item, index) => (
                  <Pressable key={item} onPress={() => handle(item, index)} className="py-[8.5px]">
                    <Text
                      className={`SUB1 ${
                        currentSectionIndex === index ? 'text-black' : 'text-light_gray'
                      }`}
                    >
                      {item}{' '}
                    </Text>
                  </Pressable>
                ))}
              </View>

              <Pressable
                onPress={() => {
                  bottomSheetRef.current?.close();
                  clearSpaceFilter();
                }}
                className="p-[12px]"
              >
                <XIcon />
              </Pressable>
            </View>

            <BottomSheetScrollView
              ref={scrollRef}
              contentContainerStyle={{ paddingBottom: 200 }}
              onScroll={handleScroll}
            >
              <RegionFilteringComponent viewRef={regionRef} handleLayout={handleLayout} />
              <FootTrafficFiltering viewRef={footTrafficRef} handleLayout={handleLayout} />
              <PriceFilteringComponent viewRef={priceRef} handleLayout={handleLayout} />
              <SizeFiltering viewRef={capacityRef} handleLayout={handleLayout} />
              <SortByFilteringComponent viewRef={sortRef} handleLayout={handleLayout} />
            </BottomSheetScrollView>

            <SelectedFilterList />

            <View className="bg-white flex flex-row items-center gap-x-[12px] pt-[16px] pb-[50px] w-full px-[20px] border-t border-t-stroke">
              <Pressable
                onPress={clearSpaceFilter}
                className="rounded-lg border border-stroke px-[16px] py-[15.5px]"
              >
                <Text className="BTN1 text-black text-center">초기화</Text>
              </Pressable>

              <Pressable
                onPress={() => {
                  bottomSheetRef.current?.close();
                }}
                className="flex-1 rounded-lg bg-black px-[16px] py-[15.5px]"
              >
                <Text className="BTN1 text-white text-center">필터 결과 보기</Text>
              </Pressable>
            </View>
          </View>
        </BottomSheet>
      </Portal>
    </View>
  );
};

export default FilteringContainer;
