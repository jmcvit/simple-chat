import './App.css';

import { Box, Button, Card, CssBaseline, Input, List } from '@material-ui/core';
import React, { useContext, useEffect, useRef, useState } from 'react';

import { AppContext } from './context/AppContext';
import Messages from './components/Messages';
import io from "socket.io-client";

const App = () => {
    const [messages, setMessages] = useContext(AppContext);
    const [message, setMessage] = useState('');
    const socket = useRef(null);

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
                        <Messages messages={messages} />
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
