import React from "react";
import { useGoogleLogin } from "react-use-googlelogin";

const GoogleAuthContext = React.createContext(); // Not necessary, but recommended.

export const GoogleAuthProvider = ({ children }) => {
	const googleAuth = useGoogleLogin({
		clientId:
			"530671971831-348v6b7a9j9uk0asn59k5jfkffbf8agl.apps.googleusercontent.com",
	});
	console.log(googleAuth)
	return (
		<GoogleAuthContext.Provider value={googleAuth}>
			{children}
		</GoogleAuthContext.Provider>
	);
};

export const useGoogleAuth = () => React.useContext(GoogleAuthContext);


const GoogleLoginButton = () => {
	const { signIn } = useGoogleAuth();

	return <button onClick={signIn}>Sign in with Google</button>;
};
