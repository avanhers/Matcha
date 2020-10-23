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
