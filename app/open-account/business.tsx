'use client';

import Button from '@/app/components/Button';
import { businessAccFormData } from '@/app/lib/defaults';
import { BusinessAccFormData } from '@/app/lib/types';
import { useState } from 'react';
import capitalize from '../lib/capitalize';

interface Props {
	changeAccountType: (type: 'regular' | 'vip' | 'business' | null) => void;
	createAccount: (data: BusinessAccFormData) => void;
}

export default function Business({ changeAccountType, createAccount }: Props) {
	const [formData, setFormData] =
		useState<BusinessAccFormData>(businessAccFormData);
	const [formErrors, setFormErrors] = useState<BusinessAccFormData | null>(
		null
	);

	function handleFormChange(e: React.ChangeEvent<HTMLInputElement>) {
		const { name, value } = e.target;
		setFormData({
			...formData,
			[name]: value,
		});
	}

	function verifyFields(data: BusinessAccFormData) {
		const formErrors = {} as BusinessAccFormData;
		for (const [key, value] of Object.entries(data)) {
			if (!value) {
				formErrors[key as keyof BusinessAccFormData] = `Invalid ${key}`;
			}
		}
		if (Object.keys(formErrors).length !== 0) {
			setFormErrors(formErrors);
		} else {
			createAccount(formData);
			setFormErrors(null);
		}
	}

	return (
		<div>
			<form className='grid grid-cols-2 gap-4 gap-x-8'>
				<h2 className='col-span-2'>Business Account</h2>
				<fieldset>
					<label htmlFor='first_name'>First Name</label>
					<input
						type='text'
						id='first_name'
						name='first_name'
						minLength={4}
						maxLength={16}
						value={formData.first_name}
						required
						onChange={handleFormChange}
					/>
					{formErrors?.first_name && (
						<p className='text-red-600 font-weight-semibold'>
							{capitalize(formErrors.first_name)}
						</p>
					)}
				</fieldset>
				<fieldset>
					<label htmlFor='last_name'>Last Name</label>
					<input
						type='text'
						id='last_name'
						name='last_name'
						minLength={4}
						maxLength={32}
						value={formData.last_name}
						required
						onChange={handleFormChange}
					/>
					{formErrors?.last_name && (
						<p className='text-red-600 font-weight-semibold'>
							{capitalize(formErrors.last_name)}
						</p>
					)}
				</fieldset>
				<fieldset>
					<label htmlFor='company_name'>Company Name</label>
					<input
						type='text'
						id='company_name'
						name='company_name'
						minLength={4}
						maxLength={128}
						value={formData.company_name}
						required
						onChange={handleFormChange}
					/>
					{formErrors?.company_name && (
						<p className='text-red-600 font-weight-semibold'>
							{capitalize(formErrors.company_name)}
						</p>
					)}
				</fieldset>
				<fieldset>
					<label htmlFor='address'>Address</label>
					<input
						type='text'
						id='address'
						name='address'
						minLength={4}
						maxLength={128}
						value={formData.address}
						required
						onChange={handleFormChange}
					/>
					{formErrors?.address && (
						<p className='text-red-600 font-weight-semibold'>
							{capitalize(formErrors.address)}
						</p>
					)}
				</fieldset>
				<fieldset>
					<label htmlFor='email'>Email</label>
					<input
						type='email'
						id='email'
						name='email'
						minLength={8}
						maxLength={64}
						value={formData.email}
						required
						onChange={handleFormChange}
					/>
					{formErrors?.email && (
						<p className='text-red-600 font-weight-semibold'>
							{capitalize(formErrors.email)}
						</p>
					)}
				</fieldset>
				<fieldset>
					<label htmlFor='password'>Password</label>
					<input
						type='password'
						id='password'
						name='password'
						minLength={8}
						maxLength={128}
						value={formData.password}
						required
						onChange={handleFormChange}
					/>
					{formErrors?.password && (
						<p className='text-red-600 font-weight-semibold'>
							{capitalize(formErrors.password)}
						</p>
					)}
				</fieldset>
				<Button
					styleClass='my-3 col-span-2 mx-auto'
					cta={() => verifyFields(formData)}
				>
					Submit
				</Button>
			</form>
			<Button styleClass='my-3' cta={() => changeAccountType(null)}>
				{`<-`} Open Different Account
			</Button>
		</div>
	);
}
