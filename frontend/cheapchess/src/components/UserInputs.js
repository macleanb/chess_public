////////////////
///  Imports ///
////////////////

/* External Libraries */
import { useContext } from 'react';
import Form from 'react-bootstrap/Form';

/* Internal Libraries */
import constants from '../constants';
import FrontEndErrorContext from '../contexts/FrontEndErrorProvider';

/* This component provides input fields for users, to be used in forms */
const UserInputs = ( { userData, onChange, parentRefs, mode } ) => {


  //////////////////////
  ///   Use Effects  ///
  //////////////////////

  /* This is handled by autoFocus below.  We can't monitor refs with useEffect */
  // useEffect(() => {
  //   if (parentRefs?.inputEmailRef?.current) {
  //     parentRefs.inputEmailRef.current.focus();
  //   }
  // }, []);


  ///////////////////////
  ///   Declarations  ///
  ///////////////////////

  const { frontEndErrors } = useContext(FrontEndErrorContext);

  return (
    <div>
      <div className="d-flex flex-wrap justify-content-evenly">
        <Form.Group className="mb-4 text-start" controlId={ constants.AUTH_EMAIL_FIELD_NAME }>
          <Form.Label className="colorsettings_listtext">E-mail</Form.Label>
          <Form.Control 
            type="email" 
            placeholder="Enter e-mail address" 
            onChange={ onChange }
            ref={(c) => {
              if (c) {
                parentRefs.inputEmailRef.current = c;
              }
            }}
            value={ userData?.email ? userData.email : ''}
            required
            autoFocus
            name="email"
          />
          {
            frontEndErrors?.email && (
              <Form.Text className="alert-danger ms-2 text-danger" tooltip="true">
                {frontEndErrors.email}
              </Form.Text>
            )
          }
        </Form.Group>
        <Form.Group className="mb-4 text-start" controlId={ constants.PASSWORD_FIELD_NAME }>
          <Form.Label className="colorsettings_listtext">{`${ (mode === constants.MODE_USER_UPDATE_DELETE || mode === constants.MODE_USER_PROFILE) ? 'New ' : ''}Password`}</Form.Label>
          <Form.Control 
            type="password" 
            placeholder="Enter password" 
            onChange={ onChange }
            ref={(c) => {
              if (c) {
                parentRefs.inputPasswordRef.current = c;
              }
            }}
            value={ userData?.password ? userData.password : ''}
            required={(mode === constants.MODE_USER_ADD || mode === constants.MODE_USER_SELF_REGISTER)}
            name="password"
          />
          {
            frontEndErrors?.password && (
              <Form.Text className="alert-danger ms-2 text-danger" tooltip="true">
                {frontEndErrors.password}
              </Form.Text>
            )
          }
        </Form.Group>
      </div>
      <div className="d-flex flex-wrap justify-content-evenly">
        <Form.Group className="mb-4 text-start" controlId={ constants.FIRST_NAME_FIELD_NAME }>
          <Form.Label className="colorsettings_listtext">First Name</Form.Label>
          <Form.Control 
            type="text" 
            placeholder="Enter first name" 
            onChange={ onChange }
            ref={(c) => {
              if (c) {
                parentRefs.inputFirstNameRef.current = c;
              }
            }}
            value={ userData?.first_name ? userData.first_name : '' }
            required
            name="first_name"
          />
          {
            frontEndErrors?.first_name && (
              <Form.Text className="alert-danger ms-2 text-danger" tooltip="true">
                {frontEndErrors.first_name}
              </Form.Text>
            )
          }
        </Form.Group>
        <Form.Group className="mb-4 text-start" controlId={ constants.LAST_NAME_FIELD_NAME }>
          <Form.Label className="colorsettings_listtext">Last Name</Form.Label>
          <Form.Control 
            type="text" 
            placeholder="Enter last name" 
            onChange={ onChange }
            ref={(c) => {
              if (c) {
                parentRefs.inputLastNameRef.current = c;
              }
            }}
            value={ userData?.last_name ? userData.last_name : '' }
            required
            name="last_name"
          />
          {
            frontEndErrors?.last_name && (
              <Form.Text className="alert-danger ms-2 text-danger" tooltip="true">
                {frontEndErrors.last_name}
              </Form.Text>
            )
          }
        </Form.Group>
      </div>
    </div>
  );
}

export default UserInputs;