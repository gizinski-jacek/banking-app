import Link from 'next/link';

export default function OpenAccount() {
	return (
		<div>
			<div>
				<h2>Regular Account</h2>
				<p>Simple account for our regular users.</p>
				<Link href='open-account/regular'>Open Regular Account</Link>
			</div>
			<div>
				<h2>VIP Account</h2>
				<p>Special account with extra bells and whistles.</p>
				<Link href='open-account/vip'>Open VIP Account</Link>
			</div>
			<div>
				<h2>Business Account</h2>
				<p>Best account for brave entrepreneurs.</p>
				<Link href='open-account/business'>Open Business Account</Link>
			</div>
		</div>
	);
}
