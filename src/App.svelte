<script>
    import {is_empty} from "svelte/internal";
    import ListingComponent from "./lib/ListingComponent.svelte";

    let input_field_value = '';

    // TODO: on change of the dropdown value, check folders in data and display if there's one available
    let type_dropdown_value = 'none';
    let level_dropdown_value = 'none';
    $: showRootLevelFoldersList();

    let selected_folder_value = 'none';
    let display_folder_dropdown = false;

    /**
     * For storing File (String) - 'fileName';
     * For storing Folder (Object) - {
     *     title: 'folderName',
     *     children: [],
     *     isOpen: false,
     * }
     */
    let data = [];
    let folders_dropdown = [];

    function resetValues() {
        input_field_value = '';
        type_dropdown_value = 'none';
        level_dropdown_value = 'none';
        selected_folder_value = 'none';
        display_folder_dropdown = false;
    }

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

            return listOfItemsRootLevel.find(element => element.toLowerCase() === name.toLowerCase()) != null;
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

            return listOfChildrenLevel1.find(element => element.toLowerCase() === name.toLowerCase()) != null;
        }
    }

    /**
     * Show the root level folders if the user selects they want to store the folder / file
     * on Level 1
     */
    function showRootLevelFoldersList() {

        folders_dropdown = data
            .filter(element => typeof element === 'object')
            .map(element => element.title);

        display_folder_dropdown = level_dropdown_value === 'levelOne' && folders_dropdown.length > 0;
    }

    function submitForm() {
        // TODO: Before saving make sure that the file name is unique and there aren't files / folders with the same name
        if (type_dropdown_value === 'none' || level_dropdown_value === 'none' || is_empty(input_field_value)) {
            alert('Please Select / Enter all the values');
        } else {
            if (level_dropdown_value === 'levelOne') {
                if (folders_dropdown.length === 0) {
                    alert('There are no Folders to save in, please change your selection');
                } else if (selected_folder_value === 'none') {
                    alert('Please Select the correct folder to save');
                } else {
                    saveData();
                }
            } else {
                if (checkDuplicateName(level_dropdown_value, input_field_value)) {
                    alert(`The file / folder name \"${input_field_value}\" already exists, please Enter a different name`)
                } else {
                    saveData();
                }
            }

        }
    }

    function saveData() {
        if (level_dropdown_value === 'rootLevel') {
            if (type_dropdown_value === 'file') {
                if (is_empty(data)) {
                    data = [input_field_value.trim()]
                } else {
                    data = [...data, input_field_value.trim()]
                }
            } else {
                if (is_empty(data)) {
                    data = [{
                        title: input_field_value.trim(),
                        isOpen: false,
                        children: []
                    }]
                } else {
                    data = [...data, {
                        title: input_field_value.trim(),
                        isOpen: false,
                        children: []
                    }]
                }
            }
        } else {
            if (type_dropdown_value === 'file') {

                let newData = input_field_value.trim();

                data = data.map(
                    element => {
                        if (element.title === selected_folder_value) {
                            return {
                                title: element.title,
                                isOpen: false,
                                children: [...element.children, newData]
                            };
                        } else {
                            return element;
                        }
                    }
                );

            } else {
                let newData = {
                    title: input_field_value.trim(),
                    isOpen: false,
                    children: []
                };

                data = data.map(
                    element => {
                        if (element.title === selected_folder_value) {
                            return {
                                title: element.title,
                                isOpen: false,
                                children: [...element.children, newData]
                            };
                        } else {
                            return element;
                        }
                    }
                );
            }
        }

        resetValues();
    }

    function cancelForm() {
        resetValues();
    }

</script>

<form on:submit|preventDefault="{submitForm}">
    <label for="inputField">Name: </label>
    <input type="text" id="inputField" name="inputField" bind:value="{input_field_value}"><br><br>

    <label for="typeDropdown">Select Type: </label>
    <select id="typeDropdown" name="typeDropdown" bind:value="{type_dropdown_value}">
        <option value="file">File</option>
        <option value="folder">Folder</option>
    </select><br><br>

    <label for="levelDropdown">Select Level: </label>
    <select id="levelDropdown" name="levelDropdown" bind:value="{level_dropdown_value}" on:change={showRootLevelFoldersList}>
        <option value="rootLevel">Root Level</option>
        <option value="levelOne">Level One</option>
    </select><br><br>

    <!--  TODO: Display list of folder if exists and if the user selects 'File' in the 'Type' dropdown  -->
    <div style="display: {display_folder_dropdown ? 'block' : 'none'}">
        <label for="folderDropdown">Select Folder: </label>
        <select id="folderDropdown" name="folderDropdown" bind:value="{selected_folder_value}">
            {#each folders_dropdown as item}
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
