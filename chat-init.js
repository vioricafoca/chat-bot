(function() {
  // Load CSS dynamically
  const link = document.createElement('link');
  link.rel = 'stylesheet';
  link.href = 'https://vioricafoca.github.io/chat-bot/chat-bot.css';
  document.head.appendChild(link);
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
  xhr.open('GET', 'https://vioricafoca.github.io/chat-bot/chat-bot.html', true);
  xhr.onreadystatechange = function() {
    if (xhr.readyState === 4 && xhr.status === 200) {
      document.body.insertAdjacentHTML('beforeend', xhr.responseText);
      // Load JavaScript dynamically
      const script = document.createElement('script');
      script.src = 'https://vioricafoca.github.io/chat-bot/chat-bot.js';
      document.body.appendChild(script);
    }
  };
  xhr.send();
})();
