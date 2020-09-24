class WtgToolBarContent{

    constructor() {
        this.wtgToolBar = new WtgToolBar()
        this.authManager = new AuthManager()
        this.chromeStorage = new ChromeStorage()
    }


    SetContentToolbar(data) {
        this.status(data.status, '#js_status_1, #js_status_2');
        this.type(data.type, '#js_type');
        this.link_type(data.link_type, '#js_link_type');
        this.referring_domains(data.referring_domains, '#js_referring_domains');
        this.organic_search_traffic(data.organic_search_traffic, '#js_organic_search_traffic');
        this.server_status(data.url_status, '#js_server_status');
        this.avatar(data.manager.avatar, '#js_avatar_1, #js_avatar_2');
        this.wtgToolBar.preloaderOff()
        this.button_logout()
    }

    status(status, element) {
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

    type(type, element) {
        $(element).text(type);
    }

    link_type(link_type, element) {
        $(element).text(link_type);
    }

    referring_domains(referring_domains, element) {
        $(element).text(referring_domains);
    }

    organic_search_traffic(organic_search_traffic, element) {
        $(element).text(organic_search_traffic);
    }

    server_status(server_status, element) {
        switch (server_status) {
            case '200' :
                $(element).addClass( "ok" ).text(server_status);
                break;
            case '404' :
                $(element).addClass( "error" ).text(server_status);
                break;
        }

    }

    avatar(avatar, element) {
        $(element).attr("src", "chrome-extension://" + chrome.runtime.id + "/frontend/img/" + avatar);
    }

    button_logout() {
        $('#logout').on('click',() => {
            this.authManager.logOut()
        })
    }


}
