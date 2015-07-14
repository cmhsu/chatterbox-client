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
      console.log(data);
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
    url: 'https://api.parse.com/1/classes/chatterbox',
    type: 'GET',
    // data: JSON.stringify(message),
    // contentType: 'application/json',
    success: function (data) {
      console.log('chatterbox: Message received');
      console.log(data);
      for (var i = 0; i < data.results.length; i++) {
        if (data.results[i] != undefined) {
          app.addMessage(data.results[i]);
        }
      }
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
  var username = escapeHTML(message.username);
  var text = escapeHTML(message.text + '');
  var roomName = escapeHTML(message.roomname);

  $('#chats').append('<div>' +
    '<a class="username" href="#">' + username + '</a>' + ': ' +
    text + ' in ' +roomName + '</div>');
};

app.addRoom = function(roomName) {
  $('#roomSelect').append('<div>' + roomName + '</div>')
};

app.addFriend = function() {
};

app.handleSubmit = function() {
  var message = {};
  message.username = 'Piccolo';
  message.text = $('#message').val();
  message.roomname = 'cool roomname';

  app.send(message);
};


$(document).ready(function() {
  $('#chats').on('click', '.username', function(event) {
    event.preventDefault();
    app.addFriend();
  });
  $('.submit').on('click', function(event) {
    event.preventDefault();
    app.handleSubmit();
  });
  $('#fetch').on('click', function(event) {
    event.preventDefault();
    app.fetch();
  });
});

setInterval()


function escapeHTML(s) { 
  if (s != undefined) {
    return s.replace(/&/g, '&amp;')
      .replace(/"/g, '&quot;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;');
  }
}



