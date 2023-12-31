'use client';

import Button from '@/app/components/Button';
import { businessUserFormDefaults } from '@/app/lib/defaults';
import {
	BusinessUserFormData,
	BusinessUserFormErrors,
	currenciesCodes,
} from '@/app/types/types';
import { useState } from 'react';
import capitalize from '../../lib/capitalize';
import dateToISO from '@/app/lib/dateToISO';

interface Props {
	changeUserType: (type: 'basic' | 'vip' | 'business' | null) => void;
	createUser: (data: BusinessUserFormData) => void;
	errors: BusinessUserFormErrors | null;
}

export default function Business({
	changeUserType,
	createUser,
	errors,
}: Props) {
	const [formData, setFormData] = useState<BusinessUserFormData>(
		businessUserFormDefaults
	);
	const [formErrors, setFormErrors] = useState<BusinessUserFormErrors | null>(
		errors || null
	);

	function handleFormChange(
		e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
	) {
		const { name, value } = e.target;
		setFormData({
			...formData,
			[name]: value,
		});
	}

	function verifyFields(data: BusinessUserFormData) {
		const formErrors = {} as BusinessUserFormErrors;
		for (const [key, value] of Object.entries(data)) {
			if (!value) {
				formErrors[key as keyof BusinessUserFormErrors] = `Invalid ${key}.`;
			}
		}
		if (Object.keys(formErrors).length !== 0) {
			setFormErrors(formErrors);
		} else {
			createUser(formData);
			setFormErrors(null);
		}
	}

	function clearForm() {
		setFormData(businessUserFormDefaults);
	}

	return (
		<div>
			<form className='grid grid-cols-2 gap-4 gap-x-8 items-center'>
				<h2>Business User Account</h2>
				<Button styleClass='my-3 mx-auto' cta={clearForm}>
					Clear Form
				</Button>
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
						placeholder='First Name'
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
						placeholder='Last Name'
					/>
					{formErrors?.last_name && (
						<p className='text-red-600 font-weight-semibold underline'>
							{capitalize(formErrors.last_name)}
						</p>
					)}
				</fieldset>
				<fieldset>
					<label htmlFor='birth_date'>Birth Date</label>
					<input
						type='date'
						id='birth_date'
						name='birth_date'
						min={dateToISO(new Date(), -100)}
						max={dateToISO(new Date(), -13)}
						value={formData.birth_date}
						required
						onChange={handleFormChange}
						placeholder='Birth Date'
					/>
					{formErrors?.birth_date && (
						<p className='text-red-600 font-weight-semibold underline'>
							{capitalize(formErrors.birth_date)}
						</p>
					)}
				</fieldset>
				<fieldset>
					<label htmlFor='city'>City</label>
					<input
						type='text'
						id='city'
						name='city'
						minLength={4}
						maxLength={32}
						value={formData.city}
						required
						onChange={handleFormChange}
						placeholder='City'
					/>
					{formErrors?.city && (
						<p className='text-red-600 font-weight-semibold underline'>
							{capitalize(formErrors.city)}
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
						maxLength={64}
						value={formData.address}
						required
						onChange={handleFormChange}
						placeholder='Address'
					/>
					{formErrors?.address && (
						<p className='text-red-600 font-weight-semibold underline'>
							{capitalize(formErrors.address)}
						</p>
					)}
				</fieldset>
				<fieldset>
					<label htmlFor='country_calling_code'>Country Calling Code</label>
					<input
						type='number'
						id='country_calling_code'
						name='country_calling_code'
						min={0}
						max={999}
						minLength={1}
						maxLength={3}
						value={formData.country_calling_code}
						required
						onChange={handleFormChange}
						placeholder='Country Calling Code'
					/>
					{formErrors?.country_calling_code && (
						<p className='text-red-600 font-weight-semibold underline'>
							{capitalize(formErrors.country_calling_code)}
						</p>
					)}
				</fieldset>
				<fieldset>
					<label htmlFor='phone_number'>Phone Number</label>
					<input
						type='phone'
						id='phone_number'
						name='phone_number'
						min={0o0000}
						max={999999999999999}
						minLength={5}
						maxLength={15}
						value={formData.phone_number}
						required
						onChange={handleFormChange}
						placeholder='Phone Number'
					/>
					{formErrors?.phone_number && (
						<p className='text-red-600 font-weight-semibold underline'>
							{capitalize(formErrors.phone_number)}
						</p>
					)}
				</fieldset>
				<fieldset>
					<label htmlFor='currency'>Currency</label>
					<select
						id='currency'
						name='currency'
						value={formData.currency}
						required
						onChange={handleFormChange}
						placeholder='Currency'
					>
						<option value=''>Choose Currency</option>
						{currenciesCodes
							.sort((a, b) => a.localeCompare(b))
							.map((cur, i) => {
								return (
									<option key={i} value={cur}>
										{cur.toUpperCase()}
									</option>
								);
							})}
					</select>
					{formErrors?.currency && (
						<p className='text-red-600 font-weight-semibold underline'>
							{capitalize(formErrors.currency)}
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
						maxLength={64}
						value={formData.company_name}
						required
						onChange={handleFormChange}
						placeholder='Company Name'
					/>
					{formErrors?.company_name && (
						<p className='text-red-600 font-weight-semibold underline'>
							{capitalize(formErrors.company_name)}
						</p>
					)}
				</fieldset>
				<fieldset>
					<label htmlFor='company_city'>Company City</label>
					<input
						type='text'
						id='company_city'
						name='company_city'
						minLength={4}
						maxLength={32}
						value={formData.company_city}
						required
						onChange={handleFormChange}
						placeholder='Company City'
					/>
					{formErrors?.company_city && (
						<p className='text-red-600 font-weight-semibold underline'>
							{capitalize(formErrors.company_city)}
						</p>
					)}
				</fieldset>
				<fieldset>
					<label htmlFor='company_address'>Company Address</label>
					<input
						type='text'
						id='company_address'
						name='company_address'
						minLength={4}
						maxLength={64}
						value={formData.company_address}
						required
						onChange={handleFormChange}
						placeholder='Company Address'
					/>
					{formErrors?.company_address && (
						<p className='text-red-600 font-weight-semibold underline'>
							{capitalize(formErrors.company_address)}
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
						placeholder='Email'
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
						placeholder='Password'
					/>
					{formErrors?.password && (
						<p className='text-red-600 font-weight-semibold underline'>
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
			<Button styleClass='my-3' cta={() => changeUserType(null)}>
				{`<-`} Open Different Account
			</Button>
		</div>
	);
}
