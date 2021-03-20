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
    

  function generateTitleLinks(customSelector = ''){

    /* remove contents of titleList */
    const titleList = document.querySelector(optTitleListSelector);
    function clearMessages(){
      titleList.innerHTML = '';
    }
    clearMessages();
    /* for each article */
    const articles = document.querySelectorAll(optArticleSelector + customSelector);
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
      /* [NEW] create a new variable allTags with an empty object */
  let allTags = {};
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
    
      /* split tags into array */
    const articleTagsArray = articleTags.split(' ');
    console.log(articleTagsArray);
      /* START LOOP: for each tag */
      for(let tag of articleTagsArray){
          
        /* generate HTML of the link */
          const linkHTML = ' <li><a href="#tag-' + tag + '">' + tag + '</a></li> ';
        /* add generated code to html variable */
          html = html + linkHTML;
        /* [NEW] check if this link is NOT already in allTags */
        if(!allTags[tag]) {
        /* [NEW] add generated code to allTags array */
        allTags[tag] = 1;
      } else {
          allTags[tag]++;
      }
      /* END LOOP: for each tag */
      }
      
      /* insert HTML of all the links into the tags wrapper */
    tagsWrapper.innerHTML = html
    /* END LOOP: for every article: */
  }
  /* [NEW] find list of tags in right column */
  const tagList = document.querySelector('.tags');

  /* [NEW] create variable for all links HTML code */
let allTagsHTML = '';

/* [NEW] START LOOP: for each tag in allTags: */
for(let tag in allTags){
  /* [NEW] generate code of a link and add it to allTagsHTML */
  allTagsHTML += tag + ' (' + allTags[tag] + ') ';
  
}
/* [NEW] END LOOP: for each tag in allTags: */

/*[NEW] add HTML from allTagsHTML to tagList */
tagList.innerHTML = allTagsHTML;
}
  generateTags();


  function tagClickHandler(event){
    /* prevent default action for this event */
    event.preventDefault();
    /* make new constant named "clickedElement" and give it the value of "this" */
    const clickedElement = this;
    /* make a new constant "href" and read the attribute "href" of the clicked element */
    const href = clickedElement.getAttribute('href');
    /* make a new constant "tag" and extract tag from the "href" constant */
    const tag = href.replace('#tag-', '');
    console.log(tag)
    /* find all tag links with class active */
    const activeTags = document.querySelectorAll('a.active[href^="#tag-"]');
    /* START LOOP: for each active tag link */
      for(let activeTag of activeTags){
      /* remove class active */
      activeTag.classList.remove('active');
    /* END LOOP: for each active tag link */
      }
    /* find all tag links with "href" attribute equal to the "href" constant */
  const AllTags = document.querySelectorAll('a[href="' + href + '"]');
  console.log(AllTags)
    /* START LOOP: for each found tag link */
  for(let AllTag of AllTags){
      /* add class active */
      AllTag.classList.add('active');
    
    /* END LOOP: for each found tag link */
  }
    /* execute function "generateTitleLinks" with article selector as argument */
    generateTitleLinks('[data-tags~="' + tag + '"]');
  }
  
  function addClickListenersToTags(){
    /* find all links to tags */
    const links = document.querySelectorAll('a[href^="#tag-"]');
    /* START LOOP: for each link */
    for(let link of links){
      /* add tagClickHandler as event listener for that link */
      link.addEventListener('click', tagClickHandler);
      
    /* END LOOP: for each link */
  }
  
}
  addClickListenersToTags();



  const optArticleAuthorSelector = '.post-author';

  function generateAuthors(){
    /* find all articles */
  const articles = document.querySelectorAll(optArticleSelector);
    /* START LOOP: for every article: */
  for(let article of articles){
      /* find tags wrapper */
    const authorWrapper = article.querySelector(optArticleAuthorSelector);
      /* make html variable with empty string */
    let html = '';
      /* get tags from data-tags attribute */
    const articleAuthor = article.getAttribute('data-author');
    
      /* split tags into array */
    
      /* START LOOP: for each tag */
      
          
        /* generate HTML of the link */
          const linkHTML =  '<li><a href="#author-' + articleAuthor + '">' + articleAuthor + '</a></li>';
        /* add generated code to html variable */
          html = html + linkHTML;
      /* END LOOP: for each tag */
      
      
      /* insert HTML of all the links into the tags wrapper */
    authorWrapper.innerHTML = html
    /* END LOOP: for every article: */
  }
}
  generateAuthors();


  function authorClickHandler(event){
    /* prevent default action for this event */
    event.preventDefault();
    /* make new constant named "clickedElement" and give it the value of "this" */
    const clickedElement = this;
    /* make a new constant "href" and read the attribute "href" of the clicked element */
    const href = clickedElement.getAttribute('href');
    /* make a new constant "tag" and extract tag from the "href" constant */
    const author = href.replace('#author-', '');
    
    /* find all tag links with class active */
    const activeAuthors = document.querySelectorAll('a.active[href^="#author-"]');
    /* START LOOP: for each active tag link */
      for(let activeAuthor of activeAuthors){
      /* remove class active */
      activeAuthor.classList.remove('active');
    /* END LOOP: for each active tag link */
      }
    /* find all tag links with "href" attribute equal to the "href" constant */
  const AllAuthors = document.querySelectorAll('a[href="' + href + '"]');
  
    /* START LOOP: for each found tag link */
  for(let AllAuthor of AllAuthors){
      /* add class active */
      AllAuthor.classList.add('active');
    
    /* END LOOP: for each found tag link */
  }
    /* execute function "generateTitleLinks" with article selector as argument */
    generateTitleLinks('[data-author="' + author + '"]');
  }
  
  function addClickListenersToAuthors(){
    /* find all links to tags */
    const links = document.querySelectorAll('a[href^="#author-"]');
    /* START LOOP: for each link */
    for(let link of links){
      /* add tagClickHandler as event listener for that link */
      link.addEventListener('click', authorClickHandler);
      
    /* END LOOP: for each link */
  }
  
}
  addClickListenersToAuthors();


  const optTagsListSelector = '.tags.list';

}
