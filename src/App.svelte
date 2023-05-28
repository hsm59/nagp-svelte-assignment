<script>
    import {is_empty} from "svelte/internal";
    import ListingComponent from "./lib/ListingComponent.svelte";

    let inputFieldValue = '';

    // TODO: on change of the dropdown value, check folders in data and display if there's one available
    let dropdownValue = 'none';

    let selectedFolderValue = '';
    let displayFolderDropdown = false;

    let data = [];


    function getFolders(level) {
        if (level === 0) {
            // Root level
            return data.filter((items) => items.type === 'folder')
        } else {
            // Level 1 - criteria - only the ones that have no folders inside of it
            return data.filter((items) => items.data.find((level1Item) => level1Item.data.isEmpty))
        }
    }

    function submitForm() {
        // TODO: Before saving make sure that the file name is unique and there aren't files / folders with the same name
        if (dropdownValue === 'file') {
            if (is_empty(data)) {
                data = [
                    {
                        'name': inputFieldValue,
                        'type': dropdownValue
                    }
                ];
            } else {
                data = [...data, {
                    'name': inputFieldValue,
                    'type': dropdownValue
                }];
            }

        } else {
            // For folders
            if (is_empty(data)) {
                data = [
                    {
                        'name': inputFieldValue,
                        'type': dropdownValue,
                        'level1Data': []
                    }
                ];
            } else {
                // TODO: Check what's the name of the folder selected if there is any else store it in the root level

                if (is_empty(selectedFolderValue)) {

                } else {

                }
            }

        }

        console.log('the data ' + data.length);
    }

    function cancelForm() {

    }

</script>

<form on:submit|preventDefault="{submitForm}">
    <label for="inputField">Name: </label>
    <input type="text" id="inputField" name="inputField" bind:value="{inputFieldValue}"><br><br>

    <label for="typeDropdown">Select Type: </label>
    <select id="typeDropdown" name="typeDropdown" bind:value="{dropdownValue}">
        <option value="file">File</option>
        <option value="folder">Folder</option>
    </select><br><br>

    <!--  TODO: Display list of folder if there exists and if the user selects 'File' in the 'Type' dropdown  -->
    <div style="display: {displayFolderDropdown ? 'block' : 'none'}">
        <label for="folderDropdown">Select Type: </label>
        <select id="folderDropdown" name="folderDropdown" bind:value="{selectedFolderValue}">
            {#each data as item}
                <option value={item.name}>{item.name}</option>
            {/each}
        </select><br><br>
    </div>

    <button type="submit">Save</button>
    <button type="button" on:click="{cancelForm}">Cancel</button>
    <ListingComponent></ListingComponent>
</form>


<style>
    label {
        font-size: large;
        font-weight: bold;
        margin-bottom: 12px;
    }

    input, select, button {
        font-size: large;
    }
</style>
