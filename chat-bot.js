document.addEventListener("DOMContentLoaded", () => {
  const deleteButton = document.getElementById("btn-delete");
  deleteButton.addEventListener("click", () => {
    isDeleting = true; // Set the flag to indicate a deletion process
    showConfirmationPrompt();
  });
  const userInput = document.getElementById("user-input");
  userInput.addEventListener("input", handleInputChange);
  const sendButton = document.getElementById("send-button");
  sendButton.addEventListener("click", handleUserInput);
  userInput.addEventListener("keypress", (event) => {
    if (event.key === "Enter") {
      handleUserInput();
    }
  });
});

let isSending = false; // Add a flag to track the sending status
let isDeleting = false; // Add a flag to track the deletion status

function showConfirmationPrompt() {
  const messagesDiv = document.getElementById("messages");

  const existingConfirmationPrompt = document.querySelector(".confirmation-prompt-message");
  if (existingConfirmationPrompt) {
    return;
  }

  const confirmationMessage = document.createElement("div");
  confirmationMessage.className = "message bot confirmation-prompt-message";
  confirmationMessage.innerHTML = `
    <span>Would you like to delete the conversation?</span>
    <div>
      <button id="confirm-yes" class="confirmation-button">Yes</button>
      <button id="confirm-no" class="confirmation-button">No</button>
    </div>
  `;

  messagesDiv.insertBefore(confirmationMessage, messagesDiv.firstChild);
  messagesDiv.scrollTop = messagesDiv.scrollHeight;

  const confirmYesButton = document.getElementById("confirm-yes");
  const confirmNoButton = document.getElementById("confirm-no");

  confirmYesButton.addEventListener("click", () => {
    clearChat();
    confirmationMessage.remove();
    clearTimeout(hideTimeout);
  });

  confirmNoButton.addEventListener("click", () => {
    confirmationMessage.remove();
    clearTimeout(hideTimeout);
    isDeleting = false; // Reset the flag if deletion is canceled
  });

  const hideTimeout = setTimeout(() => {
    confirmationMessage.remove();
    isDeleting = false; // Reset the flag if deletion prompt times out
  }, 5000);
}

function clearChat() {
  const messagesDiv = document.getElementById("messages");
  const allMessages = Array.from(messagesDiv.children);

  const initialMessages = allMessages.filter(msg => !msg.classList.contains("user") && !msg.classList.contains("bot"));

  messagesDiv.innerHTML = "";

  initialMessages.forEach(msg => messagesDiv.appendChild(msg));

  isDeleting = false; // Reset the deletion flag after the chat is cleared
}

function handleUserInput() {
  if (isDeleting) {
    document.querySelector(".confirmation-prompt-message").remove();
    isDeleting = false; // Reset the deletion flag
  }
  sendMessage();
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
        startConversation();
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
  displayMessagesSimultaneously(initialMessages);
}

function displayMessagesSimultaneously(messages) {
  const messagesDiv = document.getElementById("messages");

  messages.forEach((message, index) => {
    const messageDiv = document.createElement("div");
    messageDiv.className = `message bot w3-animate-bottom`;
    const profilePic = document.createElement("div");
    profilePic.className = "profile-pic";
    profilePic.style.backgroundImage =
      "url('https://sg8ebf.p3cdn2.secureserver.net/wp-content/uploads/2013/05/Virtual-Assistant.jpg')";
    const messageContent = document.createElement("div");
    messageContent.className = "message-content";
    messageContent.innerText = message;
    messageDiv.appendChild(profilePic);
    messageDiv.appendChild(messageContent);
    messagesDiv.appendChild(messageDiv);
  });

  messagesDiv.scrollTop = messagesDiv.scrollHeight;
}

function isChatEmpty() {
  const messagesDiv = document.getElementById("messages");
  return messagesDiv.children.length === 0;
}

async function sendMessage() {
  if (isSending || isDeleting) return; // Exit if a message is already being sent or chat is being deleted
  isSending = true; // Set the flag to indicate a message is being sent

  const input = document.getElementById("user-input").value;
  if (input.trim() === "") {
    isSending = false; // Reset the flag if input is empty
    return;
  }

  const successMessage = document.querySelector(".confirmation-message");
  if (successMessage) {
    successMessage.remove();
  }

  const confirmationMessage = document.querySelector(".confirmation-prompt-message");
  if (confirmationMessage) {
    confirmationMessage.remove();
  }

  fadeOutSuggestions();

  displayMessage("User", input);
  document.getElementById("user-input").value = "";

  const botResponse = await fetchBotResponse(input);

  if (isDeleting) {
    isSending = false; // Reset the flag if deletion starts
    return;
  }

  setTimeout(() => {
    hideLoadingIndicator();
    if (!isDeleting) {
      displayMessage("Bot", botResponse);
    }
    showSuggestions();
    isSending = false; // Reset the flag after receiving the response
  }, 1000);
}

function displayLoadingIndicator() {
  const dotsContainer = document.querySelector(".dotsContainer");
  dotsContainer.style.display = "flex";
}

function hideLoadingIndicator() {
  const dotsContainer = document.querySelector(".dotsContainer");
  dotsContainer.style.display = "none";
}

function fadeOutSuggestions() {
  const suggestions = document.getElementById("suggestions");
  suggestions.style.opacity = "0";
  setTimeout(() => {
    suggestions.style.display = "none";
    displayLoadingIndicator();
  }, 500);
}

function showSuggestions() {
  const suggestions = document.getElementById("suggestions");
  suggestions.style.display = "block";
  setTimeout(() => {
    suggestions.style.opacity = "1";
  }, 10);
  adjustInputSectionPosition();
}

async function fetchBotResponse(userInput) {
  let botResponse = "I did not understand that.";
  try {
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer YOUR_API_KEY`
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
    console.log("API Response:", data);
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
  messagesDiv.scrollTop = messagesDiv.scrollHeight;
  if (callback) {
    messageDiv.addEventListener("animationend", callback, { once: true });
  }
}

function fillInput(suggestion) {
  document.getElementById("user-input").value = suggestion;
  handleUserInput();
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
    handleUserInput();
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
