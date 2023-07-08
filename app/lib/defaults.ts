import {
	BusinessAccFormData,
	LoginData,
	RegularAccFormData,
	VIPAccFormData,
} from './types';

export const regularAccFormData: RegularAccFormData = {
	first_name: '',
	last_name: '',
	email: '',
	password: '',
};

export const vipAccFormData: VIPAccFormData = {
	first_name: '',
	last_name: '',
	email: '',
	password: '',
	extra_funds: 0,
};

export const businessAccFormData: BusinessAccFormData = {
	first_name: '',
	last_name: '',
	company_name: '',
	address: '',
	email: '',
	password: '',
};

export const loginData: LoginData = {
	account: '',
	password: '',
};
