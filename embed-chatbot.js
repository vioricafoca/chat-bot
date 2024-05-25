(function() {
  async function loadChatbot() {
    try {
      const response = await fetch('https://github.com/vioricafoca/chat-bot/blob/2d0d24640a6d6352ed7784ea94f0090a6aecbfb7/chat-bot');
      const content = await response.text();
      const container = document.createElement('div');
      container.innerHTML = content;
      document.body.appendChild(container);

      // Manually execute any inline scripts
      const scripts = container.getElementsByTagName('script');
      for (let i = 0; i < scripts.length; i++) {
        const script = document.createElement('script');
        script.text = scripts[i].innerHTML;
        document.head.appendChild(script).parentNode.removeChild(script);
      }
    } catch (error) {
      console.error('Error loading chatbot:', error);
    }
  }

  document.addEventListener('DOMContentLoaded', loadChatbot);
})();
