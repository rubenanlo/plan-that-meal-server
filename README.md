# Introduction

This web application helps you to plan your meals ahead of time by providing you with recipes and also giving you the option to prepare a shopping list for your groceries.

It was created in one week based mainly on react, and pure CSS (please note that it was not designed mobile first unfortunately). Please checkout the dependencies for further information on the npm packages that I relied on. This web application comprises of two sets of code [one for back end (https://github.com/rubenanlo/plan-that-meal-server) and another for the front end (https://github.com/rubenanlo/plan-that-meal-client)]

## Instructions

To use this application please please run the command $ npm install in your terminal for dependencies. Also, please create a .env file with the following information. Note that you will need to have an account in cloudinary and have access to mongo DB. The information included below needs to input your own information (indicated between brackets below). Please run it with your local host

- Back end:

  - PORT=5005
  - SESSION_SECRET='keyboard cat'
  - ORIGIN=http://localhost:3000
  - TOKEN_SECRET=[CREATE YOUR OWN]
  - CLOUDINARY_NAME=[YOUR_CLOUDINARY]
  - CLOUDINARY_KEY=[YOUR KEY]
  - CLOUDINARY_SECRET=[YOUR SECRET]

- Front end:
  - REACT_APP_API_URL=http://localhost:5005/api

## DEMO

Check the web application here -> [link](https://planthatmeal.netlify.app/)
