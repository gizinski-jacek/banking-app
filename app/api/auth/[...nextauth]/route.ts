import connectDb from '@/app/lib/mongoDb';
import yupValidation, {
	accountIdSchema,
	accountPasswordSchema,
} from '@/app/lib/yup';
import Account from '@/app/models/account';
import NextAuth, { NextAuthOptions, User } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import bcryptjs from 'bcryptjs';
import { AccountDbDocument, SessionUser } from '@/app/types/types';

export const authOptions: NextAuthOptions = {
	pages: {
		signIn: '/',
		signOut: '/',
		error: '/',
	},
	providers: [
		CredentialsProvider({
			id: 'credentials-account',
			name: 'Credentials Account',
			credentials: {
				accountId: { type: 'text' },
			},
			async authorize(credentials, req): Promise<boolean> {
				try {
					if (!credentials) {
						throw 'Provide account Id';
					}
					const { errors } = await yupValidation(accountIdSchema, {
						accountId: credentials.accountId,
					});
					if (errors) {
						console.log(errors);
						throw errors;
					}
					await connectDb();
					const account = await Account.findOne({
						accountId: credentials.accountId,
					})
						.lean()
						.exec();
					if (!account) {
						throw 'Account not found';
					}
					// Return information indicating correct account Id but dont set session with any data !!!
					throw 'acc-valid';
				} catch (error: any) {
					console.log(error);
					throw new Error(error);
				}
			},
		}),
		CredentialsProvider({
			id: 'credentials-password',
			name: 'Credentials Password',
			credentials: {
				accountId: { type: 'text' },
				password: { type: 'password' },
			},
			async authorize(credentials, req) {
				try {
					if (!credentials) {
						throw 'Provide account Id and password';
					}
					const { errors } = await yupValidation(accountPasswordSchema, {
						accountId: credentials.accountId,
						password: credentials.password,
					});
					if (errors) {
						throw errors;
					}
					await connectDb();
					const account = await Account.findOne<AccountDbDocument>({
						accountId: credentials.accountId,
					})
						.select('+password')
						.exec();
					if (!account) {
						throw 'Account not found';
					}
					const match = await bcryptjs.compare(
						credentials.password,
						account.password
					);
					if (!match) {
						throw 'Incorrect password';
					}
					const user: SessionUser = {
						accountId: account.accountId,
						accountType: account.accountType,
						firstName: account.firstName,
						lastName: account.lastName,
						balance: parseFloat(account.balance),
					};
					return user;
				} catch (error: any) {
					console.log(error);
					throw new Error(error);
				}
			},
		}),
	],
	session: {
		strategy: 'jwt',
		maxAge: 30 * 60, // 30 minutes
		updateAge: 10 * 60, // 10 minutes
	},
	callbacks: {
		async jwt({ token, user }) {
			if (user) {
				token.user = user;
			}
			return token;
		},
		async session({ session, token }) {
			session.user = token.user;
			return session;
		},
	},
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };

// .!!!
