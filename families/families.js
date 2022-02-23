import { checkAuth, deleteBunny, getFamilies, logout } from '../fetch-utils.js';

checkAuth();

const familiesEl = document.querySelector('.families-container');
const logoutButton = document.getElementById('logout');

logoutButton.addEventListener('click', () => {
    logout();
});

window.addEventListener('load', async () => {
    const families = await getFamilies();

    displayFamilies(families);
});

async function displayFamilies() {
    // fetch families from supabase
    const families = await getFamilies();
    //console.log(families);
    // clear out the familiesEl
    familiesEl.textContent = '';

    for (let family of families) {
        // create three elements for each family, one for the whole family, one to hold the name, and one to hold the bunnies
        // your HTML Element should look like this:
        // <div class="family">
        //    <h3>the Garcia family</h3>
        //    <div class="bunnies">
        //        <div class="bunny">Fluffy</div>
        //        <div class="bunny">Bob</div>
        //    </div>
        // </div>
        // add the bunnies css class to the bunnies el, and family css class to the family el
        // put the family name in the name element
        const familyEl = document.createElement('div');
        familyEl.classList.add('family');
        const h3 = document.createElement('h3');
        h3.textContent = family.name;

        const bunniesDiv = document.createElement('div');
        bunniesDiv.classList.add('bunnies');

        // for each of this family's bunnies
        //    make an element with the css class 'bunny', and put the bunny's name in the text content
        const bunnies = family.fuzzy_bunnies;
        //console.log(bunnies);

        for (let bunny of bunnies) {
            const bunnyDiv = document.createElement('div');
            bunnyDiv.classList.add('bunny');
            bunnyDiv.textContent = bunny.name;
            //    add an event listener to the bunny el. On click, delete the bunny, then refetch and redisplay all families.
            bunnyDiv.addEventListener('click', async () => {
                await deleteBunny(bunny.id);
                displayFamilies();
            });

            bunniesDiv.append(bunnyDiv);

        }

        familyEl.append(h3, bunniesDiv);

        // append this bunnyEl to the bunniesEl

        familiesEl.append(family);
    }

    // append the bunniesEl and nameEl to the familyEl
    // append the familyEl to the familiesEl
}