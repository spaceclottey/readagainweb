import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth"
import firebase from "../firebase/clientApp"

const uiConfig = {
  signInOptions: [firebase.auth.GithubAuthProvider.PROVIDER_ID],
  signInSuccessUrl: "/",
}

function SignInScreen(){
  return (
    <div>
      <p> Please sign in</p>
      <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={firebase.auth()} />
    </div> 
  )
}

export default SignInScreen