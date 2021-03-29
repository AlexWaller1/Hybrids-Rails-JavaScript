class Hybrid{
    constructor(id, img_src, caption, user_id){
        this.id = id;
        this.img_src = img_src;
        this.caption = caption;
        this.user_id = user_id;
    }

    // instance method thats going to render object to the dom
    // whatever behavior belongs to instance or class is stored in here.
    renderHybrid() {
        let hybridsDiv = document.getElementById("hybrids-container")

        hybridsDiv.innerHTML +=

        `
        <ul>
        <img src=${this.image}, alt="Hybrid Image">
        <li> Description: ${this.caption} </li>
        </ul>
        `
    }
}