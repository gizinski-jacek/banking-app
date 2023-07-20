import mongoose from 'mongoose';
import { UserSchema } from '../types/types';

const Schema = mongoose.Schema;

const UserSchema = new Schema<UserSchema>(
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
			minlength: 8,
			maxlength: 10,
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
			maxlength: 64,
			required: true,
		},
		countryCallingCode: {
			type: Number,
			trim: true,
			min: 0,
			max: 999,
			minlength: 1,
			maxlength: 3,
			required: true,
		},
		phoneNumber: {
			type: Number,
			trim: true,
			min: 0o0000,
			max: 999999999999999,
			minlength: 5,
			maxlength: 15,
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
		accounts: [{ type: Schema.Types.ObjectId, ref: 'Account', default: [] }],
	},
	{ timestamps: true }
);

const User = mongoose.models['User'] || mongoose.model('User', UserSchema);

export default User;
