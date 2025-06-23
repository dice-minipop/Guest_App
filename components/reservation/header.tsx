import { Pressable, Text, View } from 'react-native';

interface HeaderComponentProps {
  currentType: 'PENDING' | 'ACCEPT' | 'CANCEL';
  setCurrentType: React.Dispatch<React.SetStateAction<'PENDING' | 'ACCEPT' | 'CANCEL'>>;
}

const HeaderComponent: React.FC<HeaderComponentProps> = ({ currentType, setCurrentType }) => {
  const typeList = [
    { title: '대기중', value: 'PENDING' },
    { title: '예약 완료', value: 'ACCEPT' },
    { title: '예약 취소', value: 'CANCEL' },
  ];

  return (
    <View className="bg-back_gray flex flex-row justify-evenly">
      {typeList.map((item) => (
        <Pressable
          key={item.value}
          onPress={() => setCurrentType(item.value as 'PENDING' | 'ACCEPT' | 'CANCEL')}
          className={`w-[100px] py-[12px] ${currentType === item.value ? 'border-b-2 border-black' : 'border-0'}`}
        >
          <Text
            className={`SUB3 text-center ${currentType === item.value ? 'text-black' : 'text-medium_gray'}`}
          >
            {item.title}
          </Text>
        </Pressable>
      ))}
    </View>
  );
};

export default HeaderComponent;
