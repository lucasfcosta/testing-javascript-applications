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
