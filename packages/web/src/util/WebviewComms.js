
export function postToWebView(window, data) {
    setTimeout(function () {
        window.ReactNativeWebView.postMessage(JSON.stringify(data))
    }, 2000)
}