
$.ajaxSetup({
    headers: {
        'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
    }
});


const toolBar = new WtgToolBar(),
    eventManager = new EventManager('https://test.local/api/'),
    dataManager = new DataManager('https://test.local/api/'),
    chromeStorage = new ChromeStorage()

eventManager.registerListeners()
dataManager.authToolbar()
toolBar.show()
dataManager.dataSender()
