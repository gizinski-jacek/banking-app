import { Types } from 'mongoose';

export interface RegularAccFormData {
	first_name: string;
	last_name: string;
	email: string;
	password: string;
}

export interface VIPAccFormData extends RegularAccFormData {
	extra_funds: number;
}

export interface BusinessAccFormData extends RegularAccFormData {
	company_name: string;
	address: string;
}

export interface LoginData {
	account?: string;
	password?: string;
}

export interface RegularAccModel extends RegularAccFormData {
	_id: string;
	createdAt: string;
	updatedAt: string;
	balance: Types.Decimal128;
}

export type VIPAccModel = RegularAccModel;

export type BusinessAccModel = BusinessAccFormData & RegularAccModel;
