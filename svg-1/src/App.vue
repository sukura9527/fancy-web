<template>
	<div id="app">
		SVG
		<MySwiper></MySwiper>
	</div>
</template>

<script>
import MySwiper from "./components/MySwiper.vue";

export default {
	name: "App",
	components: {
		MySwiper,
	},
};
</script>

<style lang="less" scoped>
#app {
	font-family: Avenir, Helvetica, Arial, sans-serif;
	-webkit-font-smoothing: antialiased;
	-moz-osx-font-smoothing: grayscale;
	font-size: 20px;
	text-align: center;
	width: 100%;
	height: 100%;
	position: absolute;
	left: 0;
	top: 0;
	overflow: hidden;
}
* {
	margin: 0;
	padding: 0;
}
</style>
