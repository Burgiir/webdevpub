<script lang="ts">
	import { spring, tweened } from "svelte/motion";
	import { Clock } from "./clock.js";

	let clock1 = new Clock(0, 55);
	let clock2 = new Clock(9, 3);
	let clock3 = new Clock(0, 0);
	let clockDisplay1 = "00:00";
	let clockDisplay2 = "00:00";
	let clockDisplay3 = "00:00";

	let alarmman_on_off = false;
	let alarm = "00:00";

	let minute = spring(clock2.minute_);

	let hours = spring();
	let minutes = spring();
	$hours = parseInt(clock2.time.hour);
	$minutes = parseInt(clock2.time.hour) * 60 + parseInt(clock2.time.minute);

	function on_off() {
		alarmman_on_off = !alarmman_on_off;
	}

	function tic() {
		console.log(alarm, alarmman_on_off);
		clockDisplay1 = clock1.tick();
		clockDisplay2 = clock2.tick();
		clockDisplay3 = clock3.tick();
		if (clock1.time.hour + clock1.time.minute == 0) {
			hours = spring();
			minutes = spring();
			$hours = parseInt(clock2.time.hour);
			$minutes =
				parseInt(clock2.time.hour) * 60 + parseInt(clock2.time.minute);
		} else {
			hours.set(parseInt(clock2.time.hour));
			minutes.set(
				parseInt(clock2.time.hour) * 60 + parseInt(clock2.time.minute)
			);
		}
	}

	setInterval(tic, 1000);

	//Rainbow

	import type { SpinnerTypes } from "./spinner.type";
	export let color: SpinnerTypes["color"] = "rgb(0, 0, 255)";
	export let unit: SpinnerTypes["unit"] = "px";
	export let duration: SpinnerTypes["duration"] = "2s";
	export let size: SpinnerTypes["size"] = "300";

	//
</script>

<div class="container">
	<div class="item">
		<svg viewBox="-50 -50 100 100">
			<circle class="clock-face" r="48" />

			<!-- markers -->
			{#each [0, 5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55] as minutess}
				<line
					class="major"
					y1="40"
					y2="45"
					transform="rotate({30 * minutess})"
				/>

				{#each [1, 2, 3, 4] as offset}
					<line
						class="minor"
						y1="42"
						y2="45"
						transform="rotate({6 * (minutess + offset)})"
					/>
				{/each}
			{/each}

			<!-- hour hand -->
			<line
				class="hour"
				y1="38"
				y2="18"
				transform="rotate({(6 / 12) * $minutes - 180})"
			/>

			<!-- minute hand -->
			<g transform="rotate({6 * $minutes - 180})">
				<line class="minute" y1="39" y2="8" />
			</g>
		</svg>
	</div>

	<div class="item">
		<h3>{clockDisplay3}</h3>
		<div
			class="wrapper"
			style="--size: {size}{unit}; --color: {color}; --duration: {duration};"
		>
			<div class="rainbow" />
		</div>
	</div>

	<div class="item">
		<h1>{clockDisplay1}</h1>
		<h5><button id="ooga" on:click={on_off}>On/Off</button></h5>
		<h4><input id="setAlarm" type="time" bind:value={alarm} /></h4>
		{#if alarm <= clockDisplay1 && alarmman_on_off == true}
			<h2>ALARM!</h2>
		{/if}
	</div>
</div>

<style>
	@font-face {
		font-family:"fem";
		src: url("../NightmareCodehack-lrA5.ttf") format("opentype");
	}
	.container {
		display: flex;
		flex-direction: row;
		align-content: center;
		justify-content: center;
		place-self: center;
		gap: 10px;
		margin: auto auto;
		padding: auto;
	}

	.item {
		position: relative;
		display: flex;
		width: 310px;
		height: 310px;
		margin: 5px;
		align-items: center;
		justify-content: center;
		flex-direction: column;
	}

	svg {
		width: 50%;
		height: 50%;
	}

	:global(body) {
		background: linear-gradient(-45deg, #ee7752, #e73c7e, #23a6d5, #23d5ab);
		background-size: 220%, 220%;
		animation: gradient 10s ease infinite;
	}

	.wrapper {
		position: absolute;
		top: 40px;
		width: var(--size);
		height: calc(var(--size) / 2);
		overflow: hidden;
	}
	.rainbow {
		width: var(--size);
		height: var(--size);
		border-left-color: transparent;
		border-bottom-color: transparent;
		border-top-color: var(--color);
		border-right-color: var(--color);
		box-sizing: border-box;
		transform: rotate(-200deg);
		border-radius: 50%;
		border-style: solid;
		animation: var(--duration) ease-in-out 0s infinite normal none running
			rotate;
	}
	@keyframes rotate {
		0% {
			border-width: 10px;
		}
		25% {
			border-width: 3px;
		}
		50% {
			transform: rotate(115deg);
			border-width: 10px;
		}
		75% {
			border-width: 3px;
		}
		100% {
			border-width: 10px;
		}
	}

	@keyframes gradient {
		0% {
			background-position: 0% 50%;
		}
		50% {
			background-position: 100% 50%;
		}
		100% {
			background-position: 0% 50%;
		}
	}

	svg {
		width: 50%;
		height: 50%;
	}
	.clock-face {
		stroke: #333;
		fill: none;
	}
	.minor {
		stroke: rgb(56, 56, 56);
		stroke-width: 0.4;
	}
	.major {
		stroke: #333;
		stroke-width: 0.8;
	}
	.minute {
		stroke: rgb(0, 0, 255);
		stroke-width: 1;
	}
	.hour {
		stroke: #333;
		stroke-width: 1.5;
	}

	h1 {
		font-size: 5em;
		font-family: "fem";
		color: blue;
	}
	h2 {
		color: white;
		font-size: 1em;
		font-family: "Times New Roman";
	}
	h3 {
		color: white;
		font-size: 3em;
		font-family: "Times New Roman";
	}
	h4 {
		font-size: 1em;
	}
	h5 {
		font-size: 1em;
	}
	#setAlarm {
		background-color: rgba(0, 0, 0, 0);
		outline-color: rgba(0, 0, 0, 0);
	}
	#ooga {
		background-color: rgba(0, 0, 0, 0);
		outline-color: rgba(0, 0, 0, 0);
	}

	@media only screen and (min-width: 980px) {
		:global(body) {
			display: flex;
			justify-content: center;
			place-content: center;
			align-items: center;
		}
	}
	@media only screen and (max-width: 1440px) {
		:global(body) {
			background: none;
			background-color: #aaa;
		}
		svg {
			width: 310px;
			height: 310px;
		}
		h1 {
			color: black;
		}
		h2 {
			color: black;
		}
		h3 {
			color: black;
		}
		.container {
			flex-direction: row;
			place-self: center;
			align-self: center;
			align-items: center;
			justify-content: center;
		}
		.item {
			display: flex;
			flex: content;
		}
	}
	@media only screen and (max-width: 980px) {
		.container {
			flex-direction: column;
			align-items: center;
			justify-content: center;
		}
		:global(body) {
			background: none;
			background-color: #aaa;
		}
		.item {
			display: flex;
			align-items: center;
			flex-direction: column;
		}
		.wrapper {
			top: -20px;
		}
	}
</style>
