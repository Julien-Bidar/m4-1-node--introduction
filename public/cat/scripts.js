// here there be JS, yarrr ☠️
const messageInput = document.querySelector("#user-input");
const conversationElem = document.querySelector("#conversation-container");

const handlFocus = () => {
  messageInput.focus();
};

const sendMessage = (event) => {
  // prevent the default "page reload" from occurring.
  event.preventDefault();
  const message = { author: "user", text: messageInput.value };
  updateConversation(message);
  fetch("/cat-message")
    .then((res) => res.json())
    .then((data) => {
      updateConversation(data.message);
    });
};

const updateConversation = (message) => {
  console.log(message);
  //deconstruct object message
  const { author, text } = message;
  // create a p elem
  const messageElem = document.createElement("p");
  // add a 'message' class and a class based on the author
  messageElem.classList.add("message", author);
  // add text message to the p element
  messageElem.innerHTML = `<span>${text}</span>`;
  // append Element to conversationElem
  conversationElem.appendChild(messageElem);
  if (author === "user") {
    messageInput.value = "";
  }
  handlFocus();
};

handlFocus();
