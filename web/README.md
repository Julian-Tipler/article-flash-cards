** Tools
Cohere
Supabase

** Routes
/cards
* Sends the text to Cohere Endpoint
* Creates a new set of cards with the response
* Returns the new cards :id

** Deployment
cd into web
npm run build
cd into root folder (not web)
vercel --prod