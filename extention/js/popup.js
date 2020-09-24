
$(document).ready(function(){

    const sendExtensionData = (type) => {
        chrome.tabs.query({currentWindow: true, active: true},
            function (tabs) {
                chrome.tabs.sendMessage(tabs[0].id, {
                    type: type,
                    email: $('#inputEmail').val(),
                    password: $('#inputPassword').val()
                }, function (response) {});
            }
        )
    }

    $('#auth').on('click',function () {
        sendExtensionData('auth')
    })

    $('#register').on('click',function () {
        sendExtensionData('reg')
    })

    $('#logout').on('click',function () {
        sendExtensionData('logout')
        $('form').show();
    })

    chrome.storage.sync.get(['status'], function(result) {
        if (result.status === 'autorisated') {
            $('form').hide();
            $('#info').append('<div>' + 'Вас авторизовано!' + '</div>');
        }
    })

    chrome.runtime.onMessage.addListener(function (result) {

        if (result.type === 'error') {
            $('#error').append('<div>' + result.text + '</div>');
        }

        if (result.type === 'success') {
            $('#error').hide();
            $('form').hide();
            $('#info').append('<div>' + result.text + '</div>');
        }

    })








})



