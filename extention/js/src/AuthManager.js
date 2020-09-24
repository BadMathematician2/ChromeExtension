
class AuthManager {

    sendMessage(type, text){
        chrome.runtime.sendMessage({
            type : type,
            text : text
        });
    }

    constructor(query = null, authUrl = "authenticate", regUrl = "logout", logOutUrl = "logout") {
        const url = "https://test.extention/api/"
        this.authUrl = url + authUrl
        this.regUrl = url + regUrl
        this.logOutUrl = url + logOutUrl
        this.chromeStorage = new ChromeStorage()
        this.toolbar = new WtgToolBar()
        this.query = query


/*        switch (this.query.type) {
            case 'auth' :
                this.auth()
                break;
            case 'reg' :
                this.reg()
                break;
            case 'logout' :
                this.logOut()
                break;
        }*/


    }

    auth() {
        this.formRequest(
            this.authUrl,
            {
                email: this.query.email,
                password: this.query.password
            },
            (response) =>  {
                if("error" !== response) {
                    console.log(response)
                    this.chromeStorage.setChromeStorage({
                        session: response,
                        status: 'autorisated',
                        email: this.query.email
                    })
                    this.sendMessage('success','Вас авторизовано!')
                    $('#wtg-toolbar-login').remove()
                    this.toolbar.renderToolbar()
                }
                if ("error" === response) {
                    this.sendMessage('error','Не правильний email або пароль!')
                }
            }
        )

    }

    reg() {
        this.formRequest(
            this.regUrl,
            {
                email: this.query.email,
                password: this.query.password
            },
            () => {
                console.log('success register')
            }
        )

    }

    logOut() {
        this.formRequest(
            this.logOutUrl,
            {},
            () => {
                this.chromeStorage.setChromeStorage({status: 'not autorisated', session: null})
                console.log('success logout')
                $('#wtg-toolbar-wrap').remove()
                this.toolbar.renderLogOut()
            },
                "GET"
        )
    }

    formRequest(url, data, onSuccess, type = "POST") {
        $.ajax({
            type:type,
            url: url,
            data: data,
            success: onSuccess
        });
    }

}


