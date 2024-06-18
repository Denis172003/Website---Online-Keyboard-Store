document.addEventListener('DOMContentLoaded', function() {
    const darkButton = document.getElementsByClassName('dark-button')[0];
    const lightButton = document.getElementsByClassName('light-button')[0];
    const blueButton = document.getElementsByClassName('blue-button')[0];

    const lightButtonFunc = () => {
        document.body.classList.remove('dark', 'blue');
        document.body.classList.add('light');
        localStorage.setItem('theme', 'light');
    };

    const darkButtonFunc = () => {
        document.body.classList.remove('light', 'blue');
        document.body.classList.add('dark');
        localStorage.setItem('theme', 'dark');
    };

    const blueButtonFunc = () => {
        document.body.classList.remove('light', 'dark');
        document.body.classList.add('blue');
        localStorage.setItem('theme', 'blue');
    };

    const initialTheme = localStorage.getItem('theme');
    switch (initialTheme) {
        case 'dark':
            darkButton.checked = true;
            darkButtonFunc();
            break;
        case 'light':
            lightButton.checked = true;
            lightButtonFunc();
            break;
        case 'blue':
            blueButton.checked = true;
            blueButtonFunc();
            break;
        default:
            lightButton.checked = true; 
            lightButtonFunc();
    }

    lightButton.addEventListener('click', lightButtonFunc);
    darkButton.addEventListener('click', darkButtonFunc);
    blueButton.addEventListener('click', blueButtonFunc);
});
