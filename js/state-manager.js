/*
The job of the state manager is to: 
    1. + organize the data.
    2. update the data when a component notifies the state manager.
    3. let other components know when the data has changed.


Each comment has:
    1. Name of the person
    2. Email
    3. Comment
    4. Timestamp
*/

export default class StateManager {
  constructor() {
    // this week: figuring out how to store and then reload
    // comments using indexDB.
    // this.comments = [
    //     {
    //         name: "Julius",
    //         email: "julius@gmail.com",
    //         comment: "Hello, I got it!",
    //         timestamp: "7/29/2022 3:15:13PM"
    //     },
    //     {
    //         name: "George",
    //         email: "hello@gmail.com",
    //         comment: "Thats awesome, I'm so happy.",
    //         timestamp: "8/3/2022 3:15:13PM"
    //     },
    //     {
    //         name: "Christopher",
    //         email: "chris@gmail.com",
    //         comment: "I got it also.",
    //         timestamp: "8/4/2022 3:15:13PM"
    //     }
    // ]
    // mailing list
    this.subscribers = [];
    this.loadDatabase();
  }

  //    this method does two things it loads the database it loads the ju_app_db and creates a new comment store if it dosent exist.
  // it also reads the comment store
  loadDatabase() {
    // let db;

    var openRequest = indexedDB.open("ju_app_db", 2);

    // 1. This function created our new data store:
    openRequest.onupgradeneeded = function (e) {
      this.db = e.target.result;
      let db = this.db;
      console.log("running onupgradeneeded");

      // create new data stores:
      if (!db.objectStoreNames.contains("comments")) {
        var storeOS = db.createObjectStore("comments", {
          keyPath: "id",
          autoincrement: true,
        });
      }
    }.bind(this);

    // 2. This function fires when the database has been opened.
    // This is where we will add new comments to the datastore:
    openRequest.onsuccess = function (e) {
      console.log("running onsuccess");
      db = e.target.result;
      // call this function to create a new comment:

      this.readCommentsFromDataStore(db, "comments-loaded");
    }.bind(this);
  }

  // 2. we need a way to update the comments list
  //the form invoked the statemanagers add comment function
  addComment(newComment) {
    // "push" method of an array appends an item to the bottom
    var openRequest = indexedDB.open("ju_app_db", 2);
    openRequest.onsuccess = function (e) {
      console.log("running onsuccess");
      db = e.target.result;
      // call this function to create a new comment:

      var transaction = db.transaction(["comments"], "readwrite");
      var comments = transaction.objectStore("comments");
      newComment.id = Math.floor(Math.random() * 100000000);
      console.log(newComment);
      console.log(comments);
      var request = comments.add(newComment);

      request.onerror = function (e) {
        console.log("Error", e.target.error.name);
      };
      request.onsuccess = function (e) {
        console.log("The comment has been successfully added!");
        this.readCommentsFromDataStore(db, "comment-added");
      }.bind(this);

      // Commit: close connection
      transaction.oncomplete = () => {
        db.close();
      };
    }.bind(this);
    let db = this.db;
  }

  // 3. we need a way to tell the other components to redraw
  subscribe(theEvent, theResponse) {
    //this code adds a list of two elements to the subscribers array
    //the first element is a string that indicates which event that the subscribers are looking for
    //the second element is a function that will get invoked when the event happens
    this.subscribers.push([theEvent, theResponse]);
  }

  notify(theEvent, theData) {
    //I need to notify everyone that a 'comments-updated' event has just happened
    //Q:; WHo do i notify?
    //A: My subscribers!!! (which are stored in this.subscribers (an array}))
    //Q: How do I notify them?
    //A: I trigger the function they told me to trigger.
    for (let i = 0; i < this.subscribers.length; i++) {
      const subscriber = this.subscribers[i];
      const eventName = subscriber[0];
      const f = subscriber[1];
      if (eventName === theEvent) {
        console.log("notifying my subscriber");
        f(theData);
      }
    }
  }

  readCommentsFromDataStore(db, eventName) {
    var transaction = db.transaction("comments", "readonly");
    var objectStore = transaction.objectStore("comments");
    var cursorRequest = objectStore.openCursor();
    var commentList = [];
    cursorRequest.onsuccess = function (event) {
      if (event.target.result) {
        // if(event.target.result.value['id'] && event.target.result.value['id'] == value){ //compare values
        commentList.push(event.target.result.value);
        // }
        event.target.result["continue"]();
      }
    };

    transaction.oncomplete = function (event) {
      console.log(commentList);
      this.notify(eventName, commentList);
      // callback(agregate); // return items
    }.bind(this);
  }
}
