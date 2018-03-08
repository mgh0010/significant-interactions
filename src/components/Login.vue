<template>
	<div class="login">
		<div class="content--wrap">
				<v-container grid-list-md text-xs-center>
					<v-layout row wrap>
						<v-flex xs12>
							<h2 class="display-1">Sign In</h2>
						</v-flex>

						<!-- inputs -->
							<v-flex xs10 sm8 md6 offset-xs1 offset-sm2 offset-md3>
								<v-text-field
									name='email'
									label='Email'
									v-model='email'
									required
									:rules='[rules.required, rules.email]'
									></v-text-field>
							</v-flex>
							<v-flex xs10 sm8 md6 offset-xs1 offset-sm2 offset-md3>
								<v-text-field
									name='password'
                  type="password"
									label='Password'
									v-model='password'
									required
									:rules='[rules.required]'
									></v-text-field>
								</v-flex>
						<!-- end of inputs -->

						<!-- sign in button -->
						<v-flex xs12>
							<v-btn
							:flat='!valid'
							:outline='valid'
							:class='{ green: valid}'
							@click='signIn'
							>Sign In</v-btn>
						</v-flex>
						<!-- end of sign in button -->

						<v-flex xs12>
							<span class="subheading center-text">OR</span>
						</v-flex>

						<!-- sign up button -->
						<v-flex xs12>
							<v-btn
							flat
							outline
							class='blue lighten-2'
							@click='signUp'
							>Sign Up</v-btn>
						</v-flex>
						<!-- end of sign up button -->


					</v-layout>
				</v-container>
				<!-- <router-link to='/sign-up'>go to sign up</router-link> -->

		</div>
	</div>

</template>

<script>
	import firebase from 'firebase'
	export default {
		name: 'login',
		data: function () {
			return {
				email: '',
				password: '',
				rules: {
					required: (value) => !!value || 'Required.',
					email: (value) => {
						const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
						  return pattern.test(value) || 'Invalid e-mail.'
					}
				}
			}
		},
		methods: {
			login: function(event) {
				this.$router.push('sig-int')
			},
			signIn: function() {
				firebase.auth().signInWithEmailAndPassword(this.email, this.password).then(
					(user) => {
						this.$router.push('sig-int')
					},
					(err) => {
						alert('Oops, ' + err.message)
					}
				);
			},
			signUp: function() {
				this.$router.push('sign-up')
			}
		},
		computed: {
			valid: function() {
				if(this.rules.email(this.email) == 'Invalid e-mail.' || this.rules.required(this.password) == 'Required.') {
					return false
				}
				else {
					return true
				}
			}
		}
}
</script>

<style scoped>
.center-text {
	text-align: center;
}
</style>
