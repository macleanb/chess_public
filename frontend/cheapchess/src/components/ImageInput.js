////////////////
///  Imports ///
////////////////

/* External Libraries */
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

/* Internal Libraries */
import constants from '../constants';

/* This component provides an input field and controls for images, to be used in forms */
const ImageInput = ({
  formData,
  backendImageExists,
  bootstrapSettings,
  handleClearImageClicked,
  updateDeleteMode,
  onChange
}) => 
{
  return (
    <div className={ `d-flex flex-wrap justify-content-center align-items-center ${ bootstrapSettings ? bootstrapSettings : 'mb-4' }` }>
      <Form.Group className="mb-3 ms-1 me-1 text-start" controlId={ constants.IMAGE_FIELD_NAME }>
        <Form.Label className="colorsettings_listtext">{ backendImageExists && updateDeleteMode ? "Replace existing image" : "Image"}</Form.Label>
        <Form.Control className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          type="file" 
          onChange={ onChange }
          value={ formData?.imageFileName ? formData.imageFileName : ''}
          name="image"
          accept="image/jpeg,image/png,image/gif"
        />
      </Form.Group>
      {
        formData?.imageFileName 
        ? 
          <Button variant="primary" className="h-40 ms-1 mt-3" onClick={ handleClearImageClicked }>
            Clear Selection
          </Button>
        :
        backendImageExists && updateDeleteMode
        ? 
          <Form.Check
            className="ms-1 mt-3"
            type="checkbox"
            name="deleteExistingImageCheckbox"
            label={<b className="colorsettings_listtext">Delete Existing Image</b>}
            onChange={ onChange }
            checked={ formData?.deleteExistingImage ? formData.deleteExistingImage : false }
          />
        : ''
      }
    </div>
  );
}

export default ImageInput;