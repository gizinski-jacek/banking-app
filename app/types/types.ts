import mongoose, { Types } from 'mongoose';

export interface BasicUserFormData {
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

export interface VipUserFormData extends BasicUserFormData {
	extra_funds: number;
}

export interface BusinessUserFormData extends BasicUserFormData {
	company_name: string;
	company_city: string;
	company_address: string;
}

export interface BasicUserFormErrors
	extends Omit<BasicUserFormData, 'country_calling_code' | 'phone_number'> {
	country_calling_code: string;
	phone_number: string;
}

export interface VipUserFormErrors extends BasicUserFormErrors {
	extra_funds: string;
}

export interface BusinessUserFormErrors extends BasicUserFormErrors {
	company_name: string;
	company_city: string;
	company_address: string;
}

export interface LoginData {
	userId?: string;
	password?: string;
}

export interface UserSchemaType {
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

export type UserModel = UserSchemaType &
	mongoose.Document & {
		createdAt: number;
		updatedAt: number;
	};

export interface AccountSchemaType {
	primary?: boolean;
	accountType: AccountTypes;
	companyName?: string;
	companyCity?: string;
	companyAddress?: string;
	currency: string;
	balance?: number;
}

export type AccountModel = Omit<AccountSchemaType, 'balance'> &
	mongoose.Document & {
		createdAt: number;
		updatedAt: number;
		balance: number;
	};

export interface SessionUser {
	_id: mongoose.Schema.Types.ObjectId;
	userId: string;
	firstName: string;
	lastName: string;
	accounts: AccountModel[];
}

export type AccountTypes =
	| 'basic'
	| 'vip'
	| 'business'
	| 'foreignCurrency'
	| 'savings'
	| 'junior';

export const accountTypes: AccountTypes[] = [
	'basic',
	'vip',
	'business',
	'foreignCurrency',
	'savings',
	'junior',
];

export const currenciesCodes: string[] = ['EUR', 'USD', 'PLN', 'CHF', 'GBP'];
