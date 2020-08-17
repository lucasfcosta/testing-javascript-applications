const clearHistoryHook = done => {
  const clearHistory = () => {
    if (history.state === null) {
      window.removeEventListener("popstate", clearHistory);
      return done();
    }

    history.back();
  };

  window.addEventListener("popstate", clearHistory);

  clearHistory();
};

const detachPopstateHandlers = () => {
  const popstateListeners = window.addEventListener.mock.calls.filter(
    ([eventName]) => {
      return eventName === "popstate";
    }
  );

  popstateListeners.forEach(([eventName, handlerFn]) => {
    window.removeEventListener(eventName, handlerFn);
  });

  jest.restoreAllMocks();
};

module.exports = { clearHistoryHook, detachPopstateHandlers };
