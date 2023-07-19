import * as Yup from 'yup';
import {
	BusinessAccFormData,
	LoginData,
	RegularAccFormData,
	VipAccFormData,
} from '../types/types';

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

export const regularAccFormValidationSchema: Yup.Schema<RegularAccFormData> =
	Yup.object().shape({
		first_name: Yup.string()
			.required('First name is required.')
			.min(4, 'First name min 4 characters.')
			.max(16, 'First name max 16 characters.'),
		last_name: Yup.string()
			.required('Last name is required.')
			.min(4, 'Last name min 4 characters.')
			.max(32, 'Last name max 32 characters.'),
		email: Yup.string()
			.required('Email is required.')
			.min(8, 'Email min 8 characters.')
			.max(64, 'Email max 64 characters.'),
		password: Yup.string()
			.required('Password is required.')
			.min(8, 'Password min 8 characters.')
			.max(128, 'Password max 128 characters.'),
	});

export const vipAccFormValidationSchema: Yup.Schema<VipAccFormData> =
	Yup.object().shape({
		first_name: Yup.string()
			.required('First name is required.')
			.min(4, 'First name min 4 characters.')
			.max(16, 'First name max 16 characters.'),
		last_name: Yup.string()
			.required('Last name is required.')
			.min(4, 'Last name min 4 characters.')
			.max(32, 'Last name max 32 characters.'),
		email: Yup.string()
			.required('Email is required.')
			.min(8, 'Email min 8 characters.')
			.max(64, 'Email max 64 characters.'),
		password: Yup.string()
			.required('Password is required.')
			.min(8, 'Password min 8 characters.')
			.max(128, 'Password max 128 characters.'),
		extra_funds: Yup.number()
			.required('Extra funds is required.')
			.min(0, 'Extra funds min 0.')
			.max(1000000, 'Extra funds max 1000000.'),
	});

export const businessAccFormValidationSchema: Yup.Schema<BusinessAccFormData> =
	Yup.object().shape({
		first_name: Yup.string()
			.required('First name is required.')
			.min(4, 'First name min 4 characters.')
			.max(16, 'First name max 16 characters.'),
		last_name: Yup.string()
			.required('Last name is required.')
			.min(4, 'Last name min 4 characters.')
			.max(32, 'Last name max 32 characters.'),
		email: Yup.string()
			.required('Email is required.')
			.min(8, 'Email min 8 characters.')
			.max(64, 'Email max 64 characters.'),
		password: Yup.string()
			.required('Password is required.')
			.min(8, 'Password min 8 characters.')
			.max(128, 'Password max 128 characters.'),
		company_name: Yup.string()
			.required('Company is required.')
			.min(4, 'Company min 4 characters.')
			.max(128, 'Company max 128 characters.'),
		address: Yup.string()
			.required('Address is required.')
			.min(4, 'Address min 4 characters.')
			.max(128, 'Address max 128 characters.'),
	});

export const userIdSchema: Yup.Schema<LoginData> = Yup.object().shape({
	userId: Yup.string()
		.required('Account ID is required.')
		.min(16, 'Account ID min 16 characters.')
		.max(64, 'Account ID max 64 characters.'),
});

export const accountPasswordSchema: Yup.Schema<LoginData> = Yup.object().shape({
	userId: Yup.string()
		.required('Account ID is required.')
		.min(16, 'Account ID min 16 characters.')
		.max(64, 'Account ID max 64 characters.'),
	password: Yup.string()
		.required('Password is required.')
		.min(8, 'Password min 8 characters.')
		.max(128, 'Password max 128 characters.'),
});
