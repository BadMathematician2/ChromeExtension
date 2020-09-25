
$.ajaxSetup({
    headers: {
        'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
    }
});


const toolBar = new WtgToolBar(),
    eventManager = new EventManager(),
    dataManager = new DataManager('https://test.extention/api/'),
    chromeStorage = new ChromeStorage(),
    authManager = new AuthManager('','https://test.extention/api/')

eventManager.registerListeners()
dataManager.authToolbar()
toolBar.show()
dataManager.dataSender()
