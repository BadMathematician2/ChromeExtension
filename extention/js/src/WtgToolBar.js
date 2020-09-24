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
                $('body').append(response);
                this.fixImagesUrl();
            } else {
                console.log(`status ${xhr.statusText}`);
            }
        });
    }

    renderToolbar() {
        this.renderStyles(this.fontUrl, this.styles);
        this.renderScripts(this.scripts);
        this.renderIndex(this.urlToolbar);
        $('body').css({paddingTop:36})
    }

    renderLogOut() {
        this.renderStyles(this.fontUrl, this.styles);
        this.renderIndex(this.urlLogOut);
    }

    show() {
        this.chromeStorage.getChromeStorage('status', result => {
            if("autorisated" === result.status){
                this.renderToolbar();
                this.preloaderOn();
            } else {
                this.renderLogOut();
            }
        })
    }

    preloaderOn() {
        $(document).load(`${this.urlToolbar}`, (status, xhr) => {
            if(status !== 'error') {
                $('.js-wtg-toolbar__option-block').addClass('preloader');
            } else {
                console.log(`status ${xhr.statusText}`);
            }
        });
    }

    preloaderOff() {
        $(document).load(`${this.urlToolbar}`, (status, xhr) => {
            if(status !== 'error') {
                $('.js-wtg-toolbar__option-block').removeClass('preloader');
            } else {
                console.log(`status ${xhr.statusText}`);
            }
        });
    }

    fixImagesUrl() {

        let images = [...$('.js-wtg-toolbar__images')];

        images.forEach( el => {
            let oldSrc = $(el).attr('src');

            $(el).attr('src',`${this.urlExtension}/frontend/${oldSrc}`);
        })

    }
}
