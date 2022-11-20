import axios from 'utils/axios';
import ImageResizer from 'react-native-image-resizer';
import {photo} from './type';

export const uploadImg = async (
  img: any,
  url: string,
  idxName?: string,
  idx?: number | string,
  successFunc?: () => void,
  failFunc?: () => void,
) => {
  const formData = new FormData();
  if (idxName && idx) {
    formData.append(idxName, idx);
  }
  ImageResizer.createResizedImage(
    img.path,
    1200,
    1200,
    img.mime.includes('jpeg') ? 'JPEG' : 'PNG',
    100,
    0,
  ).then(async resizedImg => {
    const data: photo = {
      uri: resizedImg.uri,
      name: resizedImg.name,
      type: img.mime,
    };
    formData.append('files', data);
    await axios
      .post(url, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
      .then(res => {
        if (res.status === 200) {
          successFunc ? successFunc() : () => {};
        }
      })
      .catch(err => {
        failFunc ? failFunc() : () => {};
      });
  });
};
