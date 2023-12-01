
import React, { useState, useEffect } from 'react';

import * as chatService from './ChatbotService';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faQuestionCircle, faX } from '@fortawesome/free-solid-svg-icons';


import './chatbot.scss';

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);

  const [messages, setMessages] = useState([]);
  const [question, setQuestion] = useState([]);
  const [pending, setPending] = useState([]);

  // generate welcome message on page load
  useEffect(() => {
    if(isOpen) {
      let res = chatService.getWelcome();
      renderPending(res.text, res.choices);
    }
  }, [isOpen]);



  const openChat = () => {
    setIsOpen(true);
  }

  const closeChat = () => {
    setIsOpen(false);
    setMessages([]);

  }


  const renderPending = (text, choices) => {
    console.log(text);
    console.log(choices);
    setPending(
      <div>
        <div>{text}</div>
        { choices.map(c => {
          return (
            <div>
              <button className='btn btn-secondary' onClick={() => selectChoice(text, c)}>{c}</button>
            </div>
          )
        })}
      </div>
    )
  }

  const selectChoice = (question, answer) => {
    // update messages
    let arr = messages;
    arr.push(question);
    arr.push(answer);
    setMessages(arr);

    // get new pending
    let res = chatService.getReply(question, answer);
    renderPending(res.text, res.choices);
  }


  return (
    <div>
      { isOpen && (
        <div className='chat-container'>
          <div className='chat-header'>
            <div className='close-chat-button'><FontAwesomeIcon icon={faX} size={'1x'} onClick={() => closeChat()} /></div>
          </div>
          <div className='chat-body'>
            { messages.map(msg => {
              return (
                <div>{msg}</div>
              )
            })}
            {pending}
          </div>
        </div>
      )}
      { !isOpen && (
        <div className='open-chat-button'><FontAwesomeIcon icon={faQuestionCircle} size={'3x'} onClick={() => openChat()} /></div>
      )}

    </div>
  );
}

