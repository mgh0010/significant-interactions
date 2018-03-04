<template>
	<div class="sign-up">
		<div class="container">
			<p>Make a new account!</p>
			<div class="row">
	      <div class="input-field col s12">
					<input type="text" name="username" class="validate">
					<label for="username">Username</label>
				</div>
	      <div class="input-field col s12">
					<input type="password" name="password" class="validate">
					<label for="password">Password</label>
				</div>
					<a class="waves-effect waves-light btn">Sign In</a>
			</div>
		</div>
		<router-link to='/'>go to sign in </router-link>

	</div>

</template>

<script>
	export default {
		name: 'login'
	}
</script>

<style scoped>
</style>