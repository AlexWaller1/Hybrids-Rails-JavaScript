document.addEventListener("DOMContentLoaded", () => {
    createForm();
    fetchUsers()
})

const BASE_URL = "http://localhost:3000"

// read - fetch users
// will manipulate DOM to list users

function fetchUsers(){
    fetch(`${BASE_URL}/users`)
    .then(resp => resp.json())
    .then(users => {
       // .then is where we do something with the data fetched
        for (const user of users){
            
            let u = new User(user.id, user.name, user.username, user.email)
            // new javascript object created
            u.renderUser()
        }
    })
   
}

// create - create a new user

// create a form
// add an event listener
// once form is submitted => fetch `post` to my back end
// do something with the returned object

function createForm(){
    let usersForm = document.getElementById("users-form")

    usersForm.innerHTML +=
    `
    <form>
    Name: <input type="text" id="name"><br>
    Username: <input type="text" id="username"><br>
    Email: <input type="text" id="email"><br>
    <input type="submit" value="Create User">
    </form>
    `
}

function userFormSubmission(){
    let usersForm = document.getElementById("users-form")
    usersForm.addEventListener("submit")
}

// delete - delete a user