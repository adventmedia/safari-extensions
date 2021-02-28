chrome.runtime.onMessage.addListener(
    function (request, sender, sendResponse) {
        if (request.message === "show_passwords") {
            showPassword();
        }
    }
);

function showPassword() {
    chrome.storage.local.get(['handlePswds'], function (res) {
        if (res.handlePswds.revealPswd) {
            const inputs = document.getElementsByTagName('input');
            for (let i = 0; i < inputs.length; i++) {
                if (res.handlePswds.pswdFields.indexOf(inputs[i].getAttribute('name')) >= 0) {
                    inputs[i].setAttribute('type', 'password');
                }
            }
            chrome.storage.local.set({
                handlePswds: {
                    revealPswd: false,
                    pswdFields: []
                }
            })
        } else {
            const inputs = document.getElementsByTagName('input');
            const pswdInputs = [];
            for (let i = 0; i < inputs.length; i++) {
                const type = inputs[i].getAttribute('type');
                if (type === 'password') {
                    inputs[i].setAttribute('type', 'text');
                    pswdInputs.push(inputs[i].getAttribute('name'));
                }
            }
            chrome.storage.local.set({
                handlePswds: {
                    revealPswd: true,
                    pswdFields: pswdInputs
                }
            })
        }
    })
}
