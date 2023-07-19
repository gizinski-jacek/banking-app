import mongoose from 'mongoose';
import {
	AccountModel,
	accountTypes,
	supportedCurrencies,
} from '../types/types';

const Schema = mongoose.Schema;

const AccountSchema = new Schema<AccountModel>(
	{
		owner: {
			type: Schema.Types.ObjectId,
			ref: 'User',
			required: true,
		},
		accountType: {
			type: String,
			enum: accountTypes,
			trim: true,
			required: true,
		},
		companyName: {
			type: String,
			trim: true,
			minlength: 8,
			maxlength: 64,
			required: function () {
				return this.accountType === 'business';
			},
		},
		companyCity: {
			type: String,
			trim: true,
			minlength: 8,
			maxlength: 64,
			required: function () {
				return this.accountType === 'business';
			},
		},
		companyAddress: {
			type: String,
			trim: true,
			minlength: 8,
			maxlength: 128,
			required: function () {
				return this.accountType === 'business';
			},
		},
		currency: {
			type: String,
			trim: true,
			// Refactor to support decimals as number type by default !!!
			enum: supportedCurrencies,
			default: '0.00',
		},
		balance: {
			type: String,
			trim: true,
			// Refactor to support decimals as number type by default !!!
			default: '100000.00',
		},
	},
	{ timestamps: true }
);

const Account =
	mongoose.models['Account'] || mongoose.model('Account', AccountSchema);

export default Account;
