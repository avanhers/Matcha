/**
 * docker routes
 */

export const BASE_API_ROUTE = "http://localhost/api";
export const BASE_SOCKET_URL = "http://localhost/test";
export const SOCKET_PATH = "/api/socket.io";

/**
 * Léo routes (no docker)
 */
// export const BASE_API_ROUTE = "http://localhost:8088";
// export const BASE_SOCKET_URL = "http://localhost:8088/test";
// export const SOCKET_PATH = "/socket.io";

export const INSCRIPTION_ROUTE = BASE_API_ROUTE + "/auth/inscription";
export const CONFIRMATION_ROUTE = BASE_API_ROUTE + "/auth/confirmation";
export const CONNEXION_ROUTE = BASE_API_ROUTE + "/auth/login";
export const PASSWORD_RESET_ROUTE = BASE_API_ROUTE + "/auth/forgetPassword";
export const HASH_RESET_EXIST_ROUTE = BASE_API_ROUTE + "/auth/hashExist";
export const PASSWORD_CHANGE_ROUTE = BASE_API_ROUTE + "/auth/resetPassword";
export const MATCH_PROFIL_ROUTE = BASE_API_ROUTE + "/matches";
export const CAN_LOG_ROUTE = BASE_API_ROUTE + "/auth/canLog";
export const LOG_OUT_ROUTE = BASE_API_ROUTE + "/auth/logout";

/*USER ROUTE*/

export const PERSONNAL_INFO_ROUTE = BASE_API_ROUTE + "/user/personnalInfos";
export const GET_PERSONNAL_INFO = BASE_API_ROUTE + "/user/infos";
export const UPDATE_TAGS = BASE_API_ROUTE + "/user/updateTags";
export const CHANGE_AVATAR_ROUTE = BASE_API_ROUTE + "/user/setAvatar";
export const GET_AVATAR_ROUTE = BASE_API_ROUTE + "/user/avatar";
export const GET_TAGS_ROUTE = BASE_API_ROUTE + "/user/tags";
export const UPLOAD_IMAGE_ROUTE = BASE_API_ROUTE + "/user/uploadImage";
export const GET_IMAGES = BASE_API_ROUTE + "/user/images";
export const LIKE_USER = BASE_API_ROUTE + "/user/like";
export const UNLIKE_USER = BASE_API_ROUTE + "/user/unlike";
export const DELETE_IMAGE_ROUTE = BASE_API_ROUTE + "/user/image";
export const GET_EMAIL_ROUTE = BASE_API_ROUTE + "/user/email";
export const UPDATE_EMAIL_ROUTE = BASE_API_ROUTE + "/user/updateEmail";
export const GET_LIKES_ROUTE = BASE_API_ROUTE + "/user/likes";
export const GET_MATCHES_ROUTE = BASE_API_ROUTE + "/user/matches";
export const GET_VIEWS_ROUTE = BASE_API_ROUTE + "/user/views";
export const GET_NOTIFICATIONS = BASE_API_ROUTE + "/user/notifications";

export const LOCATION_ROUTE = BASE_API_ROUTE + "/user/location";
export const UPDATE_PASSWORD_ROUTE = BASE_API_ROUTE + "/user/updatePassword";

export const GET_PROFILE = BASE_API_ROUTE + "/user/profile/";

/*CHAT ROUTE*/

export const GET_MESSAGE = BASE_API_ROUTE + "/chat/messages";
export const GET_MESSAGE_USERS = BASE_API_ROUTE + "/chat/users";
