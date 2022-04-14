import mongoose from "mongoose";
import { MongoMemoryServer } from "mongodb-memory-server";
import supertest from "supertest";
import createServer from "../utils/server";

const app = createServer();

// beforeEach(() => jest.useFakeTimers());
afterEach(() => jest.useRealTimers());
describe("product", () => {
	
	jest.useFakeTimers();

	beforeAll(async () => {
		const mongoServer = await MongoMemoryServer.create();
		await mongoose.connect(mongoServer.getUri());
	});

	afterAll(async () => {
		await mongoose.disconnect();
		await mongoose.connection.close();
	});
	describe("get product route", () => {
		describe("given the product does not exist", () => {
			jest.useFakeTimers();
			it("should return a 404", async () => {
				jest.useFakeTimers();
				const productID = "productID-001";
				console.log('await supertest(app)', await supertest(app).get(`/product/${productID}`));
				await supertest(app).get(`/api/products/${productID}`).expect(404);
			});
		});
	});
});
