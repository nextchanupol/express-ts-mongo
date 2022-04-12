import config from "config";
import { get } from "lodash";
import { FilterQuery, UpdateQuery } from "mongoose";
import { ConfigName } from "../../config/default";

import SessionModel, { SessionDocument } from "../models/session.model";
import { signJWT, verifyJWT } from "../utils/jwt.utils";
import { findUser } from "./user.service";

export const findSessions = async (query: FilterQuery<SessionDocument>) => {
	// console.log("query", query);
	return SessionModel.find(query).lean();
};

export const createSession = async (
	userID: string,
	userAgent: string
): Promise<any> => {
	const session = await SessionModel.create({
		user: userID,
		userAgent,
	});

	return session.toJSON();
};

export const updateSession = async ({
	query,
	update,
}: {
	query: FilterQuery<SessionDocument>;
	update: UpdateQuery<SessionDocument>;
}) => SessionModel.updateOne(query, update);

export const reIssueRefreshToken = async ({
	refreshToken,
}: {
	refreshToken: string;
}): Promise<string | false> => {
	const { decoded } = verifyJWT(refreshToken);

	if (!decoded && !get(decoded, "session")) return false;

	const session = await SessionModel.findById(get(decoded, "session"));

	if (!session || !session.isValid) return false;

	const user = await findUser({ _id: session.user });
	if (!user) return false;

	const accessToken = signJWT(
		{ ...user, session: session._id },
		{ expiresIn: config.get<string>(ConfigName.accessTokenExpiration) }
	);

	return accessToken;
};
