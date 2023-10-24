import React, { useState } from 'react'
import { Image } from 'react-native'
import ProgressBar from 'react-native-progress'
// import PropTypes from 'prop-types'
import { Images, Styles } from '../../common'
import { GetThumborImageUrlWithPlaceHolder } from '../../services/thumbor'

const width = Styles.width
const ImageCache = ({ style, uri }) => {
  const [hasEmageError, setError] = useState(false)

  const onError = () => {
    setError(true)
  }
  return (
    <Image
      onError={onError}
      style={style}
      source={
        hasEmageError
          ? GetThumborImageUrlWithPlaceHolder(
              '',
              Math.round(width) + 10 * 3,
              110 * 3,
              Images.PlaceHolder
            )
          : uri
      }
      indicator={ProgressBar}
    />
  )
}

// ImageCache.propTypes = {
//   style: PropTypes.any,
//   uri: PropTypes.object
// }

export default ImageCache
