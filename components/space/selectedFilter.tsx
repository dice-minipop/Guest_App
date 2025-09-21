import { Pressable, ScrollView, Text, View } from 'react-native';

import RoundXIcon from '@/assets/icons/roundX.svg';
import {
  ageGroupItemsMap,
  dayOfWeekItemsMap,
  genderItemsMap,
  purposeItemsMap,
  sortByItemsMap,
} from '@/constants/filter/sortBy';
import { priceItems, sizeItems } from '@/constants/filtering';
import { useSpaceFilterStore } from '@/zustands/filter/space';

const SelectedFilterList = () => {
  const { spaceFilter, setSpaceFilter } = useSpaceFilterStore();

  const getPriceLabel = (min: number, max: number): string => {
    // 1. priceItems에 완전히 매칭되는 항목이 있으면 title 반환
    const matched = priceItems.find((item) => item.min === min && item.max === max);
    if (matched) return matched.title;

    // 2. 0원이면 '0원'으로
    if (min === 0 && max === 0) return '0원';

    // 3. min 또는 max를 10,000으로 나누어 '만 원' 단위로 표기
    const format = (value: number) => {
      if (value % 10000 === 0) return `${value / 10000}만원`;
      return `${value.toLocaleString()}원`;
    };

    return `${format(min)} ~ ${format(max)}`;
  };

  const getSizeLabel = (min: number, max: number): string => {
    const matched = sizeItems.find((item) => item.min === min && item.max === max);
    if (matched) return matched.title;

    return `${min}평 ~ ${max}평`;
  };

  return (
    Object.keys(spaceFilter).length !== 0 && (
      <ScrollView>
        <View className="min-h-[80px] flex flex-row flex-wrap gap-[6px] px-[20px] py-[16px]">
          {spaceFilter.city !== undefined && spaceFilter.district !== undefined && (
            <View className="flex flex-row items-center gap-x-[2px] px-[10px] py-[4px] border border-black rounded-full">
              <Text className="CAP1 text-deep_gray">{`${spaceFilter.city} ${spaceFilter.district}`}</Text>
              <Pressable onPress={() => setSpaceFilter({ city: undefined, district: undefined })}>
                <RoundXIcon />
              </Pressable>
            </View>
          )}

          {spaceFilter.targetGender !== undefined &&
            spaceFilter.targetGender.map((item) => (
              <View
                key={item}
                className="flex flex-row items-center gap-x-[2px] px-[10px] py-[4px] border border-black rounded-full"
              >
                <Text className="CAP1 text-deep_gray">{genderItemsMap[item]}</Text>
                <Pressable
                  onPress={() =>
                    setSpaceFilter({
                      targetGender: spaceFilter.targetGender?.filter((gender) => gender !== item),
                    })
                  }
                >
                  <RoundXIcon />
                </Pressable>
              </View>
            ))}

          {spaceFilter.targetAgeGroup !== undefined &&
            spaceFilter.targetAgeGroup.map((item) => (
              <View
                key={item}
                className="flex flex-row items-center gap-x-[2px] px-[10px] py-[4px] border border-black rounded-full"
              >
                <Text className="CAP1 text-deep_gray">{ageGroupItemsMap[item]}</Text>
                <Pressable
                  onPress={() =>
                    setSpaceFilter({
                      targetAgeGroup: spaceFilter.targetAgeGroup?.filter((age) => age !== item),
                    })
                  }
                >
                  <RoundXIcon />
                </Pressable>
              </View>
            ))}

          {spaceFilter.targetDayofWeek !== undefined &&
            spaceFilter.targetDayofWeek.map((item) => (
              <View
                key={item}
                className="flex flex-row items-center gap-x-[2px] px-[10px] py-[4px] border border-black rounded-full"
              >
                <Text className="CAP1 text-deep_gray">{dayOfWeekItemsMap[item]}</Text>
                <Pressable
                  onPress={() =>
                    setSpaceFilter({
                      targetDayofWeek: spaceFilter.targetDayofWeek?.filter((day) => day !== item),
                    })
                  }
                >
                  <RoundXIcon />
                </Pressable>
              </View>
            ))}

          {spaceFilter.targetPurpose !== undefined &&
            spaceFilter.targetPurpose.map((item) => (
              <View
                key={item}
                className="flex flex-row items-center gap-x-[2px] px-[10px] py-[4px] border border-black rounded-full"
              >
                <Text className="CAP1 text-deep_gray">{purposeItemsMap[item]}</Text>
                <Pressable
                  onPress={() =>
                    setSpaceFilter({
                      targetPurpose: spaceFilter.targetPurpose?.filter(
                        (purpose) => purpose !== item,
                      ),
                    })
                  }
                >
                  <RoundXIcon />
                </Pressable>
              </View>
            ))}

          {spaceFilter.minPrice !== undefined && spaceFilter.maxPrice !== undefined && (
            <View className="flex flex-row items-center gap-x-[2px] px-[10px] py-[4px] border border-black rounded-full">
              <Text className="CAP1 text-deep_gray">
                {getPriceLabel(spaceFilter.minPrice, spaceFilter.maxPrice)}
              </Text>
              <Pressable
                onPress={() => setSpaceFilter({ minPrice: undefined, maxPrice: undefined })}
              >
                <RoundXIcon />
              </Pressable>
            </View>
          )}

          {spaceFilter.minSize !== undefined && spaceFilter.maxSize !== undefined && (
            <View className="flex flex-row items-center gap-x-[2px] px-[10px] py-[4px] border border-black rounded-full">
              <Text className="CAP1 text-deep_gray">
                {getSizeLabel(spaceFilter.minSize, spaceFilter.maxSize)}
              </Text>
              <Pressable onPress={() => setSpaceFilter({ minSize: undefined, maxSize: undefined })}>
                <RoundXIcon />
              </Pressable>
            </View>
          )}

          {spaceFilter.sortBy !== undefined && (
            <View className="flex flex-row items-center gap-x-[2px] px-[10px] py-[4px] border border-black rounded-full">
              <Text className="CAP1 text-deep_gray">{sortByItemsMap[spaceFilter.sortBy]}</Text>
              <Pressable onPress={() => setSpaceFilter({ sortBy: undefined })}>
                <RoundXIcon />
              </Pressable>
            </View>
          )}
        </View>
      </ScrollView>
    )
  );
};

export default SelectedFilterList;
