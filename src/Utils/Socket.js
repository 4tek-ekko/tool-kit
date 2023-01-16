import { Config } from '@/Config'
import io from 'socket.io-client'
import { userStore } from '@/Stores'

export let socketConnection = null

export const connectSocket = () => {
  socketConnection = io(Config.SOCKET_URL, {
    transports: ['websocket'],
    reconnection: true,
    reconnectionAttempts: Infinity,
    jsonp: false,
  })
}

/**
 * subscribeSocketEvent
 * register callback for socket connection
 * @param onLogout call when socket logout
 * @param onDisconnect call when socket disconnected
 * @param onError call when socket has error
 * @param onConnectError call when connect to socket failed
 * @returns {boolean}
 */
export const subscribeSocketEvent = ({
  onLogout,
  onDisconnect,
  onError,
  onConnectError,
}) => {
  if (!socketConnection) {
    return false
  }
  socketConnection.on('connect', () => {
    socketConnection.emit('subscribeJackpot')
    socketConnection.emit('subscribeInformation')
    if (userStore.userInfo?.id) {
      emitSubscription()
    } else {
      socketConnection.emit('authenticate', { token: undefined })
    }
  })
  socketConnection.on('error', payload => onError && onError(payload))
  socketConnection.on(
    'connect_error',
    payload => onConnectError && onConnectError(payload),
  )

  socketConnection.on('message', payload => {
    if (
      userStore.userInfo?.id &&
      (!payload ||
        !payload.data ||
        parseInt(payload.data.code, 10) === 401 ||
        payload.data.code === 'rest_forbidden' ||
        payload.error)
    ) {
      emitUnsubscription()
      onLogout && onLogout()
      // Show dialog section expired
    }
  })

  socketConnection.on('disconnect', payload => {
    onDisconnect && onDisconnect(payload)
  })
}

/**
 * unSubscribeSocketEvent
 * unregister socket's callback
 */
export const unSubscribeSocketEvent = () => {
  if (!socketConnection) {
    return
  }
  emitUnsubscription()
  socketConnection.removeAllListeners()
  socketConnection = null
}

export const emitSubscription = () => {
  if (!socketConnection) {
    return
  }
  const ur = userStore.userInfo
  socketConnection.emit('authenticate', { token: ur?.token })
  const usInfo = { userId: ur.id, token: ur.token }
  socketConnection.emit('subscribeWallet', usInfo)
  socketConnection.emit('subscribeUserPlan', usInfo)
}

export const emitUnsubscription = () => {
  if (!socketConnection) {
    return
  }
  socketConnection.emit('authenticate', { token: undefined })
  socketConnection.emit('unSubscribeWallet')
  socketConnection.emit('unSubscribeUserPlan')
}

export const subscribeToPlan = listener => {
  if (!socketConnection) {
    return
  }
  socketConnection.on('plan', payload => listener && listener(payload))
}

export const subscribeToMaintenance = listener => {
  if (!socketConnection) {
    return
  }
  socketConnection.on('maintenance', payload => listener && listener(payload))
}
