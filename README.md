
# Game session Feedback Application

- Service in node.js (backend) that allows players of an online game to submit feedback for their last game session, and allows members of an operations team to view the feedback. Users can give their session a rating on a scale of 1 to 5, and can leave a comment. Multiple players can rate the same session, but each player can only rate a given session once.

- Web application in Angular 7 (frontend) that allows the user to access game sessions information and to add feedback to game sessions. 

#### Note : 
- There is no real concept of user or permission implemented. All registered feedbacks have been made by fake users with ID `1` to `6`. The default current user has the user ID  `15` and has given no feedback at all. 
---

## Index

- [Stack](#stack)
- [Design Goals](#design-goals)
- [Available Pages](#available-pages)
- [Getting Started](#getting-started)
- [Local Commands](#local-commands)
- [API](#api)
- [Additional Features](#additional-features)
- [Contributing](#contributing)
- [Have a question or suggestion?](#have-a-question-or-suggestion)
---


## Stack

* [Node.js](https://nodejs.org) (9.0.0)
* [MongoDB](https://www.mongodb.com/) (4.0.9)
* [npm](https://www.npmjs.com) (5.5.1)
* [Angular](https://angular.io/) (7.2.0)
* [Angular CLI](https://cli.angular.io/) (7.3.8)
* [Typescript](https://www.typescriptlang.org/) (3.2.2) for a static type checker for Javascript
* SCSS as CSS extension language

---

## Design Goals
- Best Programming Techniques
- Focus on application maintenability and code readability
- Use only modern CSS features to style the whole application.

---

## Available Pages

| Pages | URL | Description|
| --- | --- |--- |
| Home | / | Main page of application |
| Game Sessions | /sessions | List of all registered game sessions |
| Game Sessions | /sessions/session/:id | Specific game session information and list of all feedbacks registered for that specefic game session |
| Feedback | /feedbacks/:id | Add a feedback for a specific game session|

---

## Getting Started

### Prerequisites

* [Node.js](https://nodejs.org) (9.0.0)
* [MongoDB](https://www.mongodb.com/) (4.0.9)
* [npm](https://www.npmjs.com) (5.5.1)

### Install NVM (Node Version Manager)
We use NVM to manage our Node verions to keep a consistent environment across developers.

[Follow install instructions here](https://github.com/creationix/nvm#install-script)

After the install, `cd` into the `unity-assignment` directory and run `nvm use`. This will use the Node version defined in the `.nvm` file.

Then install the application dependencies

At the root

```sh
$ npm install
```

At the root of the `/public` folder 

```sh
$ npm install
```
---

## Local Commands

In this current section you can find all commands to run the application from the terminal on your machine.

### Development

#### To start Mongo

At the root of the project
```sh
$ mongo
```

#### To import collections
MongoDB databases files are located in the `databases` folder at the root of the projects. To import the data, in another terminal run these commands. 

```sh
$ mongorestore -d GameSessionFeedbackDb -c sessions {replace with your own path}/unity-assignment/databases/GameSessionFeedbackDb/sessions.bson
```
```sh
$ mongorestore -d GameSessionFeedbackDb -c feedbacks.bson {replace with your own path}/unity-assignment/databases/GameSessionFeedbackDb/feedbacks.bson
```

Example of {path} : `/Users/laumicha/Desktop`

#### To start the server

In another terminal at the root of the project
```sh
$ npm run start
```

#### To start the application

In another terminal at the root of the `/public` folder 
```sh
$ ng serve
```

Navigate to **http://localhost:4200/** to view the app.

---

## API

This application consumes data from the following service

---
#### Sessions

| Endpoint | Description |
| --- | --- |
| `GET` sessions | Get all the game sessions |

##### Parameters
```
None
```
##### Response
```
200 OK
{
    {
        name: string,
        Created_date : Date,
        _id: string
    }
}
```
| Endpoint | Description |
| --- | --- |
| `POST` sessions | Create a new session |
##### Parameters
```
{
    name: string,
}
```
##### Response
```
200 OK
{
    name: string,
    Created_date : Date,
    _id: string
}
```
| Endpoint | Description |
| --- | --- |
| `GET` sessions/:sessionId | Get information for a specific session |
##### Parameters
```
{
    sessionId : Number
}
```
##### Response
```
200 OK
{
    name: string,
    Created_date : Date,
    _id_: string

}
```
| Endpoint | Description |
| --- | --- |
| `PUT` sessions/:sessionId | Update a specific session |
##### Parameters
```
{
    sessionId : Number
}
```
##### Response
```
200 OK
```
| Endpoint | Description |
| --- | --- |
| `DELETE` sessions/:sessionId | Delete a specific session |
##### Parameters
```
{
    sessionId : Number
}
```
##### Response
```
200 OK
'Session successfully deleted'
```

#### Feedbacks
| Endpoint | Description |
| --- | --- |
| `GET` feedbacks | Get all the game sessions feedbacks |

##### Parameters
```
None
```
##### Response
```
200 OK
{
    {
        rating: Number,
        Created_date : Date,
        comment: string,
        sessionId: ObjectId,
        user: Number,
        _id : string
    }
}
```
| Endpoint | Description |
| --- | --- |
| `POST` feedbacks | Create a new feedback |
##### Parameters
```
{
    rating: Number,
    comment: string,
    sessionId: ObjectId,
    user: Number
}
```
##### Response
```
200 OK
{
    rating: Number,
    Created_date : Date,
    comment: string,
    sessionId: ObjectId,
    user: Number,
    _id : string
}

OR

'The user is not authorized to leave a feedback again'
```
| Endpoint | Description |
| --- | --- |
| `GET` feedbacks/session/:sessionId | Get all the game sessions feedbacks for a specific game session |
##### Parameters
```
{
    sessionId : Number
}
```

##### Response
```
200 OK
{
    {
        rating: Number,
        Created_date : Date,
        comment: string,
        sessionId: ObjectId,
        user: Number,
        _id : string
    }
}
```
| Endpoint | Description |
| --- | --- | 
| `GET` feedbacks/rating/:rating | Get all the game sessions feedbacks for a specific rating |
##### Parameters
```
{
    rating : Number
}
```
##### Response
```
200 OK
{
    {
        rating: Number,
        Created_date : Date,
        comment: string,
        sessionId: ObjectId,
        user: Number,
        _id : string
        
    }
}
```
| Endpoint | Description |
| --- | --- |
| `GET` feedbacks/:sessionId/:rating | Get all the feedbacks for a specific game session and a specific rating|
##### Parameters
```
{
    sessionId : Number,
    rating : Number
}
```
##### Response
```
200 OK
{
    {
        rating: Number,
        Created_date : Date,
        comment: string,
        sessionId: ObjectId,
        user: Number,
        _id : string
    }
}
```
| Endpoint | Description |
| --- | --- |
| `GET` feedbacks/:feedbackId | Get information for a specific feedback |
##### Parameters
```
{
    feedbackId : Number
}
```
##### Response
```
200 OK
{
    rating: Number,
    Created_date : Date,
    comment: string,
    sessionId: ObjectId,
    user: Number,
    _id : string
}
```
| Endpoint | Description |
| --- | --- |
| `PUT` feedbacks/:feedbackId | Update a specific feedback |
##### Parameters
```
{
    feedbackId : Number
}
```
##### Response
```
200 OK
```
| Endpoint | Description |
| --- | --- |
| `DELETE` feedbacks/:feedbackId | Delete a specific feedback |
##### Parameters
```
{
    feedbackId : Number
}
```
##### Response
```
200 OK
'Feedback successfully deleted'
```
---
## Additional Features
List of features that could be implemented in the next version : 

- Implement users, roles and permissions
- Secure the database
- Edit and delete feedbacks
- Add, edit, delete sessions
- Unit tests for both backend and frontend

## Contributors
* Lauriane Michaud ([lmicho](https://github.com/lmicho))

---

## Have a question or suggestion?
Contact [Lauriane](https://www.linkedin.com/in/laurianemichaud/) on LinkedIn or send me an email to lauriane.b.michaud@gmail.com.
