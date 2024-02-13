const constants = {
  /* Colors */
  COLOR_PIECE_LIGHT: 'lightpiece',
  COLOR_PIECE_DARK: 'darkpiece',
  COLOR_SQUARE_LIGHT: 'lightsquare',
  COLOR_SQUARE_DARK: 'darksquare',

  /* Field Names */
  FIELD_NAME_AUTH_EMAIL: 'AUTH_EMAIL_FIELD',
  FIELD_NAME_PASSWORD: 'PASSWORD_FIELD',
  FIELD_NAME_FIRST_NAME: 'FIRST_NAME_FIELD',
  FIELD_NAME_LAST_NAME: 'LAST_NAME_FIELD',
  FIELD_NAME_STREET: 'STREET_FIELD',
  FIELD_NAME_STREET2: 'STREET2_FIELD',
  FIELD_NAME_CITY: 'CITY_FIELD',
  FIELD_NAME_ADDR_STATE: 'ADDR_STATE_FIELD',
  FIELD_NAME_ZIPCODE: 'ZIPCODE_FIELD',
  FIELD_NAME_IMAGE: 'IMAGE_FIELD',
  FIELD_NAME_JOINED_DATE: 'JOINED_DATE_FIELD',

  /* Form Modes and Types */
  FORM_MODE_ADDRESS_ADD: 'ADDRESS_ADD_MODE',
  FORM_MODE_ADDRESS_UPDATE_DELETE: 'ADDRESS_UPDATE_DELETE_MODE',
  FORM_MODE_ADDRESS_UPDATE: 'ADDRESS_UPDATE_MODE',
  FORM_MODE_PROMPT_ADD_MAILING_ADDRESS_TO_USER: 'PROMPT_ADD_MAILING_ADDRESS_TO_USER_MODE',
  FORM_MODE_USER_ADD: 'USER_ADD_MODE',
  FORM_MODE_USER_PROFILE: 'USER_PROFILE_MODE',
  FORM_MODE_USER_SELF_REGISTER: 'USER_SELF_REGISTER_MODE',
  FORM_MODE_USER_UPDATE_DELETE: 'USER_UPDATE_DELETE_MODE',

  FORM_TYPE_USER: 'USER_FORM_TYPE',
  FORM_TYPE_ADDRESS_FOR_USER: 'ADDRESS_FORM_TYPE_FOR_USER',

  /* Address Permissions */
  PERMISSIONS_CAN_VIEW_ADDRESS: ['Can view address'],
  PERMISSIONS_CAN_ADD_ADDRESS: ['Can add address'],
  PERMISSIONS_CAN_UPDATE_ADDRESS: ['Can change address'],
  PERMISSIONS_CAN_DELETE_ADDRESS: ['Can delete address'],

  /* User Permissions */
  PERMISSIONS_CAN_VIEW_ALL_USERS: ['Can view ALL chessusers'],
  PERMISSIONS_CAN_UPDATE_ALL_USERS: ['Can update ALL chessusers'],
  PERMISSIONS_CAN_DELETE_ALL_USERS: ['Can delete ALL chessusers'],
  PERMISSIONS_CAN_VIEW_USER: ['Can view chess user'],
  PERMISSIONS_CAN_UPDATE_USER: ['Can change chess user'],
  PERMISSIONS_CAN_DELETE_USER: ['Can delete chess user'],
  PERMISSIONS_CAN_ADD_USER: ['Can add chess user'],

  /* URLs */
  URL_AUTHENTICATED_USER: 'http://localhost:8000/users/authenticateduser',
  URL_BACKEND_BASE: 'http://127.0.0.1:8000',
  URL_LOGIN: 'http://localhost:8000/users/login',
  URL_LOGOUT: 'http://localhost:8000/users/logout',
  URL_REGISTER: 'http://localhost:8000/users/register',
  URL_USERS: 'http://localhost:8000/users/',
  URL_GAME: 'http://localhost:8000/games/',

  /* Status */
  STATUS_AWAITING_DATA: 'AWAITING_DATA_STATUS',
  STATUS_NOT_AUTHENTICATED: 'NOT_AUTHENTICATED',
  STATUS_AUTHENTICATED: 'AUTHENTICATED',
};

/* Composite permissions that rely on existing ones: */
constants['ADMIN_PERMISSIONS'] = constants.PERMISSIONS_CAN_VIEW_ALL_USERS.concat(
                                 constants.PERMISSIONS_CAN_DELETE_ALL_USERS).concat(
                                 constants.PERMISSIONS_CAN_VIEW_ADDRESS).concat(
                                 constants.PERMISSIONS_CAN_ADD_ADDRESS).concat(
                                 constants.PERMISSIONS_CAN_UPDATE_ADDRESS).concat(
                                 constants.PERMISSIONS_CAN_DELETE_ADDRESS);

constants['BASIC_USER_PERMISSIONS'] = constants.PERMISSIONS_CAN_VIEW_USER.concat(
                                 constants.PERMISSIONS_CAN_UPDATE_USER).concat(
                                 constants.PERMISSIONS_CAN_VIEW_ADDRESS).concat(
                                 constants.PERMISSIONS_CAN_ADD_ADDRESS).concat(
                                 constants.PERMISSIONS_CAN_UPDATE_ADDRESS);

export default constants;



