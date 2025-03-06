import { useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  SafeAreaView,
  Text,
  View,
} from 'react-native';

import CustomModal from '@/components/common/customModal';
import Icon from '@/components/icon/icon';
import PasswordInputComponent from '@/components/myPage/passwordInput';
import { useUpdatePassword } from '@/hooks/auth/auth';

const ResetPasswordScreen = () => {
  const router = useRouter();

  const [currentPassword, setCurrentPassword] = useState<string>('');
  const [newPassword, setNewPassword] = useState<string>('');
  const [newPasswordCheck, setNewPasswordCheck] = useState<string>('');

  const [isComplete, setIsComplete] = useState<boolean>(false);

  useEffect(() => {
    if (
      currentPassword !== '' &&
      newPassword !== '' &&
      newPasswordCheck !== '' &&
      newPassword === newPasswordCheck
    ) {
      setIsComplete(true);
    } else {
      setIsComplete(false);
    }
  }, [currentPassword, newPassword, newPasswordCheck]);

  const [isCompleteModalVisible, setIsCompleteModalVisible] = useState<boolean>(false);

  const { mutateAsync: updatePassword } = useUpdatePassword();

  return (
    <SafeAreaView className={`flex-1 bg-white ${Platform.OS === 'android' && 'pt-[50px]'}`}>
      <StatusBar style="dark" />
      <View className="flex flex-row justify-between items-center px-1 relative">
        <Pressable onPress={() => router.back()} className="p-3">
          <Icon.BlackLeftArrow />
        </Pressable>

        <Text className="absolute left-1/2 -translate-x-1/2 text-SUB3 font-SUB3 leading-SUB3">
          비밀번호 재설정
        </Text>
      </View>

      <View onTouchEnd={() => Keyboard.dismiss()}>
        <KeyboardAvoidingView className="gap-y-8" onTouchEnd={(e) => e.stopPropagation()}>
          <View className="gap-y-6 pt-8">
            <PasswordInputComponent
              title="현재 비밀번호"
              value={currentPassword}
              handleValue={(text: string) => setCurrentPassword(text)}
              placeholder="비밀번호를 입력해주세요"
            />

            <PasswordInputComponent
              title="새 비밀번호"
              value={newPassword}
              handleValue={(text: string) => setNewPassword(text)}
              placeholder="새 비밀번호를 입력해주세요"
              warningMessage="비밀번호는 8자 이상 / 영문, 숫자, 특수문자를 포함해야 합니다."
              successMessage="사용 가능한 비밀번호입니다."
            />

            <PasswordInputComponent
              type="check"
              title="새 비밀번호 확인"
              value={newPasswordCheck}
              handleValue={(text: string) => setNewPasswordCheck(text)}
              placeholder="새 비밀번호를 한번 더 입력해주세요"
              successMessage="동일한 비밀번호입니다."
              compareValue={newPassword}
            />
          </View>

          <Pressable
            onPress={() => updatePassword({ password: currentPassword, newPassword })}
            disabled={false}
            className={`mx-5 px-4 py-[15.5px] rounded-lg border border-stroke ${isComplete ? 'bg-black' : 'bg-light_gray'}`}
          >
            <Text className="text-BTN1 font-BTN1 leading-BTN1 text-white text-center">확인</Text>
          </Pressable>
        </KeyboardAvoidingView>
      </View>

      <CustomModal
        isVisible={isCompleteModalVisible}
        closeModal={() => setIsCompleteModalVisible(false)}
        title="비밀번호 변경이 완료되었습니다."
        buttonText="확인"
      />
    </SafeAreaView>
  );
};

export default ResetPasswordScreen;
