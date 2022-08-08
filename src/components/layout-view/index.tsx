import {ComponentType} from 'react';
import {View, ViewProps} from 'react-native';
import {withLayout} from './layout-view';

export const LayoutView = withLayout<ViewProps, ComponentType<ViewProps>>(View);
