import { Dimensions, View } from 'react-native';

interface CoverViewComponentProps {
  height: number;
  top: number;
}

const CoverViewComponent: React.FC<CoverViewComponentProps> = ({ height, top }) => {
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
};

export default CoverViewComponent;
