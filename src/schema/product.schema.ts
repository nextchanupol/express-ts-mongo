import { object, number, string, TypeOf } from "zod";

const payload = {
	body: object({
		title: string({
			required_error: "title is required",
		}),
		description: string({
			required_error: "description is required",
		}).min(120, "description must be at least 120 characters"),
		price: number({
			required_error: "price is required",
		}),
		image: string({
			required_error: "image is required",
		}),
	}),
};

const params = {
	params: object({
		productID: string({ required_error: "productID is required" }),
	}),
};

export const getProductSchema = object({
	...params,
});

export const createProductSchema = object({
	...payload,
});

export const updateProductSchema = object({
	...payload,
	...params,
});

export const deleteProductSchema = object({
	...params,
});

export type CreateProductInput = TypeOf<typeof createProductSchema>;
export type ReadProductInput = TypeOf<typeof getProductSchema>;
export type UpdateProductInput = TypeOf<typeof updateProductSchema>;
export type DeleteProductInput = TypeOf<typeof deleteProductSchema>;
