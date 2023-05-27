<script>
    import {onMount} from 'svelte';

    import Node from './Node.svelte';
    import {is_empty} from "svelte/internal";

    export var items = [
        {
            title: 'Folder 1',
            children: ['Child 1', 'Child 2', 'Child 3'],
            isOpen: false
        },
        {
            title: 'Folder 2',
            children: ['Child 4', 'Child 5', [
                {
                    title: 'Folder 3',
                    children: ['Child 1', 'Child 2', 'Child 3'],
                    isOpen: false
                },
                {
                    title: 'File 1',
                    children: [],
                    isOpen: false
                }
            ]
            ],
            isOpen: false
        },
        {
            title: 'File 2',
            children: [],
            isOpen: false
        }
    ];

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
        margin-bottom: 0.5rem;
    }

    ul ul {
        margin-left: 1rem;
    }
</style>