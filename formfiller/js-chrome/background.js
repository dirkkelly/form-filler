var analyticsTrackingCode = 'UA-XXXXXXX-X'; // UA-9183424-4 / UA-XXXXXXX-X

function handleMessage(request, sender, sendResponse) {
    if (request === 'getOptions') {
        GetFormFillerOptions().then(function(result) {
            sendResponse({
                options: result,
                analyticsTrackingCode: analyticsTrackingCode
            });
        });
        return true;
    }
}

chrome.runtime.onMessage.addListener(handleMessage);

chrome.browserAction.onClicked.addListener(function() {
    chrome.tabs.executeScript({
        code: 'window.formFiller.fillAllInputs(); window.formFiller.trackEvent("Extension Button", "Click");',
        allFrames: true
    });
});

GetFormFillerOptions().then(function (options) {
    CreateContextMenus(options.enableContextMenu);
});

chrome.contextMenus.onClicked.addListener(function(info, tab) {
    if (info.menuItemId === 'form-filler-all') {
        chrome.tabs.executeScript({
            code: 'window.formFiller.fillAllInputs(); window.formFiller.trackEvent("Context Menu", "fill_all_inputs");',
            allFrames: true
        });
    }
    if (info.menuItemId === 'form-filler-form') {
        chrome.tabs.executeScript({
            code: 'window.formFiller.fillThisForm(); window.formFiller.trackEvent("Context Menu", "fill_this_form");',
            allFrames: true
        });
    }
    if (info.menuItemId === 'form-filler-input') {
        chrome.tabs.executeScript({
            code: 'window.formFiller.fillThisInput(); window.formFiller.trackEvent("Context Menu", "fill_this_input");',
            allFrames: true
        });
    }
});

chrome.commands.onCommand.addListener(function(command) {
    if (command === 'fill_all_inputs') {
        chrome.tabs.executeScript({
            code: 'window.formFiller.fillAllInputs(); window.formFiller.trackEvent("Keyboard Shortcut", "fill_all_inputs");',
            allFrames: true
        });
    }
    if (command === 'fill_this_form') {
        chrome.tabs.executeScript({
            code: 'window.formFiller.fillThisForm(); window.formFiller.trackEvent("Keyboard Shortcut", "fill_this_form");',
            allFrames: true
        });
    }
    if (command === 'fill_this_input') {
        chrome.tabs.executeScript({
            code: 'window.formFiller.fillThisInput(); window.formFiller.trackEvent("Keyboard Shortcut", "fill_this_input");',
            allFrames: true
        });
    }
});
