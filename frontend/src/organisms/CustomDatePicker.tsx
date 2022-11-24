import React, {Dispatch, SetStateAction} from 'react';
import DatePicker from 'react-native-date-picker';

interface Props {
  open: boolean;
  date: Date;
  setDate: Dispatch<SetStateAction<Date>>;
  setModalOpen: Dispatch<SetStateAction<boolean>>;
}

const CustomDatePicker = ({open, date, setDate, setModalOpen}: Props) => {
  return (
    <DatePicker
      modal
      open={open}
      date={date}
      minimumDate={new Date()}
      locale="ko"
      onConfirm={date => {
        setModalOpen(false);
        setDate(date);
      }}
      onCancel={() => {
        setModalOpen(false);
      }}
      cancelText="취소"
      confirmText="확인"
      title=" "
    />
  );
};

export default CustomDatePicker;
