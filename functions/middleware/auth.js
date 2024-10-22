import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

const auth = async (req, res, next) => {
	console.log("middleware")
	try {
		const token = req.headers.authorization?.split(" ")[1];
		const isCustomAuth = token?.length < 500;
		let decodedData;
		if (token && isCustomAuth) {
			decodedData = jwt.verify(token, process.env.SECRET_WORD);

			req.userId = decodedData?.id;
		} else {
			decodedData = jwt.decode(token);
			req.userId = decodedData?.sub;
		}
		next();
	} catch (error) {
		console.log(error);
	}
}

export default auth;