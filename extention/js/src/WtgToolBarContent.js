class WtgToolBarContent{

    constructor() {
        this.wtgToolBar = new WtgToolBar()
        this.authManager = new AuthManager()
        this.chromeStorage = new ChromeStorage()
    }


    SetContentToolbar(data) {
        this.js_status(data.status, '#js_status_1, #js_status_2');
        this.js_type(data.type, '#js_type');
        this.js_link_type(data.link_type, '#js_link_type');
        this.js_referring_domains(data.referring_domains, '#js_referring_domains');
        this.js_organic_search_traffic(data.organic_search_traffic, '#js_organic_search_traffic');
        this.js_server_status(data.url_status, '#js_server_status');
        this.js_avatar(data.manager.avatar, '#js_avatar_1, #js_avatar_2');
        this.wtgToolBar.preloaderOff()
        this.button_logout()
    }

    js_status(status, element) {
        switch (status) {
            case 'URL_IS_NOT_IN_DB' :
                $(element).addClass( "bg-green" )
                break;
            case 'URL_IS_IN_DB' :
                $(element).addClass( "bg-red" )
                break;
            case 'URL_IS_IN_DB_BUT_SITE_IS_UNDER_MODERATION' :
                $(element).addClass( "bg-yellow" )
                break;
        }
    }

    js_type(type, element) {
        $(element).text(type);
    }

    js_link_type(link_type, element) {
        $(element).text(link_type);
    }

    js_referring_domains(referring_domains, element) {
        $(element).text(referring_domains);
    }

    js_organic_search_traffic(organic_search_traffic, element) {
        $(element).text(organic_search_traffic);
    }

    js_server_status(server_status, element) {
        switch (server_status) {
            case '200' :
                $(element).addClass( "ok" ).text(server_status);
                break;
            case '404' :
                $(element).addClass( "error" ).text(server_status);
                break;
        }

    }

    js_avatar(avatar, element) {
        $(element).attr("src", "chrome-extension://"+chrome.runtime.id+"/frontend/img/"+avatar);
    }

    button_logout() {
        $('#logout').on('click',() => {
            this.authManager.logOut()
        })
    }


}
