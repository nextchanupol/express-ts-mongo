import { object, string, TypeOf } from "zod";

export const createUserSchema = object({
	body: object({
		name: string({
			required_error: "name is required",
		}),
		password: string({
			required_error: "name is required",
		}).min(6, "password must be at least 6 characters"),
		passwordConfirmation: string({
			required_error: "name is required",
		}).min(6, "password must be at least 6 characters"),
		email: string({
			required_error: "email is required",
		}).email("email must be a valid email address"),
	}).refine((data) => data.password === data.passwordConfirmation, {
		message: "Your password do not match",
		path: ["passwordConfirmation"],
	}),
});

export type CreateUserInput = Omit<
	TypeOf<typeof createUserSchema>,
	"body.passwordConfirmation"
>;
