var ideaList = $('.card-container');
var myIdeas = [];

// Page load

$(window).on('load', function() {
  retrieveLocalStorage();
  clearInputs();
})

// SAVE BTN event listener

$('.save-btn').on('click', function(event) {
  event.preventDefault();
  var id = Date.now();
  var title = $('.title-input').val();
  var body = $('.body-input').val();
  var newIdea = new Idea(id, title, body);
  prependIdea(newIdea);
  myIdeas.push(newIdea);
  updateLocalStorage();
  clearInputs();
})

// CARD TITLE event listener

ideaList.on('keyup', '.card-title', function() {
  var id = $(this).closest('article')[0].id;
  var title = $('.card-title').val();
  // var title = $(this).parents('.idea-card').find('.card-title');
  var changedTitle = title.textContent;
  myIdeas.forEach(function(idea, index) {
    if (idea.id == id) {
      title = changedTitle;
    }
  })
  updateLocalStorage();
})

// CARD BODY event listener

ideaList.on('keyup', '.card-body', function() {
  var id = $(this).closest('article')[0].id;
  var body = $(this).parents('.idea-card').find('.card-body');
  var changedBody = body.textContent;
  myIdeas.forEach(function(idea, index) {
    if (idea.id == id) {
      body = changedBody;
    }
  })
  updateLocalStorage();
})

// UPVOTE event listener

ideaList.on('click', '.upvote', function() {
  var qualityVote = $(this).parents('.idea-card').find('.quality-vote');
  var id = $(this).closest('article')[0].id;
  storeUpQuality(id, qualityVote.text())
  if (qualityVote.text() === 'swill') {
    qualityVote.text('plausible')
  } else if (qualityVote.text() === 'plausible') {
    qualityVote.text('genius')
  }
})

// DOWNVOTE event listener

ideaList.on('click', '.downvote', function() {
  var qualityVote = $(this).parents('.idea-card').find('.quality-vote');
  var id = $(this).closest('article')[0].id;
  storeDownQuality(id, qualityVote.text())
  if (qualityVote.text() === 'genius') {
    qualityVote.text('plausible')
  } else if (qualityVote.text() === 'plausible') {
    qualityVote.text('swill')
  }
})

// DELETE BTN event listener

ideaList.on('click', '.delete-icon', function() {
  var id = $(this).closest('article')[0].id;
  myIdeas.forEach(function(idea, index) {
    if (id == idea.id) {
      myIdeas.splice(index, 1);
    }
  })
  updateLocalStorage();
  $(this).parents('.idea-card').remove();
  clearInputs();
})

// Idea constructor

function Idea(id, title, body) {
  this.id = id;
  this.title = title;
  this.body = body;
  this.quality = 'swill';
}

function prependIdea(newIdea) {

  var idea = `<article class="idea-card" id=${newIdea.id}>
    <div class="top">
      <h2 class="card-title" contenteditable="true">${newIdea.title}</h2>
      <div class="delete-icon">
      </div>
    </div>
    <div class="middle">
      <p class="card-body" contenteditable="true">${newIdea.body}</p>
    </div>
    <div class="bottom">
      <div class="vote-btn-container">
        <div class="upvote">
        </div>
        <div class="downvote">
        </div>
      </div>
      <p id="quality">quality:</p>
      <p class="quality-vote">${newIdea.quality}</p>
    </div>
  </article>`;

  ideaList.prepend(idea);
}

function updateLocalStorage() {
  var stringifiedArray = JSON.stringify(myIdeas);
  localStorage.setItem('ideas', stringifiedArray);
  console.log('stringified array: ', stringifiedArray);
}

function retrieveLocalStorage() {
  myIdeas = JSON.parse(localStorage.getItem('ideas')) || [];
  myIdeas.forEach(function(idea) {
    prependIdea(idea);
    console.log('ideas from local storage: ', idea);
  })
}

function storeUpQuality(id, quality) {
  myIdeas.forEach(function(idea, index) {
    if (idea.id == id) {
      if (idea.quality === 'swill') {
        idea.quality = 'plausible'
      } else if (idea.quality === 'plausible') {
        idea.quality = 'genius'
      }
    }
  })
  updateLocalStorage();
}

function storeDownQuality(id, quality) {
  myIdeas.forEach(function(idea, index) {
    if (idea.id == id) {
      if (idea.quality === 'genius') {
        idea.quality = 'plausible'
      } else if (idea.quality === 'plausible') {
        idea.quality = 'swill'
      }
    }
  })
  updateLocalStorage();
}

function clearInputs() {
  $('.title-input').val('');
  $('.body-input').val('');
  $('.title-input').focus();
}
