import * as Yup from 'yup';
import { LoginData, supportedCurrencies } from '../types/types';

export default async function yupValidation<T = Record<string, any>>(
	scheme: Yup.Schema<T>,
	data: Record<string, any> | null
) {
	try {
		await scheme.validate(data, { abortEarly: false });
		return { isValid: true, errors: null };
	} catch (error: any) {
		const { errors } = error;
		return { isValid: false, errors };
	}
}

export const basicUserFormValidationSchema = Yup.object().shape({
	first_name: Yup.string()
		.required('First name field is required.')
		.min(4, 'First name min 4 characters.')
		.max(16, 'First name max 16 characters.'),
	last_name: Yup.string()
		.required('Last name field is required.')
		.min(4, 'Last name min 4 characters.')
		.max(32, 'Last name max 32 characters.'),
	birth_date: Yup.string()
		.required('Birth date field is required.')
		.min(8, 'Birth date min 8 characters.')
		.max(10, 'Birth date max 10 characters.')
		.test(
			'min-date',
			'Too young for an account.',
			(value) => new Date(value).getTime() > new Date().getTime() - 410240038000
		)
		.test(
			'max-date',
			'Too old for an account.',
			(value) =>
				new Date(value).getTime() < new Date().getTime() - 3155692600000
		),
	city: Yup.string()
		.required('City field is required.')
		.min(4, 'City min 4 characters.')
		.max(32, 'City max 32 characters.'),
	address: Yup.string()
		.required('Address field is required.')
		.min(4, 'Address min 4 characters.')
		.max(64, 'Address max 64 characters.'),
	country_calling_code: Yup.number()
		.required('Country Calling Code field is required.')
		.min(0, 'Country Calling Code min value 0.')
		.max(999, 'Country Calling Code max value 999.')
		.test(
			'min-length',
			'Country Calling Code min length 1 character.',
			(value) => value.toString().length >= 1
		)
		.test(
			'max-length',
			'Country Calling Code max length 3 characters.',
			(value) => value.toString().length <= 3
		),
	phone_number: Yup.number()
		.required('Phone Number field is required.')
		.min(0o0000, 'Phone Number min value 00000.')
		.max(999999999999999, 'Phone Number max value 999999999999999.')
		.test(
			'min-length',
			'Phone Number min length 4 characters.',
			(value) => value.toString().length >= 4
		)
		.test(
			'max-length',
			'Phone Number max length 15 characters.',
			(value) => value.toString().length <= 15
		),
	currency: Yup.string()
		.required('Currency field is required.')
		.oneOf(supportedCurrencies, 'Currency is invalid.'),
	email: Yup.string()
		.required('Email field is required.')
		.min(8, 'Email min 8 characters.')
		.max(64, 'Email max 64 characters.'),
	password: Yup.string()
		.required('Password field is required.')
		.min(8, 'Password min 8 characters.')
		.max(128, 'Password max 128 characters.'),
});

export const vipUserFormValidationSchema = basicUserFormValidationSchema.shape({
	extra_funds: Yup.number()
		.required('Extra Funds field is required.')
		.min(0, 'Extra Funds min value 0.')
		.max(1000000, 'Extra Funds max value 1000000.'),
});

export const businessUserFormValidationSchema =
	basicUserFormValidationSchema.shape({
		company_name: Yup.string()
			.required('Password field is required.')
			.min(4, 'Password min 4 characters.')
			.max(64, 'Password max 64 characters.'),
		company_city: Yup.string()
			.required('Password field is required.')
			.min(4, 'Password min 4 characters.')
			.max(32, 'Password max 32 characters.'),
		company_address: Yup.string()
			.required('Password field is required.')
			.min(4, 'Password min 4 characters.')
			.max(64, 'Password max 64 characters.'),
	});

export const userIdSchema: Yup.Schema<LoginData> = Yup.object().shape({
	userId: Yup.string()
		.required('Account Id field is required.')
		.min(16, 'Account Id min 16 characters.')
		.max(64, 'Account Id max 64 characters.'),
});

export const accountPasswordSchema = userIdSchema.concat(
	Yup.object().shape({
		password: Yup.string()
			.required('Password field is required.')
			.min(8, 'Password min 8 characters.')
			.max(128, 'Password max 128 characters.'),
	})
);
