document.addEventListener("DOMContentLoaded", () => {
    const blockedUrlList = document.querySelector(".blocked-url-list");
  
    // Function to render blocked URLs
    const renderBlockedUrls = () => {
      chrome.storage.sync.get("blockedURLs", (data) => {
        const blockedURLs = data.blockedURLs || [];
        console.log("Blocked URLs from storage:", blockedURLs); // 로그 추가
        blockedUrlList.innerHTML = ""; // Clear the list
  
        blockedURLs.forEach((url, index) => {
          const listItem = document.createElement("li");
          listItem.textContent = url;
  
          const removeButton = document.createElement("button");
          removeButton.textContent = "Unblock";
          removeButton.className = "remove-button";
          removeButton.addEventListener("click", () => {
            unblockUrl(index);
          });
  
          listItem.appendChild(removeButton);
          blockedUrlList.appendChild(listItem);
        });
      });
    };
  
    // Function to unblock a URL
    const unblockUrl = (index) => {
      chrome.storage.sync.get("blockedURLs", (data) => {
        let blockedURLs = data.blockedURLs || [];
        const urlToUnblock = blockedURLs[index];
  
        if (confirm(`Do you want to unblock this URL: ${urlToUnblock}?`)) {
          blockedURLs.splice(index, 1);
          chrome.storage.sync.set({ blockedURLs }, () => {
            renderBlockedUrls();
            alert(`Unblocked: ${urlToUnblock}`);
          });
        }
      });
    };
  
    // Initial render
    renderBlockedUrls();
  });
  