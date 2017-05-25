On page load, if anything is in local storage, it is retrieved, parsed, and prepended to the page.

On click of save, an idea object is created with a unique id, title, body, and default quality of swill. That idea is then prepended to the page, pushed into an array, and added to local storage.

Upon click of upvote or downvote, the quality is changed on the DOM. The array is also looped thru looking for a matching id. When that id is located within the array, the idea's quality value in the array is changed and updated in local storage.

On click of the delete button, the array is looped thru looking for a matching id. When located, that idea is removed(spliced) from the arrray and local storage is updated to reflect those changes. The idea is also removed from the DOM.

The idea title and body can be editted and saved by removing focus from the field or pressing enter. The event listenters on the idea card loop thru the array of ideas looking for a matching id and updates the title or body in the array and then updates local storage.

The search function grabs the value of the search input and filters thru the array, returning a new array that meet the test of the function (include search terms). The idea container is emptied and repopulated with with the ideas in the new result array.  
