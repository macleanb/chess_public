////////////////
///  Imports ///
////////////////

/* External Libraries */
import { useContext } from 'react';
import Form from 'react-bootstrap/Form';

/* Internal Libraries */
import MessageContext from '../contexts/MessageProvider';

/* This component provides input fields for users, to be used in forms */
const UserInputs = ({
  parentRefs,
  parentState
  }) =>
{
  ///////////////////////
  ///   Declarations  ///
  ///////////////////////

  const { messages } = useContext(MessageContext);

  /////////////////
  ///   Render  ///
  /////////////////

  return (
    <div className="user-inputs-container">
      {
        parentRefs &&
        parentState?.imports?.Button &&
        parentState.imports.constants &&
        parentState.imports.Form
        ?
          <div>
            <Form.Group
              className="user-input-group"
              controlId={ parentState.imports.constants.FIELD_NAME_AUTH_EMAIL }
            >
              <Form.Label><strong>E-mail</strong></Form.Label>
              <Form.Control
                autoFocus
                name="email"
                onChange={ parentState.onUserFormChange }
                placeholder="Enter e-mail address" 
                ref={(c) => {
                  if (c) {
                    parentRefs.inputEmailRef.current = c;
                  }
                }}
                required
                type="email"
                value={ parentState.formData?.email ? parentState.formData.email : ''}
              />
              {
                messages?.email && (
                  <Form.Text className="alert-danger ms-2 text-danger" tooltip="true">
                    {messages.email}
                  </Form.Text>
                )
              }
            </Form.Group>
            <Form.Group
              className="user-input-group"
              controlId={ parentState.imports.constants.FIELD_NAME_PASSWORD }
            >
              <Form.Label><strong>Password</strong></Form.Label>
              <Form.Control
                name="password"
                onChange={ parentState.onUserFormChange }
                placeholder="Enter password" 
                ref={(c) => {
                  if (c) {
                    parentRefs.inputPasswordRef.current = c;
                  }
                }}
                required
                type="password"
                value={ parentState?.formData?.password ? parentState.formData.password : ''}
              />
              {
                messages?.password && (
                  <Form.Text className="alert-danger ms-2 text-danger" tooltip="true">
                    {messages.password}
                  </Form.Text>
                )
              }
            </Form.Group>
            {
              parentState.formMode === parentState.imports.constants.FORM_MODE_USER_SELF_REGISTER
              ?
                <Form.Group
                  className="user-input-group"
                  controlId={ parentState.imports.constants.FIELD_NAME_FIRST_NAME }
                >
                  <Form.Label><strong>First Name</strong></Form.Label>
                  <Form.Control
                    name="first_name"
                    onChange={ parentState.onUserFormChange }
                    placeholder="Enter first name" 
                    ref={(c) => {
                      if (c) {
                        parentRefs.inputFirstNameRef.current = c;
                      }
                    }}
                    required
                    type="text"
                    value={ parentState.formData?.first_name ? parentState.formData.first_name : '' }
                  />
                  {
                    messages?.first_name && (
                      <Form.Text className="alert-danger ms-2 text-danger" tooltip="true">
                        {messages.first_name}
                      </Form.Text>
                    )
                  }
                </Form.Group>
              : ''
            }
            {
              parentState.formMode === parentState.imports.constants.FORM_MODE_USER_SELF_REGISTER
              ?
                <Form.Group
                  className="user-input-group"
                  controlId={ parentState.imports.constants.FIELD_NAME_LAST_NAME }
                >
                  <Form.Label><strong>Last Name</strong></Form.Label>
                  <Form.Control
                    name="last_name"
                    onChange={ parentState.onUserFormChange }
                    placeholder="Enter last name" 
                    ref={(c) => {
                      if (c) {
                        parentRefs.inputLastNameRef.current = c;
                      }
                    }}
                    required
                    type="text"
                    value={ parentState.formData?.last_name ? parentState.formData.last_name : '' }
                  />
                  {
                    messages?.last_name && (
                      <Form.Text className="alert-danger ms-2 text-danger" tooltip="true">
                        {messages.last_name}
                      </Form.Text>
                    )
                  }
                </Form.Group>
              : ''
            }
          </div>
        : ''
      }
    </div>
  )
};

export default UserInputs;