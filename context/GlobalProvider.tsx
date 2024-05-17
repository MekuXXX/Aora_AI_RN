import { getCurrentUser } from "@/lib/appwrite";
import { createContext, useContext, useState, useEffect } from "react";
import { Models } from "react-native-appwrite/src";

type ContextType = {
  isLoggedIn: boolean;
  setIsLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
  user: Models.Document | null;
  setUser: React.Dispatch<React.SetStateAction<Models.Document | null>>;
  isLoading: boolean;
};

const initialContext: ContextType = {
  isLoggedIn: false,
  setIsLoggedIn: () => {},
  user: null,
  setUser: () => {},
  isLoading: true,
};

const GlobalContext = createContext<ContextType>(initialContext);

export const useGlobalContext = () => useContext(GlobalContext);

type GlobalProviderProps = {
  children: React.ReactNode;
};
export const GlobalProvider = ({ children }: GlobalProviderProps) => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [user, setUser] = useState<Models.Document | null>(null);

  useEffect(() => {
    setIsLoading(true);
    getCurrentUser()
      .then((res) => {
        if (res) {
          setIsLoggedIn(true);
          setUser(res);
        } else {
          setIsLoggedIn(false);
          setUser(null);
        }
      })
      .catch((err) => console.log(err))
      .finally(() => setIsLoading(false));
  }, []);

  return (
    <GlobalContext.Provider
      value={{
        isLoggedIn,
        setIsLoggedIn,
        user,
        setUser,
        isLoading,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};
