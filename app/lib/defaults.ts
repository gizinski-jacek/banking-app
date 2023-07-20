import {
	BusinessAccFormData,
	LoginData,
	BasicAccFormData,
	VipAccFormData,
} from '../types/types';

export const basicAccFormDefaults: BasicAccFormData = {
	first_name: '',
	last_name: '',
	birth_date: '',
	city: '',
	address: '',
	country_calling_code: 0,
	phone_number: 0,
	currency: '',
	email: '',
	password: '',
};

export const vipAccFormDefaults: VipAccFormData = {
	...basicAccFormDefaults,
	extra_funds: 0,
};

export const businessAccFormDefaults: BusinessAccFormData = {
	...basicAccFormDefaults,
	company_name: '',
	company_city: '',
	company_address: '',
};

export const loginData: LoginData = {
	userId: '',
	password: '',
};
