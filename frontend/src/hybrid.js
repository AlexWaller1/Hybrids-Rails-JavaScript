class Hybrid{
    constructor(img_src, caption){
        this.img_src = img_src;
        this.caption = caption;
    }


    // instance method thats going to render the object to the dom
    // render hybrid instance method

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