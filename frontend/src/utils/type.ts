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
  dogIdx: number;
  dogName: string;
  image: string;
  breedCodeValue: string;
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

export type spot = {
  spotId: string;
  name: string;
  imgCnt: number;
  address: string;
  tel: string;
  tag: string;
  descList: string[];
  time: {};
  menu: {};
  lat: number;
  lng: number;
  distance: number;
  star: number;
  reviewCnt: number;
};

export type review = {
  reviewIdx: number;
  spotId: string;
  star: number;
  content: string;
  deleted: boolean;
  userIdx: number;
  createdDate: Date;
  moidfyDate: Date;
  nickname: string;
  profileImage: string;
  photoList: string[];
};

export type dogRequestBody = {
  dogName: string;
  neuter: boolean | null;
  vaccination: boolean | null;
  gender: string | null;
  description: String;
  breedCode: number | null;
};
