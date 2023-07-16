import mongoose, { Types } from 'mongoose';

export interface RegularAccFormData {
	first_name: string;
	last_name: string;
	email: string;
	password: string;
}

export type RegularAccFormErrors = RegularAccFormData;

export interface VipAccFormData extends RegularAccFormData {
	extra_funds: number;
}

export interface VipAccFormErrors extends Omit<VipAccFormData, 'extra_funds'> {
	extra_funds: string;
}

export interface BusinessAccFormData extends RegularAccFormData {
	company_name: string;
	address: string;
}

export type BusinessAccFormErrors = BusinessAccFormData;

export interface LoginData {
	accountId?: string;
	password?: string;
}

export interface NewRegAccountModel extends mongoose.Document {
	accountId: string;
	accountType: 'regular';
	createdAt: number;
	updatedAt: number;
	firstName: string;
	lastName: string;
	email: string;
	password: string;
}

export interface NewVipAccountModel
	extends Omit<NewRegAccountModel, 'accountType'> {
	accountType: 'vip';
	balance: string;
}

export interface NewBusAccountModel
	extends Omit<NewRegAccountModel, 'accountType'> {
	accountType: 'business';
	companyName: string;
	address: string;
}

export interface AccountDbDocument extends NewRegAccountModel {
	_id: Types.ObjectId;
	balance: string;
}

export interface SessionUser {
	accountType: 'regular' | 'vip' | 'business';
	accountId: string;
	firstName: string;
	lastName: string;
	balance: number;
}
