<template>
	<TheHeader />
	<main>
		<Home class="md:mx-16" id="home" />
		<About id="about" />
		<MySkills id="skills" />
		<Portfolio id="portfolio" />
		<Contact id="contact" />
		<Services />
		<TheFooter />
	</main>
</template>

<script>
import TheHeader from "@/components/layouts/TheHeader";
import TheFooter from "@/components/layouts/TheFooter";

import Home from "@/components/Home";
import About from "@/components/About";
import MySkills from "@/components/MySkills";
import Portfolio from "@/components/Portfolio";
import Contact from "@/components/Contact";
import Services from "@/components/Services";

export default {
	name: "App",
	components: {
		TheHeader,
		Home,
		About,
		MySkills,
		Portfolio,
		Contact,
		Services,
		TheFooter,
	},
};
</script>

<style>
::-moz-selection {
	@apply text-white bg-blue-400;
}

::selection {
	@apply text-white bg-blue-400;
}

::-webkit-scrollbar {
	width: 10px;
}

::-webkit-scrollbar-button {}

::-webkit-scrollbar-thumb {
	@apply bg-blue-300;
}

::-webkit-scrollbar-thumb:hover {
	@apply bg-blue-400;
}

body {
	@apply overflow-x-hidden;
}

#app {
	@apply pt-6 overflow-x-hidden border-t-8 border-blue-400;
	font-family: "Nunito Sans", sans-serif;
}

html {
	scroll-behavior: smooth;
}

.section-heading {
	@apply text-blue-500 text-6xl md:text-7xl mx-3 mt-4 text-center;
}

.blob {
	z-index: -1;
}
</style>
