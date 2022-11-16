export type Geoloc = {
  lat: number;
  lng: number;
};

export type userInfoType = {
  accessToken: string;
  userIdx: number;
  phone: string;
  nickname: string;
  profileImage: string;
};

export type photo = {
  uri: string;
  type: string;
  name: string;
};

export type dog = {
  breedCodeVlaue: string;
  dogName: string;
  image: string;
};

export type article = {
  categoryType: string;
  content: string;
  dogInfoList: dog[];
  getLike: boolean;
  leadLine: boolean;
  location: string;
  modifyDate: string;
  pay: number | null;
  photoUrl: string[];
  poopBag: boolean;
  postIdx: number;
  subject: string;
  userImgUrl: string;
  walkDate: string;
  writer: string;
  writerIdx: number;
};
