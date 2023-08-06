let currentCharacter = 0;
let characterImage = document.querySelector('.img-contain');

// Show LogoText Modal
let logoText = document.querySelector('.logoText');
logoText.addEventListener("click", () => {
    showModal();
})

// Swipe function
function swipe (e) {
    if (e.target.classList.contains('right')) {
        if (currentCharacter < maxCharacters-1) {
            currentCharacter++;
        }
        else {
            currentCharacter = 0;
        }
    }
    else if (e.target.classList.contains('left')) {
        if (currentCharacter > 0) {
            currentCharacter--;
        }
        else {
            currentCharacter = maxCharacters-1;
        }
    }
    changeImage();
    changeCharacterText();
}

let swipeButtons = document.querySelectorAll('.swipe');
for (swipeButton of swipeButtons) {
    swipeButton.addEventListener("click", (e) => {
        swipe(e);
    })
    swipeButton.addEventListener("mouseup", (e) => {
        characterImage.classList.toggle('img-swipe');
    })
    swipeButton.addEventListener("mousedown", (e) => {
        characterImage.classList.remove('img-swipe');
    })
}

// Change Image position
function changeImage () {
    characterImage.style.backgroundPosition = characters[currentCharacter].position;
}

// Change character text 
function changeCharacterText() {
    let characterText = document.querySelector('.character-text');
    characterText.innerText = (characters[currentCharacter].name).toUpperCase();
}

// Show slection of character village
let villageSelect = document.querySelector('.village-text');
villageSelect.addEventListener("click", () => {
    showModal2(); 
})

// Select character village 
let villages = ['nightclaw.png', 'skyland.jpg', 'delighthouse.JPG', 'spacewrap.jpg', 'darkwood.png','dawnlight.png'];
let villageNames = ['NIGHTCLAW', 'SKYLAND', 'DELIGHTHOUSE', 'SPACEWRAP', 'DARKWOOD', 'DAWNLIGHT'];
let villagePlaces = document.querySelectorAll('.village-place');
for (villagePlace of villagePlaces) {
    villagePlace.addEventListener("click", (e) => {
        changeVillage([].indexOf.call(villagePlaces, e.target));
        villageSelect.textContent = villageNames[[].indexOf.call(villagePlaces, e.target)];
        showModal2();
    })
} 

function showModal2 () {
    let modal2 = document.querySelector('.modal2');
    modal2.classList.toggle("active");
    if (modal2.classList.contains("active")) {
        modal2.style.transform = 'translate(-50%, -50%) scale(1)';
    }
}

function changeVillage (index) {
    let modal = document.querySelector('.modal');
    modal.style.backgroundImage = `url(img/${villages[index]})`;
    switch (index) {
        case 0:
        case 2:
        case 3:
        case 5:     document.documentElement.style.setProperty('--modal-color1', '#fff');
                    break;      
        default:  document.documentElement.style.setProperty('--modal-color1', '#000');  
    }
}

// Show Modal 
function showModal() {
    let modal = document.querySelector('.modal');
    modal.classList.toggle("active");
    let overlay = document.querySelector('.overlay');
    overlay.classList.toggle("active");
    if (modal.classList.contains("active")) {
        modal.style.transform = 'translate(-50%, -50%) scale(1)';
    } 
}

// Character Object constructor
function Character (name, position) {
    this.name = name;
    this.position = position;
}

// Initialize characters and their image position
let maxCharacters = 6;
let position = ['-36px -36px', '-103px -36px', '-164px -36px', '-36px -138px', '-96px -138px', '-158px -138px'];
let names = ['rationer', 'strategist', 'archer', 'knight', 'healer', 'sorceress']
let characters = [];

for (let i = 0; i < maxCharacters; i++) {
    characters[i] = new Character (names[i], position[i]);
}

// Set UpperCase on Inputs 
let inputs = document.querySelectorAll('.uppercase') 
    for (input of inputs) {
    input.addEventListener("input", (e) => {
        e.target.value = e.target.value.toUpperCase()
    })
}

// Save character
function SavedCharacter (title, character, village, clan) {
    this.title = title;
    this.character = character;
    this.village = village;
    this.clan = clan;
}

let savedCharacters = [];

function saveCharacter () {
    let saveTitle = document.querySelector('#title').value;
    let saveCharacterText = document.querySelector('#character-text').textContent;
    let saveVillageText = document.querySelector('#village-text').textContent;
    let saveClan = document.querySelector('#clan').value;
    let newCharacter = new SavedCharacter (saveTitle, saveCharacterText, saveVillageText, saveClan);
    savedCharacters.push(newCharacter);
}

// Render Character
function render() {
    let characterContainer = document.querySelector('.character-container');
    characterContainer.innerHTML = '';
    let extensions = {
        darkwood: '.png',
        dawnlight: '.png',
        delighthouse: '.JPG',
        nightclaw: '.png',
        skyland: '.jpg',
        spacewrap: '.jpg'
    }
    for (let i = 0 ; i < savedCharacters.length; i++) {
        let newCharacterDiv = document.createElement('div');
        newCharacterDiv.classList.add('character');
        newCharacterDiv.innerHTML = 
        `<div class="saved-title">
            <span>Title: </span>
            <span>${savedCharacters[i].title}</span>
        </div>
        <div class="saved-character">
            <span>CHARACTER: </span>
            <span>${savedCharacters[i].character}</span>
        </div>
        <div class="saved-village">
            <span>Village: </span>
            <span>${savedCharacters[i].village}</span>
        </div>
        <div class="saved-clan">
            <span>CLAN: </span>
            <span>${savedCharacters[i].clan}</span>
        </div>
        </div>`
        let saveCharacterImage = document.createElement('div');
        saveCharacterImage.classList.add('saved-character-image');
        saveCharacterImage.style.backgroundPosition = `${position[i]}`;
        newCharacterDiv.insertBefore(saveCharacterImage, newCharacterDiv.firstChild);
        let saveBackground = savedCharacters[i].village.toLowerCase();
        newCharacterDiv.style.backgroundImage = `url(img/${saveBackground}${extensions[saveBackground]})`;
        characterContainer.appendChild(newCharacterDiv);
    }
}

// Make character button
let makeCharacter = document.querySelector('.make-character-button');
makeCharacter.addEventListener("click", (e) => {
    e.preventDefault();
    showModal();
    saveCharacter();
    render();
})
