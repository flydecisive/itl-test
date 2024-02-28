import React, { useContext } from "react";

interface UserRequestContextProps {
  data: {
    isLoading: boolean;
    isError: boolean;
    pagesCount: number;
  };
  setData: (params: any) => void;
}

export const UserRequestContext = React.createContext<UserRequestContextProps>({
  data: {
    isLoading: false,
    isError: false,
    pagesCount: 1,
  },
  setData: () => null,
});

export function useUserRequestContext() {
  const data = useContext(UserRequestContext);

  return data;
}
