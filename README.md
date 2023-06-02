# NAGP Batch 2 - Svelte Home Assignment

The link to the deployed web application is [here](https://login-svelte-assignment.netlify.app/). The application has been deployed on Netlify.

## Package structure
The project is divided into 2 parts - 
1. nagp-svelte-project
2. login-svelte-assignment

`login-svelte-assignment` Svelte application is the entry point of the application, and the credentials to login to the application are as follows -

Username: husain

Password: Mukadam (case-sensitive)

`nagp-svelte-project` has the nested listing component that is integrated in the `login-svelte-assignment` as a Plugin, I've also commented out the code where it's being integrated as a web component through the `<script>` tag.

Note: I was facing issues with CORs and had to add `_headers` file to enable CORs in order for it to work with the deployed nested components after the user logs in. 

The link to the nested components Svelte application is [here](https://nagp-svelte-assignment.netlify.app/). 

