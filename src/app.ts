import config from "config";

import connect from "./utils/connect";
import logger from "./utils/logger";
import { ConfigName } from "../config/default";
import createServer from "./utils/server";

const port = config.get<number>(ConfigName.port);

const app = createServer();

app.listen(port, async () => {
	logger.info(`Server is running at http://localhost:${port}`);

	await connect();
});
