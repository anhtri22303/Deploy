interface AuthState {
  currentUser: any; // Consider replacing 'any' with a specific type for better type safety
}

interface AuthAction {
  type: "LOGIN" | "LOGOUT";
  payload?: any; // Replace 'any' with a more specific type if possible
}

const AuthReducer = (state: AuthState, action: AuthAction): AuthState => {
  switch (action.type) {
    case "LOGIN": {
      return {
        currentUser: action.payload,
      };
    }
    case "LOGOUT": {
      return {
        currentUser: null,
      };
    }
    default:
      return state;
  }
};

export default AuthReducer;
export type { AuthAction, AuthState };
