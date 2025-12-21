import React from 'react';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

interface KeyBoardAwareProviderProps {
  children: React.ReactNode;
  isCenter?: boolean;
  rowGap?: string | number;
}

export default function KeyBoardAwareProvider({
  children,
  isCenter = false,
  rowGap,
}: KeyBoardAwareProviderProps) {
  return (
    <KeyboardAwareScrollView
      contentContainerStyle={{
        flex: 1,
        justifyContent: isCenter ? 'center' : 'flex-start',
        paddingHorizontal: 20,
        rowGap: rowGap,
        paddingBottom: 80,
      }}
      keyboardShouldPersistTaps="handled"
      enableOnAndroid={true}
      extraScrollHeight={20}
    >
      {children}
    </KeyboardAwareScrollView>
  );
}
