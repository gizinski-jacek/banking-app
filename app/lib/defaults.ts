import {
	BusinessAccFormData,
	LoginData,
	RegularAccFormData,
	VipAccFormData,
} from '../types/types';

export const regularAccFormData: RegularAccFormData = {
	first_name: '',
	last_name: '',
	birth_place: '',
	city: '',
	address: '',
	country_calling_code: 0,
	phone_number: 0,
	email: '',
	currency: '',
	password: '',
};

export const vipAccFormData: VipAccFormData = {
	first_name: '',
	last_name: '',
	birth_place: '',
	city: '',
	address: '',
	country_calling_code: 0,
	phone_number: 0,
	email: '',
	currency: '',
	password: '',
	extra_funds: 0.0,
};

export const businessAccFormData: BusinessAccFormData = {
	first_name: '',
	last_name: '',
	birth_place: '',
	city: '',
	address: '',
	country_calling_code: 0,
	phone_number: 0,
	company_name: '',
	company_city: '',
	company_address: '',
	email: '',
	currency: '',
	password: '',
};

export const loginData: LoginData = {
	userId: '',
	password: '',
};
