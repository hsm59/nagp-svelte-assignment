<script>
    import {is_empty} from "svelte/internal";
    import ListingComponent from "./lib/ListingComponent.svelte";

    let inputFieldValue = '';

    // TODO: on change of the dropdown value, check folders in data and display if there's one available
    let typeDropdownValue = 'none';
    let levelDropdownValue = 'none';

    let selectedFolderValue = '';
    let displayFolderDropdown = false;

    /**
     * For storing File (String) - 'fileName';
     * For storing Folder (Object) - {
     *     title: 'folderName',
     *     children: [],
     *     isOpen: false,
     * }
     */
    let data = [
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
    ];

    function checkNameIfExists(level, name) {
        if (level === 'rootLevel') {
            // Root level
            let listOfItemsRootLevel = data.map(element => {
                if (typeof element === 'object') {
                    return element.title;
                } else {
                    return element;
                }
            });

            listOfItemsRootLevel.forEach(element => {
               console.log(element);
            });

            return listOfItemsRootLevel.find(element => element === name) != null;
        } else {
            // Level 1 - criteria - only the ones that have no folders inside of it

            let listOfItemsLevel1 = data.map(element => {
                if (typeof element === 'object') {
                    element.children.map(nestedElement => {
                        if (typeof nestedElement === 'object') {
                            return nestedElement.title;
                        } else {
                            return nestedElement;
                        }
                    });
                } else {
                    return element;
                }
            });

            listOfItemsLevel1.forEach(element => {
                console.log(element);
            });

            return listOfItemsLevel1.find(element => element === name) != null;
        }
    }

    function showRootLevelFoldersList() {
        return data.filter(element => {
            if (typeof element === 'object') {
                return element;
            }
        });
    }

    function getFileName() {

    }

    function submitForm() {
        // TODO: Before saving make sure that the file name is unique and there aren't files / folders with the same name
        if (typeDropdownValue === 'none' || levelDropdownValue === 'none' || is_empty(inputFieldValue)) {
            alert('Please enter all the values');
        } else {

            let flag = checkNameIfExists(levelDropdownValue, inputFieldValue)
            console.log('whats the flag ' + flag);

        }
/*
        if (typeDropdownValue === 'file') {
            if (is_empty(data)) {
                data = [
                    {
                        'name': inputFieldValue,
                        'type': typeDropdownValue
                    }
                ];
            } else {
                data = [...data, {
                    'name': inputFieldValue,
                    'type': typeDropdownValue
                }];
            }

        } else {
            // For folders
            if (is_empty(data)) {
                data = [
                    {
                        'name': inputFieldValue,
                        'type': typeDropdownValue,
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
*/
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
    <select id="levelDropdown" name="levelDropdown" bind:value="{levelDropdownValue}">
        <option value="rootLevel">Root Level</option>
        <option value="levelOne">Level One</option>
    </select><br><br>

    <!--  TODO: Display list of folder if exists and if the user selects 'File' in the 'Type' dropdown  -->
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
    <ListingComponent items = {data}/>
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
