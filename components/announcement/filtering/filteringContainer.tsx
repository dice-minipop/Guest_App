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
import { statusItems } from '@/constants/filtering';
import { useAnnouncementFilterStore } from '@/zustands/filter/announcement';

import ChipItemComponent from '../../common/chipItem';

import RegionFilteringComponent from './items/region';
import SortByFiltering from './items/sortBy';
import StatusFiltering from './items/status';
import TargetsFiltering from './items/targets';

interface FilteringContainerProps {
  items: string[];
}

const FilteringContainer: React.FC<FilteringContainerProps> = ({ items }) => {
  const bottomSheetRef = useRef<BottomSheet>(null);

  const { announcementFilter, clearAnnouncementFilter } = useAnnouncementFilterStore();

  const getFilterLabel = (key: string): string => {
    switch (key) {
      case '지역':
        if (announcementFilter.city || announcementFilter.district) {
          return [announcementFilter.city, announcementFilter.district].filter(Boolean).join(' ');
        }
        break;

      case '지원대상':
        if (announcementFilter.targets) {
          return [announcementFilter.targets].filter(Boolean).join(' ');
        }
        break;

      case '모집상태':
        if (announcementFilter.status) {
          const matched = statusItems.find((item) => item.value === announcementFilter.status);
          return matched ? matched.title : '정렬';
        }
        break;
    }

    return key; // 기본 필터 이름
  };

  const regionRef = useRef<View>(null);
  const targetsRef = useRef<View>(null);
  const statusRef = useRef<View>(null);
  const sortRef = useRef<View>(null);

  const scrollRef = useRef<ScrollView>(null);

  const handleScrollTo = (item: string, index: number) => {
    scrollRef.current?.scrollTo({
      y: scrollY[index] + 1,
      animated: true,
    });
  };

  const [scrollY, setScrollY] = useState<number[]>([0, 0, 0, 0]);

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
          snapPoints={[600]}
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
                  <Pressable
                    key={item}
                    onPress={() => handleScrollTo(item, index)}
                    className="py-[8.5px]"
                  >
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

              <Pressable onPress={() => bottomSheetRef.current?.close()} className="p-[12px]">
                <XIcon />
              </Pressable>
            </View>

            <BottomSheetScrollView
              ref={scrollRef}
              contentContainerStyle={{ paddingBottom: 160 }}
              onScroll={handleScroll}
            >
              <RegionFilteringComponent viewRef={regionRef} handleLayout={handleLayout} />
              <TargetsFiltering viewRef={targetsRef} handleLayout={handleLayout} />
              <StatusFiltering viewRef={statusRef} handleLayout={handleLayout} />
              <SortByFiltering viewRef={sortRef} handleLayout={handleLayout} />
            </BottomSheetScrollView>

            {/* <SelectedFilterList /> */}

            <View className="bg-white flex flex-row items-center gap-x-[12px] pt-[16px] pb-[50px] w-full px-[20px] border-t border-t-stroke">
              <Pressable
                onPress={clearAnnouncementFilter}
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
