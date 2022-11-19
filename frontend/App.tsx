import {Provider} from 'react-redux';
import store from './src/store';
import AppInner from './AppInner';
import PushNotification from 'react-native-push-notification';

PushNotification.createChannel({
  channelId: 'chats', // (required)
  channelName: '채팅 알림', // (required)
  channelDescription: '채팅을 알려주는 알림', // (optional) default: undefined.
  soundName: 'default', // (optional) See `soundName` parameter of `localNotification` function
  importance: 4, // (optional) default: 4. Int value of the Android notification importance
  vibrate: true,
});

PushNotification.createChannel({
  channelId: 'walkConfirm', // (required)
  channelName: '산책 확정 알림', // (required)
  channelDescription: '산책이 확정됐다는 알림', // (optional) default: undefined.
  soundName: 'default', // (optional) See `soundName` parameter of `localNotification` function
  importance: 1, // (optional) default: 4. Int value of the Android notification importance
  vibrate: true,
});

function App() {
  return (
    <Provider store={store}>
      <AppInner />
    </Provider>
  );
}

export default App;
