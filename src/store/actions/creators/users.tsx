import {
  SET_ALL_USERS,
  SET_FAVORITES_USERS,
  SET_USER_POSTS,
} from "../types/users";

export const setAllUsers = (allUsers: object) => ({
  type: SET_ALL_USERS,
  payload: { allUsers },
});

export const setFavoritesUsers = (favoritesUsers: []) => ({
  type: SET_FAVORITES_USERS,
  payload: { favoritesUsers },
});

export const setUserPosts = (userPosts: []) => ({
  type: SET_USER_POSTS,
  payload: {
    userPosts,
  },
});
