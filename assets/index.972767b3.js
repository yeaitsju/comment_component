const l=function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const t of document.querySelectorAll('link[rel="modulepreload"]'))s(t);new MutationObserver(t=>{for(const r of t)if(r.type==="childList")for(const i of r.addedNodes)i.tagName==="LINK"&&i.rel==="modulepreload"&&s(i)}).observe(document,{childList:!0,subtree:!0});function o(t){const r={};return t.integrity&&(r.integrity=t.integrity),t.referrerpolicy&&(r.referrerPolicy=t.referrerpolicy),t.crossorigin==="use-credentials"?r.credentials="include":t.crossorigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function s(t){if(t.ep)return;t.ep=!0;const r=o(t);fetch(t.href,r)}};l();class a extends HTMLElement{constructor(){super()}connectedCallback(){const e=this.attachShadow({mode:"open"});e.innerHTML=`<section class="comment">
   
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
        
        </br>
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
        height: 200px;
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
      `}}customElements.define("custom-comment",a);class c{constructor(){this.comments=[{name:"Julius",email:"julius@gmail.com",comment:"Hello, I got it!",timestamp:"7/29/2022 3:15:13PM"},{name:"George",email:"hello@gmail.com",comment:"Thats awesome, I'm so happy.",timestamp:"8/3/2022 3:15:13PM"},{name:"Christopher",email:"chris@gmail.com",comment:"I got it also.",timestamp:"8/4/2022 3:15:13PM"}],this.subscribers=[]}addComment(e){this.comments.push(e),console.log(this.comments);for(let o=0;o<this.subscribers.length;o++){const s=this.subscribers[o],t=s[0],r=s[1];t==="comment-added"&&(console.log("notifying my subscriber"),r(this.comments))}}subscribe(e,o){this.subscribers.push([e,o])}}class d{constructor(e){e.subscribe("comment-added",this.redraw.bind(this)),this.redraw(e.comments)}redraw(e){document.querySelector(".comments").innerHTML="",console.log(e);for(let o=0;o<e.length;o++){let s=`
            <custom-comment 
             name = "${e[o].name}"
             email = "${e[o].email}"
             comment = "${e[o].comment}"
             timestamp = "${e[o].timestamp}">
             </custom-comment>
            `;console.log(s),document.querySelector(".comments").insertAdjacentHTML("afterbegin",s)}}}class u{constructor(e){this.stateManager=e;const o=`
       
   
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
   
        `;document.querySelector(".form-container").innerHTML=o,document.querySelector("form").addEventListener("submit",this.addComment.bind(this))}addComment(e){e.preventDefault();const o=new Date;let s=o.toLocaleDateString();s+=" "+o.toLocaleTimeString();const t={name:document.querySelector("#full_name").value,email:document.querySelector("#my_email").value,comment:document.querySelector("#message").value,timestamp:s};console.log(t),this.stateManager.addComment(t),document.querySelector("#full_name").value="",document.querySelector("#my_email").value="",document.querySelector("#message").value="",document.querySelector("#option1").checked=!1}}const m=new c;new d(m);new u(m);
