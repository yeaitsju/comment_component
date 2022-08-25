import '../style.css'
import './comment.js'
import StateManager from './state-manager.js'
import CommentList from './comment-list.js'
import Form from './form-component';
//ofline fallback
import {offlineFallback} from 'workbox-recipes';
import {setDefaultHandler} from 'workbox-routing';
import {NetworkOnly} from 'workbox-strategies';

setDefaultHandler(new NetworkOnly());

offlineFallback();




// import {setCatchHandler, setDefaultHandler} from 'workbox-routing';
// import {NetworkOnly} from 'workbox-strategies';

// const pageFallback = 'offline.html';
// const imageFallback = false;
// const fontFallback = false;

// setDefaultHandler(new NetworkOnly());

// self.addEventListener('install', event => {
//   const files = [pageFallback];
//   if (imageFallback) {
//     files.push(imageFallback);
//   }
//   if (fontFallback) {
//     files.push(fontFallback);
//   }

//   event.waitUntil(
//     self.caches
//       .open('workbox-offline-fallbacks')
//       .then(cache => cache.addAll(files))
//   );
// });

// const handler = async options => {
//   const dest = options.request.destination;
//   const cache = await self.caches.open('workbox-offline-fallbacks');

//   if (dest === 'document') {
//     return (await cache.match(pageFallback)) || Response.error();
//   }

//   if (dest === 'image' && imageFallback !== false) {
//     return (await cache.match(imageFallback)) || Response.error();
//   }

//   if (dest === 'font' && fontFallback !== false) {
//     return (await cache.match(fontFallback)) || Response.error();
//   }

//   return Response.error();
// };

// setCatchHandler(handler);




/*
Goal:
1. Create a new instance of the state manager
2. Create a new instance of the comment list
    * the comment list needs the data from the state manager
      so that it knows how to draw the comments.
*/

const stateManager = new StateManager();
const commentList = new CommentList(stateManager);
const form = new Form(stateManager);
