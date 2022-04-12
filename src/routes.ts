import { Express, Request, Response } from "express";
import {
	createProductHandler,
	deleteProductHandler,
	getProductHandler,
	updateProductHandler,
} from "./controllers/product.controller";

import {
	createSessionHandler,
	deleteSessionHandler,
	getSessionHandler,
} from "./controllers/session.controller";
import { createUserHandler } from "./controllers/user.controller";
import requireUser from "./middleware/requireUser";

import validateResource from "./middleware/validateResource";
import {
	createProductSchema,
	deleteProductSchema,
	getProductSchema,
	updateProductSchema,
} from "./schema/product.schema";

import { createSessionSchema } from "./schema/session.schema";
import { createUserSchema } from "./schema/user.schema";

const routes = (app: Express) => {
	app.get("/healthcheck", (req: Request, res: Response) => {
		res.sendStatus(200);
	});

	app.post("/api/users", validateResource(createUserSchema), createUserHandler);

	app.post(
		"/api/sessions",
		validateResource(createSessionSchema),
		createSessionHandler
	);

	app.get("/api/sessions", requireUser, getSessionHandler);

	app.delete("/api/sessions", requireUser, deleteSessionHandler);

	app.get(
		"/api/product/:productID",
		validateResource(getProductSchema),
		getProductHandler
	);

	app.post(
		"/api/product",
		[requireUser, validateResource(createProductSchema)],
		createProductHandler
	);

	app.put(
		"/api/product",
		[requireUser, validateResource(updateProductSchema)],
		updateProductHandler
	);

	app.delete(
		"/api/product",
		[requireUser, validateResource(deleteProductSchema)],
		deleteProductHandler
	);
};

export default routes;
