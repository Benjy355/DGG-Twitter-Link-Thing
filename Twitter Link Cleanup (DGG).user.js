// ==UserScript==
// @name         Twitter Link Cleanup (DGG)
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  Replaces username in twitter links to /i/
// @author       You
// @match        https://www.destiny.gg/embed/chat
// @icon         data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==
// @grant        none
// ==/UserScript==

(function() {
    'use strict';
    // Get the chat-lines div
    // Get the chat-lines div
    const chatLines = document.querySelector('.chat-lines');

    // Set up a MutationObserver to monitor for changes to the chat-lines div
    const observer = new MutationObserver(mutations => {
        mutations.forEach(mutation => {
            // Check if a new node was added
            if (mutation.type === 'childList' && mutation.addedNodes.length > 0) {
                // Loop through the added nodes
                mutation.addedNodes.forEach(node => {
                    // Check if the node is a chat message
                    if (node.classList.contains('msg-chat')) {
                        // Get the HTML inside the chat message's .text element
                        const messageHTML = node.querySelector('.text').innerHTML;
                        // Check for Twitter links
                        const twitterRegex = /(http|https):\/\/(www\.)?twitter\.com\/[A-Za-z0-9_]+\/status\/([0-9]+)/g;
                        const matches = messageHTML.matchAll(twitterRegex);
                        for (const match of matches) {
                            const originalLink = match[0];
                            const tweetId = match[3];
                            const newLink = `https://twitter.com/i/status/${tweetId}`;
                            // Replace the Twitter link with the modified link
                            const modifiedMessageHTML = messageHTML.replaceAll(originalLink, newLink);
                            // Modify the chat message on the page
                            node.querySelector('.text').innerHTML = modifiedMessageHTML;
                        }
                    }
                });
            }
        });
    });

    // Start observing the chat-lines div for changes
    observer.observe(chatLines, { childList: true });

})();