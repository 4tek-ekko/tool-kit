import { PortalProvider } from '@gorhom/portal'
import { useLocalObservable } from 'mobx-react-lite'
import React, { useEffect } from 'react'
import CodePush from 'react-native-code-push'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import Animated, { FadeIn } from 'react-native-reanimated'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import { AppDiaLog, NoInternetModal, Obx } from './Components'
import { Application } from './Navigators'
import { InAppUpdateScreen, Splash } from './Screens'
import { diaLogStore, rehydrateStore } from './Stores'
import { Layout } from './Theme'
import './Translations/i18n'
import { checkInternetConnection } from './Utils'

const App = () => {
  const state = useLocalObservable(() => ({
    isReady: false,
    setIsReady: payload => (state.isReady = payload),
    hasNoInternet: false,
    setHasNoInternet: payload => (state.hasNoInternet = payload),
    hasNewVersion: false,
    setHasNewVersion: payload => (state.hasNewVersion = payload),
  }))

  useEffect(() => {
    //rehydrate store data from mmkv storage
    rehydrateStore()
      .then(() => setTimeout(() => state.setIsReady(true), 1000))
      .catch(rehydrateStoreErr => {
        console.log({ rehydrateStoreErr })
      })
    //check for new codepush version
    CodePush.checkForUpdate().then(update => {
      state.setHasNewVersion(!!update)
    })
    //check internet connection
    const unSubscribeToInternet = checkInternetConnection(hasInternet =>
      state.setHasNoInternet(!hasInternet),
    )
    return () => {
      unSubscribeToInternet()
    }
  }, [])

  return (
    <GestureHandlerRootView style={Layout.fill}>
      <SafeAreaProvider>
        <PortalProvider>
          <Obx>
            {() =>
              state.isReady ? (
                <Animated.View style={Layout.fill} entering={FadeIn}>
                  <Application />
                </Animated.View>
              ) : (
                <Splash />
              )
            }
          </Obx>
          <Obx>{() => state.hasNoInternet && <NoInternetModal />}</Obx>
          <Obx>{() => state.hasNewVersion && <InAppUpdateScreen />}</Obx>
          <Obx>
            {() =>
              diaLogStore.show && (
                <AppDiaLog
                  title={diaLogStore.title}
                  message={diaLogStore.message}
                  onPress={() => {
                    diaLogStore.onPress()
                    diaLogStore.closeDiaLog()
                  }}
                  buttonCustom={diaLogStore.buttonCustom}
                  buttonProps={diaLogStore.buttonProps}
                  buttonText={diaLogStore.buttonText}
                  customMessage={diaLogStore.customMessage}
                  dialogIcon={diaLogStore.dialogIcon}
                  footer={diaLogStore.footer}
                  hideCloseButton={diaLogStore.hideCloseButton}
                  messageColor={diaLogStore.messageColor}
                  messageStyle={diaLogStore.messageStyle}
                  showTime={diaLogStore.showTime}
                  backdropForClosing={diaLogStore.backdropForClosing}
                  titleColor={diaLogStore.titleColor}
                  onClose={() => diaLogStore.closeDiaLog()}
                />
              )
            }
          </Obx>
        </PortalProvider>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  )
}

export default App
