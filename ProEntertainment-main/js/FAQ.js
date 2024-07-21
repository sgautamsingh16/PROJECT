import faqData from '../data/faqData.json' with { type: "json" };

var accItem = document.getElementsByClassName('accordionItem');
var accHD = document.getElementsByClassName('accordionItemHeading');
for (var i = 0; i < accHD.length; i++) {
    accHD[i].addEventListener('click', toggleItem, false);
}
function toggleItem() {
    var itemClass = this.parentNode.className;
    for (var i = 0; i < accItem.length; i++) {
        accItem[i].className = 'accordionItem close';
    }
    if (itemClass == 'accordionItem close') {
        this.parentNode.className = 'accordionItem open';
    }
}

const accordionWrapper = document.getElementById('accordionWrapper');

        faqData.faqData.forEach((item, index) => {
            const accordionItem = document.createElement('div');
            accordionItem.className = 'accordionItem close';

            const accordionItemHeading = document.createElement('h2');
            accordionItemHeading.className = 'accordionItemHeading';
            accordionItemHeading.textContent = item.Question;
            accordionItemHeading.addEventListener('click', () => {
                const currentlyOpen = document.querySelector('.accordionItem.open');
                if (currentlyOpen && currentlyOpen !== accordionItem) {
                    currentlyOpen.classList.remove('open');
                    currentlyOpen.classList.add('close');
                }
                accordionItem.classList.toggle('open');
                accordionItem.classList.toggle('close');
            });

            const accordionItemContent = document.createElement('div');
            accordionItemContent.className = 'accordionItemContent';
            accordionItemContent.innerHTML = `<p>${item.Answer}</p>`;

            accordionItem.appendChild(accordionItemHeading);
            accordionItem.appendChild(accordionItemContent);

            accordionWrapper.appendChild(accordionItem);
        });