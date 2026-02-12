import { Dimensions, View } from 'react-native';

interface CoverViewComponentProps {
  height: number;
  top: number;
}

export default function CoverViewComponent({ height, top }: CoverViewComponentProps) {
  return (
    <View
      style={{
        backgroundColor: '#000000',
        position: 'absolute',
        height: height,
        top: top,
        left: 0,
        width: Dimensions.get('screen').width,
        zIndex: 0,
      }}
    />
  );
}
