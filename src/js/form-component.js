/*

Form component:
1. Draws the form.
2. Listens for the form submit
3. It creates a new comment object:

   {
        name: __________,
        email: _________,
        comment: _______, 
        timestamp: new Date()
   }

    and sends it to the state manager.
4. It clears out the form

*/

export default class Form {
  // what is a constructor?
  // brings the instance to life
  constructor(sm) {
    this.stateManager = sm;
    const formTemplate = `
       
   
    <form method="POST">
      <!-- Full Name -->
      <div class="row">
        <label class="desc" for="full_name">*Full Name</label>
        <br />
        <input
          id="full_name"
          name="full_name"
          type="text"
          placeholder="John Doe"
          size="50"
          tabindex="1"
          required
        />
      </div>

      <!-- Email -->
      <div class="row">
        <label class="desc" for="my_email"> *Email </label>
        <div>
          <input
            id="my_email"
            name="my_email"
            type="email"
            spellcheck="false"
            placeholder="janedoe@gmail.com"
            maxlength="255"
            tabindex="2"
            required
          />
        </div>
      </div>

      <!-- Large Text Area -->
      <div class="row">
        <label for="message"> *Comment (required) </label>

        <div>
          <textarea
            id="message"
            name="message"
            spellcheck="true"
            rows="10"
            cols="50"
            tabindex="4"
            required
          ></textarea>
        </div>
      </div>

      <!-- checkbox -->
      <div class="row">
        <input
          type="checkbox"
          id="option1"
          name="option1"
          value="Do you agree"
          required
        />
        <label for="option1"> Agree for comment to go public?</label><br />
      </div>

      <button type="submit" href="/">Send Feedback</button>
    </form>
   
        `;

    document.querySelector(".form-container").innerHTML = formTemplate;

    document
      .querySelector("form")
      .addEventListener("submit", this.addComment.bind(this));
  }

  addComment(ev) {
    // goal of add comment is to let the state manager know
    // that a new comment has been added:
    ev.preventDefault();

    const date = new Date();
    let dateString = date.toLocaleDateString();
    dateString += " " + date.toLocaleTimeString();

    const commentObject = {
      name: document.querySelector("#full_name").value,
      email: document.querySelector("#my_email").value,
      comment: document.querySelector("#message").value,
      timestamp: dateString,
      // document.querySelector('#full_name').value = ""
      // document.querySelector('#my_email').value = ""
      // document.querySelector('#message').value = ""
      // document.querySelector('#option1').checked = false
    };
    console.log(commentObject);
    // console.log(full_name);
    // console.log(my_email);

    // tell the state manager that we have
    // a new comment to add:
    this.stateManager.addComment(commentObject);

    // Your Job: how do you clear out your form!!
    document.querySelector("#full_name").value = "";
    document.querySelector("#my_email").value = "";
    document.querySelector("#message").value = "";
    document.querySelector("#option1").checked = false;
  }
}
