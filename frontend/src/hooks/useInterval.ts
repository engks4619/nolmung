// import {useEffect, useRef} from 'react';

// function useInterval(callback: () => void, delay: number | null) {
//   const savedCallback = useRef(); //클로저 역할을 해주는 useRef. 렌더를 해도 초기화 되지 않는다.

//   // callback(setCount)가 변경될 때를 useEffect가 감지해서 최신상태를 저장한다.
//   useEffect(() => {
//     savedCallback.current = callback;
//   }, [callback]);

//   // 인터벌과 클리어 세팅
//   useEffect(() => {
//     function tick() {
//       savedCallback.current();
//     }
//     if (delay !== null) {
//       // let id = setInterval(tick, delay);
//       cosnt id = setInterval(()=>savedCallback.current(),delay)
//       return () => clearInterval(id); //바로바로 클리어를 해주기 때문에 메모리를 차지하지 않는다.
//     }
//   }, [delay]);
// }
// export default useInterval;

import {useEffect, useRef} from 'react';

interface UseIntervalType {
  (callback: () => void, interval: number): void;
}

const useInterval: UseIntervalType = (callback, interval) => {
  const savedCallback = useRef<(() => void) | null>(null);
  // After every render, save the latest callback into our ref.
  useEffect(() => {
    savedCallback.current = callback;
  });

  useEffect(() => {
    function tick() {
      if (savedCallback.current) {
        savedCallback.current();
      }
    }

    let id = setInterval(tick, interval);
    return () => clearInterval(id);
  }, [interval]);
};

export default useInterval;
