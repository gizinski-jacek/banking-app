import mongoose from 'mongoose';
import {
	AccountSchema,
	accountTypes,
	supportedCurrencies,
} from '../types/types';

const Schema = mongoose.Schema;

const AccountSchema = new Schema<AccountSchema>(
	{
		accountType: {
			type: String,
			enum: accountTypes,
			trim: true,
			required: true,
		},
		companyName: {
			type: String,
			trim: true,
			minlength: 4,
			maxlength: 64,
			required: function () {
				return this.accountType === 'business';
			},
		},
		companyCity: {
			type: String,
			trim: true,
			minlength: 4,
			maxlength: 32,
			required: function () {
				return this.accountType === 'business';
			},
		},
		companyAddress: {
			type: String,
			trim: true,
			minlength: 4,
			maxlength: 64,
			required: function () {
				return this.accountType === 'business';
			},
		},
		currency: {
			type: String,
			trim: true,
			enum: supportedCurrencies,
			required: true,
		},
		balance: {
			type: Number,
			trim: true,
			default: 0.0,
		},
	},
	{ timestamps: true }
);

const Account =
	mongoose.models['Account'] || mongoose.model('Account', AccountSchema);

export default Account;
