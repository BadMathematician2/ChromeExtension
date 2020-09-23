class DataManager {

    constructor() {
        this.chromeStorage = new ChromeStorage()
        this.wtgToolBarContent = new WtgToolBarContent()
    }

    authToolbar() {
        let token = $('#wtg_ext_auth_token').val()
        if (undefined !== token){
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
                    "https://test.extention/api/domain",
                    {
                        domain: window.location.href,
                        token: result.session,
                        manager: 'ChromeExtension\\Models\\Manager'
                    },
                    (data) => {
                        this.wtgToolBarContent.SetContentToolbar(data)
                    }
                )
            }
        })

    }





}
