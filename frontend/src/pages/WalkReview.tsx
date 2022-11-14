import React, {useState} from 'react';
import WalkReviewTemplate from '~/templates/WalkReviewTemplate';

const WalkReview = () => {
  const [star, setStar] = useState<number>(5);
  // const [article, setArticle] = useState<any>();
  const article = {
    photoUrl: '/images/community/abacce5c-6364-4484-8fcc-0fad01ff1c70.jpg',
    subject: '동행 구합니다.',
    pay: 2000,
  };

  const chatInfo = {
    me: '내이름',
    opponent: '상대방 이름',
  };
  return (
    <WalkReviewTemplate
      star={star}
      setStar={setStar}
      article={article}
      chatInfo={chatInfo}
    />
  );
};

export default WalkReview;
