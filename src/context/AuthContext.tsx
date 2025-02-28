import { createContext, useEffect, useReducer, ReactNode, Dispatch } from "react";
import AuthReducer, { AuthAction } from "./AuthReducer";

interface AuthState {
  currentUser: any; // Consider replacing 'any' with a specific type for better type safety
}

const INITIAL_STATE: AuthState = {
  currentUser: JSON.parse(localStorage.getItem("user") || "null"),
};

interface AuthContextProps {
  currentUser: any; // Replace 'any' with a more specific type
  dispatch: Dispatch<AuthAction>;
}

export const AuthContext = createContext<AuthContextProps | undefined>(undefined);

interface AuthContextProviderProps {
  children: ReactNode;
}

export const AuthContextProvider: React.FC<AuthContextProviderProps> = ({ children }) => {
  const [state, dispatch] = useReducer(AuthReducer, INITIAL_STATE);

  useEffect(() => {
    localStorage.setItem("user", JSON.stringify(state.currentUser));
  }, [state.currentUser]);

  return (
    <AuthContext.Provider value={{ currentUser: state.currentUser, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
};
