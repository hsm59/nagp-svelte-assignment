<script>
    import {onMount} from 'svelte';

    import {is_empty} from "svelte/internal";


    import Fa from 'svelte-fa'
    import { faFolder, faFile } from '@fortawesome/free-solid-svg-icons'

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
                <div class="icon-container">
                    <Fa icon={faFolder}/>
                    <h3 on:click={() => toggleParent(index)}>{parent.title}</h3>
                </div>
                {#if parent.isOpen}
                    <ul>
                        {#if !is_empty(parent.children)}
                            {#each parent.children as child}
                                <li>
                                    {#if typeof child === 'object'}
                                        <!--This incase if there's second level of children-->
                                        <!--<svelte:self items={child.children}/>-->
                                        <div class="icon-container">
                                            <Fa icon={faFolder}/>
                                            <h3>{child.title}</h3>
                                        </div>
                                    {:else}
                                        <div class="icon-container">
                                            <Fa icon={faFile}/>
                                            <h3>{child}</h3>
                                        </div>
                                    {/if}
                                </li>
                            {/each}
                        {/if}
                    </ul>
                {/if}
            {:else}
                <div class="icon-container">
                    <Fa icon={faFile}/>
                    <h3>{parent}</h3>
                </div>
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
        padding-left: 10px;
    }

    ul ul {
        margin-left: 4rem;
    }

    .icon-container {
        display: flex;
        align-items: center;
        padding-bottom: 10px;
    }
</style>