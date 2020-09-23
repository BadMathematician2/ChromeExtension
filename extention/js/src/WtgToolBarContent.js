class WtgToolBarContent{

    SetContentToolbar(data){
        this.js_set_img("/frontend/svg/logo.svg","#js_logo_img")
        this.js_set_img("/frontend/svg/login.svg","#js_login_img")
        this.js_status(data.status);
        this.js_type(data.type);
        this.js_link_type(data.link_type);
        this.js_referring_domains(data.referring_domains);
        this.js_organic_search_traffic(data.organic_search_traffic);
        this.js_server_status(data.url_status);
        this.js_avatar(data.manager.avatar);
    }

    js_set_img(img, id) {
        $(id).attr("src", "chrome-extension://"+chrome.runtime.id+img);
    }

    js_status(status) {
        switch (status) {
            case 'url is not in DB' :
                $('#js_status_1, #js_status_2').addClass( "bg-green" )
                break;
            case 'url is in DB' :
                $('#js_status_1, #js_status_2').addClass( "bg-red" )
                break;
            case 'url is in DB, but site is under moderation' :
                $('#js_status_1, #js_status_2').addClass( "bg-yellow" )
                break;
        }
    }

    js_type(type) {
        $('#js_type').text(type);
    }

    js_link_type(link_type) {
        $('#js_link_type').text(link_type);
    }

    js_referring_domains(referring_domains) {
        $('#js_referring_domains').text(referring_domains);
    }

    js_organic_search_traffic(organic_search_traffic) {
        $('#js_organic_search_traffic').text(organic_search_traffic);
    }

    js_server_status(server_status) {
        switch (server_status) {
            case '200' :
                console.log(server_status)
                $('#js_server_status').addClass( "ok" ).text(server_status);
                break;
            case '404' :
                $('#js_server_status').addClass( "error" ).text(server_status);
                break;
        }

    }

    js_avatar(avatar) {
        $("#js_avatar_1, #js_avatar_2").attr("src", "chrome-extension://"+chrome.runtime.id+"/frontend/img/"+avatar);
    }

}
