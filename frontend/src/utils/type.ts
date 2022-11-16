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
  image:string;
  breedCodeValue: string;
}