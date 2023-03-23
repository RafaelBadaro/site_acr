const typing = document.getElementById('typing');
let i = 0;
const speed = 300;
const words = ['software development', 'bad jokes', 'projects', 'inspiration'];
let word = words[0];
let y = word.length;
function typeWriter() {
    if (i < word.length) {
        // If word not finished typing, continue
        typing.innerHTML += word.charAt(i);
        i++;
    } else {
        // If word done typing, choose new word
        y--;
        typing.innerHTML = typing.innerHTML.substr(0, y); // Simulate the deletion of the text
        if (typing.innerHTML === '') {
            const rand = Math.floor(Math.random() * words.length);
            if (words[rand] !== word) {
                // Choose new word, only if it differs from the old one
                i = 0;
                word = words[rand];
                y = word.length;
            }
        }
    }
}
setInterval(typeWriter, speed);

const hello_first = document.getElementById('hello_first');
const hello_second = document.getElementById('hello_second');
const languages = ['Olá!', 'Hello!', 'Dag!', 'Hola!', 'Bonjour!', '你好!']
let language = languages[0];
hello_first.innerText = language;
const interval = 2000; // 2 seconds
function sayHello() {
    const rand = Math.floor(Math.random() * languages.length);
    if (languages[rand] !== language) {
        language = languages[rand];
        if (hello_first.innerText != '') {
            hello_second.innerText = language;
            hello_second.style.opacity = 1;

            hello_first.innerText = '';
            hello_first.style.opacity = 0;
        } else {
            hello_first.innerText = language;
            hello_first.style.opacity = 1;

            hello_second.innerText = '';
            hello_second.style.opacity = 0;
        }

    }
}
setInterval(sayHello, interval);


let navbarToggler = document.getElementById('navbar-toggler');
const squares = document.getElementById('squares');
navbarToggler.addEventListener('click', () => {
    navbarToggler = document.getElementById('navbar-toggler')
    if(navbarToggler.classList.contains('collapsed')){
        squares.style.marginTop = '3.5rem';
    }else{
        squares.style.marginTop = '14rem';
    }
});

