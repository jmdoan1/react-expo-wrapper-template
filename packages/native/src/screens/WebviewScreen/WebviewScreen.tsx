import React from "react";
import { ActivityIndicator, Button, SafeAreaView, StyleSheet, View } from 'react-native';
import WebView from "react-native-webview";
import { testCommonValue, webViewURL } from '@universalnamespace/common';

export default function WebviewScreen() {

    const webRef = React.useRef<WebView>(null);

    const doThing = React.useCallback(() => {
        webRef.current?.postMessage(JSON.stringify({ type: 'hello', payload: { thing: 'ok', time: new Date() } }));
    }, [webRef.current]);


    return (
        <>
            <WebView
                ref={webRef}
                style={styles.container}
                originWhitelist={['*']}
                source={{ uri: webViewURL }}
                renderLoading={() => <ActivityIndicator color='#009b88' size='large' />}
                startInLoadingState={true}
                onMessage={(event) => {
                    const { data } = event.nativeEvent;
                    console.log('String message from the WebView', data);
                }}
            />
            <Button onPress={doThing} title={testCommonValue} />
        </>
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