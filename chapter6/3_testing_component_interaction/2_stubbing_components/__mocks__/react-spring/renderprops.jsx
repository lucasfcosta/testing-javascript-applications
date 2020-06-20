const FakeReactSpringTransition = jest.fn(({ items, children }) => {
  return items.map(item => {
    return children(item)({ fakeStyles: "fake " });
  });
});

export { FakeReactSpringTransition as Transition };
