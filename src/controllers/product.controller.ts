import { Request, Response } from "express";
import {
	CreateProductInput,
	ReadProductInput,
	UpdateProductInput,
} from "../schema/product.schema";
import {
	createProduct,
	deleteProduct,
	findAndUpdateProduct,
	findProduct,
} from "../services/product.service";

export const getProductHandler = async (
	req: Request<ReadProductInput["params"]>,
	res: Response
) => {
	console.log("res.locals", res.locals.user);
	const userID = res.locals.user ? res.locals.user._id : null;

	if (!userID) {
		return res.status(403).send({ message: "Unauthorized" });
	}

	const productID = req.params.productID;
	// console.log("productID", req.params.productID);

	if (!productID) {
		return res.sendStatus(400);
	}
	// const product = await findProduct({ productID });

	const product = await findProduct({ user: userID, productID });

	if (!product) {
		return res.sendStatus(404);
	}

	return res.send(product);
};

export const createProductHandler = async (
	req: Request<{}, {}, CreateProductInput["body"]>,
	res: Response
) => {
	const userID = res.locals.user._id;

	const body = req.body;

	const product = await createProduct({ ...body, user: userID });

	return res.send(product);
};

export const updateProductHandler = async (
	req: Request<UpdateProductInput["params"]>,
	res: Response
) => {
	const userID = res.locals.user._id;

	if (!userID) {
		return res.sendStatus(403);
	}

	const productID = req.params.productID;

	if (!productID) {
		return res.sendStatus(400);
	}

	const update = req.body;

	const product = await findProduct({ user: userID, _id: productID });

	if (!product) {
		return res.sendStatus(404);
	}

	if (String(product.user) !== userID) {
		return res.sendStatus(403);
	}

	const updatedProduct = await findAndUpdateProduct({ productID }, update, {
		new: true,
	});

	return res.send(updatedProduct);
};

export const deleteProductHandler = async (
	req: Request<UpdateProductInput["params"]>,
	res: Response
) => {
	const userID = res.locals.user._id;

	if (!userID) {
		return res.sendStatus(403);
	}

	const productID = req.params.productID;

	if (!productID) {
		return res.sendStatus(400);
	}

	const product = await findProduct({ user: userID, _id: productID });

	if (!product) {
		return res.sendStatus(404);
	}

	if (String(product.user) !== userID) {
		return res.sendStatus(403);
	}

	await deleteProduct({ productID });

	return res.sendStatus(200);
};
