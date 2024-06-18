// Function to save the state of the accordion to localStorage
function saveAccordionState() {
    const accordionItems = document.querySelectorAll('.accordion-item');

    accordionItems.forEach((item, index) => {
        const collapse = item.querySelector('.accordion-collapse');
        const isShown = collapse.classList.contains('show');
        localStorage.setItem(`accordion${index}`, isShown);
    });
}

// Function to restore the state of the accordion from localStorage
function restoreAccordionState() {
    const accordionItems = document.querySelectorAll('.accordion-item');

    accordionItems.forEach((item, index) => {
        const isShown = localStorage.getItem(`accordion${index}`) === 'true';
        const collapse = item.querySelector('.accordion-collapse');

        if (isShown) {
            collapse.classList.add('show');
        } else {
            collapse.classList.remove('show');
        }
    });
}

// Add event listener for when the accordion is shown or hidden
document.querySelectorAll('.accordion-collapse').forEach((collapse, index) => {
    collapse.addEventListener('hidden.bs.collapse', saveAccordionState);
    collapse.addEventListener('shown.bs.collapse', saveAccordionState);
});

// Restore accordion state when the page loads
document.addEventListener('DOMContentLoaded', restoreAccordionState);