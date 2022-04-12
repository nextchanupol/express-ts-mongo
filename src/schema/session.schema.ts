import { object, string, TypeOf } from "zod";

export const createSessionSchema = object({
	body: object({
		email: string({
			required_error: "email is required",
		}).email("email must be a valid email address"),
		password: string({
			required_error: "name is required",
		}).min(6, "password must be at least 6 characters"),
		
	})
});
