import yupValidation, {
	businessUserFormValidationSchema,
	basicUserFormValidationSchema,
	vipUserFormValidationSchema,
} from '@/app/lib/yup';
import { customAlphabet } from 'nanoid';
import bcryptjs from 'bcryptjs';
import User from '@/app/models/user';
import connectDb from '@/app/lib/mongoDb';
import {
	AccountModel,
	AccountSchemaType,
	UserModel,
	UserSchemaType,
	accountTypes,
} from '@/app/types/types';
import Account from '@/app/models/account';

export async function POST(request: Request) {
	try {
		const accType = new URL(request.url).searchParams.get('accType');
		if (!accountTypes.find((s) => s === accType)) {
			return new Response(null, { status: 400 });
		}

		const body = await request.json();
		await connectDb();
		const nanoid = customAlphabet('1234567890', 16);

		if (accType === 'basic') {
			const { errors } = await yupValidation(
				basicUserFormValidationSchema,
				body
			);
			if (errors) {
				return new Response(errors, { status: 422 });
			}
			const hashedPassword = await bcryptjs.hash(body.password, 16);
			const newAccount = new Account<AccountSchemaType>({
				primary: true,
				accountType: 'basic',
				currency: body.currency,
			});
			const account: AccountModel = await newAccount.save();
			const newUser = new User<UserSchemaType>({
				userId: nanoid(),
				firstName: body.first_name,
				lastName: body.last_name,
				birthDate: body.birth_date,
				city: body.city,
				address: body.address,
				countryCallingCode: body.country_calling_code,
				phoneNumber: body.phone_number,
				email: body.email,
				password: hashedPassword,
				accounts: [account._id],
			});
			const user: UserModel = await newUser.save();
			return new Response(user.userId);
		}

		if (accType === 'vip') {
			const { errors } = await yupValidation(vipUserFormValidationSchema, body);
			if (errors) {
				return new Response(errors, { status: 422 });
			}
			const hashedPassword = await bcryptjs.hash(body.password, 16);
			const newAccount = new Account<AccountSchemaType>({
				primary: true,
				accountType: 'vip',
				currency: body.currency,
				balance: body.extra_funds,
			});
			const account: AccountModel = await newAccount.save();
			const newUser = new User<UserSchemaType>({
				userId: nanoid(),
				firstName: body.first_name,
				lastName: body.last_name,
				birthDate: body.birth_date,
				city: body.city,
				address: body.address,
				countryCallingCode: body.country_calling_code,
				phoneNumber: body.phone_number,
				email: body.email,
				password: hashedPassword,
				accounts: [account._id],
			});
			const user: UserModel = await newUser.save();
			return new Response(user.userId);
		}

		if (accType === 'business') {
			const { errors } = await yupValidation(
				businessUserFormValidationSchema,
				body
			);
			if (errors) {
				return new Response(errors, { status: 422 });
			}
			const hashedPassword = await bcryptjs.hash(body.password, 16);
			const newAccount = new Account<AccountSchemaType>({
				primary: true,
				accountType: 'business',
				companyName: body.company_name,
				companyCity: body.company_city,
				companyAddress: body.company_name,
				currency: body.currency,
			});
			const account: AccountModel = await newAccount.save();
			const newUser = new User<UserSchemaType>({
				userId: nanoid(),
				firstName: body.first_name,
				lastName: body.last_name,
				birthDate: body.birth_date,
				city: body.city,
				address: body.address,
				countryCallingCode: body.country_calling_code,
				phoneNumber: body.phone_number,
				email: body.email,
				password: hashedPassword,
				accounts: [account._id],
			});
			const user: UserModel = await newUser.save();
			return new Response(user.userId);
		}

		return new Response(null, { status: 400 });
	} catch (error: any) {
		console.log(error);
		return new Response('Error opening a user account', { status: 500 });
	}
}
