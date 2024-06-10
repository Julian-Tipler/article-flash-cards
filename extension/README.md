## Tools
tailwind?
Chrome extension manifest

## Function
UI Basically just provides a link to login
Content provides a single button to "generate cards"
* Button turns to "loading"
* Grabs all article text on the page 
* Sends a POST to the /cards endpoint
* Receives back a :id
* .then opens a new webpage at <web>/cards/:id

## Routes
/login
/

## Local Development
npm run watch