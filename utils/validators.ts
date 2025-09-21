import { checkEmail, checkPhoneNumber } from '@/server/auth/auth';
import { RegisterDto } from '@/types/auth';

export const emailValidate = async (value: string) => {
  if (!value || value.trim() === '') {
    return '이메일을 입력해주세요.';
  }

  try {
    await checkEmail({ email: value });
    return true; // 통과
  } catch (error: any) {
    if (error?.response?.status === 409) {
      return '이미 가입된 이메일입니다.';
    }
    return '이메일 확인 중 오류가 발생했습니다.';
  }
};

export const passwordValidate = (value: string) => {
  if (!value || value.length === 0) {
    return '비밀번호는 8자 이상 / 영문, 숫자, 특수문자를 포함해야 합니다.';
  }
  if (value.length < 8) {
    return '최소 8자 이상 입력해야 합니다.';
  }

  const hasLetter = /[A-Za-z]/.test(value);
  const hasNumber = /[0-9]/.test(value);
  const hasSpecial = /[!@#$%^&*()_+=-]/.test(value);

  if (hasLetter && hasNumber && hasSpecial) {
    return true;
  }
  return '영문, 숫자, 특수문자 모두 포함해야 합니다.';
};

export const passwordCheckValidate = (value: string, formValues: RegisterDto) => {
  if (!value) return '비밀번호 확인을 입력해주세요.';
  if (value !== formValues.password) return '동일한 비밀번호를 입력해야 합니다.';
  return true;
};

export const phoneValidate = async (value: string) => {
  if (!/^\d{11}$/.test(value)) {
    return '휴대폰 번호는 11자리 숫자만 입력해야 합니다.';
  }

  try {
    await checkPhoneNumber({ phone: value });
    return true;
  } catch (error: any) {
    if (error?.response?.status === 409) {
      return '중복된 휴대폰 번호입니다.';
    }
    return '휴대폰 확인 중 오류가 발생했습니다.';
  }
};
