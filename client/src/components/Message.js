import { ListItem } from '@material-ui/core';
import React from 'react';

const Message = ({ message }) => {
    return (
        <ListItem className="message">{message}</ListItem>
    );
};

export default Message;
