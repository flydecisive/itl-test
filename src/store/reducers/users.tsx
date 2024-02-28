import {
  SET_ALL_USERS,
  SET_FAVORITES_USERS,
  SET_USER_POSTS,
} from "../actions/types/users";

const initialState = {
  allUsers: [],
  favoritesUsers: [],
  userPosts: [],
};

function usersReducer(state = initialState, action: any) {
  switch (action.type) {
    case SET_ALL_USERS: {
      const { allUsers } = action.payload;

      return {
        ...state,
        allUsers: allUsers,
      };
    }

    case SET_FAVORITES_USERS: {
      const { favoritesUsers } = action.payload;

      return {
        ...state,
        favoritesUsers: favoritesUsers,
      };
    }

    case SET_USER_POSTS: {
      const { userPosts } = action.payload;

      return {
        ...state,
        userPosts: userPosts,
      };
    }

    default:
      return state;
  }
}

export default usersReducer;
