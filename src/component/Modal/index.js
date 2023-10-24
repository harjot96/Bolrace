import React from 'react'
import ReactModal from 'react-native-modal'
import { Dimensions, StyleSheet, Platform, View } from 'react-native'
import { Styles, Device } from '../../common'
const { width } = Dimensions.get('window')

const Modal = ({
  isModalVisible,
  slideIn,
  slideOut,
  closeModalLayout = () => {},
  swipeDirection,
  disableOnBackDropPress,
  hideClose,
  wrap,
  modalBoxWrap,
  children,
  ...rest
}) => {
  const closeModal = () => {
    closeModalLayout()
  }

  return (
    <ReactModal
      isVisible={isModalVisible}
      coverScreen
      onBackButtonPress={closeModal}
      onSwipeComplete={closeModal}
      onBackdropPress={closeModal}
      backdropOpacity={Platform.OS == 'android' ? 0.6 : 0.5}
      style={modalBoxWrap ? modalBoxWrap : [styles().modalBoxWrap]}
      swipeThreshold={0.8}
      animationInTiming={500}
      animationOutTiming={500}
      backdropTransitionInTiming={500}
      backdropTransitionOutTiming={500}
      deviceWidth={width}
      hideModalContentWhileAnimating
      {...rest}>
      <View style={wrap ? wrap : styles().wrap}>{children}</View>
    </ReactModal>
  )
}

const styles = color =>
  StyleSheet.create({
    modalBoxWrap: {
      position: 'absolute',
      borderTopRightRadius: 0,
      zIndex: 10,
      borderTopLeftRadius: 0,
      width: width,
      height:
        Platform.OS !== 'ios'
          ? Styles.height
          : Device.isIphoneX
          ? Styles.height - 17
          : Styles.height,
      backgroundColor: 'transparent'
    },
    wrap: {
      flex: 1,
      zIndex: 12,
      elevation: 20,
      backgroundColor: 'rgba(255,255,255, 255)',
      borderTopRightRadius: 0,
      borderTopLeftRadius: 10,
      borderBottomLeftRadius: 10
    },
    iconZoom: {
      position: 'absolute',
      justifyContent: 'center',
      alignItems: 'center',
      height: 25,
      top: 2,
      left: -30,
      width: 25,
      borderRadius: 12.5,
      backgroundColor: color,
      zIndex: 99,
      elevation: 20
    }
  })
export default Modal
