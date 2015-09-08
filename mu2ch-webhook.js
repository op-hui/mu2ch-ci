var http = require('http')
var createHandler = require('github-webhook-handler')
var handler = createHandler({ path: '/webhook', secret: 'myhashsecret' })
 
http.createServer(function (req, res) {
  handler(req, res, function (err) {
    res.statusCode = 404
    res.end('no such location')
  })
}).listen(7777)
 

function send_notification(message) {
  var st = new ltx.Element(
    'message',
     { to: "mu2ch@conference.jabber.ru", type: 'groupchat' }
  ).c('body').t(message)
  client.send(st)
} 

handler.on('error', function (err) {
  console.error('Error:', err.message)
})


handler.on('issue_comment', function (event) {
  issue = event.payload['issue']
  comment = event.payload['comment']
  sender = event.payload['sender']['login']
  send_notification("[issues] " + sender + " comment # " + issue['number'] + " " +  issue['title'] + " " + comment['html_url'])
  console.log('issue_comment ' + JSON.stringify(event.payload));
})

handler.on('issues', function (event) {
  issue = event.payload['issue']
  send_notification("[issues] " + event.payload['sender']['login']+ " " + event.payload['action'] + " # " + issue['number'] + " " +  issue['title'] + " " + issue['html_url'])
  
})

handler.on('gollum', function (event) {
  console.log('gollum ' + JSON.stringify(event.payload['sender']));

  sender = event.payload['sender']['login']

  page = event.payload['pages'][0] 
  send_notification("[wiki] " + sender + " " + page['action'] + " " + page['title'] + " " + page['html_url'])
}) 
 
handler.on('push', function (event) {
  head_commit = event.payload['head_commit'] 
  send_notification("[push] " + event.payload['pusher']['name'] + " " + event.payload['commits'].length + " commit(s)" + " " + head_commit['message'] + " " + event.payload['compare']) 

})

handler.on('commit', function (event) {
  head_commit = event.payload['head_commit'] 
  commits_count = len(event.payload.commits)
  send_notification("[commit] " + head_commit['author']['name'] + " " + head_commit['message'] + " " + head_commit["url"]) 
     

})

 
var Client = require('node-xmpp-client')
  , argv = process.argv
  , ltx = require('ltx')

var client = new Client({
    jid: "github@wtfismyip.com",
    password: '',
    host:'wtfismyip.com',
    reconnect: true
})

process.argv.forEach(function(val, index, array) {
  console.log(index + ': ' + val);
});

var x = 0, old = x, average = 0

setInterval(function () {
    var n = x - old
//    console.log(n, average)
    average = (n + average) * 0.5
    old = x
}, 1e3)

var c  = 0
client.on('stanza', function(stanza) {
    console.log('Received stanza: ', c++, stanza.toString())
})

client.on('online', function() {
    console.log('Client is online')
    client.send('<presence/>')
     var presence = new ltx.Element('presence',
        { to: "mu2ch@conference.jabber.ru/github-bot" }).c('x', { xmlns: 'http://jabber.org/protocol/muc' })
     client.send(presence)
})

client.on('offline', function () {
    console.log('Client is offline')
})


client.on('connect', function () {
    console.log('Client is connected')
})

client.on('reconnect', function () {
    console.log('Client reconnects …')
})

client.on('disconnect', function (e) {
    console.log('Client is disconnected', client.connection.reconnect, e)
})


client.on('error', function(e) {
    console.error(e)
    process.exit(1)
})

process.on('exit', function () {
    client.end()
})
