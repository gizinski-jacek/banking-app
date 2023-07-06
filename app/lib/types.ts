export interface RegularAccFormData {
	first_name: string;
	last_name: string;
	email: string;
	password: string;
}

export interface VIPAccFormData extends RegularAccFormData {
	extra_funds: string;
}

export interface BusinessAccFormData extends RegularAccFormData {
	company_name: string;
	address: string;
}

export interface LoginData {
	account: string;
	password: string;
}
