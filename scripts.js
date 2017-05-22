// Page load

$(window) .on('load', function() {
  clearInputs();
})

// Save btn event listener

$('.save-btn').on('click', function(event) {
  event.preventDefault();
  var $id = Date.now();
  var $title = $('.title-input').val();
  var $body = $('.body-inut').val();
  var $newIdea = new Idea($id, $title, $body);
  prependIdea($newIdea);
  clearInputs();
})

// Delete button event listener

$('.card-container').on('click', '.delete-icon', function() {
  $(this).parents('.idea-card').remove();
  $('.title-input').focus();
})

// Upvote event listener

$('.card-container').on('click', '.upvote', function() {
  var $qualityVote = $(this).parents().find('.quality-vote');
  console.log(this);
  console.log($qualityVote);
  if ($qualityVote.text() === 'swill') {
    $qualityVote.text('plausible')
  } else if ($qualityVote.text() === 'plausible') {
    $qualityVote.text('genius')
  }
})

// Downvote event listener

$('.card-container').on('click', '.downvote', function() {
  var $qualityVote = $(this).parents().find('.quality-vote');
  if ($qualityVote.text() === 'genius') {
    $qualityVote.text('plausible')
  } else if ($qualityVote.text() === 'plausible') {
    $qualityVote.text('swill')
  }
})

// Idea constructor

function Idea(id, title, body) {
  this.id = id;
  this.title = title;
  this.body = body;
  this.quality = 'swill';
}

function prependIdea() {
  var $id = Date.now();
  var $title = $('.title-input').val();
  var $body = $('.body-inut').val();
  var $quality = 'swill';
  var $idea = `<article class="idea-card" id=${$id}>
    <div class="top">
      <h2 class="card-title" contenteditable="true">${$title}</h2>
      <div class="delete-icon">
      </div>
    </div>
    <div class="middle">
      <p class="card-body" contenteditable="true">${$body}</p>
    </div>
    <div class="bottom">
      <div class="vote-btn-container">
        <div class="upvote">
        </div>
        <div class="downvote">
        </div>
      </div>
      <p id="quality">quality:</p>
      <p class="quality-vote">${$quality}</p>
    </div>
  </article>`;
  $('.card-container').prepend($idea);
}

function clearInputs() {
  $('.title-input').val('');
  $('.body-input').val('');
  $('.title-input').focus();
}

// function upvote() {
//   var $qualityVote = $(this).parents().find('.quality-vote');
//   if ($qualityVote.text() === 'swill') {
//     $qualityVote.text('plausible')
//   } else if ($qualityVote.text() === 'plausible') {
//     $qualityVote.text('genius')
//   }
// }
