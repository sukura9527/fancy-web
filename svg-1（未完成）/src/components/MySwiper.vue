<template>
	<swiper ref="mySwiper" :options="swiperOptions">
		<swiper-slide>
			<svg
				width="100%"
				height="100%"
				viewBox="0 0 1200 600"
				preserveAspectRatio="xMidYMid meet"
			>
				<defs>
					<filter id="GaussianBlur">
						<feGaussianBlur
							in="SourceGraphic"
							stdDeviation="6"
						></feGaussianBlur>
					</filter>
					<filter id="drop-shadow">
						<feGaussianBlur
							in="SourceGraphic"
							stdDeviation="6"
							result="blur"
						/>
						<feOffset in="blur" dx="4" dy="4" result="offsetBlur" />
						<feMerge>
							<feMergeNode in="offsetBlur" />
							<feMergeNode in="SourceGraphic" />
						</feMerge>
					</filter>
					<text
						id="text"
						x="600"
						y="190"
						width="1200"
						height="150"
						style="font-size:150;font-weight:500;text-anchor:middle;fill:gray;"
					>
						SUKURA
					</text>
				</defs>
				<!--高斯模糊  -->
				<use
					xlink:href="#text"
					y="0"
					style="fill: gray; filter: url(#GaussianBlur);"
				/>
				<!-- 文本 叠加 高斯模糊 制作投影 -->
				<use
					xlink:href="#text"
					y="150"
					transform="translate(8,8)"
					style="fill: gray; filter: url(#GaussianBlur);"
				/>
				<use xlink:href="#text" y="150" style="fill: gray;" />
				<!-- 组合 高斯模糊滤镜 制作投影 -->
				<use
					xlink:href="#text"
					y="300"
					style="fill: gray; filter: url(#drop-shadow);"
				/>
			</svg>
		</swiper-slide>
		<swiper-slide>
			<svg
				width="100%"
				height="100%"
				viewBox="0 0 1200 600"
				preserveAspectRatio="xMidYMid meet"
			>
				<defs>
					<filter
						id="filter-image"
						x="10%"
						y="10%"
						width="80%"
						height="80%"
					>
						<!-- 	<feImage
							xlink:href="redA.jpeg"
							x="150"
							y="100"
							width="150"
							height="150"
							preserveAspectRatio="xMidYMid meet"
						/> -->
						<feImage
							xlink:href="./../../public/img/unnamed.jpg"
							x="150"
							y="100"
							width="150"
							height="150"
							preserveAspectRatio="xMidYMid meet"
						/>
					</filter>
					<rect
						x="50"
						y="50"
						width="300"
						height="300"
						fill="skyblue"
					/>
					<rect
						x="50"
						y="50"
						width="300"
						height="300"
						filter="url(#filter-image)"
					/>
				</defs></svg
		></swiper-slide>
		<swiper-slide></swiper-slide>
		<swiper-slide>Slide 4</swiper-slide>
		<swiper-slide>Slide 5</swiper-slide>
		<div class="swiper-pagination" slot="pagination"></div>
	</swiper>
</template>

<script>
import { Swiper, SwiperSlide, directive } from "vue-awesome-swiper";
// If you use Swiper 6.0.0 or higher
import "swiper/swiper-bundle.css";
export default {
	name: "MySipwer",
	data() {
		return {
			swiperOptions: {
				pagination: {
					el: ".swiper-pagination",
					clickable: true,
					type: "bullets",
					dynamicBullets: false,
					hideOnClick: false,
				},
			},
		};
	},
	computed: {
		// swiper() {
		// 	return this.$refs.mySwiper.$swiper;
		// },
	},
	mounted() {
		// console.log("Current Swiper instance object", this.mySwiper);
		// this.mySwiper.slideTo(3, 1000, false);
	},
	components: {
		Swiper,
		SwiperSlide,
	},
	directives: {
		swiper: directive,
	},
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped></style>
