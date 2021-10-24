
export function reactPostToRNWebView(window, data) {
    setTimeout(function () {
        window.ReactNativeWebView ? window.ReactNativeWebView.postMessage(JSON.stringify(data)) : console.log("No webview available");
    }, 2000)
}

export function nativePostToReactWebsite(ref, data) {
    ref.postMessage(JSON.stringify(data));
}