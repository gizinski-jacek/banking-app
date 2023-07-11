import mongoose from 'mongoose';
import { AccountModel } from '../lib/types';

const Schema = mongoose.Schema;

const AccountSchema = new Schema<AccountModel>(
	{
		_id: {
			type: Schema.Types.ObjectId,
			trim: true,
			length: 16,
			required: true,
		},
		accountID: {
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
			type: Schema.Types.Decimal128,
			min: 0.0,
			max: 1000000.0,
			default: 100000.0,
		},
	},
	{ timestamps: true }
);

export default mongoose.model<AccountModel>('Account', AccountSchema);
