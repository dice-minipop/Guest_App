import { LayoutChangeEvent, Pressable, ScrollView, Text, View } from 'react-native';

import { regionItems } from '@/constants/regionData';
import { useSpaceFilterStore } from '@/zustands/filter/space';

interface RegionFilteringProps {
  viewRef: React.RefObject<View>;
  handleLayout: (event: LayoutChangeEvent, index: number) => void;
}

const RegionFiltering: React.FC<RegionFilteringProps> = ({ viewRef, handleLayout }) => {
  const { spaceFilter, setSpaceFilter } = useSpaceFilterStore();

  const handleCity = (city: string) => {
    if (spaceFilter.city === city) {
      setSpaceFilter({ city: undefined, district: undefined });
    } else if (city === '전국') {
      setSpaceFilter({ city: '전국', district: undefined });
    } else {
      setSpaceFilter({ city, district: '전체' });
    }
  };

  const handleDistrict = (district: string) => {
    if (spaceFilter.district === district) {
      setSpaceFilter({ district: undefined });
    } else {
      setSpaceFilter({ district });
    }
  };

  const selectedRegion = regionItems.find((r) => r.title === spaceFilter.city);

  return (
    <View
      className="gap-y-[24px] pt-[24px]"
      ref={viewRef}
      onLayout={(event) => handleLayout(event, 0)}
    >
      <Text className="CAP1 text-dark_gray px-[20px]">지역</Text>

      <ScrollView
        contentContainerStyle={{
          flexDirection: 'column',
          rowGap: 8,
          paddingLeft: 20,
        }}
        showsHorizontalScrollIndicator={false}
        horizontal={true}
      >
        <View className="flex flex-col gap-y-[10px] mr-[20px]">
          {[0, 1].map((row) => (
            <View key={row} className="flex flex-row items-center gap-x-[6px]">
              {regionItems.slice(row * 9, row * 9 + 9).map((item) => (
                <Pressable
                  key={item.title}
                  onPress={() => handleCity(item.title)}
                  className={`border px-[12px] py-[5.5px] rounded-full ${spaceFilter.city === item.title ? 'bg-black border-black' : 'bg-white border-stroke'}`}
                >
                  <Text
                    className={`BTN1 ${spaceFilter.city === item.title ? 'text-white' : 'text-deep_gray'}`}
                  >
                    {item.title}
                  </Text>
                </Pressable>
              ))}
            </View>
          ))}
        </View>
      </ScrollView>

      {selectedRegion?.item && (
        <View className="flex flex-row flex-wrap bg-back_gray p-[16px] gap-x-[6px] gap-y-[8px] rounded-lg mx-[20px]">
          {selectedRegion.item.map((item) => (
            <Pressable
              key={item}
              onPress={() => handleDistrict(item)}
              className={`bg-white border px-[10px] py-[9px] rounded ${
                spaceFilter.district === item ? 'border-purple' : 'border-stroke'
              }`}
            >
              <Text
                className={`BTN2 ${spaceFilter.district === item ? 'text-purple' : 'text-deep_gray'}`}
              >
                {item}
              </Text>
            </Pressable>
          ))}
        </View>
      )}
    </View>
  );
};

export default RegionFiltering;
