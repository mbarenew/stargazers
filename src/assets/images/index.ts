import * as Svg from 'react-native-svg';
import {ArrowLeft} from './arrow-left';

import {Star} from './star';

export interface ImageProps extends Svg.SvgProps {
  size: number;
}

export const Images = {
  Star,
  ArrowLeft,
};
