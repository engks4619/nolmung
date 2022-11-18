import React, {useState, useEffect, useRef} from 'react';
import {Text, StyleSheet} from 'react-native';

interface HookType {
  (callback: () => void, sec: number): void;
}
interface Props {
  sec: number;
}
const Timer = ({sec}: Props) => {
  const [second, setSecond] = useState(sec);
  const [delay, setDelay] = useState(1000);

  useInterval(() => {
    setSecond(second + 1);
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
