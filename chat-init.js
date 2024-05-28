(function() {
  // Define the CSS content
  const cssContent = `
  body {
    font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen,
      Ubuntu, Cantarell, Open Sans, Helvetica Neue, Icons16, sans-serif;
    font-size: 14px;
    font-weight: 400;
    letter-spacing: 1.5;
    line-height: 1.28581;
  }
  .bg-close {
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='40px' height='40px' viewbox='0 0 40 40'%3E%3Cpath d='M 10,10 L 30,30 M 30,10 L 10,30' stroke='white' stroke-width='3' stroke-linecap='butt' /%3E%3C/svg%3E");
    background-size: 100%;
  }
  .bpw-header-container {
    background-color: #6675fa;
    color: white;
    padding: 10px;
    border-radius: 5px;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .bpw-header-name {
    font-weight: bold;
  }
  .bpw-header-icons {
    display: flex;
    gap: 10px;
  }
  .bpw-header-container button {
    background: none;
    border: none;
    color: white;
    font-size: 15px;
    cursor: pointer;
  }
  .bpw-composer textarea::placeholder {
    font-size: 14px;
    font-weight: 500;
    color: #000;
    font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen,
      Ubuntu, Cantarell, Open Sans, Helvetica Neue, Icons16, sans-serif;
  }
  #messages {
    padding: 10px;
    height: calc(100% - 235px);
    overflow-y: auto;
    display: flex;
    flex-direction: column-reverse;
    transition: height 0.3s ease;
  }
  #messages::-webkit-scrollbar {
    width: 4px;
    border-radius: 20px;
  }
  #messages::-webkit-scrollbar-track {
    background: #ffffff;
    border-radius: 20px;
  }
  #messages::-webkit-scrollbar-thumb {
    background: #ffffff;
    border-radius: 20px;
  }
  #messages::-webkit-scrollbar-thumb:hover {
    background: #d4dae1;
  }
  #messages {
    scrollbar-width: thin;
    scrollbar-color: #e0e6e0 #ffffff;
    border-radius: 20px;
  }
  .message {
    display: flex;
    align-items: center;
    animation: slideInUp 0.3s ease-in-out;
    margin: 10px 10px;
  }
  .message.bot {
    justify-content: flex-start;
  }
  .message.user {
    justify-content: flex-end;
  }
  .message .profile-pic {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    margin-right: 10px;
    background-size: cover;
  }
  .message.user .profile-pic {
    order: 2;
    margin-right: 0;
    margin-left: 10px;
  }
  .message.user .message-content {
    background-color: #7a6ff9;
    color: white;
    text-align: right;
    border-radius: 10px;
  }
  .message.bot .message-content {
    background-color: #f0f1ef;
    color: black;
    text-align: left;
    border-radius: 10px;
  }
  .message-content {
    padding: 10px;
    border-radius: 5px;
    max-width: 70%;
    overflow-y: auto;
  }
  .input-section-wrapper {
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    flex-grow: 1;
  }
  .input-section {
    position: relative;
    width: 100%;
    background-color: white;
    display: flex;
    flex-direction: column;
    align-items: stretch;
  }
  .bpw-composer-container {
    border: 1px solid #babfc1;
    border-radius: 10px;
    display: flex;
    padding: 2px 10px;
    margin: 0px 13px;
    background-color: white;
  }
  .bpw-composer {
    display: flex;
    width: 100%;
    align-items: center;
  }
  .bpw-composer textarea {
    flex: 1;
    padding: 10px;
    border: none;
    border-radius: 5px 0 0 5px;
    resize: none;
    height: 15px;
    outline: none;
  }
  .bpw-composer textarea::-webkit-scrollbar {
    display: none;
  }
  .bpw-composer textarea {
    -ms-overflow-style: none;
    scrollbar-width: none;
  }
  .bpw-composer textarea::placeholder {
    font-size: 14px;
    font-weight: 400;
    color: #000;
    font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen,
      Ubuntu, Cantarell, Open Sans, Helvetica Neue, Icons16, sans-serif;
  }
  .bpw-composer button {
    display: none;
    padding: 7px;
    background-color: #6675fa;
    color: white;
    border: none;
    justify-content: center;
    align-items: center;
    max-height: 30px;
    border-radius: 15px;
    cursor: pointer;
  }
  .bpw-composer button.visible {
    display: flex;
  }
  .bpw-composer button i {
    font-size: 18px;
    margin-left: 1px;
    color: white;
  }
  .bpw-powered {
    text-align: center;
    padding: 10px;
    font-size: 12px;
    color: #888;
  }
  .bpw-powered a {
    color: #4b7bec;
    text-decoration: none;
  }
  .bpw-widget-btn {
    position: fixed;
    bottom: 20px;
    right: 20px;
    background-color: #6675fa;
    color: white;
    border: none;
    border-radius: 50%;
    width: 50px;
    height: 50px;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 24px;
    cursor: pointer;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    animation: none;
    transition: opacity 0.1s ease-in-out, transform 0.1s ease-in-out;
  }
  .bpw-widget-btn.appear {
    animation: appear 0.1s ease-in-out;
  }
  @keyframes appear {
    0% {
      transform: scale(0);
      opacity: 0;
    }
    100% {
      transform: scale(1);
      opacity: 1;
    }
  }
  #chat {
    display: none;
    position: fixed;
    bottom: 20px;
    right: 20px;
    width: 385px;
    padding: 10px 0px;
    min-height: 280px;
    height: 70vh;
    border-radius: 15px;
    box-shadow: 0 4px 18px -6px rgba(0, 0, 0, 0.1);
    overflow: hidden;
    transition: transform 0.2s ease, opacity 0.2s ease;
    transform-origin: bottom right;
    background-color: #fff;
    border: none;
    z-index: 1000;
    transform: scale(0);
    opacity: 0;
    display: flex;
    flex-direction: column;
  }
  .bpw-suggestions {
    display: block;
    justify-content: left;
    overflow-y: auto;
    opacity: 1;
    transition: opacity 0.5s ease;
    padding: 5px 10px;
    border-bottom: 1px solid #edeeef;
    margin-bottom: 20px;
  }
  .bpw-suggestion {
    background-color: rgb(220, 220, 220);
    color: rgb(0, 0, 0);
    border-radius: 10px;
    text-align: center;
    cursor: pointer;
    user-select: none;
    padding: 10px;
    margin-bottom: 5px;
    display: inline-block;
    margin-right: 10px;
    border-radius: 10px;
  }
  #loading-animation {
    display: none;
    text-align: center;
    padding: 10px;
  }
  #loading-animation .dot {
    display: inline-block;
    width: 8px;
    height: 8px;
    margin: 0 2px;
    background-color: #4b7bec;
    border-radius: 50%;
    animation: loading 1s infinite;
  }
  #loading-animation .dot:nth-child(2) {
    animation-delay: 0.2s;
  }
  #loading-animation .dot:nth-child(3) {
    animation-delay: 0.4s;
  }
  @keyframes loading {
    0%,
    80%,
    100% {
      opacity: 0;
    }
    40% {
      opacity: 1;
    }
  }
  .input-section-wrapper.no-suggestions #suggestions,
  .input-section-wrapper.no-suggestions #loading-animation {
    display: none;
  }
  .input-section-wrapper.suggestions-hidden #suggestions,
  .input-section-wrapper.suggestions-hidden #loading-animation {
    display: none;
  }
  .dotsContainer {
    margin-top: 63px;
    margin-bottom: 27px;
    margin-left: 15px;
    width: 30px;
    height: 7px;
    background: #eff1f3;
    border-radius: 30px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  #dot1,
  #dot2,
  #dot3 {
    width: 6px;
    height: 6px;
    background: black;
    border-radius: 50%;
    margin: 2px;
    transition: all 0.3s ease-in-out;
    animation: typing 0.7s infinite;
  }
  #dot1 {
    animation-delay: 0.4s;
  }
  #dot2 {
    animation-delay: 0.3s;
  }
  #dot3 {
    animation-delay: 0.6s;
  }
  @keyframes typing {
    0% {
      transform: translateY(0);
      transition: all 0.5s ease-in-out;
    }
    50% {
      transform: translateY(-5px);
      transition: all 1s ease-in-out;
    }
    100% {
      transform: translateY(0);
      transition: all 1s ease-in-out;
    }
  }
  @keyframes slideInUp {
    from {
      transform: translateY(100%);
    }
    to {
      transform: translateY(0);
    }
  }
  `;

  // Add the CSS to the document
  const style = document.createElement('style');
  style.textContent = cssContent;
  document.head.appendChild(style);

  // Define the HTML content
  const htmlContent = `
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
        <button id="toggle-chat-button">
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
            <button id="send-button" class="bpw-send-button">
              <i class="zmdi zmdi-mail-send"></i>
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div id="chat-icon" class="bpw-widget-btn"><i class="fas fa-comment"></i></div>
  `;

  // Add the HTML to the document
  document.body.insertAdjacentHTML('beforeend', htmlContent);

  // Load FontAwesome and Material Design Iconic Font dynamically
  const faLink = document.createElement('link');
  faLink.rel = 'stylesheet';
  faLink.href = 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css';
  document.head.appendChild(faLink);

  const mdiLink = document.createElement('link');
  mdiLink.rel = 'stylesheet';
  mdiLink.href = 'https://cdnjs.cloudflare.com/ajax/libs/material-design-iconic-font/2.2.0/css/material-design-iconic-font.min.css';
  document.head.appendChild(mdiLink);

  document.addEventListener("DOMContentLoaded", () => {
    const deleteButton = document.getElementById("btn-delete");
    deleteButton.addEventListener("click", confirmAndClearChat);
    
    const toggleChatButton = document.getElementById("toggle-chat-button");
    toggleChatButton.addEventListener("click", toggleChat);
    
    const chatIcon = document.getElementById("chat-icon");
    chatIcon.addEventListener("click", toggleChat);
    
    const sendButton = document.getElementById("send-button");
    sendButton.addEventListener("click", sendMessage);
  });

  function confirmAndClearChat() {
    if (confirm("Are you sure you want to delete the chat? This action cannot be undone.")) {
      clearChat();
    }
  }

  function clearChat() {
    const messagesDiv = document.getElementById("messages");
    messagesDiv.innerHTML = ""; // Clear all messages
    startConversation(); // Display the initial messages again
  }

  function toggleChat() {
    const chat = document.getElementById("chat");
    const chatIcon = document.getElementById("chat-icon");
    if (chat.style.display === "none" || chat.style.display === "") {
      chat.style.display = "block";
      requestAnimationFrame(() => {
        chat.style.transform = "scale(1)";
        chat.style.opacity = "1";
        chatIcon.style.display = "none";
        if (isChatEmpty()) {
          startConversation(); // Start the conversation with an initial message only if chat is empty
        }
      });
    } else {
      chat.style.transform = "scale(0)";
      chat.style.opacity = "0";
      chat.addEventListener("transitionend", () => {
        chat.style.display = "none";
        chatIcon.style.display = "flex";
        chatIcon.classList.add("appear");
      }, { once: true });
    }
  }

  function startConversation() {
    const initialMessages = [
      "Greetings! I am Mrs. Chatnel, your dedicated chatbot design assistant. I am here to assist you in creating a splendid and stylish chatbot for your website.",
      "Would you like a guided tour of the webchat styler, or are you already familiar with its capabilities? :dancer:"
    ];
    displayMessageSequentially(initialMessages, 0);
  }

  function displayMessageSequentially(messages, index) {
    if (index < messages.length) {
      displayMessage("Bot", messages[index], () => {
        displayMessageSequentially(messages, index + 1);
      });
    }
  }

  function isChatEmpty() {
    const messagesDiv = document.getElementById("messages");
    return messagesDiv.children.length === 0;
  }

  async function sendMessage() {
    const input = document.getElementById("user-input").value;
    if (input.trim() === "") return;
    // Hide suggestions and show loading indicator
    fadeOutSuggestions();
    // Display the user's message
    displayMessage("User", input);
    document.getElementById("user-input").value = "";
    // Fetch the bot's response
    const botResponse = await fetchBotResponse(input);
    // Hide loading indicator and display the bot's response with a delay
    setTimeout(() => {
      hideLoadingIndicator();
      displayMessage("Bot", botResponse);
      showSuggestions(); // Show suggestions after the response is displayed
    }, 1000);
  }

  function displayLoadingIndicator() {
    const dotsContainer = document.querySelector(".dotsContainer");
    dotsContainer.style.display = "flex"; // Show the dots animation
  }

  function hideLoadingIndicator() {
    const dotsContainer = document.querySelector(".dotsContainer");
    dotsContainer.style.display = "none"; // Hide the dots animation
  }

  function fadeOutSuggestions() {
    const suggestions = document.getElementById("suggestions");
    suggestions.style.opacity = "0";
    setTimeout(() => {
      suggestions.style.display = "none";
      displayLoadingIndicator();
    }, 500); // Match this duration to the CSS transition duration
  }

  function showSuggestions() {
    const suggestions = document.getElementById("suggestions");
    suggestions.style.display = "block";
    setTimeout(() => {
      suggestions.style.opacity = "1";
    }, 10); // Small delay to ensure display property takes effect before opacity transition
    adjustInputSectionPosition(); // Adjust input section position
  }

  async function fetchBotResponse(userInput) {
    let botResponse = "I did not understand that.";
    try {
      const response = await fetch("https://api.openai.com/v1/chat/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer sk-proj-z0I4WSQL4ouiikT3BlbkFJEi9N2twwOoIU3YTxD7gF`
        },
        body: JSON.stringify({
          model: "gpt-4",
          messages: [
            { role: "system", content: "You are a helpful assistant." },
            { role: "user", content: userInput }
          ],
          max_tokens: 150
        })
      });
      const data = await response.json();
      console.log("API Response:", data); // Log the entire response for debugging
      if (data.choices && data.choices.length > 0) {
        botResponse = data.choices[0].message.content.trim();
      } else {
        console.error("No choices in response:", data);
      }
    } catch (error) {
      botResponse = "Sorry, I'm having trouble connecting to the server.";
      console.error("Error fetching bot response:", error);
    }
    return botResponse;
  }

  function displayMessage(sender, message, callback) {
    const messagesDiv = document.getElementById("messages");
    const messageDiv = document.createElement("div");
    messageDiv.className = `message ${sender.toLowerCase()} w3-animate-bottom`;
    const profilePic = document.createElement("div");
    profilePic.className = "profile-pic";
    profilePic.style.backgroundImage =
      sender === "Bot"
        ? "url('https://sg8ebf.p3cdn2.secureserver.net/wp-content/uploads/2013/05/Virtual-Assistant.jpg')"
        : "url('https://via.placeholder.com/40/0000FF/FFFFFF?text=U')";
    const messageContent = document.createElement("div");
    messageContent.className = "message-content";
    messageContent.innerText = message;
    messageDiv.appendChild(profilePic);
    messageDiv.appendChild(messageContent);
    messagesDiv.insertBefore(messageDiv, messagesDiv.firstChild);
    messagesDiv.scrollTop = messagesDiv.scrollHeight; // Scroll to the bottom
    // Check if a callback function is provided and execute it
    if (callback) {
      messageDiv.addEventListener("animationend", callback, { once: true });
    }
  }

  function fillInput(suggestion) {
    document.getElementById("user-input").value = suggestion;
    sendMessage();
  }

  function handleInputChange(event) {
    const sendButton = document.getElementById("send-button");
    const input = event.target.value.trim();
    if (input.length > 0) {
      sendButton.classList.add("visible");
    } else {
      sendButton.classList.remove("visible");
    }
  }

  function handleKeyPress(event) {
    if (event.key === "Enter") {
      sendMessage();
    }
  }

  function adjustInputSectionPosition() {
    const inputSectionWrapper = document.getElementById("input-section-wrapper");
    const suggestions = document.getElementById("suggestions");
    const messages = document.getElementById("messages");
    if (suggestions.style.display === "none") {
      messages.classList.add("no-suggestions");
    } else {
      messages.classList.remove("no-suggestions");
    }
  }
})();
