document.addEventListener("DOMContentLoaded", () => {
    createForm();
    fetchUsers()
}) 

const BASE_URL = "http://localhost:3000"
    
// read - fetch users index

function fetchUsers(){
    fetch(`${BASE_URL}/users`)
    .then(resp => resp.json())
    .then(users => {
        // we do something withthe data fetched, the data is still composed of Ruby Objects
        for (const user of users){
            // this will convert them to JavaScript Objects
            let u = new User(user.id, user.name, user.username, user.email)
            u.renderUser()
        }
    })
}



    // create - create a new user

    // create a form
    // add an eventListener
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

    function deleteUser(){

        let userId = parseInt(event.target.dataset.id)

        fetch(`${BASE_URL}/users/${userId}`, {
            method: 'DELETE'
        })

        this.location.reload()
    }

    
    // read - fetch hybrids index for a give user
    function fetchHybrids(){
        let hybridsFormContainer = document.getElementById("hybrids-form")
        // add HTML to hybrids-form
         let hybridsForm = hybridsFormContainer.querySelector("form")
          hybridsForm.classList.remove("hidden")
        let userId = parseInt(event.target.dataset.id)
        console.log(`${BASE_URL}/users/${userId}`)
        fetch(`${BASE_URL}/users/${userId}/hybrids`)
        .then(resp => resp.json())
        .then(hybrids => {
            console.log("ruby object", hybrids)
              // we do something with hybrids fetched, which are currently Ruby Objects
              for (const hybrid of hybrids){
                  // now convert to JavaScript Objects
                  let h = new Hybrid(hybrid.id, hybrid.img_src, hybrid.caption, hybrid.user_id)
                  h.renderHybrid()
              }

        })
    }

    // create a form for the Hybrids
    // add an eventListener
    function createHybridForm(){
        let hybridsFormContainer = document.getElementById("hybrids-form")
        // add HTML to hybrids-form
         let hybridsForm = hybridsFormContainer.querySelector("form")
         hybridsForm.addEventListener("submit", hybridFormSubmission)

    }

    function hybridFormSubmission(e){
        e.preventDefault();
        

        let image = document.getElementById("image").value
        let caption = document.getElementById("caption").value

        let hybrid = {
            image: image,
            caption: caption
        }
        fetch(`${BASE_URL}/users/${userId}/hybrids`, {
            method: "POST",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(hybrid)
        })
        .then(resp => resp.json())
        .then(hybrid => {
            let h = new Hybrid(hybrid.id, hybrid.img_src, hybrid.caption, hybrid.user_id)
            h.renderHybrid();
        })
    }
    
    // scrub hybrid from database






