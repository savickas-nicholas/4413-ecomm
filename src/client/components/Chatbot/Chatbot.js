
import React, { useState, useEffect } from 'react';

import * as chatService from './ChatbotService';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faQuestionCircle, faX } from '@fortawesome/free-solid-svg-icons';


import './chatbot.scss';

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);

  // has format '{type, message}' where 'type' is 'bot' or 'user' 
  const [messages, setMessages] = useState([]);
  const [question, setQuestion] = useState([]);
  const [pending, setPending] = useState([]);

  // generate welcome message on page load
  useEffect(() => {
    if(isOpen) {
      let res = chatService.getWelcome();
      console.log(res)
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
    setPending(
      <div>
        <div className='alignLeft'>
          <span className='commentLeft'>{text()}</span>
        </div>
        <hr />
        { choices.map(c => {
          return (
            <div className='alignRight'>
              <button className='btn btn-light' onClick={(e) => { e.target.blur(); selectChoice(text(), c)} } >{c}</button>
            </div>
          )
        })}
      </div>
    )
  }
  

  const selectChoice = (question, answer) => {
    // update messages
    let arr = messages;
    arr.push({type: 'bot', message: question});
    arr.push({type: 'user', message: answer});
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
                <div className={msg.type === 'user' ? 'alignRight' : 'alignLeft'}>
                  <span className={msg.type === 'user' ? 'commentRight' : 'commentLeft'}>{msg.message}</span>
                </div>
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

