import { StatusBar } from 'expo-status-bar';
import React, { useReducer } from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';
import WebviewScreen from './src/screens/WebviewScreen/WebviewScreen';
import Constants from "expo-constants";
import { CommonContext } from '@universalnamespace/common';

export default function App() {
  const [state, dispatch] = useReducer(CommonContext.mainReducer, CommonContext.defaultSessionContext);

  /**
   * Detects the current IP host and generates a uri to to the locally hosted react website.
   * 
   * ONLY WORKS WHEN RUNNING EXPO ON LAN
   */
  const { manifest } = Constants;
  const webViewUri = `http://${manifest?.debuggerHost?.split(':').shift()}:3000`;

  return (
    <CommonContext.MainContext.Provider value={{ state, dispatch }}>
      <SafeAreaView style={{ flex: 1 }}>
        <WebviewScreen uri={webViewUri} />
        <StatusBar />
      </SafeAreaView>
    </CommonContext.MainContext.Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    height: "100%",
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
