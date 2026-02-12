import React from 'react';
import { View } from 'react-native';

function CustomToast({ text1, text2, renderContent }: any) {
  return <View className="w-full bg-transparent">{renderContent ? renderContent() : <></>}</View>;
}

export const toastConfig = {
  custom: ({ text1, text2, props }: any) => (
    <CustomToast text1={text1} text2={text2} renderContent={props.renderContent} />
  ),
};
