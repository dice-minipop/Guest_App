import BottomSheet, { BottomSheetScrollView } from '@gorhom/bottom-sheet';
import { useRef, useState } from 'react';
import { Pressable, ScrollView, View } from 'react-native';

import { spaceSortByItems } from '@/constants/sortBy';
import { SpaceFiltering } from '@/types/filter';

import ChipItemComponent from '../common/chipItem';
import FilteringBottomSheetComponent from '../common/filteringBottomSheet';

import CapacityFilteringComponent from './filtering/capacity';
import PriceFilteringComponent from './filtering/price';
import RegionFilteringComponent from './filtering/region';
import SortByFilteringComponent from './filtering/sortBy';

interface FilteringContainerProps {
  items: string[];
  selectedFilter: string;
  handleFilter: (e: string) => void;
}

const FilteringContainer: React.FC<FilteringContainerProps> = ({
  items,
  selectedFilter,
  handleFilter,
}) => {
  const bottomSheetRef = useRef<BottomSheet>(null);

  const [filter, setFilter] = useState<SpaceFiltering>({
    city: undefined,
    district: undefined,
    minPrice: undefined,
    maxPrice: undefined,
    minCapacity: undefined,
    maxCapacity: undefined,
    sortBy: undefined,
  });

  const [displayFilter, setDisplayFilter] = useState<SpaceFiltering>({
    city: undefined,
    district: undefined,
    minPrice: undefined,
    maxPrice: undefined,
    minCapacity: undefined,
    maxCapacity: undefined,
    sortBy: undefined,
  });

  const getFilterLabel = (key: string): string => {
    switch (key) {
      case '지역':
        if (displayFilter.city || displayFilter.district) {
          return [displayFilter.city, displayFilter.district].filter(Boolean).join(' ');
        }
        break;

      case '가격':
        if (displayFilter.minPrice || displayFilter.maxPrice) {
          const min = displayFilter.minPrice ? `₩${displayFilter.minPrice}` : '';
          const max = displayFilter.maxPrice ? `₩${displayFilter.maxPrice}` : '';
          return `${min} ~ ${max}`.trim();
        }
        break;

      case '수용인원':
        if (displayFilter.minCapacity || displayFilter.maxCapacity) {
          const min = displayFilter.minCapacity ? `${displayFilter.minCapacity}명` : '';
          const max = displayFilter.maxCapacity ? `${displayFilter.maxCapacity}명` : '';
          return `${min} ~ ${max}`.trim();
        }
        break;

      case '정렬':
        if (displayFilter.sortBy) {
          const matched = spaceSortByItems.find((item) => item.value === displayFilter.sortBy);
          return matched ? matched.title : '정렬';
        }
        break;
    }

    return key; // 기본 필터 이름
  };

  const clearFilter = () => {
    setFilter({
      city: undefined,
      district: undefined,
      minPrice: undefined,
      maxPrice: undefined,
      minCapacity: undefined,
      maxCapacity: undefined,
      sortBy: undefined,
    });
    setDisplayFilter({
      city: undefined,
      district: undefined,
      minPrice: undefined,
      maxPrice: undefined,
      minCapacity: undefined,
      maxCapacity: undefined,
      sortBy: undefined,
    });
  };

  const regionRef = useRef<View>(null);
  const priceRef = useRef<View>(null);
  const capacityRef = useRef<View>(null);
  const sortRef = useRef<View>(null);

  const scrollRef = useRef<ScrollView>(null);

  const scrollToFilter = (filter: string) => {
    const refMap = {
      지역: regionRef,
      가격: priceRef,
      수용인원: capacityRef,
      정렬: sortRef,
    };

    const targetRef = refMap[filter];
    if (targetRef?.current && scrollRef.current) {
      targetRef.current.measureLayout(
        scrollRef.current.getScrollResponder(), // native component 대상
        (x, y) => {
          scrollRef.current?.scrollTo({ y, animated: true });
        },
        (error) => {
          console.error('measureLayout error:', error);
        },
      );
    }
  };

  const handleFilterAndScroll = (filter: string) => {
    handleFilter(filter); // 상태 업데이트
    setTimeout(() => scrollToFilter(filter), 10); // 렌더 후 scroll
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
        {items.map((item) => (
          <Pressable
            key={item}
            onPress={() => {
              // handleFilter(item);
              bottomSheetRef.current?.expand();
              handleFilterAndScroll(item);
            }}
          >
            <ChipItemComponent
              label={getFilterLabel(item)}
              isActive={getFilterLabel(item) !== item}
            />
          </Pressable>
        ))}
      </ScrollView>

      <FilteringBottomSheetComponent
        bottomSheetRef={bottomSheetRef}
        items={items}
        selectedFilter={selectedFilter}
        handleFilter={handleFilter}
        clearFilter={clearFilter}
        handleResult={() => {
          setDisplayFilter(filter);
          bottomSheetRef.current?.close();
        }}
      >
        <BottomSheetScrollView
          ref={scrollRef}
          bounces={false}
          contentContainerStyle={{ paddingBottom: 64 }}
        >
          {/* {selectedFilter === '지역' && (          )} */}

          <View ref={regionRef}>
            <RegionFilteringComponent
              city={filter.city}
              district={filter.district}
              handleRegion={([city, district]) =>
                setFilter((prev) => ({
                  ...prev,
                  city: city,
                  district: district,
                }))
              }
            />
          </View>

          {/* {selectedFilter === '가격' && (          )} */}

          <View ref={priceRef}>
            <PriceFilteringComponent
              minPrice={filter.minPrice}
              maxPrice={filter.maxPrice}
              handlePriceRange={([min, max]) =>
                setFilter((prev) => ({
                  ...prev,
                  minPrice: min,
                  maxPrice: max,
                }))
              }
            />
          </View>

          {/* {selectedFilter === '수용인원' && (          )} */}

          <View ref={capacityRef}>
            <CapacityFilteringComponent
              minCapacity={filter.minCapacity}
              maxCapacity={filter.maxCapacity}
              handlePriceRange={([min, max]) =>
                setFilter((prev) => ({
                  ...prev,
                  minCapacity: min,
                  maxCapacity: max,
                }))
              }
            />
          </View>

          {/* {selectedFilter === '정렬' && (          )} */}

          <View ref={sortRef}>
            <SortByFilteringComponent
              items={spaceSortByItems}
              value={filter.sortBy}
              handleValue={(item: string) =>
                setFilter((prev) => ({
                  ...prev,
                  sortBy: item,
                }))
              }
            />
          </View>
        </BottomSheetScrollView>
      </FilteringBottomSheetComponent>
    </View>
  );
};

export default FilteringContainer;
