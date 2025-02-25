import React from 'react';
import { Text, View, Pressable, FlatList, ScrollView } from 'react-native';

import { RegionItem, regionItems } from '@/constants/regionData';
import { useAnnouncementFilteringStore } from '@/zustands/filter/store';

const chunkArray = (array: any[], size: number) => {
  return array.reduce((acc, _, i) => {
    if (i % size === 0) acc.push(array.slice(i, i + size));
    return acc;
  }, []);
};

const RegionFilterComponent = () => {
  const { filtering, setFiltering, deleteFiltering } = useAnnouncementFilteringStore();

  const handleCity = (newCity: string) => {
    if (filtering.city === newCity) {
      deleteFiltering('city');
    } else {
      setFiltering('city', newCity);
      deleteFiltering('district');
    }
  };

  const handleDistrict = (newDistrict: string) => {
    if (filtering.district === newDistrict) {
      // 1. newDistrict가 filtering.district와 같으면 district 키 제거
      deleteFiltering('district');
    } else if (!filtering.district) {
      // 3. filtering.district 키가 없으면 district 키 추가
      setFiltering('district', newDistrict);
    } else if (filtering.district && filtering.district !== newDistrict) {
      // 4. filtering.district 키가 존재하지만 값이 다르면 newDistrict로 값 변경
      setFiltering('district', newDistrict);
    }
  };

  const regionChunks = chunkArray(regionItems, 2);

  return (
    <View className="gap-y-6">
      <Text className="font-CAP1 text-CAP1 text-dark_gray">지역</Text>
      <FlatList
        data={regionChunks}
        bounces={false}
        keyExtractor={(_, index) => index.toString()}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ columnGap: 6 }}
        renderItem={({ item }) => (
          <View className="flex flex-col gap-y-2">
            {item.map((region: RegionItem) => (
              <Pressable
                key={region.title}
                onPress={() => handleCity(region.title)}
                className={`rounded-full border border-stroke px-3 py-[5.5px] ${
                  filtering.city === region.title && 'bg-black'
                }`}
              >
                <Text
                  className={`${
                    filtering.city === region.title ? 'text-white' : 'text-deep_gray'
                  } font-BTN1 text-BTN1`}
                >
                  {region.title}
                </Text>
              </Pressable>
            ))}
          </View>
        )}
      />

      {filtering.city && filtering.city !== '전국' && filtering.city !== '세종' && (
        <View className="rounded-lg bg-back_gray p-4">
          <ScrollView>
            <View className="flex flex-row flex-wrap gap-x-1.5 gap-y-2">
              {regionItems
                .find((item) => item.title === filtering.city)
                ?.item?.map((subItem, index) => (
                  <Pressable
                    key={index}
                    onPress={() => handleDistrict(subItem)}
                    className={`rounded border bg-white px-2.5 py-[9px] ${
                      filtering.district === subItem ||
                      (subItem === '전체' && filtering.district === null)
                        ? 'border-purple'
                        : 'border-stroke'
                    }`}
                  >
                    <Text
                      className={`font-BTN2 text-BTN2 ${
                        filtering.district === subItem ||
                        (subItem === '전체' && filtering.district === null)
                          ? 'text-purple'
                          : 'text-deep_gray'
                      }`}
                    >
                      {subItem}
                    </Text>
                  </Pressable>
                ))}
            </View>
          </ScrollView>
        </View>
      )}
    </View>
  );
};

export default RegionFilterComponent;
