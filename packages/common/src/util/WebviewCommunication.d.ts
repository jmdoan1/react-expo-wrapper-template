//Window & typeof globalThis
import WebView from "react-native-webview";

/**
 * Send messages from the React App to the Expo App's webview.
 * 
 * @param window the current window
 * @param data currently accepts any object
 */
declare function reactPostToRNWebView(window: Window & typeof globalThis, data: any): void;

/**
 * Send messages from the Expo Webview to the React App.
 * 
 * @param webViewRef the WebView ref's .current object
 * @param data currently accepts any object
 */
declare function nativePostToReactWebsite(webViewRef: WebView<{}>, data: any): void;

export { reactPostToRNWebView, nativePostToReactWebsite };