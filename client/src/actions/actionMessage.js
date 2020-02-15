const actionMessage = (message) => {
    return {
        type: 'MESSAGE',
        text: message
    }
}

export default actionMessage;
