<script>
    import {onMount} from 'svelte';

    import Node from './Node.svelte';

    export var items = [
        {
            title: 'Parent 1',
            children: ['Child 1', 'Child 2', 'Child 3'],
            isOpen: false
        },
        {
            title: 'Parent 2',
            children: ['Child 4', 'Child 5', [
                {
                    title: 'Parent 3',
                    children: ['Child 1', 'Child 2', 'Child 3'],
                    isOpen: false
                }]
            ],
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
                    {#each parent.children as child}
                        <li>
                            {#if typeof child === 'object'}
                                <svelte:self items={child}/>
                            {:else}
                                <Node {child}/>
                            {/if}
                        </li>
                    {/each}
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