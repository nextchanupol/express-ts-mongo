import {
	DocumentDefinition,
	FilterQuery,
	QueryOptions,
	UpdateQuery,
} from "mongoose";

import ProductModel, { ProductDocument } from "../models/product.model";

export const createProduct = async (
	input: DocumentDefinition<Omit<ProductDocument, "createdAt" | "updatedAt">>
): Promise<ProductDocument & { _id: any }> => ProductModel.create(input);

export const findProduct = async (
	query: FilterQuery<ProductDocument>,
	options: QueryOptions = { lean: true }
): Promise<
	| (ProductDocument & {
			_id: any;
	  })
	| null
> => {
	return ProductModel.findOne(query, {}, options);
};

export const findAndUpdateProduct = async (
	query: FilterQuery<ProductDocument>,
	update: UpdateQuery<ProductDocument>,
	options: QueryOptions
) => {
	return ProductModel.findOneAndUpdate(query, update, options);
};

export const deleteProduct = async (query: FilterQuery<ProductDocument>) => {
	return ProductModel.deleteOne(query);
};
