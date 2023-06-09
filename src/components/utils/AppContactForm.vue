<template>
	<form
		@submit.prevent="sendContactFormData"
		class="lg:w-1/3 md:w-1/2 bg-white flex flex-col md:ml-auto w-full md:py-8 mt-8 md:mt-0"
	>
		<h2 class="text-gray-900 text-lg mb-1 font-medium title-font">
			Get in touch!
		</h2>
		<p class="leading-relaxed mb-5 text-gray-600">
			Want to discuss something? Feel free to send me a message and I will get
			back to you as
			<span class="font-bold text-blue-600 underline">soon as possible</span>
		</p>
		<div class="hidden">
			<label class="sr-only">Don’t fill this out if you're human: </label>
			<input
				v-model="contactForm.bot"
				name="bot-field"
				placeholder="This field is only for the robots."
				class="form-input block w-full py-3 px-4 placeholder-gray-500 transition ease-in-out duration-150"
			/>
		</div>
		<div class="relative mb-4">
			<label for="name" class="leading-7 text-sm text-gray-600">Name</label>
			<input
				type="text"
				id="name"
				name="name"
				v-model="contactForm.name"
				class="w-full bg-white rounded border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
			/>
		</div>
		<div class="relative mb-4">
			<label for="email" class="leading-7 text-sm text-gray-600">Email</label>
			<input
				type="email"
				id="email"
				name="email"
				v-model="contactForm.email"
				class="w-full bg-white rounded border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
			/>
			<div v-show="!emailValidation" class="text-red-500">
				<p>Email incorrect!</p>
			</div>
		</div>
		<div class="relative mb-4">
			<label for="message" class="leading-7 text-sm text-gray-600"
				>Message</label
			>
			<textarea
				id="message"
				name="message"
				v-model="contactForm.message"
				class="w-full bg-white rounded border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 h-32 text-base outline-none text-gray-700 py-1 px-3 resize-none leading-6 transition-colors duration-200 ease-in-out"
			></textarea>
		</div>
		<div v-show="formError" class="text-red-500 text-sm">
			<p>{{ formError }}</p>
		</div>
		<div class="text-green-500" v-if="submit">
			<p>{{ submit }}!</p>
		</div>
		<button
			type="submit"
			class="text-white bg-blue-500 border-0 py-2 px-6 focus:outline-none hover:bg-blue-600 rounded text-lg"
		>
			Send
		</button>
	</form>
</template>

<script>
import axios from "axios";

export default {
	name: "AppContactForm",
	data() {
		return {
			contactForm: {
				name: "",
				email: "",
				message: "",
				bot: ""
			},
			loader: {
				loading: false,
				progress: 0
			},
			submit: "",
			formError: ""
		};
	},
	components: {},
	methods: {
		async sendContactFormData() {
			this.loader.loading = true;
			if (!this.validateFormFields() || !this.emailValidation) {
				return;
			}
			let response = await axios.post("api/send-mail", this.contactForm, {
				onUploadProgress: progressEvent => {
					console.log(progressEvent);
					this.loader.progress =
						(progressEvent.loaded * 100) / progressEvent.total / 100;
				}
			});
			if (response.status === 200) {
				this.submit = response.data.message;
				this.formError = "";
				this.contactForm = {
					name: "",
					email: "",
					message: "",
					bot: ""
				};
			} else {
				this.formError = "Some error occured! Try again in a bit";
			}

			this.loader.loading = false;
		},

		validateFormFields() {
			if (
				this.contactForm.name &&
				this.contactForm.email &&
				this.contactForm.message &&
				!this.contactForm.bot
			) {
				return true;
			}

			if (!this.contactForm.name) {
				this.formError = "Name cant be empty!";
				return false;
			}
			if (!this.contactForm.email) {
				this.formError = "Email cant be empty!";
				return false;
			}
			if (!this.contactForm.message) {
				this.formError = "Message cant be empty!";
				return false;
			}

			return false;
		}
	},
	computed: {
		emailValidation() {
			if (!this.contactForm.email) return true;
			//reg exp to check if email is valid
			let reg = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
			return reg.test(this.contactForm.email);
		}
	}
};
</script>