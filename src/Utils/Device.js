import NetInfo from '@react-native-community/netinfo'
import axios from 'axios'
import { Platform } from 'react-native'
import DeviceInfo from 'react-native-device-info'

export const isAndroid = Platform.OS === 'android'

export const isIOS = Platform.OS === 'ios'

export const isTablet = DeviceInfo.isTablet()

export const checkInternetConnection = callback => {
  let unsubscribe = null
  let inv = null
  if (isAndroid) {
    unsubscribe = NetInfo.addEventListener(state => {
      callback && callback(state.isConnected)
    })
  } else {
    inv = setInterval(async () => {
      const connectedToNetwork = DeviceInfo.getIpAddressSync() !== '0.0.0.0'
      if (!connectedToNetwork) {
        callback && callback(false)
      } else {
        //Check reachability
        try {
          const response = await axios.head(
            'https://www.gstatic.com/generate_204',
          )
          callback && callback(response.status === 204)
        } catch (err) {
          callback && callback(false)
        }
      }
    }, 3000)
  }
  return () => {
    unsubscribe && unsubscribe()
    inv && clearInterval(inv)
  }
}
