/* External Imports */
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import React, { useContext, useEffect, useState } from 'react';

/* Internal Imports */
import MessageContext from '../contexts/MessageProvider';

/* Displays a message modal wrapped in a Form.  The Form is needed
   to support closing it with the enter key; however, even though 
   the enter key closes the Modal, the Form wrapper is retained
   in the virtual DOM */ 
const MessageDisplay = () => {
  const { messages, setMessages } = useContext(MessageContext);
  const [show, setShow] = useState(false);

  /* Clear messages and hide the modal */
  const handleClose = (e) => {
    setMessages(null);
    setShow(false);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleClose();
    }
  };

  const handleShow = () => setShow(true);

  useEffect(() => {
    if ( messages && Object.keys(messages).length > 0 ) {
        handleShow();
    }
  }, [messages]);

  return (
    <section className="d-flex flex-column flex-wrap border-left justify-content-center">
      {
        <Form role="form" onKeyDown={ handleKeyDown }>
          <Modal show={ show } onHide={ handleClose } onKeyDown={ handleKeyDown }>
            <Modal.Header closeButton>
              <Modal.Title>Message(s)</Modal.Title>
            </Modal.Header>
    
            <Modal.Body>
              { 
                messages
                ?
                  Object.entries(messages).map(([field, message]) => {
                    return (<p key={field} aria-live="assertive">{field}: {message}</p>);
                  })
                : ''
              }
            </Modal.Body>
    
            <Modal.Footer>
              <Button variant="primary" onClick={ handleClose }>Acknowledge</Button>
            </Modal.Footer>
          </Modal>
        </Form>
      }
    </section>
  );
}

export default MessageDisplay;
