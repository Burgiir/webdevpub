<script>
    import Spinner from "./Spinner.svelte";
    import Results from "./Results.svelte";
    import Search from "./Search.svelte";
    import { promise } from "./stores.js";
</script>

<main>
	<div id="jadå">
		<p id="bild"><img width="375" style = "max-width:50vw" src="build/Bong.png"/></p>
		<Search/>
	</div>
	
    {#await $promise}
        <Spinner />
    {:then result}
        <Results json={result} />
    {:catch error}
        <p style="color: red">{error.message}</p>
    {/await}
</main>

<style>
    :global(body) {
        background: linear-gradient(-45deg, #ee7752, #e73c7e, #23a6d5, #23d5ab);
		background-size: 220%, 220%;
		animation: gradient 10s ease infinite;
        padding: 0;
        margin: 0;
    }
	#jadå{
		align-items: center;
		flex-direction: column;
		display: flex;
        justify-content: start;
	}
    main {
        height: 100vh;
        width: 100vw;
        background-size: 400% 400%;
        animation: gradient 15s ease infinite;
        display: flex;
        justify-content: start;
        flex-direction: column;
        gap: 50px;
        padding-top: 5%;
        padding-left: 7%;
        padding-right: 10%;
        padding-bottom: 5%;
        box-sizing: border-box;
        align-items: center;
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
    @media only screen and (max-width: 1440px) {
		:global(body) {
			background: none;
			background-color: #aaa;
		}
    }
    @media only screen and (max-width: 980px) {
        #jadå {
            max-width: 280px;
        }
    }
    @media only screen and (max-width: 315px) {
        

    }
</style>