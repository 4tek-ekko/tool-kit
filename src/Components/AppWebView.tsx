import CookieManager, { Cookie } from '@react-native-cookies/cookies'
import React, { memo, useEffect, useState } from 'react'
import { StyleSheet, View } from 'react-native'
import WebView, { WebViewProps } from 'react-native-webview'
interface AppWebViewProps extends WebViewProps {
  enableCookies?: boolean
  cookieDomain?: string
  cookie: Cookie
}
const AppWebView = ({
  source,
  enableCookies,
  cookieDomain,
  cookie,
  style,
  ...webViewProps
}: AppWebViewProps) => {
  const [updatedCookie, setUpdatedCookie] = useState(!enableCookies)
  useEffect(() => {
    if (enableCookies) {
      const site = cookieDomain || source['uri']
      CookieManager.set(site, {
        name: `${site}_cookie`,
        ...cookie,
      }).then(() => setUpdatedCookie(true))
    }
  }, [enableCookies, cookieDomain, source, cookie])
  return updatedCookie ? (
    <WebView
      {...webViewProps}
      bounces={false}
      source={source}
      style={[styles.webView, style]}
      javaScriptEnabled
      domStorageEnabled
      sharedCookiesEnabled
      thirdPartyCookiesEnabled
      contentMode={'mobile'}
      automaticallyAdjustContentInsets={false}
      androidLayerType="hardware" //prevent android crash
    />
  ) : (
    <View style={style} />
  )
}

export default memo(AppWebView)

const styles = StyleSheet.create({
  webView: {},
})
