import BottomSheet, { BottomSheetScrollView } from '@gorhom/bottom-sheet';
import { useRef, useState } from 'react';
import { Dimensions, Pressable, ScrollView, View } from 'react-native';

import { statusItems, targetsItems } from '@/constants/filtering';
import { AnnouncementFiltering } from '@/types/filter';

import ChipItemComponent from '../common/chipItem';
import FilteringBottomSheetComponent from '../common/filteringBottomSheet';

import RegionFilteringComponent from './filtering/region';
import StatusFilteringComponent from './filtering/status';
import TargetsFilteringComponent from './filtering/targets';

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

  const [filter, setFilter] = useState<AnnouncementFiltering>({
    city: undefined,
    district: undefined,
    targets: undefined,
    status: undefined,
  });

  const [displayFilter, setDisplayFilter] = useState<AnnouncementFiltering>({
    city: undefined,
    district: undefined,
    targets: undefined,
    status: undefined,
  });

  const getFilterLabel = (key: string): string => {
    switch (key) {
      case '지역':
        if (displayFilter.city || displayFilter.district) {
          return [displayFilter.city, displayFilter.district].filter(Boolean).join(' ');
        }
        break;

      case '지원대상':
        if (displayFilter.targets) {
          return [displayFilter.targets].filter(Boolean).join(' ');
        }
        break;

      case '모집상태':
        if (displayFilter.status) {
          const matched = statusItems.find((item) => item.value === displayFilter.status);
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
      targets: undefined,
      status: undefined,
    });
    setDisplayFilter({
      city: undefined,
      district: undefined,
      targets: undefined,
      status: undefined,
    });
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
          width: Dimensions.get('screen').width,
        }}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
      >
        {items.map((item) => (
          <Pressable
            key={item}
            onPress={() => {
              handleFilter(item);
              bottomSheetRef.current?.expand();
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
        <BottomSheetScrollView bounces={false} contentContainerStyle={{ paddingBottom: 64 }}>
          {selectedFilter === '지역' && (
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
          )}

          {selectedFilter === '지원대상' && (
            <TargetsFilteringComponent
              items={targetsItems}
              value={filter.targets}
              handleValue={(target) =>
                setFilter((prev) => ({
                  ...prev,
                  targets: [target],
                }))
              }
            />
          )}

          {selectedFilter === '모집상태' && (
            <StatusFilteringComponent
              items={statusItems}
              value={filter.status}
              handleValue={(status) =>
                setFilter((prev) => ({
                  ...prev,
                  status: status,
                }))
              }
            />
          )}
        </BottomSheetScrollView>
      </FilteringBottomSheetComponent>
    </View>
  );
};

export default FilteringContainer;
