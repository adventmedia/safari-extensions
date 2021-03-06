chrome.browserAction.onClicked.addListener(function (tab) {
    // Send a message to the active tab
    chrome.tabs.query({active: true, currentWindow: true}, function (tabs) {
        var activeTab = tabs[0];
        chrome.tabs.sendMessage(activeTab.id, {"message": "show_passwords"});
    });
    chrome.storage.local.get(['handlePswds'], (res) => {
        if (res.handlePswds.revealPswd) {
            chrome.browserAction.setIcon({path: 'images/password-hide-icon-16.png'})
            chrome.browserAction.setTitle({title: 'Reveal password'})
        } else {
            chrome.browserAction.setIcon({path: 'images/password-show-icon-16.png'})
            chrome.browserAction.setTitle({title: 'Hide password'})
        }
    })

});

chrome.storage.local.set({
    handlePswds: {
        revealPswd: false,
        pswdFields: []
    }
})

chrome.browserAction.setTitle({title: 'Toggle reveal password'})
