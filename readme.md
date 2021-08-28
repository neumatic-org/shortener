# [Neumatic url shortener](https://s.neumatic.xyz)
[![Deploy on Railway](https://railway.app/button.svg)](https://railway.app/new/template?template=https%3A%2F%2Fgithub.com%2Fneumatic-org%2Fshortener&plugins=mongodb&referralCode=neumatic)

A simple, yet elegant URL shortener app. It uses Mongo to store links and numbers of clicks, and can be run on Heroku or [Replit](https://repl.it/github/neumatic-org/shortener) for free. 

## Setup

1. Either create a Repl or Heroku app and deploy your code

2. Sign up for a new [MongoDB atlas cluster](https://www.mongodb.com/cloud/atlas/register)

3. Edit your env for `MONGO_STR` to be your connection string (from the connect button on mongodb atlas). **If you are on Replit this is required, because code is public, and ENV's are not.**

![image](https://user-images.githubusercontent.com/86504963/131072924-cf2be4df-bd7b-482b-a6cf-c5d9b510baa3.png)


4. Edit config.js to your preferences

```yaml
appURL: The URL your app is served at. On ReplIt it is https://[replname].[username].repl.co, on heroku it is https://[appname].herokuapp.com
port: The port to listen on. On heroku, change it to process.env.PORT
mongoConnectionStr: Read step 2-3, do NOT put your connection string here if on replit.
```

# API

There is currently only 1 endpoint, and that is to create urls. Be warned, this does not come with ratelimiting, or a way to delete urls.

### POST /api/new

url: The url to create

path: Custom path for your url (optional)
