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

> Listing number is missing for the code snippets in the sections 3.2.1, 3.2.2, 3.2.3, and 3.2.4 (OK if it was on intentionally left out, better to add for the sake of uniformity)!

### inventoryController.js (page 25 and 26)

No comments.

### inventoryController.test.js (page 26)

No comments.

### inventoryController.js (page 26 and 27)

No comments.

### File name needs to be changed to inventoryController.test.js it is stated as inventoryController.js

No comments. The filename needs to be corrected. It is test code.

### inventoryController.test.js (page 27 and 28)

No comments.

### inventoryController.test.js (page 28 and 29)

No comments.

### inventoryController.test.js (page 29)

No comments.

> Good one! The more values an assertion accepts, the looser it is.

### inventoryController.test.js (page 30 and 31)

No comments.

### inventoryController.test.js (page 31 and 32)

No comments.

Thanks to the author for marking these as important points! Shall we consider a tips and tricks section at the end of the book? These will gives useful tips to readers and easy points for those who want to recollect! Kind of a quick check-list or cheat-sheet!

> Good one! Writing tighter assertions makes it harder for your tests to pass when the application code has problems, making it easier to catch bugs.
> **Deterministic Code:** A code is said to be deterministic when, given the same input, it always produces the same output.
> Avoid writing negated assertions whenever possible.

### inventoryController.js (page 34 and 35)

No comments.

### inventoryController.test.js (page 35 and 36)

No comments.

### inventoryController.test.js (page 36 and 37)

No comments for the code in the book. However, the code in the git-hub repo needed a fix.

#### chapter3\2_writing_good_assertions\4_manual_assertions\inventoryController.js

Changed line 17 to `return { ...contents, generatedAt: new Date(new Date()) };` instead of `return { ...contents, generatedAt: new Date(new Date().setYear(3000)) };`.

#### chapter3\2_writing_good_assertions\4_manual_assertions\inventoryController.test.js

Changed line 7 to `expect(isPastTimestamp).toBe(true);` instead of `expect(isPastTimestamp).toBeBefore(true);`.

While the above change gets the test to pass. I saw the subsequent code samples in page 37/38 instructing readers to set the year to 3000 and see what happens. Shall we consider committing working code to the git repo and let users make this change and test it out as per the instructions in the text? In either case, the line `expect(isPastTimestamp).toBeBefore(true);` needs a correction to `expect(result.generatedAt).toBeBefore(currentTime);` or `expect(isPastTimestamp).toBe(true);`. I prefer the latter, please correct me if I am wrong! :)

### inventoryController.js (page 37 and 38)

No comments.

### jest.config.js (page 39)

No comments.

### inventoryController.test.js (page 39)

Shall we consider correcting the code to match the git-repo. Here we expect the error (as in page 40) to be informative after using `jest-extended`. Code as in `chapter3\2_writing_good_assertions\5_custom_matchers\inventoryController.js`

```JavaScript
const getInventory = () => {
  const contentArray = Array.from(inventory.entries());
  const contents = contentArray.reduce((contents, [name, quantity]) => {
    return { ...contents, [name]: quantity };
  }, {});

  return { ...contents, generatedAt: new Date(new Date().setYear(3000)) };
};
```

### server.js (page 40)

No comments.

### server.test.js (page 41)

No comments.

### server.test.js (page 41 and 42)

No comments.

### server.test.js (page 42 and 43)

No comments. Shall we consider including the code snippet as a test for non-circular assertion in the git repo ?

### Listing 3. 12. logger.js

No comments.

### Listing 3. 13. inventoryController.js

No comments.

### Listing 3. 14. inventoryController.js

No comments.

### Listing 3. 15. inventoryController.js

No comments.

### Listing 3. 16. inventoryController.test.js

No comments.

### Listing 3. 17. inventoryController.js

No comments.

### Listing 3. 18. inventoryController.test.js

No comments.

### Listing 3. 19. inventoryController.test.js

No comments.

### Listing 3. 20. inventoryController.test.js

No comments.

### Listing 3. 21. inventoryController.js

No comments.

### Listing 3. 22. inventoryController.test.js

No comments.

### Listing 3. 23. inventoryController.test.js

No comments.

### Listing 3. 24. inventoryController.test.js

No comments.

### Listing 3. 25. inventoryController.js

No comments.

### Listing 3. 26. inventoryController.js

No comments.

### Listing 3. 27. inventoryController.test.js

No comments.

### Listing 3. 28. inventoryController.test.js

No comments.

### Listing 3. 29. inventoryController.test.js

No comments.

### mocks/logger.js (doesn't have listing number) (page 66)

No comments.

### inventoryController.test.js (doesn't have listing number) (page 66)

No comments.

### Listing 3. 30. cart.js

No comments.

### Listing 3. 32. cart.js

No comments.

### Figure 3. 13

The color in the legend for 'Module covered by test' doesn't match the diagram.

### Listing 3. 33. cart.js

No comments.

### Listing 3. 34. Cart.test.js

No comments.

### Listing 3. 36. inventoryController.test..js

No comments.

> The `package.json` file under `chapter3\4_code_coverage` required some changes. Please find new file below. Updated `name` and added `coverage` under scripts. Also I could not find the `math.js` and `math.test.js`.

```JSON
{
  "name": "4_code_coverage",
  "version": "1.0.0",
  "description": "",
  "main": "inventoryController.js",
  "scripts": {
    "test": "jest",
    "coverage": "jest --coverage"
  },
  "keywords": [],
  "author": "",
  "license": "ISC",
  "devDependencies": {
    "jest": "^25.1.0"
  },
  "dependencies": {
    "pino": "^5.16.0"
  }
}
```

### Listing 3. 37. math.js

Updated code and checked in.

### Listing 3. 38. math.test.js

Updated code and checked in.
