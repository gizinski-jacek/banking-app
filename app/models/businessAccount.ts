import mongoose from 'mongoose';
import { BusinessAccModel } from '../lib/types';

const Schema = mongoose.Schema;

const Business_Account = new Schema<BusinessAccModel>(
	{
		first_name: {
			type: String,
			trim: true,
			minlength: 4,
			maxlength: 16,
			required: true,
		},
		last_name: {
			type: String,
			trim: true,
			minlength: 4,
			maxlength: 32,
			required: true,
		},
		email: {
			type: String,
			trim: true,
			minlength: 8,
			maxlength: 64,
			required: true,
		},
		password: {
			type: String,
			trim: true,
			minlength: 8,
			maxlength: 128,
			required: true,
		},
		company_name: {
			type: String,
			trim: true,
			minlength: 8,
			maxlength: 64,
			required: true,
		},
		address: {
			type: String,
			trim: true,
			minlength: 8,
			maxlength: 128,
			required: true,
		},
		balance: {
			type: Schema.Types.Decimal128,
			min: 0,
			max: 1000000,
			default: 100000.0,
		},
	},
	{ timestamps: true }
);

module.exports = Business_Account;
