# This Is Not Reddit (Title in Progress): Let's post some messages!

This application allows users to be able to see posts already on the website and
comments associated with the post. Once a user is signed in, they can create
their own posts and comments. When looking at a specific post, if the user is
the owner, they can edit or delete it. Users can currently only delete their
comments.

I chose this project as I am constantly on Reddit and sometimes with it had a
different layout or a Language feature on the button (this is something I'd
like to work on a future iteration).

## Setup Steps

1. [Fork and clone](https://github.com/elody-ramirez/capstone-frontend) this repository.
2. Run `npm install` to install all dependencies
3. Run the following installs for Font Awesome Icons in React
```
Using NPM:
$ npm i @fortawesome/fontawesome-svg-core
$ npm i @fortawesome/free-solid-svg-icons
$ npm i @fortawesome/react-fontawesome
$ npm i @fortawesome/free-brands-svg-icons
$ npm i @fortawesome/free-regular-svg-icons
```
4. Use `npm start` to spin up the server.

## Important Links

- [Other Repo](https://github.com/elody-ramirez/capstone-backend)
- [Deployed API](https://pacific-tundra-49128.herokuapp.com/)
- [Deployed Client](https://elody-ramirez.github.io/capstone-frontend/#/)

## Planning Story
Looking at the website through React Eyes, I started with the first component
which was Posts. On mount Posts would do a get request to display all the posts
and if a user clicks on the post they would be taken to a Post component, which
does a get request for that specific post.

NOW THE FUN BEGINS

If the User created the post they could edit and delete the post which was
relatively simple to incorporate. Each Post has an array of comments, which
comments can be created and deleted. The post Component returns the comments
component which returns a CreateForm component and the comment component which
if the user is the owner returns a delete button
```

                  --> CreateComment ---> CommentForm
Post  -> Comments
                  --> Comment


```
So the only get request that happens is on Post. So when a comment is deleted or
created I needed to pass that information up to post so that it can rerender.
What I found to be easiest to understand was passing down a prop function that
updated the state of Post and run a simple lifecycle method ComponentDidUpdate
in order to do another get request and rerender.

After that hurdle it came down to making sure there were no bugs like there was
in alert which was solved by setting it's z-index to a large number.

### User Stories

Version 1
- As a unregistered user, I would like to sign up with email and password.
- As a registered user, I would like to sign in with email and password.
- As a signed in user, I would like to change password.
- As a signed in user, I would like to sign out.
- As a unregistered user, I would like to see all users posts.
- As a unregistered user, I would like to see comments on those posts.
- As a signed in user, I would to create posts.
- As a signed in user, I would to comment on other users' posts.
- As a signed in user, I would to delete my posts and comments.
- As a signed in user, I would to update my posts.

Version 2
- As a signed in user, I would like to like or unlike posts and their comments.
- As a signed in user, I would to update my comments.
- As a unregistered user, I would like to see likes and unlikes on posts and their comments.

Version 3
- As a signed in user, I would like to add an icon for my user profile.
- As a signed in user, I would to update an icon for my user profile.

### Technologies Used

- React
- jQuery
- HTML/CSS
- Bootstrap
- Javascript

### Unsolved Problems

- Still need to make it visually appealing
- Would like to eventually incorporate AWS so users can have user icons
- AWS would also help so users can post images
- I want users to be able to edit their comments.

## Images

#### App Screenshot:
![screenshot](https://i.imgur.com/EOOBZbF.png)

---

#### ERD & Wireframes:
![ERD & Wireframes](https://i.imgur.com/2EhPojI.jpg.png)
