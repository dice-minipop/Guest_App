declare module '*.svg' {
  import React from 'react';
  import { SvgProps } from 'react-native-svg';
  const content: (props: SvgProps) => React.ReactElement;
  export default content;
}
