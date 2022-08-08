import LottieView, {AnimatedLottieViewProps} from 'lottie-react-native';
import React from 'react';
import styled from 'styled-components/native';

const Wrapper = styled.View({
  flex: 1,
  justifyContent: 'center',
  alignItems: 'center',
});

export const AnimatedIllustration: React.FC<
  AnimatedLottieViewProps & {size: number}
> = ({size, ...props}) => {
  const animator = React.createRef<LottieView>();

  return (
    <Wrapper>
      <LottieView
        style={{width: size, height: size}}
        autoPlay
        ref={animator}
        source={props.source}
        enableMergePathsAndroidForKitKatAndAbove
      />
    </Wrapper>
  );
};
