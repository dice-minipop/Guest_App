import { Text, Pressable, View } from 'react-native';

import { Items } from '@/constants/filtering';

interface CustomSelectProps<T> {
  label: string;
  subLabel?: string;
  required?: boolean;
  options: Items<T>[];
  value: T[];
  setValue: (newValue: T[]) => void;
  wrapGap?: string;
  padding?: string;
  rounded?: string;
  textStyle?: string;
}
export default function CustomSelect<T>({
  label,
  subLabel,
  required = false,
  options,
  value,
  setValue,
  wrapGap = 'gap-1',
  padding = 'px-2.5 py-[9px]',
  rounded = 'rounded',
  textStyle = 'BTN1',
}: CustomSelectProps<T>) {
  const toggleSelect = <T,>(list: T[], value: T): T[] =>
    list.includes(value) ? list.filter((v) => v !== value) : [...list, value];

  return (
    <View className="gap-y-[8px]">
      <Text className="CAP1 text-dark_gray">
        {label}
        <Text className="text-semiLight_gray">{subLabel}</Text>
        {required && <Text className="text-red">*</Text>}
      </Text>

      <View className={`flex flex-row flex-wrap items-center ${wrapGap}`}>
        {options.map((item) => (
          <Pressable
            key={item.title}
            onPress={() => setValue(toggleSelect(value, item.value))}
            className={`flex flex-row items-center gap-x-0.5 border ${padding} ${rounded} ${value.includes(item.value) ? 'border-purple' : 'border-stroke'}`}
          >
            {item.icon && <item.icon />}
            <Text
              className={`${textStyle} ${value.includes(item.value) ? 'text-purple' : 'text-deep_gray'}`}
            >
              {item.title}
            </Text>
          </Pressable>
        ))}
      </View>
    </View>
  );
}
