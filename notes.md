# where employees have hybrids

# where employees have accounts

employee model
- username: string
- email: string
- name: string

hybrid model
img_src: string
caption: text

employee has_many hybrids
hybrids belong_to employee


function hybridFormSubmission(e){
        e.preventDefault();
        let image = document.getElementById("image").value
        let caption = document.getElementById("caption").value

        let hybrid = {
            image: image,
            caption: caption
        }
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
    hybridsForm.addEventListener("submit", hybridFormSubmission)
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

renderHybrid() {
        let hybridsDiv = document.getElementById("hybrids-container")

        `
        <ul>
        <img src=${this.image}, alt="Hybrid Image">
        <h4> Description: ${this.caption} </h4>
        </ul>
        <button class="delete-bttn" data-id=${this.id} onclick="deleteHybrid()">Scrub Hybrid</button>
        `

       }
}

// users is an array of User objects
// 
// for (const user of users)
// 



-ask about => and () and .then