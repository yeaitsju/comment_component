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
        this.comments = [
            {
                name: "Julius",
                email: "julius@gmail.com",
                comment: "Hello, I got it!",
                timestamp: "7/29/2022 3:15:13PM"
            },
            {
                name: "George",
                email: "hello@gmail.com",
                comment: "Thats awesome, I'm so happy.",
                timestamp: "8/3/2022 3:15:13PM"
            },
            {
                name: "Christopher",
                email: "chris@gmail.com",
                comment: "I got it also.",
                timestamp: "8/4/2022 3:15:13PM"
            }
        ]
        // mailing list
        this.subscribers = [];
    }

         // 2. we need a way to update the comments list
    addComment(newComment){
        // "push" method of an array appends an item to the bottom
        this.comments.push(newComment);
        console.log(this.comments);
        
        //I need to notify everyone that a 'comments-updated' event has just happened
        //Q:; WHo do i notify?
        //A: My subscribers!!! (which are stored in this.subscribers (an array}))
        //Q: How do I notify them?
        //A: I trigger the function they told me to trigger.
        for(let i = 0; i < this.subscribers.length; i++) {
            const subscriber = this.subscribers[i];
            const eventName = subscriber[0];
            const f = subscriber[1];
            if (eventName === 'comment-added') {
                console.log('notifying my subscriber');
                f(this.comments);
            }
        }

       
    }

    // 3. we need a way to tell the other components to redraw
    subscribe(theEvent, theResponse) {
        this.subscribers.push([
            theEvent, theResponse
        ])
    }
}