class DataManager {

    constructor(url) {
        this.chromeStorage = new ChromeStorage()
        this.wtgToolBarContent = new WtgToolBarContent()
        this.url = url + 'domain'
        this.domain = window.location.href.split(/\/+/)[1]
    }

    authToolbar() {
        let token = $('#wtg_ext_auth_token').val()
        if (undefined !== token) {
            console.log(token)
            this.chromeStorage.setChromeStorage({session: token, status: 'autorisated'})
        }
    }

    getData(url, data, onSuccess, type = "GET") {
        $.ajax({
            type:type,
            url: url,
            data: data,
            success: onSuccess
        });
    }

    dataSender() {
        this.chromeStorage.getChromeStorage('session', result => {
            if (null !== result.session) {
                this.getData(
                    this.url,
                    {
                        domain: this.domain,
                        token: result.session
                    },
                    (data) => {
                        this.wtgToolBarContent.SetContentToolbar(data)
                    }
                )
            }
        })

    }





}
