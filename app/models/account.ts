import mongoose from 'mongoose';
import {
	NewBusAccountModel,
	NewRegAccountModel,
	NewVipAccountModel,
} from '../types/types';

const Schema = mongoose.Schema;

const AccountSchema = new Schema<
	NewRegAccountModel | NewVipAccountModel | NewBusAccountModel
>(
	{
		accountId: {
			type: String,
			trim: true,
			length: 16,
			required: true,
		},
		accountType: {
			type: String,
			enum: ['regular', 'vip', 'business'],
			trim: true,
			required: true,
		},
		firstName: {
			type: String,
			trim: true,
			minlength: 4,
			maxlength: 16,
			required: true,
		},
		lastName: {
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
			select: false,
			type: String,
			trim: true,
			minlength: 8,
			maxlength: 128,
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
		address: {
			type: String,
			trim: true,
			minlength: 8,
			maxlength: 128,
			required: function () {
				return this.accountType === 'business';
			},
		},
		balance: {
			type: String,
			// Refactor to support decimals as number type by default !!!
			default: '100000.00',
		},
	},
	{ timestamps: true }
);

const Account =
	mongoose.models['Account'] || mongoose.model('Account', AccountSchema);

export default Account;
