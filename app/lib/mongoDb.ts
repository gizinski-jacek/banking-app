import mongoose, { MongooseOptions } from 'mongoose';

const MONGODb_URI =
	process.env.NODE_ENV === 'production'
		? process.env.MONGODB_URI
		: process.env.MONGODB_URI_DEV;

if (!MONGODb_URI) {
	throw new Error(
		'Please define the MONGODb_URI / MONGODb_URI_DEV environment variable inside .env.local'
	);
}

/**
 * Global is used here to maintain a cached connection across hot reloads
 * in development. This prevents connections growing exponentially
 * during API Route usage.
 */
let cached = global.mongoose;

if (!cached) {
	cached = global.mongoose = { client: null };
}

export default async function connectMongo() {
	const opts: MongooseOptions = {
		bufferCommands: true,
	};

	if (!cached.client) {
		const client = await mongoose.connect(
			MONGODb_URI + 'mainCollection?retryWrites=true&w=majority',
			opts
		);

		// if (!client.models.Account) {
		// 	client.model('Account', require('../models/account')); !!!
		// }

		cached.client = client;
		return cached.client.connections[0];
	}

	return cached.client;
}
