import {publicationArray} from './api.js';
import { generetePublicationsArray } from './publications.js';
import {debounce} from './util.js';

const filter = document.querySelector('.img-filters');
const buttonContainer = filter.querySelector('.img-filters__form');
const buttons = buttonContainer.querySelectorAll('.img-filters__button');
filter.classList.remove('img-filters--inactive');

// Function for show random publication
const showRandomPublications = (publicationCount, publicationArr) => {
  const publicationForRegenerate = [];
  const notUsedIndex = [];
  const randomUniqIndex = [];
  for (let i = 0; i < publicationArr.length; i++) {
    notUsedIndex[i] = i;
  }

  for (let i = 0; i < publicationCount; i++) {
    let randomIndex;
    do {
      randomIndex = Math.round(Math.random() * (notUsedIndex.length - 1));
    } while (notUsedIndex[randomIndex] === 'q');

    randomUniqIndex[i] = notUsedIndex[randomIndex];
    notUsedIndex[randomIndex] = 'q';
  }

  for(let i = 0; i < randomUniqIndex.length; i++) {
    publicationForRegenerate[i] = publicationArray[randomUniqIndex[i]];
  }
  generetePublicationsArray(publicationForRegenerate);
};

const shownAllPublications = () => {
  generetePublicationsArray(publicationArray);
};

const showPopularPublication = () => {
  const pupublicationArrayCopy = publicationArray.slice(0);
  pupublicationArrayCopy.sort((a, b) => {
    const aComments = a.comments.length;
    const bComments = b.comments.length;
    return bComments - aComments;
  });
  generetePublicationsArray(pupublicationArrayCopy);
};

const changeFilter = (evt) => {
  // active button's styles
  const activeButton = evt.target;
  buttons.forEach((button) => {
    button.classList.remove('img-filters__button--active');
  });
  activeButton.classList.add('img-filters__button--active');

  if(activeButton.id === 'filter-random') {
    showRandomPublications(10, publicationArray);
  } else if (activeButton.id === 'filter-default') {
    shownAllPublications();
  } else if (activeButton.id === 'filter-discussed') {
    showPopularPublication();
  }
};

buttonContainer.addEventListener('click', debounce(changeFilter));
