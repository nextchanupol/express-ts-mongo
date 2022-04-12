import { get } from "lodash";
import { Request, Response, NextFunction } from "express";
import { verifyJWT } from "../utils/jwt.utils";
import { reIssueRefreshToken } from "../services/session.service";

const deserializeUser = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	const accessToken = get(req, "headers.authorization", "").replace(
		/^Bearer\s/,
		""
	);

	const refreshToken = get(req, "headers.x-refresh-token", "");

	if (!accessToken) {
		return next();
	}

	const { decoded, expired } = verifyJWT(accessToken);

	if (decoded) {
		res.locals.user = decoded;
		return next();
	}

	if (expired && refreshToken) {
		const newAccessToken = await reIssueRefreshToken({ refreshToken });

		if (newAccessToken) {
			res.setHeader("x-access-token", newAccessToken);
		}

		const token = typeof newAccessToken === "string" ? newAccessToken : "";
		const result = verifyJWT(token);

		res.locals.user = result.decoded;
		return next();
	}

	return next();
};

export default deserializeUser;