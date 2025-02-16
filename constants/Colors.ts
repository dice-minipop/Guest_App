/**
 * Below are the colors that are used in the app. The colors are defined in the light and dark mode.
 * There are many other ways to style your app. For example, [Nativewind](https://www.nativewind.dev/), [Tamagui](https://tamagui.dev/), [unistyles](https://reactnativeunistyles.vercel.app), etc.
 */

export const colors = {
  white: '#FFFFFF',
  // Primary Color
  DEFAULT: '#000000',

  // Gray Scale
  dark_gray: '#333333',
  deep_gray: '#666666',
  medium_gray: '#999999',
  semiLight_gray: '#AAAAAA',
  light_gray: '#cccccc',

  // System Color
  purple: '#5B4FF4',
  green: '#4FF48E',
  yellow: '#FFD90C',
  red: '#FF357F',

  // Background Color
  back_gray: '#F4F4F4',

  // Stroke Color
  stroke: '#EEEEEE',
} as const;

type ColorType = typeof colors;
type ColorKeyType = keyof ColorType;
export type ColorValueType = ColorType[ColorKeyType];
