import { Pressable, Text, View } from 'react-native';

import ColorPolygonIcon from '@/assets/icons/filtering/colorPolygon.svg';
import PolygonIcon from '@/assets/icons/filtering/polygon.svg';
import { dayOfWeekItems } from '@/constants/filtering';

interface WeekendProps {
  value: string[] | undefined;
  handleValue: (e: string) => void;
}

const Weekend: React.FC<WeekendProps> = ({ value, handleValue }) => {
  return (
    <View className="gap-y-[12px]">
      <Text className="SUB2 text-black">유동인구가 많은 요일</Text>
      <View className="flex flex-row items-center gap-x-[6px]">
        {dayOfWeekItems.map((item) => (
          <Pressable
            key={item.title}
            onPress={() => handleValue(item.value)}
            className="flex flex-row items-center gap-x-[2px] rounded-[4px]"
          >
            {value?.includes(item.value) ? <ColorPolygonIcon /> : <PolygonIcon />}
            <Text
              className={`BTN2 absolute left-1/2 -translate-x-1/2 ${value?.includes(item.value) ? 'text-purple' : 'text-deep_gray'}`}
            >
              {item.title}
            </Text>
          </Pressable>
        ))}
      </View>
    </View>
  );
};

export default Weekend;
