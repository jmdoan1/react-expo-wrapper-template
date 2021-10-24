import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { SafeAreaView, StyleSheet, Text, View } from 'react-native';
import WebviewScreen from './src/screens/WebviewScreen/WebviewScreen';

export default function App() {
  return (
    // <View style={styles.container}>
    <WebviewScreen />
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
