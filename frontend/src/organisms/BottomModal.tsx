import React from 'react';
import {Modal} from 'react-native';

interface Props {
  visible: boolean;
  onRequestClose: () => void;
  renderItem: JSX.Element;
}

const BottomModal = ({visible, onRequestClose, renderItem}: Props) => {
  return (
    <Modal
      visible={visible}
      animationType={'slide'}
      transparent={true}
      onRequestClose={() => onRequestClose()}>
      {renderItem}
    </Modal>
  );
};

export default BottomModal;
