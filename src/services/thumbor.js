var ThumborUrlBuilder = require('thumbor-url-builder');
import Config from '../common/Config';
import {Images} from '../common';

function thumborPath() {
  return new ThumborUrlBuilder('', Config.ImageServer.host);
}

export function GetThumborImageUrlWithPlaceHolder(
  imageName,
  width,
  height,
  placeHolder,
) {
  if (imageName !== undefined && imageName !== null && imageName !== '') {
    const thumborClient = thumborPath();
    return {
      uri: thumborClient
        .setImagePath(imageName)
        .fitIn(width, height)
        .smartCrop(true)
        .buildUrl(),
    };
  } else {
    if (placeHolder) {
      return placeHolder;
    } else {
      return Images.PlaceHolder;
    }
  }
}
