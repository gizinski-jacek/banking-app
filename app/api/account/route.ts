import yupValidation, { accountSchema } from '@/app/lib/yup';
import connectDb from '@/app/lib/mongoDb';
import {
	AccountModel,
	AccountSchemaType,
	AccountTypes,
	accountTypes,
} from '@/app/types/types';
import Account from '@/app/models/account';
import { getServerSession } from 'next-auth';
import { authOptions } from '../auth/[...nextauth]/route';
import User from '@/app/models/user';

export async function POST(request: Request) {
	try {
		const session = await getServerSession(authOptions);
		if (!session) {
			return new Response(null, { status: 401 });
		}

		const accType = new URL(request.url).searchParams.get('accType');
		if (!accType) {
			return new Response(null, { status: 400 });
		}

		if (accountTypes.find((s) => s === accType)) {
			const body = await request.json();
			await connectDb();
			const { errors } = await yupValidation(accountSchema, body);
			if (errors) {
				return new Response(errors, { status: 422 });
			}
			const newAccount = new Account<AccountSchemaType>({
				accountType: accType as AccountTypes,
				currency: body.currency,
			});
			const account: AccountModel = await newAccount.save();
			await User.findByIdAndUpdate(session.user._id, {
				$push: { accounts: account._id },
			});
			return new Response(null, { status: 200 });
		}

		return new Response(null, { status: 400 });
	} catch (error: any) {
		console.log(error);
		return new Response('Error opening an account', { status: 500 });
	}
}
