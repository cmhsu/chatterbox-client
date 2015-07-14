// YOUR CODE HERE:
var rooms = [];

var friends = [''];

var ownRoom = prompt('What room?');

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
      rooms = [];
      $('select').html('');
      console.log('chatterbox: Message received');
      $('#chats').html('');
      for (var i = 0; i < data.results.length; i++) {
        app.addMessage(data.results[i]);
      }
      $('select').append('<option>All Rooms</rooms>');
      for (var i = 0; i < rooms.length; i++) {
        $('select').append('<option>' + rooms[i] + '</option>')
      }
      app.addFriend('');
    },
    error: function (data) {
      // See: https://developer.mozilla.org/en-US/docs/Web/API/console.error
      console.error('chatterbox: Failed to fetch message');
    }
  });

};

app.fetchRoom = function(roomValue) {

    $.ajax({
    // This is the url you should use to communicate with the parse API server.
    url: 'https://api.parse.com/1/classes/chatterbox',
    type: 'GET',
    // data: JSON.stringify(message),
    // contentType: 'application/json',
    success: function (data) {
      rooms = [];
      console.log('chatterbox: Message received');
      $('#chats').html('');
      for (var i = 0; i < data.results.length; i++) {
        var roomname = escapeHTML(data.results[i].roomname);
        if (roomname === roomValue) {
          app.addMessage(data.results[i]);
        }
      }
      app.addFriend('');
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

  $('#chats').append('<div class="chatContainer">' +
    '<a class="username" href="#">' + username + '</a>' + ': ' +
    text + ' in ' +roomName + '</div>');
  if (rooms.indexOf(roomName) === -1) {
    rooms.push(roomName);
  }
};

app.addRoom = function(roomName) {
  $('#roomSelect').append('<div>' + roomName + '</div>')
};

app.addFriend = function(friendName) {
  if (friends.indexOf(friendName) === -1) {
    friends.push(friendName);
  }
  $('.chatContainer').each(function(node) {
    if (friends.indexOf($(this).find('.username').text()) !== -1) {
      $(this).css("font-weight", "bold");
    }
  });
};

app.handleSubmit = function() {
  var message = {};
  var index = window.location.search.indexOf('=');
  var username = window.location.search.slice(index + 1);
  message.username = username;
  message.text = $('#message').val();
  message.roomname = ownRoom;

  app.send(message);
};

$(document).ready(function() {
  $('#chats').on('click', '.username', function(event) {
    event.preventDefault();
    var friendName = $(this).text();
    app.addFriend(friendName);
  });
  $('.submit').on('click', function(event) {
    event.preventDefault();
    app.handleSubmit();
  });
  $('#fetch').on('click', function(event) {
    event.preventDefault();
    app.fetch();
  });
  $('select').on('change', function(event) {
    if (this.value === 'All Rooms') {
      app.fetch();
    } else {
      app.fetchRoom(this.value);
      ownRoom = this.value;
    }  
  });
});

function escapeHTML(s) { 
  if (s != undefined) {
    return s.replace(/&/g, '&amp;')
      .replace(/"/g, '&quot;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;');
  }
}



