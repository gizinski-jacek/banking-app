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

export default async function connectMongo(collection: string) {
	const opts: MongooseOptions = {
		bufferCommands: true,
	};

	if (!cached.client) {
		const client = await mongoose.connect(
			MONGODB_URI + collection + '?retryWrites=true&w=majority',
			opts
		);

		if ((collection = 'accounts')) {
			if (!client.models.Regular_Account) {
				client.model('Regular_Account', require('../models/regularAccount'));
			}
			if (!client.models.VIP_Account) {
				client.model('VIP_Account', require('../models/vipAccount'));
			}
			if (!client.models.Business_Account) {
				client.model('Business_Account', require('../models/businessAccount'));
			}
		}

		cached.client = client;
		return cached.client.connections[0];
	}

	const conn = cached.client.connections.find(
		(conn) => conn.name === collection
	);
	if (!conn) {
		const conn = cached.client.createConnection(
			MONGODB_URI + collection + '?retryWrites=true&w=majority',
			opts
		);
		if ((collection = 'account')) {
			if (!conn.models.Regular_Account) {
				conn.model('Regular_Account', require('../models/regularAccount'));
			}
			if (!conn.models.VIP_Account) {
				conn.model('VIP_Account', require('../models/vipAccount'));
			}
			if (!conn.models.Business_Account) {
				conn.model('Business_Account', require('../models/businessAccount'));
			}
		}
		return conn;
	}
	return conn;
}
