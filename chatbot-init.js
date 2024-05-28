(function() {
  const token = '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';

  function loadCSS(url, callback) {
    const xhr = new XMLHttpRequest();
    xhr.open('GET', url, true);
    xhr.setRequestHeader('Authorization', `token ${token}`);
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

  // Load CSS dynamically
  loadCSS('https://api.github.com/repos/vioricafoca/chat-bot/contents/chat-bot.css', function() {
    // Load FontAwesome and Material Design Iconic Font dynamically
    const faLink = document.createElement('link');
    faLink.rel = 'stylesheet';
    faLink.href = 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css';
    document.head.appendChild(faLink);

    const mdiLink = document.createElement('link');
    mdiLink.rel = 'stylesheet';
    mdiLink.href = 'https://cdnjs.cloudflare.com/ajax/libs/material-design-iconic-font/2.2.0/css/material-design-iconic-font.min.css';
    document.head.appendChild(mdiLink);

    // Load HTML template dynamically
    const xhr = new XMLHttpRequest();
    xhr.open('GET', 'https://api.github.com/repos/vioricafoca/chat-bot/contents/chat-bot.html', true);
    xhr.setRequestHeader('Authorization', `token ${token}`);
    xhr.onreadystatechange = function() {
      if (xhr.readyState === 4 && xhr.status === 200) {
        const response = JSON.parse(xhr.responseText);
        const htmlContent = atob(response.content);
        document.body.insertAdjacentHTML('beforeend', htmlContent);

        // Load JavaScript dynamically
        const scriptXhr = new XMLHttpRequest();
        scriptXhr.open('GET', 'https://api.github.com/repos/vioricafoca/chat-bot/contents/chat-bot.js', true);
        scriptXhr.setRequestHeader('Authorization', `token ${token}`);
        scriptXhr.onreadystatechange = function() {
          if (scriptXhr.readyState === 4 && scriptXhr.status === 200) {
            const scriptResponse = JSON.parse(scriptXhr.responseText);
            const scriptContent = atob(scriptResponse.content);
            const script = document.createElement('script');
            script.text = scriptContent;
            document.body.appendChild(script);
          }
        };
        scriptXhr.send();
      }
    };
    xhr.send();
  });
})();
