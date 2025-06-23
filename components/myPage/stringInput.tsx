import { Text, TextInput, View } from 'react-native';

interface StringInputComponentProps {
  title: string;
  value: string;
  onChangeText: (e: string) => void;
  placeholder: string;
  canEdit?: boolean;
}

const StringInputComponent: React.FC<StringInputComponentProps> = ({
  title,
  value,
  onChangeText,
  placeholder,
  canEdit = true,
}) => {
  return (
    <View className="gap-y-[8px]">
      <Text className="CAP1 text-dark_gray">{title}</Text>
      {canEdit ? (
        <TextInput
          value={value}
          onChangeText={onChangeText}
          placeholder={placeholder}
          placeholderTextColor={'#CCCCCC'}
          className="h-[44px] px-[16px] leading-[16px] border border-light_gray rounded-lg"
        />
      ) : (
        <View className="h-[44px] flex justify-center px-[16px] border border-light_gray rounded-lg bg-back_gray">
          <Text className="BODY2 text-light_gray">{value}</Text>
        </View>
      )}
    </View>
  );
};

export default StringInputComponent;
