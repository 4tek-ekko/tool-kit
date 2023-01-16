import { useAppTheme } from '@/Hooks'
import { Colors, Layout, XStyleSheet } from '@/Theme'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { Image, Modal, View } from 'react-native'
import AppText from './AppText'
import Padding from './Padding'

const NoInternetModal = () => {
  const { Images } = useAppTheme()
  const { t } = useTranslation()

  return (
    <Modal animationType="slide" transparent={true} visible={true}>
      <View style={[Layout.fullSize, styles.containerView]}>
        <View>
          <Image source={Images.icNoInternet} style={styles.imageView} />
          <Padding top={20} bottom={10}>
            <AppText color={Colors.white} align="center" fontSize={20}>
              {t('kckni').toUpperCase()}
            </AppText>
          </Padding>
          <AppText
            color={Colors.kE0E0E0}
            align="center"
            fontSize={16}
            lineHeight={25}
          >
            {t('vlktdt')}
          </AppText>
        </View>
      </View>
    </Modal>
  )
}
const styles = XStyleSheet.create({
  containerView: {
    justifyContent: 'center',
    backgroundColor: 'black',
  },
  imageView: {
    resizeMode: 'contain',
    height: 150,
    width: 150,
    alignSelf: 'center',
  },
})
export default NoInternetModal
