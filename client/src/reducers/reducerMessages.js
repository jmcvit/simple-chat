const reducerMessages = (state = [], action) => {
    switch (action.type) {
        case 'MESSAGE':
            return [...state, action.text];
        default:
            return state;
    }
}

export default reducerMessages;
