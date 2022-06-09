<script>
	import Board from "./brade.svelte";
	const title = "Tre i rad";
  </script>

  <svelte:head>
	<title>{title}</title>
  </svelte:head>
  
  <h1>{title}</h1>
  <Board />

<style>
	h1 {
		position: fixed;
		color: white;
		font-size: 60px;
		padding: 10px;
		margin-top: -10px;
		width: 100%;
		background-color: black;
		text-align: center;
	}
	@media only screen and (max-width: 400px) {
		h1 {
		position: fixed;
		color: white;
		font-size: 40px;
		padding: 5px;
		margin-top: -10px;
		width: 100%;
		background-color: black;
		text-align: center;
	}
	}
</style>