(function() {
  // Function to load a CSS file
  function loadCSS(href) {
    return new Promise((resolve, reject) => {
      const link = document.createElement('link');
      link.rel = 'stylesheet';
      link.href = href;
      link.onload = resolve;
      link.onerror = reject;
      document.head.appendChild(link);
    });
  }

  // Function to load an HTML template
  function loadHTML(url) {
    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.open('GET', url, true);
      xhr.onreadystatechange = function() {
        if (xhr.readyState === 4) {
          if (xhr.status === 200) {
            resolve(xhr.responseText);
          } else {
            reject(new Error(`Failed to load HTML from ${url}`));
          }
        }
      };
      xhr.send();
    });
  }

  // Function to load a JavaScript file
  function loadJS(src) {
    return new Promise((resolve, reject) => {
      const script = document.createElement('script');
      script.src = src;
      script.onload = resolve;
      script.onerror = reject;
      document.body.appendChild(script);
    });
  }

  // Load CSS files
  Promise.all([
    loadCSS('https://vioricafoca.github.io/chat-bot/chat-bot.css'),
    loadCSS('https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css'),
    loadCSS('https://cdnjs.cloudflare.com/ajax/libs/material-design-iconic-font/2.2.0/css/material-design-iconic-font.min.css')
  ])
  .then(() => {
    // Load HTML template
    return loadHTML('https://vioricafoca.github.io/chat-bot/chat-bot.html');
  })
  .then(html => {
    // Insert HTML into the document
    document.body.insertAdjacentHTML('beforeend', html);
    // Load JavaScript file
    return loadJS('https://vioricafoca.github.io/chat-bot/chat-bot.js');
  })
  .catch(error => {
    console.error('Error loading resources:', error);
  });
})();
