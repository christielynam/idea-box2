
// ON WINDOW LOAD//
$(window).on('load' , function () {
  getFromLocal ();
  drawIdeas ();
})

//GLOBAL VARIABLES//
var ideas = []

//PREVENT DEFAULT BUTTON EVENT LISTENER//
$('.save-btn').on( 'click', function (e){
  e.preventDefault();
  createIdea();
  drawIdeas();
})

//ADD NEW CARDS TO APPEND TO THE PAGE//
function drawIdeas (array) {
  var renderArray = array || ideas;
  $('.card-container').empty();
  renderArray.forEach(function(idea){
    var card = `<article class="idea-card" id="${idea.id}">
      <div class="top">
        <h2 contenteditable>${idea.title}</h2>
        <div class="delete-icon">
        </div>
      </div>
      <div class="middle">
        <p class="card-body" contenteditable>${idea.body}</p>
      </div>
      <div class="bottom">
        <div class="vote-btn-container">
          <div class="upvote">
          </div>
          <div class="downvote">
          </div>
        </div>
        <p id="quality">quality:</p>
        <p class="quality-vote">${idea.quality}</p>
      </div>
    </article>`
    $('.card-container').append(card)
  })
}

//CREATE AN IDEA-ALLOW IDEAS TO SAVE TO LOCAL STORAGE//CONSTRUCTOR FUNCTION//

function createIdea () {
  var title = $('.title-input').val();
  var body = $('.body-input').val();
  var id = Date.now();
  var quality = "swill"
  ideas.push({title,body,id,quality})
  localStorage.setItem('ideas', JSON.stringify(ideas))
}

function getFromLocal () {
  var storedIdeas = JSON.parse(localStorage.getItem('ideas'))
  ideas=storedIdeas;
}

//DELETE BUTTON EVENT LISTENER //
$('.card-container').on('click', '.delete-icon', function(){
  var id= ($(this).closest('article')[0].id)
  for (var i=0; i<ideas.length; i++) {
    if (ideas[i].id == id) {
      ideas.splice(i, 1)
    }
  localStorage.setItem('ideas', JSON.stringify(ideas))
  }
  $(this).closest('.idea-card').remove()
})

// UPVOTE EVENT LISTENER //
 $('.card-container').on ('click','.upvote',function () {
   var id= ($(this).closest('article')[0].id)
   for (var i=0; i<ideas.length; i++) {
     if (ideas[i].id == id) {
       if (ideas[i].quality == "swill"){
         ideas[i].quality = "plausible"
       } else if (ideas[i].quality == "plausible"){
         ideas[i].quality = "genius"
       }
     }
   localStorage.setItem('ideas', JSON.stringify(ideas))
  }
  drawIdeas();
 })

 //DOWNVOTE EVENT LISTENER //
 $('.card-container').on ('click','.downvote',function () {
   var id= ($(this).closest('article')[0].id)
   for (var i=0; i<ideas.length; i++) {
     if (ideas[i].id == id) {
       if (ideas[i].quality == "genius"){
         ideas[i].quality = "plausible"
       } else if (ideas[i].quality == "plausible"){
         ideas[i].quality = "swill"
       }
     }
   localStorage.setItem('ideas', JSON.stringify(ideas))
  }
  drawIdeas();
 })

//EVENT LISTENERS ALLOWING TEXT EDITS TO BE SAVED BY CLICKING ON THE BODY UPON RELOAD THE EDITS WILL SAVE TO LOCAL STORAGE// THESE EDITS CAN OCCUR ON THE TITLE OR BODY OF THE CARD AND BE SAVED//

$('.card-container').on ('keyup blur', 'h2', function (e) {
  console.log(e.type)
  if(e.which===13 || e.type === "focusout"){
    var id= ($(this).closest('article')[0].id)
    for (var i=0; i<ideas.length; i++) {
      if (ideas[i].id == id) {
        ideas[i].title = $(this).text()
      }
    localStorage.setItem('ideas', JSON.stringify(ideas))
   }
   drawIdeas();
 }
})

$('.card-container').on ('keyup blur', '.card-body', function (e) {
  if (e.which===13 || e.type === "focusout"){
  var id= ($(this).closest('article')[0].id)
  for (var i=0; i<ideas.length; i++) {
    if (ideas[i].id == id) {
      ideas[i].body = $(this).text()
    }
  localStorage.setItem('ideas', JSON.stringify(ideas))
 }
 drawIdeas();
 }
})

// EVENT LISTENER TO ALLOW IDEAS TO FILTER(BECOME SEARCHABLE BASED ON INPUT IN TITLE AND BODY FIELDS)
$('.search-input').on ('keyup', function (e) {
  var search = (e.target.value).toLowerCase()
  //filter through the array to match anything that matches the text of the search  as input on the title and body
  var matches = ideas.filter(function(idea){
    return idea.body.toLowerCase().includes(search) || idea.title.toLowerCase().includes(search);
  })
  drawIdeas(matches)
})
