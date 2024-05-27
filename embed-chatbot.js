(function() {
  // Load CSS
  var link = document.createElement('link');
  link.href = 'https://github.com/vioricafoca/chat-bot/blob/b82d5288a9aff01342de642020459177cfb49422/chat-bot.css'; // Adjust the URL
  link.type = 'text/css';
  link.rel = 'stylesheet';
  document.head.appendChild(link);

  // Add HTML
  var chatDiv = document.createElement('div');
  chatDiv.id = 'chat';
  chatDiv.innerHTML = '<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Chatbot</title>
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css">
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/material-design-iconic-font/2.2.0/css/material-design-iconic-font.min.css">
  <link rel="stylesheet" href="chat-bot.css">
  <script src="https://cdn.jsdelivr.net/gh/vioricafoca/chat-bot@b82d5288a9aff01342de642020459177cfb49422/chat-bot.js"></script>
</head>
<body>
  <div id="chat" class="bpw-layout">
    <div class="bpw-header-container">
      <div class="bpw-header-name">Chat bot</div>
      <div class="bpw-header-icons">
        <button type="button" tabindex="-1" id="btn-delete" class="bpw-header-icon bpw-header-icon-delete">
          <i>
            <svg xmlns="http://www.w3.org/2000/svg" width="15" height="20" viewBox="0 0 20 20" fill="currentColor">
              <path d="M0 0h24v24H0z" fill="none" />
              <path d="M21 11H7.41l5.3-5.29a1 1 0 0 0-1.42-1.42l-7 7a1 1 0 0 0 0 1.42l7 7a1 1 0 0 0 1.42-1.42L7.41 13H21a1 1 0 1 0 0-2z" />
            </svg>
          </i>
        </button>
        <button onclick="toggleChat()">
          <div class="bg-close" style="width: 20px; height: 20px;"></div>
        </button>
      </div>
    </div>
    <div id="messages" class="bpw-chat-container"></div>
    <div class="input-section-wrapper" id="input-section-wrapper">
      <div class="bpw-suggestions" id="suggestions">
        <div class="bpw-suggestion" onclick="fillInput('What is the weather today?')">What is the weather today?</div>
        <div class="bpw-suggestion" onclick="fillInput('How can I contact support?')">How can I contact support?</div>
        <div class="bpw-suggestion" onclick="fillInput('Tell me a joke')">Tell me a joke</div>
      </div>
      <div class="dotsContainer" id="loading-animation">
        <span id="dot1"></span>
        <span id="dot2"></span>
        <span id="dot3"></span>
      </div>
      <div class="input-section" id="input-section">
        <div class="bpw-composer-container">
          <div class="bpw-composer">
            <textarea id="user-input" placeholder="Type a message..." oninput="handleInputChange(event)" onkeypress="handleKeyPress(event)"></textarea>
            <button id="send-button" class="bpw-send-button" onclick="sendMessage()">
              <i class="zmdi zmdi-mail-send"></i>
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div id="chat-icon" class="bpw-widget-btn" onclick="toggleChat()"><i class="fas fa-comment"></i></div>
</body>
</html>
';
  document.body.appendChild(chatDiv);

  // Load JavaScript
  var script = document.createElement('script');
  script.src = 'https://github.com/vioricafoca/chat-bot/blob/b82d5288a9aff01342de642020459177cfb49422/chat-bot.js'; // Adjust the URL
  document.body.appendChild(script);
})();

// This function can be called to initialize the chatbot
function initializeChatbot() {
  // Your chatbot initialization code
}
