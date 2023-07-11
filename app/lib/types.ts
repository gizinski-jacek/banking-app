import mongoose, { Types } from 'mongoose';

export interface RegularAccFormData {
	first_name: string;
	last_name: string;
	email: string;
	password: string;
}

export type RegularAccFormErrors = RegularAccFormData;

export interface VIPAccFormData extends RegularAccFormData {
	extra_funds: number;
}

export interface VIPAccFormErrors extends Omit<VIPAccFormData, 'extra_funds'> {
	extra_funds: string;
}

export interface BusinessAccFormData extends RegularAccFormData {
	company_name: string;
	address: string;
}

export type BusinessAccFormErrors = BusinessAccFormData;

export interface LoginData {
	accountID?: string;
	password?: string;
}

export interface AccountModel extends mongoose.Document {
	accountID: string;
	accountType: 'regular' | 'vip' | 'business';
	createdAt: number;
	updatedAt: number;
	firstName: string;
	lastName: string;
	email: string;
	password: string;
	balance?: Types.Decimal128;
	companyName?: string;
	address?: string;
}
