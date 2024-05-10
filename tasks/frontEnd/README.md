# Judge.me Coding Challenge - Front-end Engineer
Technical assessment for applications for the front-end Engineer role.  
We ask that the task be completed using [Vue.js](https://vuejs.org/) as our existing front-end is written in it. However, if you're not familiar or comfortable with it, we will accept submissions that do not use Vue.   
This task is designed around a simple take on the interface reqwuired to enable management of review data. Please contain your code in this folder to ensure it can be reviewed easily.  

## Your task
Create a simple [CRUD](https://en.wikipedia.org/wiki/Create,_read,_update_and_delete) Vue app that allows the management of product reviews for a store.  

- Feel free to use any libraries to help rapid development.
- The app should be responsive, to allow for usage across desktop & mobile.
- Users should be able to;
    - Add reviews.
    - View reviews.
    - Update reviews.
    - Delete reviews.

## API
We'd like you to setup a mock RESTful API, providing JSON payloads. We suggest using [mockapi.io](https://mockapi.io/).

### Endpoints
You should create the following endpoints to use in the web application.
```
GET    /reviews
GET    /reviews/:id
POST   /reviews
PUT    /reviews/:id
DELETE /reviews/:id
```

### Data model
The review data model should contain at least:
```js
{
  shopName: String,
  productName: String,
  reviewer: {
    name: String,
    email: String
  },
  review: {
    rating: Number,
    reviewBody: String,
    reviewImages: [String],
    verifiedPurchase: Boolean
  }
}
```

## Bonus points
On top of the basic requirements, you could also consider;
- Documentation to aid future developers.
- Pagination, sorting, searching & filtering.
- Authentication.
- Testing (perhaps running in CI).
- Application performance.
- Further optimisations.

## Review
when you have completed the task and shared it with us, we will review the PR and provide comments, questions and challenges that we invite you to respond to. We do this in place of another video call, as it's closer to real world working, but still allows an opportunity for you to discuss and explain your choices.  
Some things to expect to be discussed include;
- Technology choices.
- Code quality.
- UI/UX choices.
- Project setup and build steps etc.
