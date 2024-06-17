import React from "react";
import { UserType } from "@/appwrite";
import { getCurrentUser } from "@/lib/appwrite";
import { createContext, useContext, useState, useEffect } from "react";
import { useColorScheme } from "nativewind";
import Storage from "@/lib/storage";

type ContextType = {
  isLoggedIn: boolean;
  user: UserType | null;
  isLoading: boolean;
  theme: "dark" | "light";
  setUser: React.Dispatch<React.SetStateAction<UserType | null>>;
  setIsLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
  toggleTheme: () => void;
  storage: Storage;
};

const storage = Storage.getInstance();
const initialContext: ContextType = {
  isLoggedIn: false,
  setIsLoggedIn: () => {},
  user: null,
  setUser: () => {},
  isLoading: true,
  theme: "dark",
  toggleTheme: () => {},
  storage,
};

const GlobalContext = createContext<ContextType>(initialContext);

export const useGlobalContext = () => useContext(GlobalContext);

type GlobalProviderProps = {
  children: React.ReactNode;
};
export const GlobalProvider = ({ children }: GlobalProviderProps) => {
  const { setColorScheme, colorScheme } = useColorScheme();
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [user, setUser] = useState<UserType | null>(null);

  const toggleTheme = () => {
    const nextTheme = colorScheme === "dark" ? "light" : "dark";
    setColorScheme(nextTheme);
    storage.saveItem("theme", nextTheme);
  };

  useEffect(() => {
    const theme = storage.getItem("theme");

    if (theme) {
      setColorScheme(theme as "dark");
    }
  }, []);

  useEffect(() => {
    setIsLoading(true);
    getCurrentUser()
      .then((res) => {
        if (res) {
          setIsLoggedIn(true);
          setUser(res!);
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
        theme: colorScheme,
        toggleTheme,
        storage,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};
