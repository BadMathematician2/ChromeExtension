
$.ajaxSetup({
    headers: {
        'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
    }
});


const toolBar = new WtgToolBar(),
    eventManager = new EventManager(),
    dataManager = new DataManager(),
    chromeStorage = new ChromeStorage()

eventManager.registerListeners()
dataManager.authToolbar()
toolBar.show()
dataManager.dataSender()
