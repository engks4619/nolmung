import React, {
  useMemo,
  useState,
  useCallback,
  Dispatch,
  SetStateAction,
} from 'react';
import {View, StyleSheet, PanResponder, Text} from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  useDerivedValue,
  interpolate,
  Extrapolate,
  withTiming,
} from 'react-native-reanimated';
import Stars from '@assets/stars.svg';

interface Props {
  star: number;
  setStar: Dispatch<SetStateAction<number>>;
}

function StarRating({star, setStar}: Props) {
  const [rootViewPosX, setRootViewPosX] = useState(0);
  // const [starRating, setStarRating] = useState(0); // 별점을 저장하는 state
  const [starRatingImageWidth, setStarRatingImageWidth] = useState(0);
  const step = useMemo(
    () => starRatingImageWidth * 0.1,
    [starRatingImageWidth],
  );
  const panX = useSharedValue(0); // 사용자의 드래그 위치를 저장하는 변수

  const starRatingWidth = useDerivedValue(() => {
    // 실제 별점의 너비를 표현하는 변수로 animated.View의 width style에 사용되는 값 입니다.
    return interpolate(
      panX.value,
      [0, starRatingImageWidth],
      [0, starRatingImageWidth],
      Extrapolate.CLAMP,
    );
  }, [starRatingImageWidth]);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      width: starRatingWidth.value,
    };
  }, []);

  const panResponders = useMemo(
    () =>
      PanResponder.create({
        onStartShouldSetPanResponder: () => true,
        onMoveShouldSetPanResponder: () => false,
        onPanResponderTerminationRequest: () => false,
        onPanResponderGrant: (event, gestureState) => {
          // props.setScrollEnabled(false); // scrollView와 함께 사용할 때 scrollEnabled를 false로 지정하는 게 좋습니다.
          // props.setPointerEvent("none"); // 다른 component에 의해 responder가 전환된다면 grant 발생 시 다른 컴포넌트의 pointerEvent에 none을 지정하는 게 좋습니다.
          panX.value = gestureState.x0 + gestureState.dx - rootViewPosX; // 사용자의 초기 터치 위치 + 이동 위치 - rootView의 x 위치
        },
        onPanResponderMove: (event, gestureState) => {
          panX.value = gestureState.x0 + gestureState.dx - rootViewPosX;
        },
        onPanResponderRelease: (event, gestureState) => {
          const ciledValue = Math.ceil(starRatingWidth.value / step);

          panX.value = withTiming(ciledValue * step, {duration: 100}); // 별점에 맞게 Animated.View의 width를 조절합니다.
          setStar(ciledValue / 2); // 별점을 저장합니다.

          // props.setScrollEnabled(true); // onPanResponderGrant와 반대로 설정합니다.
          // props.setPointerEvent("auto");
        },
        onPanResponderTerminate: (event, gestureState) => {
          const ciledValue = Math.ceil(starRatingWidth.value / step);

          panX.value = withTiming(ciledValue * step, {duration: 100});
          setStar(ciledValue / 2);

          // props.setScrollEnabled(true); // onPanResponderGrant와 반대로 설정합니다.
          // props.setPointerEvent("auto");
        },
        onShouldBlockNativeResponder: (evt, gestureState) => {
          return false;
        },
      }),
    [rootViewPosX, starRatingImageWidth],
  );

  const rootContainerOnLayout = useCallback((e: any) => {
    // root Component onLayout으로 root View의 position x를 계산합니다.
    const {x} = e.nativeEvent.layout;

    setRootViewPosX(x);
  }, []);

  const starRatingImageOnLayout = useCallback((e: any) => {
    // star Rating Image onLayout으로 별 이미지의 width를 계산합니다.
    const {width} = e.nativeEvent.layout;

    setStarRatingImageWidth(width);
  }, []);

  return (
    <View style={styles.rootContainer} onLayout={rootContainerOnLayout}>
      <Text style={styles.starRatingText}>{`현재 별점 ${star}`}</Text>
      <View style={styles.starRatingContainer}>
        <Animated.View
          style={[styles.starBackground, animatedStyle]}
          pointerEvents="none"
        />
        <View onLayout={starRatingImageOnLayout} {...panResponders.panHandlers}>
          <Stars fill={'black'} />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  rootContainer: {
    alignItems: 'center',
  },
  starRatingText: {
    fontFamily: 'AppleSDGothicNeo-Regular',
    fontSize: 12,
  },
  starRatingContainer: {
    flexDirection: 'row',
  },
  starBackground: {
    position: 'absolute',
    backgroundColor: '#ffd800',
    height: '100%',
    minWidth: 0,
    maxWidth: 202,
  },
});

export default StarRating;
