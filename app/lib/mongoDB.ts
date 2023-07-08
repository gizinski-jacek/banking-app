import mongoose, { MongooseOptions } from 'mongoose';

const MONGODB_URI =
	process.env.NODE_ENV === 'production'
		? process.env.MONGODB_URI
		: process.env.MONGODB_URI_DEV;

if (!MONGODB_URI) {
	throw new Error(
		'Please define the MONGODB_URI / MONGODB_URI_DEV environment variable inside .env.local'
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
			MONGODB_URI + '?retryWrites=true&w=majority',
			opts
		);

		cached.client = client;
		return cached.client.connections[0];
	}

	// ???
	return cached.client.connections[0];
}
