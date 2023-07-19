import mongoose from 'mongoose';
import {
	BusinessUserModel,
	RegularUserModel,
	VipUserModel,
} from '../types/types';

const Schema = mongoose.Schema;

const UserSchema = new Schema<
	RegularUserModel | VipUserModel | BusinessUserModel
>(
	{
		userId: {
			type: String,
			trim: true,
			length: 16,
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
		birthDate: {
			type: String,
			trim: true,
			minlength: 4,
			maxlength: 32,
			required: true,
		},
		city: {
			type: String,
			trim: true,
			minlength: 4,
			maxlength: 32,
			required: true,
		},
		address: {
			type: String,
			trim: true,
			minlength: 4,
			maxlength: 32,
			required: true,
		},
		countryCallingCode: {
			type: Number,
			trim: true,
			minlength: 1,
			maxlength: 3,
			required: true,
		},
		phoneNumber: {
			type: Number,
			trim: true,
			minlength: 4,
			maxlength: 13,
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
		accounts: [{ type: Schema.Types.ObjectId, ref: 'Account' }],
	},
	{ timestamps: true }
);

const Account = mongoose.models['User'] || mongoose.model('User', UserSchema);

export default Account;
