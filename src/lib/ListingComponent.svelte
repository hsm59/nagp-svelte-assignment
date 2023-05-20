<script>
    import { onMount } from 'svelte';
    import Node from "./Node.svelte";

    let items = [];

    onMount(() => {
        // Fetch the list of items from an API or set it manually
        items = [
            {
                id: 1,
                title: 'Item 1',
                children: [
                    { id: 11, title: 'Subitem 1-1' },
                    { id: 12, title: 'Subitem 1-2' }
                ]
            },
            {
                id: 2,
                title: 'Item 2',
                children: [
                    { id: 21, title: 'Subitem 2-1' },
                    { id: 22, title: 'Subitem 2-2' }
                ]
            }
        ];
    });

    function toggleItem(item) {
        item.expanded = !item.expanded;
        item = { ...item }; // Trigger reactivity
    }
</script>

<style>
    .item {
        margin-bottom: 10px;
    }

    .title {
        cursor: pointer;
        font-weight: bold;
    }

    .children {
        padding-left: 10px;
    }
</style>

<Node {...items}/>