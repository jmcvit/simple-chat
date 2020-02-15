import './App.css';

import { Box, Button, Card, CssBaseline, Input, List } from '@material-ui/core';
import React, { useContext, useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { AppContext } from './context/AppContext';
import Messages from './components/Messages';
import { actionMessage } from './actions';
import io from "socket.io-client";

const App = () => {
    const [messages, setMessages] = useContext(AppContext);
    const messagesRedux = useSelector(state => state.messages);
    const [message, setMessage] = useState('');
    const socket = useRef(null);
    const dispatch = useDispatch();

    useEffect(() => {
        socket.current = io.connect('http://localhost:3001');
        return () => {
            socket.disconnect();
        }
    }, []);

    useEffect(() => {
        socket.current.on('message', (message) => {
            setMessages([...messages, message]);
        });
    }, [messages, setMessages]);

    const sendMessage = (e) => {
        e.preventDefault();
        if (message !== '') {
            dispatch(actionMessage(message));
            socket.current.emit('message', message);
            setMessage('');
        }
    }

    const handleInput = (e) => {
        setMessage(e.target.value);
    }

    const handleEnterKey = (e) => {
        if (e.key === 'Enter') {
            sendMessage(e);
        }
    }

    return (
        <React.Fragment>
            <CssBaseline />
            <Box className="App"
                color="primary">
                <Card className="cardMessages">
                    <List>
                        {/* NOTE_2020_02_15 (Jose Camporro):
                            Replacing this with messagesRedux for demo
                            <Messages messages={messages} /> */}
                        <Messages messages={messagesRedux} />
                    </List>
                </Card>
                <Card className="cardInput">
                    <Input className="input"
                        placeholder="Enter a message"
                        value={message}
                        onChange={handleInput}
                        onKeyPress={handleEnterKey}
                    />
                    <Button className="button"
                        variant="contained"
                        color="primary"
                        onClick={sendMessage}
                    >Send</Button>
                </Card>
            </Box>
        </React.Fragment>
    );
};

export default App;
