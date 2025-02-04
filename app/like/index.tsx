import React, { useState } from 'react';
import { View, FlatList, SafeAreaView } from 'react-native';

import { popUpDummyData } from '../../constants/mocks/likeDummyData';

import CardComponent from '@/components/popUp/card';
import HeaderComponent from '@/components/like/header';

const LikeScreen = () => {
  const [type, setType] = useState<string>('popUp');

  const handleType = () => {
    if (type === 'popUp') {
      setType('recruit');
    } else {
      setType('popUp');
    }
  };

  const [popUpData, setPopUpData] = useState(popUpDummyData);

  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="flex-1">
        <FlatList
          stickyHeaderIndices={[0]}
          // 렌더링하는 전체 데이터
          data={popUpData}
          // 각 아이템의 key 값 지정
          keyExtractor={(item) => item.id.toString()}
          // 아이템들을 렌더링하는 메서드
          renderItem={({ item }) => (
            <View className="px-5">
              <CardComponent storeData={item} />
            </View>
          )}
          // FlatList의 최상단에 렌더링되는 Header 아이템
          ListHeaderComponent={<HeaderComponent type={type} handleType={handleType} />}
          // FlatList의 최하단에 렌더링되는 Footer 아이템
          ListFooterComponent={<View className="h-16" />}
          // 렌더링 되는 아이템들 사이의 간격
          ItemSeparatorComponent={() => <View className="h-4" />}
        />
      </View>
    </SafeAreaView>
  );
};

export default LikeScreen;
