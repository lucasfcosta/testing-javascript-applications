# Testing JavaScript Applications

## Chapter 2: What to test and when

### Listing 2.1 Cart.js

Is it good to include a check for item to be valid (say not undefined)? While I understand that, this is the first line of code in this book, just thought of emphasizing validation of incoming arguments. This paves the way to positive and negative cases! We can consider enhancing the tests in listing 2.2 and 2.3.

```JavaScript
addToCart(item) {
  if(item) {
    this.items.push(item);
  }
}
```

### Listing 2.2 Cart.test.js

Some instructions to readers on how to run this file might help! The text in page 11 states:

> When you execute this file, it will tell you whether your code can successfully add cheesecake to the cart — instant and precise feedback.

Something like:

`node .\Cart.test.js`

The code looks good! This might need changes if the suggestion for listing 2.1 gets implemented.

### Listing 2. 3. Cart.test.js

Same comment as above.

`node .\Cart.test.js`

### Listing 2. 4. Cart.js

Destructuring `items` from `this`, and replacing `this.items` with `items` will make the code look clean! This comment holds good wherever possible. This removes the redundancy and improves code quality. Just a helpful suggestion.

### Listing 2. 5. Cart.test.js

No comments.

### Listing 2. 6. Cart.test.js

No comments.

### Listing 2. 7. Cart.test.js

No comments.

> I have a question, are readers expected to follow the book along and make changes to the code in the GitHub repository? If so, it would be nice name the folders to match the listing, or some kind of mapping between listing name and folders inside specific chapter. Just a helpful suggestion.

### Listing 2. 8. package.json

No comments.

### Page 20

There is an instruction to execute `npm install knex sqlite3`, suggest to include `--save`: `npm install --save knex sqlite3`. Please run `npm audit fix` to update the versions of certain packages with vulnerabilities. (Or we can have this included as readers will read and execute it!)

### Listing 2. 9. knexfile.js

No comments.

Do we need a comment for readers running on Windows to use `\` instead of `/` in case of `./node_modules/.bin/knex migrate:make --env development create_carts`?

### Listing 2. 10. DATESTRING_create_carts.js

No comments!
In my case the DATESTRING was 20201010171235! Auto generated code no comments. Running this generates the method definition for `up` and `down`. Filled in the code as instructed.

### Listing 2. 11. dbConnection.js

No comments.

### Listing 2. 12. cart.js

No comments.

### Listing 2. 13. cart.test.js

No comments. Works as expected.

### Listing 2. 14. cart.test.js

No comments. Demonstrates the `done` callback. Works as expected.

### Listing 2. 15. cart.test.js

No comments.

### Listing 2. 16. cart.test.js

No comments.

### Listing 2. 17. cart.test.js

No comments.

> **IMPORTANT** The code for listing 2. 14 is present in the folder - `2_knex_tests_done_cb` under `3_integration_tests`. The only change between this and the previous one is about use of done callback. Request the author to consider using a new test file and unify `1_knex_tests_promise` and `2_knex_tests_done_cb` into `knex_tests`. Similarly code in `3_knex_tests_hooks` can be moved to a new test file. Rest of the code and plumbing is common across all 3 sub folders under `3_integration_tests`. This will save time for readers and makes it easier. A similar pattern was observed in `2_unit_tests`, sub folders `3_jest_multiple_tests`, `4_jest_assertions` and `5_npm_scripts`.
> The code changes for `knex_tests` can be found in this [commit](https://github.com/lucasfcosta/testing-javascript-applications/commit/6e3cd5aec462c01401b9e81b235d71a112ae3b97). I have raised a pull-request. Similar approach can be taken for other instances in the entire repository. **Note:** If accepted, this requires modifications to the text content in this section of the chapter.

### Listing 2. 18. server.js

No comments.

### Listing 2. 19. server.test.js, 2. 20. server.test.js and 2. 22. server.test.js

Are in the same file! chapter2\4_end_to_end_tests\1_http_api_tests\server.test.js

When running the tests, I got an error. While the code looks OK and logical, the test fails for http status code. Same error with code in folder `2_http_api_with_remove_item`.

```
> 1_http_api_tests@1.0.0 test C:\Users\Srihari\GitHub\testing-javascript-applications\chapter2\4_end_to_end_tests\1_http_api_tests
> jest

 FAIL  ./server.test.js
  × adding items to a cart (45ms)

  ● adding items to a cart

    expect(received).toEqual(expected) // deep equality

    Expected: 404
    Received: 200

      16 | test("adding items to a cart", async () => {
      17 |   const initialItemsResponse = await getItems("lucas");
    > 18 |   expect(initialItemsResponse.status).toEqual(404);
         |                                       ^
      19 |
      20 |   const addItemResponse = await addItem("lucas", "cheesecake");
      21 |   expect(await addItemResponse.json()).toEqual(["cheesecake"]);

      at Object.<anonymous> (server.test.js:18:39)

Test Suites: 1 failed, 1 total
Tests:       1 failed, 1 total
Snapshots:   0 total
Time:        3.891s
Ran all test suites.
npm ERR! Test failed.  See above for more details.
```

### Listing 2. 21. package.json

OK.

### Listing 2. 22. server.test.js

No comments.

### Choice of Cypress

This [link](https://www.netguru.com/codestories/which-javascript-ui-testing-framework-to-use-in-2020) supports the author's view for the choice of UI E2E testing frameworks.

### Listing 2. 23. badly_written.test.js

No comments. Glad the author took the effort to show how a bad test looks like.

### Listing 2. 24. well_written.test.js

No comments.

### Listing 2. 25. pow.js

No comments.

### Listing 2. 26. pow.test.js

Good example of data set that covers all cases.

### Listing 2. 27. pow.js

No comments.

### Listing 2. 28. pow.js

> **IMPORTANT** I feel there is something wrong here. I see `addItemToCart` but export says `pow`! Args are `(a, b)` but function code needs `cartId` and `itemName`! Filename says `pow.js`.

```
const addItemToCart = async (a, b) => {
  try {
    return await db("carts_items").insert({ cartId, itemName });
  } catch(error) {
    loggingService(error);
    throw error;
  }
}

module.exports = pow;
```

Please correct listing 2.28!
