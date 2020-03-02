# The Shaker
Cocktail Recipe Generator with user-inputed ingredients list

## 1: Objectives and technologies used

Our goal was to create a user-friendly web tool to create/manage a virtual bar and discover new possible cocktail recipes with its ingredients. A user account can be created to save the bar contents, so it can be represent you bar over time.

### Technologies used

This project is developed mainly using Javascript, HTML and CSS. Node.js is used to set up the web server, MongoDB manages the data (recipes and ingredients) and Express.jswas used to set up the basis of the project. Passport.js is used to manage the authentication process, and Bootstrap provides fonts and templates for front-end cosmetics.

## 2: How to deploy / Prerequisites

After cloning the project repository to a local folder, you'll need to install these few dependencies and softwares:

- Node.js : You'll absolutely need this Javascript runtime, since everything server-side is based upon it. The Node Package Manager (npm) is very useful to include more Node modules. However, needed modules are already included in the project repo. You can find it at this link : https://nodejs.org/en/download/

- MongoDB : You'll also need to install and run you own Mongo database to host your ingredient list. Using npm, adding mongodb to your project is fairly easy. This package is however already included in the node-modules folder, so you won't have to install it again. We suggest download MongoDB Compass, which provides an intuitive UI to manage database creations and content. The project expects a mongoDB database to be running on localhost:27017, with two collections (recipes and ingredients) available. 

You will of course need a web browser, such as Firefox, to load the front-end part of our project. Finally, to use and modify the project for personal use, you'll need a text/code editor, such as Visual Studio Code or SublimeText.  

## 3: Authors

This project is made by Juan Pablo Otalora Romero and Antoine Noreau, for the Web Developement Class at Universidad de Los Andes, Colombia. 

Juan Pablo Otalora // https://github.com/JuanOtalora

Antoine Noreau // https://github.com/antonoro

## 4: Screenshot

<a href="Screenshot.png">

## 5: Licence

This project is licensed under the terms of the MIT <a href="https://github.com/antonoro/crispy-cocktails/blob/master/LICENSE">License</a>.
