$('.toast').toast('show');

// Enable pusher logging - don't include this in production
Pusher.logToConsole = false;

var pusher = new Pusher('ca47239ee315d662e6f1', {
  cluster: 'eu',
  forceTLS: true,
  authTransport: 'jsonp'
});

var channel = pusher.subscribe('private-channel');
channel.bind('my-event', function(data) {
  render('my-event', data);
});

channel.bind('my-alert', function(data) {
  render('my-alert', data);
});

function render(msg, data){
  var ctr = document.getElementById(msg+'s');
  var tpl = document.getElementById(msg+'-tpl').cloneNode(true);
  tpl.removeAttribute("id");
  var from = tpl.getElementsByClassName("ws-data-from")[0];
  from.innerText = data.name;
  var msg = tpl.getElementsByClassName("ws-data-body")[0];
  msg.innerText = data.message;
  if( ctr.childNodes.length == 0) {
    ctr.appendChild(tpl);
  } else {
    ctr.insertBefore(tpl, ctr.childNodes[0])
  }
  $('.toast').toast();
}
