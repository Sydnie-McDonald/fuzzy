import {
    createBunny,
    getFamilies,
    checkAuth,
    logout,
} from '../fetch-utils.js';

const form = document.querySelector('.bunny-form');
const logoutButton = document.getElementById('logout');

form.addEventListener('submit', async (e) => {
    // prevent default
    e.preventDefault();
    // get the name and family id from the form
    const newForm = new FormData(form);
    const bunny = ({ name: newForm.get('bunny-name'), family_id: newForm.get('family-id') });
    //console.log(bunny);
    // use createBunny to create a bunny with this name and family id
    await createBunny(bunny);
    form.reset();
});

window.addEventListener('load', async () => {
    // let's dynamically fill in the families dropdown from supabase
    // grab the select HTML element from the DOM
    const select = document.getElementById('select');
    // go get the families from supabase
    const families = await getFamilies();
    // for each family
    for (let family of families) {
        // create an option tag
        const option = document.createElement('option');
        // set the option's value and text content
        option.textContent = family.name;
        option.value = family.id;
        // and append the option to the select
        select.append(option);
    }
});

checkAuth();

logoutButton.addEventListener('click', () => {
    logout();
});