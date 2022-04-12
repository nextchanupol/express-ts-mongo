import mongoose from "mongoose";
import config from "config";

import logger from "./logger";
import { ConfigName } from "../../config/default";

const connect = async () => {
	const dbUri = config.get<string>(ConfigName.dbUri);

	try {
		await mongoose.connect(dbUri);
		logger.info("connected to db");
	} catch (error) {
		logger.error("could not connect to db", error);
		process.exit(1);
	}

	// return mongoose
	// 	.connect(dbUri)
	// 	.then(() => {
	// 		console.log("connected to db");
	// 	})
	// 	.catch((err) => {
	// 		console.error("could not connect to db", err);
	// 		process.exit(1);
	// 	});
};

export default connect;
