document.addEventListener("DOMContentLoaded", () => {
    console.log(this)
    // context is different between standard, => determined at point of definition, standard function
    // at point of when its called
    createForm();
    fetchUsers()
}) 

const BASE_URL = "http://localhost:3000"
const USERS = []
// declared in outer scope
    
// read - fetch users index

function fetchUsers(){
    fetch(`${BASE_URL}/users`)
    .then(resp => resp.json())
    .then(users => {
        
        // clear existing list
        
        for (const user of users){
            
            // let u = new User(user.id, user.name, user.username, user.email)
            let u = new User(user)
            USERS.push(u)
            // destructuring id: let user = {user.id, name: user.name, username:user.username}
            // destructuring const { id, name, username, email} = user
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
        <button class="sort-bttn" data-id=${this.USERS} onclick="sortUsers()">Sort By Username</button>
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
                //establishes protocols, key:value pairs
            },
            body: JSON.stringify(user)
        })
        .then(resp => resp.json())
        .then(user => {
            let u = new User(user)
            // let u = new User(user.id, user.name, user.username, user.email)
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

    function initHybridsContainer(){
        document.getElementById("hybrids-container").innerHTML = ''
        // its emptying out contents of hybrids-container
    }
    
    // read - fetch hybrids index for a give user
    
    function fetchHybrids(){
        
        let hybridsForm = document.getElementById("hybrids-form")
        // add HTML to hybrids-form
         // let hybridsForm = hybridsFormContainer.querySelector("form")
         console.log(hybridsForm)
         hybridsForm.addEventListener("submit", hybridFormSubmission, false) // only let the button itself recieve click event
          hybridsForm.classList.remove("hidden")
        let userId = parseInt(event.target.dataset.id)
        document.getElementById("userId").value = userId
        //console.log(`${BASE_URL}/users/${userId}`)
        loadHybrids(userId)
    }

    function loadHybrids(userId){
        initHybridsContainer()
        fetch(`${BASE_URL}/users/${userId}/hybrids`)
        .then(resp => resp.json())
        .then(hybrids => {
            console.log("JS object", hybrids)
             
              for (const hybrid of hybrids){
                  
                  let h = new Hybrid(hybrid.id, hybrid.img_src, hybrid.caption, hybrid.user_id)
                  h.renderHybrid()
              }

        })

    }

    
    

    function hybridFormSubmission(e){
        
         e.preventDefault();
        

        let image = document.getElementById("image").value
        let caption = document.getElementById("caption").value
        let userId = document.getElementById("userId").value

        let hybrid = {
            img_src: image,
            caption: caption,
            userId: userId
            
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
    function deleteHybrid(){
        let userId = parseInt(event.target.dataset.userid)
        let hybridId = parseInt(event.target.dataset.id)
        // its responding to event. and the event has data-userId and data-Id

        fetch(`${BASE_URL}/users/${userId}/hybrids/${hybridId}`, {
            method: 'DELETE'
        })
        .then(()=>loadHybrids(userId))
        // anonymous callback function

        
    

    }
    

    function sortUsers(){
        console.log(USERS)
         USERS.sort((a,b) => {
             console.log('SORTING', a.username.toUpperCase(), b.username.toUpperCase()  )
             return (a.username.toUpperCase() > b.username.toUpperCase()) ? 1 : -1
            })
         // ternary operator
         // if a > b returns 1
         // if a not > b returns -1
         // sort takes function and runs it
        console.log(USERS)
        let usersDiv = document.getElementById("users-container")
        usersDiv.innerHTML = ""
        for (let user of USERS){
            user.renderUser()
        }
        
    }






