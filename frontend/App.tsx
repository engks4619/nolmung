import {Provider} from 'react-redux';
import store from './src/store';
import AppInner from './AppInner';
import PushNotification from 'react-native-push-notification';

PushNotification.createChannel(
  {
    channelId: 'chats', // (required)
    channelName: '앱 전반', // (required)
    channelDescription: '앱 실행하는 알림', // (optional) default: undefined.
    soundName: 'default', // (optional) See `soundName` parameter of `localNotification` function
    importance: 4, // (optional) default: 4. Int value of the Android notification importance
    vibrate: true, // (optional) default: true. Creates the default vibration patten if true.
  },
  (created: boolean) =>
    console.log(`createChannel chats returned '${created}'`), // (optional) callback returns whether the channel was created, false means it already existed.
);

function App() {
  return (
    <Provider store={store}>
      <AppInner />
    </Provider>
  );
}

export default App;
