document.addEventListener("DOMContentLoaded", () => {
  const deleteButton = document.getElementById("btn-delete");
  deleteButton.addEventListener("click", confirmAndClearChat);
});
function confirmAndClearChat() {
  if (
    confirm(
      "Are you sure you want to delete the chat? This action cannot be undone."
    )
  ) {
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
    chat.addEventListener(
      "transitionend",
      () => {
        chat.style.display = "none";
        chatIcon.style.display = "flex";
        chatIcon.classList.add("appear");
      },
      { once: true }
    );
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
        model: "gpt-4", // Use "gpt-3.5-turbo" if you are on the lower tier plan
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
  messageDiv.className = `message ${sender.toLowerCase()} w3-animate-bottom`; // Add the W3.CSS animation class
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
