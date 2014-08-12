# chatterbox

This assignment constitutes the beginning of a multi-sprint journey exploring client-server architecture. Today, you'll build a chat client that allows you to communicate with your fellow students. You'll do this using `$.ajax` to send (POST) and fetch (GET) JSON data to and from a remote server.

## Prerequisites

Before you get started, please read this [brief introduction to about REST and HTTP](http://net.tutsplus.com/tutorials/other/a-beginners-introduction-to-http-and-rest/).

Play around with this [Interactive Tutorial on Cross-site scripting (XSS)](https://xss-game.appspot.com). There are only 6 levels, but you don't have to complete all of them if you don't want to.

<!-- ## REWORD THESE

Excelent [interactive tutorial on Cross-site scripting (XSS)](https://xss-game.appspot.com) attacks

[Awesome interactive tutorial on escaping html](http://escape.alf.nu/)

[XSS (Cross Site Scripting) Prevention Cheat Sheet](https://www.owasp.org/index.php/XSS_(Cross_Site_Scripting)_Prevention_Cheat_Sheet)

[Cross-site scripting (XSS)](https://www.owasp.org/index.php/Cross-site_Scripting_(XSS))

[XSS Filter Evasion Cheat Sheet](https://www.owasp.org/index.php/XSS_Filter_Evasion_Cheat_Sheet) -->

## Tools You'll Use

### Parse API

We've set up a remote server using the [Parse](https://parse.com/) platform. Later (as part of a different sprint) you'll build your own (local) server and replace the (remote) one you're using today. Since you'll eventually reuse parts of your solution to this sprint, try to make your code readable/maintainable so that future-you doesn't get angry at present-you for making things messy.

Parse has documented their REST API [here](https://www.parse.com/docs/rest#general).
Please note that you will only need to use a small part of it. In the [Quick
Reference](https://www.parse.com/docs/rest#general-quick) section, there's a
heading named "Objects" that you'll need to refer to. You'll also need to refer
to the [Request Format](https://www.parse.com/docs/rest#general-requests)
section.

Parse is a very generalized system and will allow you to store any kind of
object you like. During this sprint, we'll be using it as a shared message storage server that everyone in the class can read and write from (via REST).

The message objects you send to the parse server (via POST requests) must be in the following format:

```javascript
var message = {
  'username': 'shawndrost',
  'text': 'trololo',
  'roomname': '4chan'
};
```

To get you started, here's an example POST request. Note that any messages you POST to the server are viewable by everyone, so be nice.

```javascript
$.ajax({
  // always use this url
  url: 'https://api.parse.com/1/classes/chatterbox',
  type: 'POST',
  data: JSON.stringify(message),
  contentType: 'application/json',
  success: function (data) {
    console.log('chatterbox: Message sent');
  },
  error: function (data) {
    // see: https://developer.mozilla.org/en-US/docs/Web/API/console.error
    console.error('chatterbox: Failed to send message');
  }
});
```

### [Package Management]

A package manager is a tool for automating the process of installing, upgrading, configuring and managing dependencies ([underscore], [jquery], etc) for projects. Most package managers run through a command-line interface.

You've used at least one package manager already ([homebrew]). Today, you'll use a popular package manager called **bower** to install and keep track of the tools your client-side code requires.

### [Bower][bower]

Instead of manually downloading all your dependencies to a 'lib' folder that you track with git, You'll use bower to install and manage everything!

Bower is a generic, unopinionated solution to the problem of front-end (client-side) package management.
- There are no system wide dependencies (everything is installed locally within your projects' bower_components directory)
- Dependencies aren't shared between different apps (if two seperate projects require underscore.js, both get their own copy of underscore.js)
- The dependency tree is flat (no packages depend on other packages).

There are two files in this repo that control/affect the behavior of bower: 

  - `/bower.json` - defines our project dependencies
  - `/.bowerrc` - defines where our project dependencies need to be installed

## Basic requirements:

### Bower

- [ ] Take a look at `bower.json` and note the library listed under 'dependencies'. When `bower install` is run from the command line, the packages listed here will be automatically installed to `client/bower_components`.
- Bower depends on Node and npm (we'll cover those in an upcoming sprint).
 - [ ] Assuming you have those installed already, install Bower globally using npm, `npm install -g bower`
- Use bower to install the client-side dependancies listed in bower.json for this repo:
  - [ ] Run the following command from the root directory of the repo `bower install`.
- Add underscore as a bower dependency of your project:
  - [ ] Run the following command from the root directory of the repo `bower install --save underscore`. Make sure to look at bower.json and `client/bower_components` before and after you run this command.
  - [ ] Add underscore to `client/index.html` so that you can use it in your solution. See line 9 of `client/index.html` for the correct syntax.
- Continue to use bower to install (and keep track of) any additional libraries you add as you work through this sprint.

### Messages

Open up client/scripts/app.js and start coding.

**NOTE:** The url you should be using is `https://api.parse.com/1/classes/chatterbox`

- [ ] Display messages retrieved from the parse server
- [ ] Setup a way to refresh the displayed messages (either automatically or with a button)
- [ ] Be careful to use proper escaping on any user input. Since you're
displaying input that other users have typed, your app is vulnerable
XSS attacks.

**Note**: If you issue an XSS attack, make it innocuous enough to be
educational, rather than disruptive.

- [ ] Allow users to select a username and send messages

#### A Note About Escaping

Escaping is the way we ensure that when users input things to our sites, we don't allow them to write our site's code for us! For example, what if someone's username was ';document.createElement('div').text('you got pwned');'? If we didn't escape, that 'username' would get executed just like any other code, and all the sudden you'll have a new div on your site that says 'you got pwned', anytime that person's username is displayed. Now that might seem trivial, but understand attacks like this can affect (or transmit) your users data too. That's not cool.

<!--   This brings us to the difference between .html() and .text(). Using .html() will evaluate exactly what gets passed in as html. Thus sending in `.html("<p>Hey</p>")` will show up as simply 'Hey' inside of a p tag. However, using .text() will automatically escape what is passed in. So that same example would show up as literally `<p>Hey</p>`. Thus, the text method 'escapes' the passed in string, whereas the html method simple evaluates it.
  You have been warned. :) -->

You'll need to figure out a way to effectively protect your app against cross-site scripting (XSS) attacks issued by your class-mates during this sprint. Part of the fun of this sprint is figuring out how to do so. As always, google is your friend :) If you're curious, you can read about some of the nuances associated with escaping html [here](http://wonko.com/post/html-escaping).

### Rooms

- [ ] Allow users to create rooms and enter existing rooms (rooms are defined by the message.room property of messages, so you'll need to filter them somehow)

### Socializing

- [ ] Allow users to 'befriend' other users by clicking on their username
- [ ] Display all messages sent by friends in bold

### Backbone Introduction

Backbone.js is a JavaScript MVC (model-view-controller) framework for front-end development which works well with jQuery and Underscore.js, and helps you to set up a RESTful API for your application. Backbone.js is great for building client-heavy, so-called one-page apps like Gmail, Google Docs, and Asana.

 - Complete each of these intros (you have access to these repos on github)
  - [ ] backboneIntroStep1a
  - [ ] backboneIntroStep1b
  - [ ] backboneIntroStep2a
  - [ ] backboneIntroStep2b

## Extra Credit

### Convert your app to use Backbone!

  - [ ] Use your new found knolwdge to convert your app to use Backbone!

### Other fun stuff

- [ ] Write your own templating engine from scratch
- [ ] Figure out a way to encrypt your messages so that even though everyone can see that you've sent one, only the people you want can actually decrypt and view it.
- [ ] Allow users to have more than one room open at a time using tabs
- [ ] Show unread message counts in open tabs & a special notifier when the user is mentioned
- [ ] Add a 'settings' pane where the user can change their info and upload a photo
- [ ] Show a history of of your username mentions
- [ ] Read about escaping, (below and in the linked article) and make sure your app is safe from XSS attacks.



[Package Management]:https://en.wikipedia.org/wiki/Package_management_system
[underscore]:http://underscorejs.org/
[jquery]:http://jquery.com/
[npm]:https://npmjs.org/
[bower]:http://bower.io
[homebrew]:http://brew.sh/
[this guide]:https://github.com/kjbekkelund/writings/blob/master/published/understanding-backbone.md
