import React from 'react';
import { Text, View, Pressable } from 'react-native';
import { useAnnouncementFilteringStore } from '@/zustands/filter/store';

import { regionItems } from './regionData';

const RegionFilterComponent = () => {
  const { filtering, setFiltering } = useAnnouncementFilteringStore();

  const handleCity = (newCity: string) => {
    if (filtering.city === newCity) {
      setFiltering({ city: '', district: '' });
    } else {
      setFiltering({ city: newCity });
    }
  };

  const handleDistrict = (newDistrict: string) => {
    if (filtering.district === newDistrict) {
      setFiltering({ district: '' });
    } else {
      setFiltering({ district: newDistrict });
    }
  };

  return (
    <View className="gap-y-6">
      <Text className="font-CAP1 text-CAP1 text-dark_gray">지역</Text>
      <View className="flex flex-row gap-x-1.5">
        {regionItems.map((item) => (
          <Pressable
            key={item.title}
            onPress={() => handleCity(item.title)}
            className={`rounded-full border border-stroke px-3 py-[5.5px] ${
              filtering.city === item.title && 'bg-black'
            }`}
          >
            <Text
              className={`${
                filtering.city === item.title ? 'text-white' : 'text-deep_gray'
              } font-BTN1 text-BTN1`}
            >
              {item.title}
            </Text>
          </Pressable>
        ))}
      </View>

      {filtering.city && filtering.city !== '전국' && (
        <View className="rounded-lg bg-back_gray p-4">
          <View className="flex flex-row flex-wrap gap-x-1.5 gap-y-2">
            {regionItems
              .find((item) => item.title === filtering.city)
              ?.item?.map((subItem, index) => (
                <Pressable
                  key={index}
                  onPress={() => handleDistrict(subItem)}
                  className={`rounded border bg-white px-2.5 py-[9px] ${
                    filtering.district === subItem ? 'border-purple' : 'border-stroke'
                  }`}
                >
                  <Text
                    className={`font-BTN2 text-BTN2 ${
                      filtering.district === subItem ? 'text-purple' : 'text-deep_gray'
                    }`}
                  >
                    {subItem}
                  </Text>
                </Pressable>
              ))}
          </View>
        </View>
      )}
    </View>
  );
};

export default RegionFilterComponent;
