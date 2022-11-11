import React, {useState} from 'react';
import RegistArticleTemplate from '~/templates/RegistArticleTemplate';

const RegistArticle = () => {
  const [category, setCategory] = useState<string>('');
  const [dog, setDog] = useState<string>('');
  const [rope, setRope] = useState<boolean>(true);
  const [poop, setPoop] = useState<boolean>(true);
  const [date, setDate] = useState<Date>(new Date());
  const [dateModalOpen, setDateModalOpen] = useState<boolean>(false);
  const [content, setContent] = useState<string>('');
  const [placeModalOpen, setPlaceModalOpen] = useState<boolean>(false);
  const [imageModalOpen, setImageModalOpen] = useState<boolean>(false);
  return (
    <RegistArticleTemplate
      category={category}
      setCategory={setCategory}
      dog={dog}
      setDog={setDog}
      rope={rope}
      setRope={setRope}
      poop={poop}
      setPoop={setPoop}
      date={date}
      setDate={setDate}
      dateModalOpen={dateModalOpen}
      setDateModalOpen={setDateModalOpen}
      content={content}
      setContent={setContent}
      placeModalOpen={placeModalOpen}
      setPlaceModalOpen={setPlaceModalOpen}
      imageModalOpen={imageModalOpen}
      setImageModalOpen={setImageModalOpen}
    />
  );
};

export default RegistArticle;
