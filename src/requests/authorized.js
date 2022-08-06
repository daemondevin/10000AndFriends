import { useGoogleAuth } from "../context/googleAuth";

export default  (url, method = "GET", body) => {
	const { googleUser } = useGoogleAuth();
	console.log(googleUser);
	return fetch(url, {
			method: method,
			headers: {
				Authorization: googleUser.tokenId,
			},
		});
};
