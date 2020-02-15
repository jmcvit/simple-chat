import React, { createContext, useState } from 'react';

export const AppContext = createContext();

export const AppProvider = (props) => {
    const [messages, setMessages] = useState([]);

    return <AppContext.Provider value={[messages, setMessages]}>
        {props.children}
    </AppContext.Provider>
}
