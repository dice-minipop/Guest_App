import { Slider } from '@miblanchard/react-native-slider';
import { Text, View } from 'react-native';

import ThumbIcon from '@/assets/icons/filtering/thumb.svg';

interface CapacityFilteringComponentProps {
  minCapacity: number | undefined;
  maxCapacity: number | undefined;
  handlePriceRange: (range: [number, number]) => void;
}

const CapacityFilteringComponent: React.FC<CapacityFilteringComponentProps> = ({
  minCapacity,
  maxCapacity,
  handlePriceRange,
}) => {
  return (
    <View className="px-[20px] gap-y-[24px]">
      <Text className="CAP1 text-dark_gray">수용인원</Text>

      <Text className="SUB1 text-black">
        최대 <Text className="text-semiLight_gray"> {maxCapacity ?? 0} </Text> 명 수용 가능
      </Text>
      <View>
        <Slider
          minimumValue={0}
          maximumValue={100}
          step={5}
          renderThumbComponent={() => <ThumbIcon />}
        />

        <View className="flex-row justify-between mb-2">
          <Text className="CAP1 text-light_gray">0명</Text>
          <Text className="CAP1 text-light_gray">50명</Text>
          <Text className="CAP1 text-light_gray">100명</Text>
        </View>
      </View>
    </View>
  );
};

export default CapacityFilteringComponent;
