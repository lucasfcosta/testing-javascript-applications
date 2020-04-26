# Chapter 5 Server

To better support the client-side application we'll build on Chapter 5, I've had to do a few updates to the server from Chapter 4.

In case you want to update the back-end from Chapter 4 yourself, here's the list of changes I've done:

- For the server to accept the requests coming from the client, you'll need to use [`@koa/cors`](https://github.com/koajs/cors)
- To enable running tests while the server is running, I bind it to different ports depending on whether I am in a test or development environment.
- At `POST /inventory/:itemName` I have added a route which adds an item to the inventory. It takes a `body` containing the `quantity` to add.
- At `GET /inventory` I have added a route which lists all items in the inventory.
