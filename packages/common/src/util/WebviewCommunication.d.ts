//Window & typeof globalThis
import WebView from "react-native-webview";

declare function reactPostToRNWebView(window: Window & typeof globalThis, data: any): void;
declare function nativePostToReactWebsite(webViewRef: WebView<{}>, data: any): void;

export { reactPostToRNWebView, nativePostToReactWebsite };