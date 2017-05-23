'use strict';

const SELECTORS = {
  title: ['meta[property$="title"]'],
  image: ['meta[property$="image"]'],
  description: ['meta[property$="description"]'],
  type: ['meta[property$="type"]']
};

const getContentTitle = () => {
  const elements = document.querySelectorAll(SELECTORS.title.join(','));

  let result = null;

  elements.forEach(element => {
    const content = element.getAttribute('content');
    if (!result && content && content.replace(/\s/, '')) {
      result = content;
    }
  });

  return result || document.title;
};

const getContentIcon = () => {
  return `${document.location.origin}/favicon.ico`
}

const getContentImage = () => {
  const elements = document.querySelectorAll(SELECTORS.image.join(','));

  let result = null;

  elements.forEach(element => {
    const content = element.getAttribute('content');
    if (!result && content) {
      result = content;
    }
  });

  return result || null;
};

const getContentDescription = () => {
  const elements = document.querySelectorAll(SELECTORS.description.join(','));

  let result = null;

  elements.forEach(element => {
    const content = element.getAttribute('content');
    if (!result && content && content.replace(/\s/, '')) {
      result = content;
    }
  });

  return result || document.title;
};

const getContentType = () => {
  const elements = document.querySelectorAll(SELECTORS.type.join(','));

  let result = null;

  elements.forEach(element => {
    const content = element.getAttribute('content');
    if (!result && content && content.replace(/\s/, '')) {
      result = content;
    }
  });

  return result || null;
};

export const getContentData = () => {
  return {
    url: document.URL,
    title: getContentTitle(),
    //TODO disable description
    //description: getContentDescription(),
    imgUrl: getContentImage() || getContentIcon(),
    kind: getContentType()
  };
};

