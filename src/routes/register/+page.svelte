<script>
	/** @type {import('./$types').PageData} */
</script>

<div class="flex flex-col items-center mt-4">
	<h2 class="mt-2 text-center text-3xl font-bold tracking-tight text-base-content">
		Register for an account
	</h2>
	<p class="text-center mt-1">
		Or <a href="/login" class="text-primary font-medium hover:cursor-pointer hover:underline"
			>sign in</a
		> if you already have an account.
	</p>
	<form action="?/register" method="POST" class="flex flex-col items-center space-y-2 w-full pt-4">
		<div class="flex w-full max-w-md">
			<div class="w-full max-w-md pr-1">
				<label for="fname" class="block">
					<span class=""> First Name </span>
					<input type="text" class="form-input mt-1 block w-full max-w-md" placeholder="Claudio" />
				</label>
			</div>
			<div class="w-full max-w-md pl-1">
				<label for="lname" class="block">
					<span class=""> Last Name </span>
					<input type="text" class="form-input mt-1 block w-full max-w-md" placeholder="Sanchez" />
				</label>
			</div>
		</div>

		<div class="w-full max-w-md">
			<label for="email" class="vlock">
				<span>Email</span>
			</label>
			<input type="email" name="email" class="form-input w-full max-w-md" />
		</div>
		<div class="w-full max-w-md">
			<label for="password" class="font-medium pb-1">
				<span>Password</span>
			</label>
			<input type="password" name="password" class="form-input w-full max-w-md" />
		</div>
		<div class="w-full max-w-md">
			<label for="passwordConfirm" class="font-medium pb-1">
				<span>Confirm Password</span>
			</label>
			<input type="password" name="passwordConfirm" class="form-input w-full max-w-md" />
		</div>
		<div class="w-full max-w-md pt-2">
			<button type="submit" class="btn variant-glass-primary w-40">Register</button>
		</div>
	</form>
</div>
