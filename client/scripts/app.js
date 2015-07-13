// YOUR CODE HERE:
var app = {};

app.init = function() {};

app.send = function(message) {

  $.ajax({
    // This is the url you should use to communicate with the parse API server.
    url: 'https://api.parse.com/1/classes/chatterbox',
    type: 'POST',
    data: JSON.stringify(message),
    contentType: 'application/json',
    success: function (data) {
      console.log('chatterbox: Message sent');
    },
    error: function (data) {
      // See: https://developer.mozilla.org/en-US/docs/Web/API/console.error
      console.error('chatterbox: Failed to send message');
    }
  });
};

app.fetch = function() {

    $.ajax({
    // This is the url you should use to communicate with the parse API server.
    url: undefined,
    type: 'GET',
    // data: JSON.stringify(message),
    // contentType: 'application/json',
    success: function (data) {
      console.log('chatterbox: Message received');
    },
    error: function (data) {
      // See: https://developer.mozilla.org/en-US/docs/Web/API/console.error
      console.error('chatterbox: Failed to fetch message');
    }
  });

};

app.clearMessages = function() {
  $('#chats').children().remove();
};

app.addMessage = function(message) {
  var username = message.username;
  var text = message.text;
  var roomName = message.roomname;

  $('#chats').append('<div>' +
    '<a class="username" href="#">' + username + '</a>' + ': ' +
    text + ' in ' +roomName + '</div>');
};

app.addRoom = function(roomName) {
  $('#roomSelect').append('<div>' + roomName + '</div>')
};

app.addFriend = function() {
};

app.handleSubmit = function() {};


$(document).ready(function() {
  $('#chats').on('click', '.username', function(event) {
    event.preventDefault();
    app.addFriend();
  });
  $('#send .submit').on('submit', function(event) {
    event.preventDefault();
    app.handleSubmit();
  });
});




