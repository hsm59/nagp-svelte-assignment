<script>
    import {onMount} from 'svelte';

    import Node from './Node.svelte';
    import {is_empty} from "svelte/internal";

    export var items/* = [
        {
            title: 'Folder 1',
            children: [],
            isOpen: false
        },
        {
            title: 'Folder 2',
            children: ['File 4', 'File 5', [
                {
                    title: 'Folder 3',
                    children: [],
                    isOpen: false
                },
            ],
                'File 6'
            ],
            isOpen: false
        },
        'File 7',
        'File 8',
        'File 9',
    ]*/;

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
                                        <svelte:self items={child}/>
                                    {:else}
                                        <Node {child}/>
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