import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';
import WebviewScreen from './src/screens/WebviewScreen/WebviewScreen';
import Constants from "expo-constants";
import { SessionProvider } from '@universalnamespace/common/src/util/Context';

export default function App() {
  const { manifest } = Constants;

  /**
   * Detects the current IP host and generates a uri to to the locally hosted react website.
   * 
   * Only works when running expo on LAN
   */
  const webViewUri = `http://${manifest?.debuggerHost?.split(':').shift()}:3000`;

  return (
    <SessionProvider>
      <SafeAreaView style={{ flex: 1 }}>
        <WebviewScreen uri={webViewUri} />
        <StatusBar />
      </SafeAreaView>
    </SessionProvider>
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
