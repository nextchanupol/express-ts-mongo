import jwt from "jsonwebtoken";
import config from "config";
import logger from "./logger";
import { ConfigName } from "../../config/default";

const jwtPrivateKey = config.get<string>(ConfigName.jwtPrivateKey);
const jwtPublicKey = config.get<string>(ConfigName.jwtPublicKey);

interface VerifyJWT {
	valid: boolean;
	expired: boolean;
	decoded: string | jwt.JwtPayload | null;
}

export const signJWT = (
	object: Object,
	options?: jwt.SignOptions | undefined
) => {
	try {
		return jwt.sign(object, jwtPrivateKey, {
			...(options && options),
			algorithm: "RS256",
		});
	} catch (error: any) {
		logger.error(error.message);
		throw new Error(error.message);
	}
};

export const verifyJWT = (token: string): VerifyJWT => {
	try {
		const decoded = jwt.verify(token, jwtPublicKey);
		const returnValue: VerifyJWT = {
			valid: true,
			expired: false,
			decoded,
		};
		return returnValue;
	} catch (error: any) {
		logger.error(error);
		return {
			valid: false,
			expired: error.message === "jwt expired",
			decoded: null,
		};
	}
};
