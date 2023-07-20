import mongoose, { Types } from 'mongoose';

export interface BasicAccFormData {
	first_name: string;
	last_name: string;
	birth_date: string;
	city: string;
	address: string;
	country_calling_code: number;
	phone_number: number;
	currency: string;
	email: string;
	password: string;
}

export interface VipAccFormData extends BasicAccFormData {
	extra_funds: number;
}

export interface BusinessAccFormData extends BasicAccFormData {
	company_name: string;
	company_city: string;
	company_address: string;
}

export interface BasicAccFormErrors
	extends Omit<BasicAccFormData, 'country_calling_code' | 'phone_number'> {
	country_calling_code: string;
	phone_number: string;
}

export interface VipAccFormErrors extends BasicAccFormErrors {
	extra_funds: string;
}

export interface BusinessAccFormErrors extends BasicAccFormErrors {
	company_name: string;
	company_city: string;
	company_address: string;
}

export interface LoginData {
	userId?: string;
	password?: string;
}

export interface UserSchema {
	userId: string;
	firstName: string;
	lastName: string;
	birthDate: string;
	city: string;
	address: string;
	countryCallingCode: number;
	phoneNumber: number;
	email: string;
	password: string;
	accounts: Types.ObjectId[];
}

export type UserModel = UserSchema &
	mongoose.Document & {
		createdAt: number;
		updatedAt: number;
	};

export interface AccountSchema {
	accountType:
		| 'basic'
		| 'vip'
		| 'business'
		| 'foreignCurrency'
		| 'savings'
		| 'junior';
	companyName?: string;
	companyCity?: string;
	companyAddress?: string;
	currency: string;
	balance?: number;
}

export type AccountModel = AccountSchema &
	mongoose.Document & {
		createdAt: number;
		updatedAt: number;
	};

export interface SessionUser {
	userId: string;
	firstName: string;
	lastName: string;
	accounts: Types.ObjectId[];
}

export const accountTypes: string[] = [
	'basic',
	'vip',
	'business',
	'foreignCurrency',
	'savings',
	'junior',
];

export const supportedCurrencies: string[] = [
	'EUR',
	'USD',
	'PLN',
	'CHF',
	'GBP',
];
