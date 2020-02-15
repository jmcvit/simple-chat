import React, { useContext } from 'react';

import { AppContext } from '../context/AppContext';
import Message from './Message';
import ScrollToBottom from 'react-scroll-to-bottom';

const Messages = () => {
    const [messages, setMessages] = useContext(AppContext);

    return (
        <ScrollToBottom>
            {messages.map((message, i) => {
                return <div key={i}>
                    <Message message={message} />
                </div>
            })}
        </ScrollToBottom>
    );
};

export default Messages;
