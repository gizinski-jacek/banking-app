import {
	BusinessUserFormData,
	LoginData,
	BasicUserFormData,
	VipUserFormData,
} from '../types/types';

export const basicUserFormDefaults: BasicUserFormData = {
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

export const vipUserFormDefaults: VipUserFormData = {
	...basicUserFormDefaults,
	extra_funds: 0,
};

export const businessUserFormDefaults: BusinessUserFormData = {
	...basicUserFormDefaults,
	company_name: '',
	company_city: '',
	company_address: '',
};

export const loginData: LoginData = {
	userId: '',
	password: '',
};
