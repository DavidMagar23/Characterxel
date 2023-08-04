let currentCharacter = 0;
let characterImage = document.querySelector('.img-contain');

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
let villagePlaces = document.querySelectorAll('.village-place');
for (villagePlace of villagePlaces) {
    villagePlace.addEventListener("click", (e) => {
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

// Character Object constructor
function Character (name, position, village) {
    this.name = name;
    this.position = position;
    this.village = village;
}

// Initialize characters and their image position
let maxCharacters = 6;
let position = ['-36px -36px', '-103px -36px', '-164px -36px', '-36px -138px', '-96px -138px', '-158px -138px'];
let names = ['rationer', 'strategist', 'archer', 'knight', 'healer', 'sorceress']
let villages = ['slyland', 'night claw', 'delighthouse', 'slyland', 'night claw', 'delighthouse']
let characters = [];

for (let i = 0; i < maxCharacters; i++) {
    characters[i] = new Character (names[i], position[i], villages[i]);
}

// Set UpperCase on Inputs 
let inputs = document.querySelectorAll('.uppercase') 
    for (input of inputs) {
    input.addEventListener("input", (e) => {
        e.target.value = e.target.value.toUpperCase()
    })
}

