import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';
import WebviewScreen from './src/screens/WebviewScreen/WebviewScreen';
import Constants from "expo-constants";

export default function App() {
  const { manifest } = Constants;
  const webViewUri = `http://${manifest?.debuggerHost?.split(':').shift()}:3000`;

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <WebviewScreen uri={webViewUri} />
      <StatusBar />
    </SafeAreaView>
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
