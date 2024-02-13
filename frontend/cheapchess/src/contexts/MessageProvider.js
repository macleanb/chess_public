/** This module is for providing a simple interface for programmers
 *  to pop custom help, error, or success messages to the user from 
 *  anywhere in the app.
 */
import { createContext, useState } from "react";

const MessageContext = createContext({});

export const MessageProvider = ({ children }) => {
  const [ messages, setMessages ] = useState({});

  return (
    <MessageContext.Provider value={{ messages, setMessages }}>
      { children }
    </MessageContext.Provider>
  );
}

export default MessageContext;