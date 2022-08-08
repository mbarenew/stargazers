import React from 'react';
import * as Svg from 'react-native-svg';
import {ImageProps} from './index';

export const Star: React.FC<ImageProps> = ({size, ...props}) => (
  <Svg.Svg height={size} width={size} viewBox="0 0 482.207 482.207" {...props}>
    <Svg.Polygon
      points="482.207,186.973 322.508,153.269 241.104,11.803 159.699,153.269 0,186.973 109.388,308.108 92.094,470.404
	241.104,403.803 390.113,470.404 372.818,308.108 "
    />
    <Svg.G />
    <Svg.G />
    <Svg.G />
    <Svg.G />
    <Svg.G />
    <Svg.G />
    <Svg.G />
    <Svg.G />
    <Svg.G />
    <Svg.G />
    <Svg.G />
    <Svg.G />
    <Svg.G />
    <Svg.G />
    <Svg.G />
  </Svg.Svg>
);
