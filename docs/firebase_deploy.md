# Install and deploy the firestore app

## Requirements

* [Node.js](https://nodejs.org/en/)

## Install the firebase cli tools

```sh
# Install via npm
npm install -g firebase-tools

# Login with your acount
firebase login

# List your firebase projects
firebase list
```

## Clone FireBrok

```sh
git clone https://github.com/CPNV-ES/FireBrok.git
```

## Setup the project for deployemnt

First, you need to update the `.firebaserc` file, update the `default` value to your firebase project name :

```json
{
  "projects": {
    "default": "firebrok"
  }
}

```

## Deployment commands

```sh
# Deploy all functions
firebase deploy --only functions

# Deploy only one function
firebase deploy --only functions:create_automaton

# Deploy the hosting
firebase deploy --only hosting

# Deploy only firestore rules
firebase deploy --only firestore:rules

# Import user in firebase authentication
firebase auth:import users.json
```
