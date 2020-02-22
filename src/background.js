'use strict';

function onTextTranslate(info, tab) {
    let url = 'https://translate.google.com/?text=' + info.selectionText;

    chrome.tabs.create({
        url: url,
        index: tab.index + 1
    });
}

function onFindImage({ srcUrl }, tab) {
    let url = 'https://images.google.com/searchbyimage?image_url=' + srcUrl;

    chrome.tabs.create({
        url: url,
        index: tab.index + 1
    });
}

const actions = [
    {
        'title': 'Translate',
        'contexts':['selection'],
        'onclick': onTextTranslate
    },
    {
        'title': 'Find simular',
        'contexts':['image'],
        'onclick': onFindImage
    }
];

chrome.runtime.onInstalled.addListener(function() {
    actions.forEach(({ title, contexts, onclick }, key) => {
        chrome.contextMenus.create({
            id: key + '',
            title,
            type: 'normal',
            contexts,
            onclick
        });
    });
});
