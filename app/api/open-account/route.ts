import yupValidation, {
	businessAccFormValidationSchema,
	regularAccFormValidationSchema,
	vipAccFormValidationSchema,
} from '@/app/lib/yup';
import { uid } from 'uid';
import bcryptjs from 'bcryptjs';
import Account from '@/app/models/account';
import connectDb from '@/app/lib/mongoDb';
import {
	NewBusAccountModel,
	NewRegAccountModel,
	NewVipAccountModel,
} from '@/app/types/types';

export async function POST(request: Request) {
	try {
		const accType = new URL(request.url).searchParams.get('accType');

		if (!accType) {
			return new Response(null, { status: 400 });
		}

		const body = await request.json();
		await connectDb();

		if (accType === 'regular') {
			const { errors } = await yupValidation(
				regularAccFormValidationSchema,
				body
			);
			if (errors) {
				return new Response(errors, { status: 422 });
			}
			const hashedPassword = await bcryptjs.hash(body.password, 16);
			const newAccount: NewRegAccountModel = new Account({
				accountId: uid(16),
				accountType: 'regular',
				firstName: body.first_name,
				lastName: body.last_name,
				email: body.email,
				password: hashedPassword,
			});
			const account = await newAccount.save();
			return new Response(account.accountId);
		}

		if (accType === 'vip') {
			const { errors } = await yupValidation(vipAccFormValidationSchema, body);
			if (errors) {
				return new Response(errors, { status: 422 });
			}
			const hashedPassword = await bcryptjs.hash(body.password, 16);
			const newAccount: NewVipAccountModel = new Account({
				accountId: uid(16),
				accountType: 'vip',
				firstName: body.first_name,
				lastName: body.last_name,
				email: body.email,
				password: hashedPassword,
				balance: body.extra_funds,
			});
			const account = await newAccount.save();
			return new Response(account.accountId);
		}

		if (accType === 'business') {
			const { errors } = await yupValidation(
				businessAccFormValidationSchema,
				body
			);
			if (errors) {
				return new Response(errors, { status: 422 });
			}
			const hashedPassword = await bcryptjs.hash(body.password, 16);
			const newAccount: NewBusAccountModel = new Account({
				accountId: uid(16),
				accountType: 'business',
				firstName: body.first_name,
				lastName: body.last_name,
				email: body.email,
				password: hashedPassword,
				companyName: body.company_name,
				address: body.address,
			});
			const account = await newAccount.save();
			return new Response(account.accountId);
		}

		return new Response(null, { status: 200 });
	} catch (error: any) {
		console.log(error);
		return error;
	}
}
