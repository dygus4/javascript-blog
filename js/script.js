{
  'use strict';

  const titleClickHandler = function(event){
    event.preventDefault();
    const clickedElement = this;
    
    console.log('Link was clicked!');
    console.log(event);
    /* remove class 'active' from all article links  */
    const activeLinks = document.querySelectorAll('.titles a.active');

for(let activeLink of activeLinks){
      activeLink.classList.remove('active');
    }

    /* add class 'active' to the clicked link */
    clickedElement.classList.add('active');
    console.log('clickedElement:', clickedElement);
    /* remove class 'active' from all articles */
    const activeArticles = document.querySelectorAll('.posts article.active');

    for(let activeArticle of activeArticles){
      activeArticle.classList.remove('active');
    }
    /* get 'href' attribute from the clicked link */
    const articleSelector = clickedElement.getAttribute('href');
    console.log(articleSelector);
    /* find the correct article using the selector (value of 'href' attribute) */
    const targetArticle = document.querySelector(articleSelector);
    console.log(targetArticle);
    /* add class 'active' to the correct article */
    targetArticle.classList.add('active');
  };


  const optArticleSelector = '.post',
    optTitleSelector = '.post-title',
    optTitleListSelector = '.titles',
    optArticleTagsSelector = '.post-tags .list';

  function generateTitleLinks(){

    /* remove contents of titleList */
    const titleList = document.querySelector(optTitleListSelector);
    function clearMessages(){
      titleList.innerHTML = '';
    }
    clearMessages();
    /* for each article */
    const articles = document.querySelectorAll(optArticleSelector);
    let html = '';

    for(let article of articles){
  
      /* get the article id */
      const articleId = article.getAttribute('id');
      console.log(articleId);
      /* find the title element */
      const titleElement = article.querySelector(optTitleSelector);
      /* get the title from the title element */
      const title = titleElement.innerHTML;
      /* create HTML of the link */
      const linkHTML = '<li><a href="#' + articleId + '"><span>' + title + '</span></a></li>';
      /* insert link into titleList */
      html = html + linkHTML;
    
    }    
    titleList.innerHTML = html;
    
    const links = document.querySelectorAll('.titles a');
    for(let link of links){
      link.addEventListener('click', titleClickHandler);
    }
  }
  generateTitleLinks();


  function generateTags(){
    /* find all articles */
  const articles = document.querySelectorAll(optArticleSelector);
    /* START LOOP: for every article: */
  for(let article of articles){
      /* find tags wrapper */
    const tagsWrapper = article.querySelector(optArticleTagsSelector);
      /* make html variable with empty string */
    let html = '';
      /* get tags from data-tags attribute */
    const articleTags = article.getAttribute('data-tags');
    console.log(articleTags);
      /* split tags into array */
    const articleTagsArray = articleTags.split(' ');
    console.log(articleTagsArray);
      /* START LOOP: for each tag */
      for(let tag of articleTagsArray){
          console.log(tag);
        /* generate HTML of the link */
          const linkHTML = '<li><a href="#tag-' + tag + '">' + tag + '</a></li>';
        /* add generated code to html variable */
          html = html + linkHTML;
      /* END LOOP: for each tag */
      }
      console.log(html)
      /* insert HTML of all the links into the tags wrapper */
    tagsWrapper.innerHTML = html
    /* END LOOP: for every article: */
  }
}
  generateTags();
}