// GlobalStyles.js
import { createGlobalStyle } from 'styled-components';

const ChatStyles = createGlobalStyle`
  div .cs-chat-container {
    background-color: #eeeeee; /* White background */
  }

  div .cs-message--outgoing .cs-message__content {
    background-color: #ffa552; /* Orange background for incoming messages */
  }

  div .cs-message--incoming .cs-message__content {
    background-color: #d3d3d3; /* Light grey background for outgoing messages */
  }

  div .cs-message-separator {
    color: #ffa552; /* Orange color for message separator */
  }

  div .cs-message-input__button {
    background-color: #ffa552; /* Orange background for send and attach buttons */
    border-color: #ffa552;
  }

  div .cs-message-input__button:hover {
    background-color: #ff8c00; /* Darker orange for hover effect */
    border-color: #ff8c00;
  }

  div .cs-message-list__typing-indicator-container div {
    color: #ffa552;
  }

  div .cs-main-container,
  div .cs-chat-container .cs-message-input {
    border: 0px;
  }

  div .ps__rail-y:hover,
  div .ps .ps__rail-y:hover,
  div .ps__rail-y {
    background-color: #ffffff; /* White background */
  }

  div .cs-message-input__content-editor-wrapper,
  .cs-message-input__content-editor-container,
  .cs-message-input__content-editor
  {
    background-color: #eeeeee; 
  }

  .cs-conversation-header__content,
  .cs-conversation-header,
  .cs-conversation-header__user-name
  {
    background-color: #ffa552;
  }

  div .ps__thumb-y,
  div .ps__rail-y:hover .ps__thumb-y,
  div .ps__rail-y:active .ps__thumb-y {
    background-color: #ffa552;
  }

  div .cs-typing-indicator__dot {
    background-color: #ffa552;
  }
`;

export default ChatStyles;
