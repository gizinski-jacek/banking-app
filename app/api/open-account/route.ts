// import connectMongo from '@/app/lib/mongoDB';

import yupValidation, {
	businessAccFormValidationSchema,
	regularAccFormValidationSchema,
	vipAccFormValidationSchema,
} from '@/app/lib/yup';
import connectMongo from '@/app/lib/mongoDB';

export async function POST(request: Request) {
	try {
		const accType = new URL(request.url).searchParams.get('accType');

		if (!accType) {
		}

		const body = await request.json();
		const conn = await connectMongo('accounts');

		if (accType === 'regular') {
			const { errors } = await yupValidation(
				regularAccFormValidationSchema,
				body
			);
			if (errors) {
				const res = new Response(errors, { status: 422 });
				return res;
			}
			await conn.models.Regular_Account.create(body);
		}

		if (accType === 'vip') {
			const { errors } = await yupValidation(vipAccFormValidationSchema, body);
			if (errors) {
				const res = new Response(errors, { status: 422 });
				return res;
			}
			await conn.models.VIP_Account.create({
				...body,
				balance: body.extra_funds,
			});
		}

		if (accType === 'business') {
			const { errors } = await yupValidation(
				businessAccFormValidationSchema,
				body
			);
			if (errors) {
				const res = new Response(errors, { status: 422 });
				return res;
			}
			await conn.models.Business_Account_Account.create(body);
		}

		return new Response(undefined, { status: 200 });
	} catch (error: any) {
		return error;
	}
}
