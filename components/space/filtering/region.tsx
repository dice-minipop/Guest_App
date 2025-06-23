import { Pressable, ScrollView, Text, View } from 'react-native';

import { regionItems } from '@/constants/regionData';

interface RegionFilteringComponentProps {
  city: string | undefined;
  district: string | undefined;
  handleRegion: (region: [string | undefined, string | undefined]) => void;
}

const RegionFilteringComponent: React.FC<RegionFilteringComponentProps> = ({
  city,
  district,
  handleRegion,
}) => {
  const handleCity = (newCity: string) => {
    if (newCity === city) {
      handleRegion([undefined, undefined]);
    } else {
      handleRegion([newCity, undefined]);
    }
  };

  const handleDistrict = (newDistrict: string) => {
    if (newDistrict === district) {
      handleRegion([city, undefined]);
    } else {
      handleRegion([city, newDistrict]);
    }
  };

  const selectedRegion = regionItems.find((r) => r.title === city);

  return (
    <View className="gap-y-[24px]">
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
                  className={`border px-[12px] py-[5.5px] rounded-full ${item.title === city ? 'bg-black border-black' : 'bg-white border-stroke'}`}
                >
                  <Text className={`BTN1 ${item.title === city ? 'text-white' : 'text-deep_gray'}`}>
                    {item.title}
                  </Text>
                </Pressable>
              ))}
            </View>
          ))}
        </View>
      </ScrollView>

      <View className="px-[20px]">
        {selectedRegion?.item && (
          <View className="flex flex-row flex-wrap bg-back_gray p-[16px] gap-x-[6px] gap-y-[8px] rounded-lg">
            {selectedRegion.item.map((item) => (
              <Pressable
                key={item}
                onPress={() => handleDistrict(item)}
                className={`bg-white border px-[10px] py-[9px] rounded ${
                  item === district ? 'border-purple' : 'border-stroke'
                }`}
              >
                <Text className={`BTN2 ${item === district ? 'text-purple' : 'text-deep_gray'}`}>
                  {item}
                </Text>
              </Pressable>
            ))}
          </View>
        )}
      </View>
    </View>
  );
};

export default RegionFilteringComponent;
