import { GoogleAuthProvider, signInWithPopup, UserCredential } from "firebase/auth";
import { auth, db } from "./firebase";
import { toast } from "react-toastify";
import { setDoc, doc } from "firebase/firestore";

function SignInwithGoogle() {
  async function googleLogin() {
    try {
      const provider = new GoogleAuthProvider();
      const result: UserCredential = await signInWithPopup(auth, provider);
      const user = result.user;
      
      if (user) {
        const displayName = user.displayName || "";
        const [firstName, ...lastNameParts] = displayName.split(" ");
        const lastName = lastNameParts.join(" ");
        const username = `${firstName} ${lastName}`;

        await setDoc(doc(db, "Users", user.uid), {
          email: user.email,
          username: username,
          photo: user.photoURL || "",
          role: "member",
        });
        
        toast.success("User logged in Successfully", {
          position: "top-center",
        });
        
        window.location.href = "/";
      }
    } catch (error) {
      console.error("Google login error: ", error);
      toast.error("Failed to sign in with Google");
    }
  }
  
  return (
    <div>
      <div
        style={{ display: "flex", justifyContent: "center", cursor: "pointer" }}
        onClick={googleLogin}
      >
        <img src={require("../../google.png")} width={"60%"} alt="Google Sign-In" />
      </div>
    </div>
  );
}

export default SignInwithGoogle;