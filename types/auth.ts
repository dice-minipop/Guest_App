export type RegisterDto = {
  name: string;
  email: string;
  password: string;
  passwordCheck: string;
  phone: string;
};

export type LoginDto = {
  email: string;
  password: string;
};
