// creating a new class that controls what my new element would look like.
// includes what attributes it needs which is the name email and comment
//and how i want to present those comment ising HTML
// also includes style tag aka style rules
class Comment extends HTMLElement {
  constructor() {
    super();
  }
  //this method is incharge of bulding the HTML for the component
 //overiding the connected call back method with my own HTML code
  
 connectedCallback() {
   console.log (this.getAttribute("timestamp"))
    const shadow = this.attachShadow({mode: "open"});
    shadow.innerHTML = `<section class="comment">
   
    <section class="comment rcorners1">
        <h2>
        <img src="comment-26.png" />
          ${this.getAttribute("name")}
    
        </h2>
        <p class="email">${this.getAttribute("email")}</p>
        <p>
        ${this.getAttribute("comment")}
        </p>
        <p>
        ${this.getAttribute("timestamp")}
        </p>
      </section>
      <style>
      .comment {
        border: solid gray 1px;
        padding: 15px;
        margin: 20px;
        
        background-color: rgb(207, 205, 203);
      }
      .email {
        color: red;
      }
      .rcorners1 {
        border-radius: 25px;
        background: #def6bc;
        padding: 20px;
        width: 300px;
        height: 150px;
        margin-left: 35vw;
        margin-right: 35vw;
      }
      #comments {
        border: solid rgb(66, 65, 65) 20px;
        display:flex;
        flex-direction:column;
        align-items: center;
        border-radius: 20px;
      }
      h2 {
        margin-bottom: 10px;
      }
      </style>
      `;
  }
}
//customelements.define is taking two arguments. first aergument is what i want the name of the tag to be. 2nd argument is the class that i want to use to controll that tag. which is the comment
customElements.define("custom-comment", Comment);
