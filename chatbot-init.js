(function() {
  const token = 'YOUR_GITHUB_TOKEN';

  function loadCSS(url, callback) {
    const xhr = new XMLHttpRequest();
    xhr.open('GET', url, true);
    xhr.setRequestHeader('Authorization', `token ${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}`);
    xhr.onreadystatechange = function() {
      if (xhr.readyState === 4 && xhr.status === 200) {
        const response = JSON.parse(xhr.responseText);
        const cssContent = atob(response.content);
        const style = document.createElement('style');
        style.textContent = cssContent;
        document.head.appendChild(style);
        if (callback) callback();
      }
    };
    xhr.send();
  }

  function loadHTML(url, callback) {
    const xhr = new XMLHttpRequest();
    xhr.open('GET', url, true);
    xhr.setRequestHeader('Authorization', `token ${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}`);
    xhr.onreadystatechange = function() {
      if (xhr.readyState === 4 && xhr.status === 200) {
        const response = JSON.parse(xhr.responseText);
        const htmlContent = atob(response.content);
        document.body.insertAdjacentHTML('beforeend', htmlContent);
        if (callback) callback();
      }
    };
    xhr.send();
  }

  function loadJS(url) {
    const xhr = new XMLHttpRequest();
    xhr.open('GET', url, true);
    xhr.setRequestHeader('Authorization', `token ${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}`);
    xhr.onreadystatechange = function() {
      if (xhr.readyState === 4 && xhr.status === 200) {
        const response = JSON.parse(xhr.responseText);
        const scriptContent = atob(response.content);
        const script = document.createElement('script');
        script.text = scriptContent;
        document.body.appendChild(script);
      }
    };
    xhr.send();
  }

  // Load CSS
  loadCSS('https://api.github.com/repos/vioricafoca/chat-bot/contents/chat-bot.css', function() {
    // Load FontAwesome
    const faLink = document.createElement('link');
    faLink.rel = 'stylesheet';
    faLink.href = 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css';
    document.head.appendChild(faLink);

    // Load Material Design Iconic Font
    const mdiLink = document.createElement('link');
    mdiLink.rel = 'stylesheet';
    mdiLink.href = 'https://cdnjs.cloudflare.com/ajax/libs/material-design-iconic-font/2.2.0/css/material-design-iconic-font.min.css';
    document.head.appendChild(mdiLink);

    // Load HTML template
    loadHTML('https://api.github.com/repos/vioricafoca/chat-bot/contents/chat-bot.html', function() {
      // Load JavaScript
      loadJS('https://api.github.com/repos/vioricafoca/chat-bot/contents/chat-bot.js');
    });
  });
})();
