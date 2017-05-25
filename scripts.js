var ideaList = $('.card-container');
var myIdeas = [];
// var qualityArray = ['swill', 'plausible', 'genius'];

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

// SEARCH event listener

$('.search-input').on('input', function() {
  searchFilter();
})

// CARD TITLE event listener

ideaList.on('input keydown', '.card-title', function(event) {
  if (event.keyCode === 13) {
    event.preventDefault();
    this.blur();
  }
  var id = $(this).closest('.idea-card')[0].id;
  var title = $(this).text();
  myIdeas.forEach(function(idea) {
    if (idea.id == id) {
      idea.title = title;
    }
  })
  updateLocalStorage();
})

// CARD BODY event listener

ideaList.on('input keydown', '.card-body', function(event) {
  if (event.keyCode === 13) {
    event.preventDefault();
    this.blur();
  }
  var id = $(this).closest('.idea-card')[0].id;
  var body = $(this).text();
  myIdeas.forEach(function(idea) {
    if (idea.id == id) {
      idea.body = body;
    }
  })
  updateLocalStorage();
})

// UPVOTE event listener

ideaList.on('click', '.upvote', function() {
  var qualityVote = $(this).parents('.idea-card').find('.quality-vote');
  var id = $(this).closest('.idea-card')[0].id;
  storeUpQuality(id, qualityVote.text())
  if (qualityVote.text() === 'swill') {
    qualityVote.text('plausible')
  } else if (qualityVote.text() === 'plausible') {
    qualityVote.text('genius')
  }
})

ideaList.on('click', '.upvote', function() {
  var qualityVote = $(this).parents('.idea-card').find('.quality-vote');
  var id = $(this).closest('.idea-card')[0].id;

  var direction = 1;
  changeQuality(direction, qualityVote);
  // storeUpQuality(id, qualityVote.text());

})

function changeQuality(direction, qualityVote) {
  console.log(qualityVote.text());
  qualityArray.forEach(function(quality) {
    if (qualityVote.text() === quality) {
      qualityVote.text(qualityArray[quality + direction])
  }
  for (var i = 0; i < qualityArray.length; i++) {
    console.log(qualityArray[i]);
    if (qualityVote.text() === qualityArray[i]) {
      qualityVote.text(qualityArray[i + direction])
      obj.quality =
      i = qualityArray.length;
})
  }

  // if swill && up plausible
  // if plausible && up genius
  // if genius && down plausible
  // if plausible && down swill



// DOWNVOTE event listener

ideaList.on('click', '.downvote', function() {
  var qualityVote = $(this).parents('.idea-card').find('.quality-vote');
  var id = $(this).closest('.idea-card')[0].id;
  storeDownQuality(id, qualityVote.text())
  if (qualityVote.text() === 'genius') {
    qualityVote.text('plausible')
  } else if (qualityVote.text() === 'plausible') {
    qualityVote.text('swill')
  }
})

// DELETE BTN event listener

ideaList.on('click', '.delete-icon', function() {
  var id = $(this).closest('.idea-card')[0].id;
  console.log(id);
  myIdeas.forEach(function(idea, index) {
    if (idea.id == id) {
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

function searchFilter() {
  var search = $('.search-input').val().toUpperCase();
  var results = myIdeas.filter(function(idea) {
    return idea.title.toUpperCase().includes(search) ||
    idea.body.toUpperCase().includes(search) || idea.quality.toUpperCase().includes(search);
  })
  $('.card-container').empty();
  results.forEach(function(result) {
    prependIdea(result);
  })
}

function clearInputs() {
  $('.title-input').val('');
  $('.body-input').val('');
  $('.title-input').focus();
}
