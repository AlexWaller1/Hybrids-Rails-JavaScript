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
            // current have rails objects
            let u = new User(user.id, user.name, user.username, user.email)
            // new javascript object created
            u.renderUser()
        }
    })
   
}

function fetchHybrids(){
    fetch(`${BASE_URL}/hybrids`)
    .then(resp => resp.json())
    .then(hybrids => {
        // .then is where we do something with data fetched
        for (const hybrid of hybrids){
            // currently a rails object
            let u = new Hybrid(hybrid.id, hybrid.image, hybrid.caption)
            // hybrids javascript objects created
            u.renderHybrid()
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

   usersForm.addEventListener("submit", userFormSubmission)
}

function createHybridForm(){
    let hybridsForm = document.getElementById("hybrids-form")

    hybridsForm.innerHTML +=

    `
    <form>
    <input type="text" id="image"><br>
    Description: <input type="text" id="caption"><br>
    <input type="submit" value="Create Hybrid"
    </form>
    `
}

function userFormSubmission(e){
    e.preventDefault(); 
    let name = document.getElementById("name").value
    let username = document.getElementById("username").value
    let email = document.getElementById("email").value

    let user = {
        name: name,
        username: username,
        email: email
    }

    fetch(`${BASE_URL}/users`, {
        method: "POST",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(user)
    })
    .then(resp => resp.json())
    .then(user => {
        let u = new User(user.id, user.name, user.username, user.email)
        u.renderUser();
    })
}



// delete - delete a user

function deleteUser(e){
    let userId = parseInt(e.target.dataset.id)

    fetch(`${BASE_URL}/users/${userId}`, {
        method: 'DELETE'
    })

    this.location.reload()
}