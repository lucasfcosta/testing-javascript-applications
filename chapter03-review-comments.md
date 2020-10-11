# Testing JavaScript Applications

> **Note:** The below tests were executed and verified.

## Chapter 3: Testing techniques

### Listing 3. 1. cartController.test.js

No comments. Gives the skeleton structure for the tests. Looks good.

### Listing 3. 2. cartController.test.js

No comments. Utility functions inside the describe block. (Helps to indicate which tests need them! - Good approach!)

### Listing 3. 3. cartController.test.js

No comments. `beforeAll`, `beforeEach` and other hooks are relative to `describe` block.

### Listing 3. 4. cartController.test.js

No comments. 2 `describe` blocks demonstrating `beforeEach` and `beforeAll`.

### Listing 3. 5. cartController.test.js

No comments. Demonstrating `beforeEach` and `afterAll`, outside all describe blocks.

### Listing 3. 6. server.js

No major comments. Should we consider adding validation for `username` and `item`?

### Listing 3. 7. server.test.js

No comments. Looks good. Shall we consider adding an object for item names and move `"cheesecake"` as a `const` and use it all across. Just a suggestion, feel free to ignore.

E.g.

```JavaScript
const itemNames = {
    cheeseCake: 'cheeseCake',
    bread: 'bread'
};
```

### Listing 3. 8. server.test.js

No comments. Looks good.

> Good point on test parallelism: It’s better to make your tests slow and reliable than fast and flaky!

### Snippets on page 19, 20 and 21

- addItemToCart.test.js √

Code looks good. They don't have the usual format of `Listing #. #.` numbers.

- jest.config.js √
- globalSetup.js √
- globalTeardown.js √

### Listing 3. 9. server.test.js

No comments. Looks good. (Test atomicity is well explained).

### Listing 3. 10. server.test.js

No comments. Looks good.

### Listing 3. 11. server.test.js

No comments. Looks good. Ensures that the last test passes and its pre-requisites are set inside the test.
