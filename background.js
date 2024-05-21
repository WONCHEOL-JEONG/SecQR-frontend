chrome.runtime.onInstalled.addListener(() => {
    chrome.storage.sync.get({ blockedUrls: [] }, function (data) {
        updateFilters(data.blockedUrls);
    });
});

chrome.storage.onChanged.addListener(function (changes, namespace) {
    if (namespace === 'sync' && changes.blockedUrls) {
        updateFilters(changes.blockedUrls.newValue);
    }
});

chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
    if (message.action === 'blockUrl' && message.url) {
        chrome.storage.sync.get({ blockedUrls: [] }, function (data) {
            var blockedUrls = data.blockedUrls;
            if (!blockedUrls.includes(message.url)) {
                blockedUrls.push(message.url);
                chrome.storage.sync.set({ blockedUrls: blockedUrls }, function () {
                    sendResponse({ success: true });
                });
            } else {
                // 이미 차단된 URL인 경우
                sendResponse({ success: false });
            }
        });
        return true;
    }
});

function updateFilters(blockedUrls) {
    const rules = blockedUrls.map((url, index) => ({
        id: index + 1,
        priority: 1,
        action: { type: 'block' },
        condition: { urlFilter: url, resourceTypes: ['main_frame'] },
    }));

    chrome.declarativeNetRequest.updateDynamicRules({
        removeRuleIds: blockedUrls.map((_, index) => index + 1),
        addRules: rules,
    });
}
