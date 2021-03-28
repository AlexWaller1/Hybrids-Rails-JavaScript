document.addEventListener("DOMContentLoaded", () => {
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
        }
    })
   
}

// create - create a new user

// delete - delete a user