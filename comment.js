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
    this.innerHTML = `
   
    <section class="comment rcorners1">
        <h2>
        <img src="comment-26.png" />
          ${this.getAttribute("name")}
    
        </h2>
        <p class="email">${this.getAttribute("email")}</p>
        ${this.getAttribute("comment")}
      </section>`;
  }
}
//customelements.define is taking two arguments. first aergument is what i want the name of the tag to be. 2nd argument is the class that i want to use to controll that tag. which is the comment
customElements.define("custom-comment", Comment);
