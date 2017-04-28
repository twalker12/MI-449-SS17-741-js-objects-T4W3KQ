// ----
// DATA
// ----

// A couple jokes to start with
var jokes = {
  'the horse': {
    setup: 'A horse walks into the bar. The bartender asks...',
    punchline: 'Why the long face?'
  },
  'Orion\'s pants': {
    setup: 'How does Orion keep his pants up?',
    punchline: 'With an asteroid belt.'
  }
}
var stringifiedjokes = window.localStorage.getItem('jokes')
if (stringifiedjokes !== null) {
  jokes = JSON.parse(stringifiedjokes)
}
// The message to display if the jokes object is empty
var noJokesMessage = 'I... I don\'t know any jokes. 😢'

// -------------
// PAGE UPDATERS
// -------------

// Update the listed jokes, based on the jokes object
var jokesMenuList = document.getElementById('jokes-menu')
var updateJokesMenu = function () {
  // Don't worry too much about this code for now.
  // You'll learn how to do advanced stuff like
  // this in a later lesson.
  var jokeKeys = Object.keys(jokes)
  var jokeKeyListItems = jokeKeys.join('</li><li>') || noJokesMessage
  jokesMenuList.innerHTML = '<li>' + jokeKeyListItems + '</li>'
  window.localStorage.setItem('jokes', JSON.stringify(jokes))
}

// Update the displayed joke, based on the requested joke
var requestedJokeInput = document.getElementById('requested-joke')
var jokeBox = document.getElementById('joke-box')

console.log(jokeBox)

var updateDisplayedJoke = function () {
  var requestedJokeKey = requestedJokeInput.value
  if (jokes[requestedJokeKey]) {
    jokeBox.innerHTML = '<p>' + jokes[requestedJokeKey]['setup'] + jokes[requestedJokeKey]['punchline'] + '</p>'
  } else {
    jokeBox.innerHTML = 'No matching joke found'
  }
}

var addJokeButton = document.getElementById('remember')
var noJokeButton = document.getElementById('nojoke')

var forgetJoke = function () {
  var forget = document.getElementById('forgetit')
  delete jokes[forget.value]
  updateJokesMenu()
}
var addJoke = function () {
  var rememberJoke = document.getElementById('newjoke')
  var setup = document.getElementById('setup')
  var punchline = document.getElementById('punchline')

  jokes[rememberJoke.value] = {}
  jokes[rememberJoke.value].punchline = punchline.value
  jokes[rememberJoke.value].setup = setup.value
  updateJokesMenu()
}

noJokeButton.addEventListener('click', forgetJoke)
addJokeButton.addEventListener('click', addJoke)
// Function to keep track of all other
// page update functions, so that we
// can call them all at once
var updatePage = function () {
  updateJokesMenu()
  updateDisplayedJoke()
}

// -------
// STARTUP
// -------

// Update the page immediately on startup
updatePage()

// ---------------
// EVENT LISTENERS
// ---------------

// Keep the requested joke up-to-date
requestedJokeInput.addEventListener('input', updateDisplayedJoke)
