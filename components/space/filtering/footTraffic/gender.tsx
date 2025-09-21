import { Pressable, Text, View } from 'react-native';

import FemaleIcon from '@/assets/icons/filtering/female.svg';
import MaleIcon from '@/assets/icons/filtering/male.svg';
import { genderItems } from '@/constants/filtering';

interface GenderProps {
  value: string[] | undefined;
  handleValue: (e: string) => void;
}

const Gender: React.FC<GenderProps> = ({ value, handleValue }) => {
  return (
    <View className="gap-y-[12px]">
      <Text className="SUB2 text-black">브랜드 타겟 성별</Text>
      <View className="flex flex-row flex-wrap items-center gap-x-[6px]">
        {genderItems.map((item) => (
          <Pressable
            key={item.title}
            onPress={() => handleValue(item.value)}
            className={`flex flex-row items-center gap-x-[2px] border rounded-full px-[12px] py-[4px] ${value?.includes(item.value) ? 'border-purple' : 'border-stroke'}`}
          >
            {item.value === 'female' ? <FemaleIcon /> : <MaleIcon />}
            <Text
              className={`BTN1 ${value?.includes(item.value) ? 'text-purple' : 'text-deep_gray'}`}
            >
              {item.title}
            </Text>
          </Pressable>
        ))}
      </View>
    </View>
  );
};

export default Gender;
