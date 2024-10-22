# Books - Full Stack MERN App
Live demo available [here](https://the-literary-haven.web.app/)

## Table of Contents
* [General Info](#general-information)
* [Technologies Used](#technologies-used)
* [Features](#features)
* [Setup](#setup)

## General Information
> Full Stack MERN App using Google Books APIs with email or Google authentication, 
> comments, user profiles and search capability. Mobile responsive. <br/> 

## Technologies Used
- React.js - version 18.2.0
- React Redux, React Router
- Node.js - version 18.12.1
- Express.js - version 4.18.2
- MongoDB - mongoose version 6.8.2
- Google Books APIs
- Google OAuth 2.0
- Material UI - version 5.11.3

## Features
- Searching for books by authors, topics or phrases
- Detailed pages
- Adding, deleting, editing, liking comments
- Signing in by Google OAuth or by email & password
- Adding books to lists (3 lists available: Books to read, Already read books and Favourite books)
- Profile editing (Avatar/nickname)
- Pagination
- Mobile responsive

## Setup
#### Env Variables
- Create .env file and add appropriate variables: <br/>
`PORT = YOUR_PORT (for example 5000)` <br/>
`CONNECTION_URL = YOUR_MONGODB_CONNECTION_URL` <br/>
`SECRET_WORD = YOUR_SECRET_WORD (for example: test)`
#### Google OAuth
- Create new credentials in google cloud console and get your own OAuth client ID
- In google cloud console set your own URIs (for example: http://localhost:5000 and http://localhost:5000/auth)
- Go to client/src/components/Auth/Auth.js 
- Go to the second useEffect 
- Change google client_id to your own.
#### Run application
- Run command line in app directory and run: <br/>
`cd client` <br/>
`npm install --legacy-peer-deps` <br/>
`cd ..` <br/>
`npm i` <br/>
`npm start`
- Open app in browser with URL (for example: http://localhost:5000/)
