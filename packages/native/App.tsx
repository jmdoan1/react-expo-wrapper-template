import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet } from 'react-native';
import WebviewScreen from './src/screens/WebviewScreen/WebviewScreen';
import Constants from "expo-constants";

export default function App() {
  const { manifest } = Constants;
  const uri = `http://${manifest?.debuggerHost?.split(':').shift()}:3000`;
  return (
    // <View style={styles.container}>
    <WebviewScreen uri={uri} />
    // </View>
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
