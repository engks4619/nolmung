// import React from 'react';
// import useInterval from '~/hooks/useInterval';
// import {View, Text} from 'react-native';
// // import

// interface Props {
//   count: number;
//   increaseCount: () => void;
// }

// function Timer({count, increaseCount}: Props) {
//   useInterval(() => increaseCount, 1000);
//   return (
//     <View>
//       <Text>산책시간</Text>
//       <Text>{count}</Text>
//     </View>
//   );
// }

// export default Timer;

// import React from 'react';
// import {useEffect, useRef, useState} from 'react';
// import {View, Text, StyleSheet} from 'react-native';

// interface IUseInterval {
//   (callback: () => void, interval: number): void;
// }

// const useInterval: IUseInterval = (callback, interval) => {
//   const savedCallback = useRef<(() => void) | null>(null);
//   // After every render, save the latest callback into our ref.
//   useEffect(() => {
//     savedCallback.current = callback;
//   });

//   useEffect(() => {
//     function tick() {
//       if (savedCallback.current) {
//         savedCallback.current();
//       }
//     }

//     let id = setInterval(tick, interval);
//     return () => clearInterval(id);
//   }, [interval]);
// };

// function Timer() {
//   const [count, setCount] = useState(0);
//   useInterval(() => setCount(count + 1), 1000);

//   return (
//     <View style={styles.timerContainer}>
//       <Text>타이머</Text>
//       <Text>{count}</Text>
//     </View>
//   );
// }
// const styles = StyleSheet.create({
//   timerContainer: {
//     height: 30,
//   },
// });
// export default Timer;
import React, {useState, useEffect, useRef} from 'react';
import {Text, StyleSheet} from 'react-native';

var _interval;
interface HookType {
  (callback: () => void, sec: number): void;
}
interface Props {}
const Timer = ({sec}: Props) => {
  const [second, setSecond] = useState(sec);
  const [delay, setDelay] = useState(1000);
  const [isRunning, setIsRunning] = useState(true);

  useInterval(() => {
    setSecond(second - 1);
  }, delay);

  //setIsRunning(false);

  return (
    <Text style={{...styles.text}}>
      {' '}
      {Math.floor(second / 60)} : {second % 60}{' '}
    </Text>
  );
};

function useInterval(callback, delay): HookType {
  const savedCallback = useRef();

  // Remember the latest callback.
  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  // Set up the interval.
  useEffect(() => {
    function tick() {
      savedCallback.current();
    }
    if (delay !== null) {
      let id = setInterval(tick, delay);
      return () => clearInterval(id);
    }
  }, [delay]);
}

const styles = StyleSheet.create({
  text: {
    fontSize: 13,

    color: 'red',
  },
});

export default Timer;
