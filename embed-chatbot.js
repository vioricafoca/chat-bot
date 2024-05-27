(function() {
  // Load CSS
  var link = document.createElement('link');
  link.href = 'https://cdn.jsdelivr.net/gh/vioricafoca/chat-bot@b82d5288a9aff01342de642020459177cfb49422/chat-bot.css';
  link.type = 'text/css';
  link.rel = 'stylesheet';
  document.head.appendChild(link);

  // Add HTML for the chatbot
  var chatDiv = document.createElement('div');
  chatDiv.id = 'chat';
  chatDiv.innerHTML = `
    <div class="bpw-layout">
      <div class="bpw-header-container">
        <div class="bpw-header-name">Chat bot</div>
        <div class="bpw-header-icons">
          <button type="button" tabindex="-1" id="btn-delete" class="bpw-header-icon bpw-header-icon-delete">
            <!-- SVG icon code -->
          </button>
          <button onclick="toggleChat()">
            <div class="bg-close" style="width: 20px; height: 20px;"></div>
          </button>
        </div>
      </div>
      <div id="messages" class="bpw-chat-container"></div>
      <div class="input-section-wrapper" id="input-section-wrapper">
        <!-- Additional content here -->
      </div>
    </div>
    <div id="chat-icon" class="bpw-widget-btn" onclick="toggleChat()"><i class="fas fa-comment"></i></div>
  `;
  document.body.appendChild(chatDiv);

  // Load JavaScript
  var script = document.createElement('script');
  script.src = 'https://cdn.jsdelivr.net/gh/vioricafoca/chat-bot@b82d5288a9aff01342de642020459177cfb49422/chat-bot.js';
  document.body.appendChild(script);
})();

// This function can be called to initialize the chatbot
function initializeChatbot() {
  // Your chatbot initialization code
}
