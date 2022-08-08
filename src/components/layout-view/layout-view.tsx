import {ComponentType} from 'react';
import {ViewStyle} from 'react-native';
import {StyledComponent} from 'styled-components';
import styled, {css} from 'styled-components/native';

import {ITheme} from '../../theme/styled-type';

function layoutStyle(props: ViewStyle): any {
  return {
    alignSelf: props.alignSelf,
    flex: props.flex,
    flexGrow: props.flexGrow,
    flexShrink: props.flexShrink,
    height: props.height,
    margin: props.margin,
    marginBottom: props.marginBottom,
    marginHorizontal: props.marginHorizontal,
    marginLeft: props.marginLeft,
    marginRight: props.marginRight,
    marginTop: props.marginTop,
    marginVertical: props.marginVertical,
    maxHeight: props.maxHeight,
    maxWidth: props.maxWidth,
    mineight: props.minHeight,
    minWidth: props.minWidth,
    padding: props.padding,
    paddingBottom: props.paddingBottom,
    paddingHorizontal: props.paddingHorizontal,
    paddingLeft: props.paddingLeft,
    paddingRight: props.paddingRight,
    paddingTop: props.paddingTop,
    paddingVertical: props.paddingVertical,
    width: props.width,
  };
}

export type LayoutComponent<
  T,
  P extends ComponentType<T> = ComponentType<T>,
> = StyledComponent<P, ITheme, T & ViewStyle, never>;

export function withLayout<T, P extends ComponentType<T>>(
  Target: P,
): LayoutComponent<T, P> {
  return styled(Target)<T & ViewStyle>`
    ${layoutStyle}
  `;
}

export const layoutCss = css`
  ${layoutStyle}
`;
