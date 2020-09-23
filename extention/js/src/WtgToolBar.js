class WtgToolBar {
    constructor() {
        this.chromeStorage = new ChromeStorage()
        this.urlExtension = 'chrome-extension://' + chrome.runtime.id;
        this.urlToolbar = `${this.urlExtension}/frontend/toolbar.html`;
        this.urlLogOut = `${this.urlExtension}/frontend/logout.html`;
        this.styles = `${this.urlExtension}/frontend/css/styles.min.css`;
        this.fontUrl = `https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;600;700&display=swap`;
        this.scripts = `${this.urlExtension}/frontend/js/script.min.js`;

    }

    renderStyles(font, styles) {
        $('head').append(`<link rel="stylesheet" type="text/css" href="${font}">`,
            `<link rel="stylesheet" type="text/css" href="${styles}">`);
    }

    renderScripts(scripts) {
        $('body').append(`<script src="${scripts}">`);
    }

    renderIndex(url) {
        $(document).load(`${url}`, (response, status, xhr) => {
            if(status !== 'error') {
                $('body').append(response).css({paddingTop:40});
            } else {
                console.log(`status ${xhr.statusText}`);
            }
        });
    }

    renderToolbar() {
        this.renderStyles(this.fontUrl, this.styles);
        this.renderScripts(this.scripts);
        this.renderIndex(this.urlToolbar);
    }

    renderLogOut() {
        this.renderStyles(this.fontUrl, this.styles);
        this.renderIndex(this.urlLogOut);
    }

    show() {
        this.chromeStorage.getChromeStorage('status', result => {
            if("autorisated" === result.status){
                this.renderToolbar();
            }
            else {
                this.renderLogOut();
            }
        })
    }
    //
    // render_index() {
    //
    //     var extensionOrigin = 'chrome-extension://' + chrome.runtime.id;
    //
    //     const getToolbarIndex = (extensionUrl, webDoc) => {
    //         $.ajax({
    //             type:"GET",
    //             url: `${extensionUrl}/frontend/index.html`,
    //             success: (res) => {
    //                 let parser = new DOMParser(),
    //                     doc = parser.parseFromString(res, "text/html"),
    //                     toolbar = doc.querySelector('.js-wtg-toolbar'),
    //                     toolbarModal = doc.querySelector('.js-wtg-toolbar-modal'),
    //                     styles = document.createElement('link'),
    //                     allImg = doc.querySelectorAll('img'),
    //                     scripts = document.createElement('script');
    //
    //                 //Set styles and scripts
    //                 styles.setAttribute('rel', 'stylesheet');
    //                 styles.setAttribute('type', 'text/css');
    //                 styles.setAttribute('href', `${extensionUrl}/frontend/css/styles.min.css`);
    //                 scripts.setAttribute('src', `${extensionUrl}/frontend/js/script.min.js`);
    //
    //                 //Set image url
    //                 allImg.forEach( el => {
    //                     let src = el.getAttribute('src');
    //
    //                     switch (src.slice(0, 3)) {
    //                         case 'img':
    //                             src.replace('img',`${extensionUrl}/frontend/img`);
    //                             el.setAttribute('src', `${extensionUrl}/frontend/${src}`);
    //                         case 'svg':
    //                             src.replace('img',`${extensionUrl}/frontend/svg`);
    //                             el.setAttribute('src', `${extensionUrl}/frontend/${src}`);
    //                     }
    //
    //                 });
    //
    //                 //insert styles
    //                 webDoc.head.appendChild(styles);
    //                 webDoc.body.appendChild(toolbar);
    //                 webDoc.body.appendChild(toolbarModal);
    //                 webDoc.body.appendChild(scripts);
    //
    //             }
    //         });
    //     }
    //
    //     getToolbarIndex(extensionOrigin, document);
    //
    // }
    //
    // render_logout() {
    //
    //     var extensionOrigin = 'chrome-extension://' + chrome.runtime.id;
    //
    //     const getToolbarIndex = (extensionUrl, webDoc) => {
    //         $.ajax({
    //             type:"GET",
    //             url: `${extensionUrl}/frontend/logout.html`,
    //             success: (res) => {
    //                 let parser = new DOMParser(),
    //                     doc = parser.parseFromString(res, "text/html"),
    //                     toolbar = doc.querySelector('.js-wtg-toolbar'),
    //                     styles = document.createElement('link'),
    //                     allImg = doc.querySelectorAll('img'),
    //                     scripts = document.createElement('script');
    //
    //                 //Set styles and scripts
    //                 styles.setAttribute('rel', 'stylesheet');
    //                 styles.setAttribute('type', 'text/css');
    //                 styles.setAttribute('href', `${extensionUrl}/frontend/css/styles.min.css`);
    //                 scripts.setAttribute('src', `${extensionUrl}/frontend/js/script.min.js`);
    //
    //                 //Set image url
    //                 allImg.forEach( el => {
    //                     let src = el.getAttribute('src');
    //
    //                     switch (src.slice(0, 3)) {
    //                         case 'img':
    //                             src.replace('img',`${extensionUrl}/frontend/img`);
    //                             el.setAttribute('src', `${extensionUrl}/frontend/${src}`);
    //                         case 'svg':
    //                             src.replace('img',`${extensionUrl}/frontend/svg`);
    //                             el.setAttribute('src', `${extensionUrl}/frontend/${src}`);
    //                     }
    //
    //                 });
    //
    //                 //insert styles
    //                 webDoc.head.appendChild(styles);
    //                 webDoc.body.appendChild(toolbar);
    //                 webDoc.body.appendChild(scripts);
    //
    //             }
    //         });
    //     }
    //
    //     getToolbarIndex(extensionOrigin, document);
    //
    // }

}
