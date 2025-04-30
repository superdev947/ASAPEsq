import React, { useEffect, useState } from "react"
import { Provider } from 'react-redux'
import { LogBox } from "react-native"
import { StyleProvider, Root } from "native-base"
import AppLoading from 'expo-app-loading'
import getTheme from "./src/theme/components"
import variables from "./src/theme/variables/commonColor"
import Navigate from "./src/navigation"
import { store } from './src/redux/Store'

export default () => {
  LogBox.ignoreLogs([`Can't perform a`])
  const [isReady, setIsReady] = useState(true)
  useEffect(() => {
    setIsReady(false)
  }, [])

  if (isReady)
    return <AppLoading />

  return (
    <StyleProvider style={getTheme(variables)}>
      <Provider store={store}>
        <Root>
          <Navigate />
        </Root>
      </Provider>
    </StyleProvider>
  )
}