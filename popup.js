document.getElementById("checkBtn").addEventListener("click", () => {

  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    let url = tabs[0].url;
    let resultDiv = document.getElementById("result");

    let warnings = [];

    if (url.includes("@")) {
      warnings.push("⚠ URL contains '@' symbol");
    }

    if (!url.startsWith("https")) {
      warnings.push("⚠ Website is not using HTTPS");
    }
    if(!url.includes("://")) {
      warnings.push("⚠ URL is missing protocol (http:// or https://)");
    }

    let domainParts = url.split("//")[1].split(".");
    if (domainParts.length > 4) {
      warnings.push("⚠ Too many subdomains");
    }

    let fakeWords = ["login", "verify", "secure", "account", "update"];
    fakeWords.forEach(word => {
      if (url.toLowerCase().includes(word)) {
        warnings.push(`⚠ Suspicious keyword detected: "${word}"`);
      }
    });

    if (warnings.length === 0) {
      resultDiv.innerHTML = "This website looks safe.";
      resultDiv.style.color = "green";
    } else {
      resultDiv.innerHTML = warnings.join("<br>");
      resultDiv.style.color = "red";
    }
  });

});
