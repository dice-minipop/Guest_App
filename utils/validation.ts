import React from 'react';

import { checkEmail, checkPhoneNumber } from '@/server/auth/auth';

export const validateEmail = async (
  value: string,
  domain: string,
  setMessage: React.Dispatch<React.SetStateAction<string>>,
  setMessageColor: React.Dispatch<React.SetStateAction<'text-yellow' | 'text-green' | 'text-red'>>,
) => {
  if (domain === undefined || domain === '') {
    setMessage('');
    setMessageColor('text-yellow');
    return;
  }

  try {
    console.log('이메일 중복확인 호출됨');
    await checkEmail({ email: value }); // 중복확인 API
    setMessage('사용 가능한 이메일입니다.');
    setMessageColor('text-green');
  } catch (error: any) {
    if (error?.response?.status === 409) {
      setMessage('이미 가입된 이메일입니다.');
      setMessageColor('text-red');
    } else {
      console.log('예상치 못한 오류:', error);
      setMessage('');
      setMessageColor('text-yellow');
    }
  }
};

export const validatePassword = (
  value: string,
  setMessage: React.Dispatch<React.SetStateAction<string>>,
  setMessageColor: React.Dispatch<React.SetStateAction<'text-yellow' | 'text-green' | 'text-red'>>,
) => {
  if (value.length === 0) {
    setMessage('비밀번호는 8자 이상 / 영문, 숫자, 특수문자를 포함해야 합니다.');
    setMessageColor('text-yellow');
  } else if (value.length < 8) {
    setMessage('최소 8자 이상 입력해야 합니다.');
    setMessageColor('text-red');
  } else {
    const hasLetter = /[A-Za-z]/.test(value);
    const hasNumber = /[0-9]/.test(value);
    const hasSpecial = /[!@#$%^&*()_+=-]/.test(value);
    if (hasLetter && hasNumber && hasSpecial) {
      setMessage('사용 가능한 비밀번호입니다.');
      setMessageColor('text-green');
    } else {
      setMessage('영문, 숫자, 특수문자만 허용되며, 3개 모두 사용해야 합니다.');
      setMessageColor('text-red');
    }
  }
};

export const validatePasswordCheck = (
  password: string,
  value: string,
  setMessage: React.Dispatch<React.SetStateAction<string>>,
  setMessageColor: React.Dispatch<React.SetStateAction<'text-yellow' | 'text-green' | 'text-red'>>,
) => {
  if (value.length === 0) {
    setMessage('');
    setMessageColor('text-yellow'); // 메시지를 숨기기 위해 무의미한 색상
    return;
  }

  if (value === password) {
    setMessage('동일한 비밀번호입니다.');
    setMessageColor('text-green');
  } else {
    setMessage('동일한 비밀번호를 입력해야 합니다.');
    setMessageColor('text-red');
  }
};

export const validatePhone = async (
  value: string,
  setMessage: React.Dispatch<React.SetStateAction<string>>,
  setMessageColor: React.Dispatch<React.SetStateAction<'text-yellow' | 'text-green' | 'text-red'>>,
) => {
  if (value.length !== 11) {
    setMessage('');
    setMessageColor('text-yellow');
    return;
  }

  try {
    console.log('휴대폰 중복확인 호출됨');
    await checkPhoneNumber({ phone: value }); // 중복확인 API
    setMessage('사용 가능한 휴대폰 번호입니다.');
    setMessageColor('text-green');
  } catch (error: any) {
    if (error?.response?.status === 409) {
      setMessage('중복된 휴대폰 번호입니다.');
      setMessageColor('text-red');
    } else {
      console.log('예상치 못한 오류:', error);
      setMessage('');
      setMessageColor('text-yellow');
    }
  }
};
