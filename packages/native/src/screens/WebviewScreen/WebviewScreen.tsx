import React from "react";
import { ActivityIndicator, Button, SafeAreaView, StyleSheet, View } from 'react-native';
import WebView from "react-native-webview";
import { nativePostToReactWebsite } from '@universalnamespace/common';

interface WebViewScreenProps {
    uri: string;
}

export default function WebviewScreen(props: WebViewScreenProps) {
    const { uri } = props;

    const webRef = React.useRef<WebView>(null);

    const postTestData = React.useCallback(() => {
        webRef.current && nativePostToReactWebsite(webRef.current, { type: 'hello', payload: { thing: 'ok', time: new Date() } });
    }, [webRef.current]);

    return (
        <>
            <WebView
                ref={webRef}
                style={styles.container}
                originWhitelist={['*']}
                source={{ uri: uri }}
                renderLoading={() => <ActivityIndicator color='#009b88' size='large' />}
                startInLoadingState={true}
                onMessage={(event) => {
                    const { data } = event.nativeEvent;
                    console.log('String message from the WebView', data);
                }}
            />
            <Button onPress={postTestData} title="Send test data" />
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