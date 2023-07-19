'use client';

import Button from '@/app/components/Button';
import { vipAccFormData } from '@/app/lib/defaults';
import { VipAccFormData, VipAccFormErrors } from '@/app/types/types';
import { useState } from 'react';
import capitalize from '../../lib/capitalize';

interface Props {
	changeUserType: (type: 'regular' | 'vip' | 'business' | null) => void;
	createAccount: (data: VipAccFormData) => void;
	errors: VipAccFormErrors;
}

export default function Business({
	changeUserType,
	createAccount,
	errors,
}: Props) {
	const [formData, setFormData] = useState<VipAccFormData>(vipAccFormData);
	const [formErrors, setFormErrors] = useState<VipAccFormErrors | null>(
		errors || null
	);

	function handleFormChange(e: React.ChangeEvent<HTMLInputElement>) {
		const { name, value } = e.target;
		setFormData({
			...formData,
			[name]: value,
		});
	}

	function verifyFields(data: VipAccFormData) {
		const formErrors = {} as VipAccFormErrors;
		for (const [key, value] of Object.entries(data)) {
			if (!value) {
				formErrors[key as keyof VipAccFormErrors] = `Invalid ${key}`;
			}
		}
		// Verify funds field to make sure its only 2 decimal places !!!
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
				<h2 className='col-span-2'>Vip Account</h2>
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
						<p className='text-red-600 font-weight-semibold underline'>
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
						<p className='text-red-600 font-weight-semibold underline'>
							{capitalize(formErrors.last_name)}
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
						<p className='text-red-600 font-weight-semibold underline'>
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
						<p className='text-red-600 font-weight-semibold underline'>
							{capitalize(formErrors.password)}
						</p>
					)}
				</fieldset>
				<fieldset className='col-span-2 mx-auto'>
					<label htmlFor='extra_funds'>Extra Funds</label>
					<input
						type='number'
						id='extra_funds'
						name='extra_funds'
						min={0}
						max={1000000}
						step={0.01}
						value={formData.extra_funds}
						onChange={handleFormChange}
					/>
					{formErrors?.extra_funds && (
						<p className='text-red-600 font-weight-semibold underline'>
							{capitalize(formErrors.extra_funds)}
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
			<Button styleClass='my-3' cta={() => changeUserType(null)}>
				{`<-`} Open Different Account
			</Button>
		</div>
	);
}
