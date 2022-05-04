<script>
    export let json;
    import { fly, fade, slide, draw } from "svelte/transition";

function daum (DATE) {
    let split = DATE.split('T');
    return split[0];
}
</script>

{#if json && "data" in json && "items" in json.data && json.data.items.length > 0}
    <!-- <p>{JSON.stringify(json)}</p> -->
    <div id = "item-holder">
        {#each json.data.items as item}
            <div id = "item">
                <p in:fade>{item.url}</p>
                <a in:fade href="{item.url}">{item.name}</a>
                <p in:fade>{item.type}</p>
                {#if item.desription != "undefined"}
                <p style="font-size: 20px" in:fade>{item.description}</p>
                {/if}
                
                <p in:fade>{daum(item.published_at)}</p>
                <!-- <p in:fade>{JSON.stringify(item)}</p> -->
                <!-- {#each Object.entries(item) as [key, value]}
                    <p in:fade>{item.name, item.url}</p>
                {/each} -->
            </div>
        {/each}
    </div>
{:else if json}
    <div>
        <p in:fade>{"No results"}</p>
    </div>
{/if}

<style>
    #item-holder {
        display: flex;
        justify-content: start;
        align-items: center;
        flex-direction: column;
        overflow-y: scroll;
        box-sizing: border-box;
        padding-left: 0%;
        padding-right: 3%;
        max-width: 100%;
        row-gap: 10px;
    }
    #item {
        border-radius: 10px;
    /**    background-color: whitesmoke; */
        border: 2px solid whitesmoke;
        padding: 20px;
        width: 100%;
        box-sizing: border-box;
        word-wrap: break-word;
    }
    p {
                /* border: 2px solid black; */
                padding: 5px;
    }
    /** https://onaircode.com/html-css-custom-scrollbar-examples/ */
    ::-webkit-scrollbar {
        width: 10px;
        height: 15px;
    }
    ::-webkit-scrollbar-track {
        border-radius: 5px;
        background-color: rgba(255, 255, 255, 0.1);
    }
    ::-webkit-scrollbar-thumb {
        background-image: linear-gradient(45deg, #000000, #000000);
        border-radius: 5px;
        -webkit-box-shadow: rgba(0, 0, 0, 0.12) 0 3px 13px 1px;
    }
</style>