<script>
    import {is_empty} from "svelte/internal";
    import ListingComponent from "./lib/ListingComponent.svelte";

    let inputFieldValue = '';

    // TODO: on change of the dropdown value, check folders in data and display if there's one available
    let typeDropdownValue = 'none';
    let levelDropdownValue = 'none';
    $: showRootLevelFoldersList();

    let selectedFolderValue = 'none';
    let displayFolderDropdown = false;

    /**
     * For storing File (String) - 'fileName';
     * For storing Folder (Object) - {
     *     title: 'folderName',
     *     children: [],
     *     isOpen: false,
     * }
     */
    let data = [];
    let foldersDropdown = [];

    function checkDuplicateName(level, name) {
        if (level === 'rootLevel') {
            // Root level
            let listOfItemsRootLevel = data.map(element => {
                if (typeof element === 'object') {
                    return element.title;
                } else {
                    return element;
                }
            });

            return listOfItemsRootLevel.find(element => element === name) != null;
        } else {

            let listOfItemsLevel1 = data
                .filter(element => typeof element === 'object' && element.children.length > 0)
                .flatMap(element => element.children);

            let listOfChildrenLevel1 = listOfItemsLevel1.map(element => {
                if (typeof element === 'object') {
                    return element.title;
                } else {
                    return element;
                }
            });

            return listOfChildrenLevel1.find(element => element === name) != null;
        }
    }

    /**
     * Show the root level folders if the user selects they want to store the folder / file
     * on Level 1
     */
    function showRootLevelFoldersList() {

        foldersDropdown = data
            .filter(element => typeof element === 'object')
            .map(element => element.title);

        displayFolderDropdown = levelDropdownValue === 'levelOne' && foldersDropdown.length > 0;
    }

    function submitForm() {
        // TODO: Before saving make sure that the file name is unique and there aren't files / folders with the same name
        if (typeDropdownValue === 'none' || levelDropdownValue === 'none' || is_empty(inputFieldValue)) {
            alert('Please Select / Enter all the values');
        } else {
            if (levelDropdownValue === 'levelOne') {
                if (foldersDropdown.length === 0) {
                    alert('There are no Folders to save in, please change your selection');
                } else if (selectedFolderValue === 'none') {
                    alert('Please Select the correct folder to save');
                }
            } else {
                if (checkDuplicateName(levelDropdownValue, inputFieldValue)) {
                    alert(`The file / folder name \"${inputFieldValue}\" already exists, please Enter a different name`)
                } else {

                }
            }

        }
    }

    function saveData(name, type, level, folderValue) {
        if (level === 'rootLevel') {
            if (type === 'file') {

            } else {

            }
        } else {
            if (type === 'file') {

            } else {

            }

        }
    }

    function cancelForm() {

    }

</script>

<form on:submit|preventDefault="{submitForm}">
    <label for="inputField">Name: </label>
    <input type="text" id="inputField" name="inputField" bind:value="{inputFieldValue}"><br><br>

    <label for="typeDropdown">Select Type: </label>
    <select id="typeDropdown" name="typeDropdown" bind:value="{typeDropdownValue}">
        <option value="file">File</option>
        <option value="folder">Folder</option>
    </select><br><br>

    <label for="levelDropdown">Select Level: </label>
    <select id="levelDropdown" name="levelDropdown" bind:value="{levelDropdownValue}" on:change={showRootLevelFoldersList}>
        <option value="rootLevel">Root Level</option>
        <option value="levelOne">Level One</option>
    </select><br><br>

    <!--  TODO: Display list of folder if exists and if the user selects 'File' in the 'Type' dropdown  -->
    <div style="display: {displayFolderDropdown ? 'block' : 'none'}">
        <label for="folderDropdown">Select Folder: </label>
        <select id="folderDropdown" name="folderDropdown" bind:value="{selectedFolderValue}">
            {#each foldersDropdown as item}
                <option value={item}>{item}</option>
            {/each}
        </select><br><br>
    </div>

    <button type="submit">Save</button>
    <button type="button" on:click="{cancelForm}">Cancel</button>
    <ListingComponent items={data}/>
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
