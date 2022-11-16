import React from 'react';
import {
  View,
  StyleSheet,
  Text,
  Dimensions,
  Pressable,
  Alert,
} from 'react-native';
import Heart from '@assets/heart.svg';
import RedHeart from '@assets/redHeart.svg';
import MyButton from '@atoms/MyButton';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {useNavigation} from '@react-navigation/native';
import {ChatsParamList} from '~/pages/Chats';
import {useRoomSocket} from '~/hooks/useSocket';
import {useSelector} from 'react-redux';
import {RootState} from '~/store/reducer';

const windowWidth = Dimensions.get('window').width;

interface footerProps {
  categoryType: string;
  pay?: number;
  isWriter: Boolean;
  isLiked: Boolean;
  putLike: () => void;
}

type chatsScreenProp = NativeStackNavigationProp<ChatsParamList, 'Chats'>;

function DetailFooter({
  categoryType,
  pay,
  isWriter,
  isLiked,
  putLike,
}: footerProps) {
  const navigation = useNavigation<chatsScreenProp>();
  const [roomSocket, roomDisconnect] = useRoomSocket();
  const userIdx = useSelector((state: RootState) => state.user.userIdx);
  const postIdx = useSelector((state: RootState) => state.post.postIdx);
  const opponentIdx = useSelector((state: RootState) => state.post.writerIdx);

  const startChat = () => {
    const data = {ownerIdx: userIdx, postIdx, opponentIdx};
    if (roomSocket && userIdx) {
      roomSocket.emit('newRoom', data);
      roomSocket.on('newRoomId', (roomId: string) =>
        navigation.navigate('ChatList', {
          screen: 'ChatsDetail',
          params: {roomId},
        }),
      );
    }
  };
  return (
    <View style={styles.container}>
      <Pressable onPress={() => putLike()}>
        <View style={styles.heartContainer}>
          {isLiked ? (
            <RedHeart height={25} width={25} fill="red" />
          ) : (
            <Heart height={25} width={25} fill="black" />
          )}
        </View>
      </Pressable>
      <View style={styles.infoContainer}>
        <Text style={styles.textBold}>
          {categoryType === 'WITH'
            ? '같이 산책🤎'
            : `${pay?.toLocaleString('ko-KR')}원`}
        </Text>
        <MyButton
          btnText={isWriter ? '채팅목록' : '채팅하기'}
          width={100}
          fontSize={14}
          onClick={
            isWriter
              ? () => () => Alert.alert('알림', '구현중입니다..')
              : () => startChat()
          }
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    width: windowWidth,
    height: 55,
    flexDirection: 'row',
    alignItems: 'center',
    position: 'absolute',
    bottom: 0,
    paddingHorizontal: 15,
    borderTopWidth: StyleSheet.hairlineWidth,
    borderColor: 'rgba(0, 0, 0, .5)',
  },
  heartContainer: {
    paddingHorizontal: 5,
  },
  infoContainer: {
    flex: 1,
    paddingHorizontal: 10,
    marginLeft: 5,
    borderLeftWidth: 1,
    borderColor: 'gray',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  textBold: {
    fontWeight: '800',
    color: 'black',
  },
});

export default DetailFooter;
