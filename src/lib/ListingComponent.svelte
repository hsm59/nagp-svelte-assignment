<script>
    import {onMount} from 'svelte';

    import {is_empty} from "svelte/internal";

    export var items;

    function toggleParent(index) {
        items[index].isOpen = !items[index].isOpen;
    }

    onMount(() => {
        // Using model
        // items[0].isOpen = true;
    });
</script>

<ul>
    {#each items as parent, index}
        <li>
            {#if typeof parent === 'object'}
                <h3 on:click={() => toggleParent(index)}>{parent.title}</h3>
                {#if parent.isOpen}
                    <ul>
                        {#if !is_empty(parent.children)}
                            {#each parent.children as child}
                                <li>
                                    {#if typeof child === 'object'}
                                        <!--This incase if there's second level of children-->
                                        <!--<svelte:self items={child.children}/>-->
                                        <h3>{child.title}</h3>
                                    {:else}
                                        <h3>{child}</h3>
                                    {/if}
                                </li>
                            {/each}
                        {/if}
                    </ul>
                {/if}
            {:else}
                <h3>{parent}</h3>
            {/if}
        </li>
    {/each}
</ul>

<style>
    ul {
        list-style-type: none;
        padding-left: 0;
    }

    h3 {
        cursor: pointer;
        margin-bottom: 1.5rem;
    }

    ul ul {
        margin-left: 4rem;
    }
</style>