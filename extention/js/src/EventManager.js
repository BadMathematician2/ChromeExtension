class EventManager {
    constructor(url) {
        this.url = url
    }
    registerListeners() {

        this.registerOnMsgListener()

    }
    registerOnMsgListener() {
        chrome.runtime.onMessage.addListener(function (query) {
            new AuthManager(query, this.url);
            console.log(this.url)
        })
    }

}
