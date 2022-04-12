import { Request, Response } from "express";
import config from "config";

import {
	createSession,
	findSessions,
	updateSession,
} from "../services/session.service";
import { validatePassword } from "../services/user.service";
import { signJWT } from "../utils/jwt.utils";
import { ConfigName } from "../../config/default";

export const getSessionHandler = async (req: Request, res: Response) => {
	const userID = res.locals.user._id;
	// console.log('res.locals', res.locals)
	// console.log("userID", userID);
	const sessions = await findSessions({ user: userID, isValid: true });
	// console.log("sessions", sessions);
	return res.send(sessions);
};

export const createSessionHandler = async (req: Request, res: Response) => {
	// validate user's password
	const user = await validatePassword(req.body);
	if (!user) {
		return res.status(401).send("Invalid email or password");
	}

	try {
		// create a session
		const session = await createSession(
			user._id,
			req.headers["user-agent"] || ""
		);

		// create a access token
		const accessToken = signJWT(
			{ ...user, session: session._id },
			{ expiresIn: config.get<string>(ConfigName.accessTokenExpiration) }
		);

		// create a refresh token
		const refreshToken = signJWT(
			{ ...user, session: session._id },
			{ expiresIn: config.get<string>(ConfigName.refreshTokenExpiration) }
		);

		// return access and refresh tokens
		res.send({ accessToken, refreshToken });
	} catch (error: any) {
		return res.status(409).send(error.message);
	}
};

export async function deleteSessionHandler(req: Request, res: Response) {
	const sessionID = res.locals.user.session;

	await updateSession({
		query: { _id: sessionID },
		update: { isValid: false },
	});

	return res.send({
		accessToken: null,
		refreshToken: null,
	});
}
