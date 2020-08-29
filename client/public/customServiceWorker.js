if ("serviceWorker" in navigator) {
  console.log(
    "SERVICE WORKER -> REGISTER -> Try to register the service worker"
  );
  navigator.serviceWorker
    .register("./sw.js")
    .then(function (reg) {
      console.log("SERVICE WORKER -> REGISTER -> Successfully registered!");
    })
    .catch(function (err) {
      console.log(
        "'SERVICE WORKER -> REGISTER -> Registration failed! This happened: ",
        err
      );
    });
}

(function () {
  let deferredInstall;
  let promptTriggered = false;
  // The resolve function that will be called when we know we can prompt.
  let canPromptPromiseResolved;
  const canPromptPromise = new Promise(function (resolve, reject) {
    // The resolve will be called later when we know the prompt has been shown.
    // We might want to reject after a timeout of a couple of seconds.
    canPromptPromiseResolved = resolve;
  });

  window.addEventListener("beforeinstallprompt", function (e) {
    promptTriggered = true;

    // Stop it doing what it needs to do;
    e.preventDefault();
    deferredInstall = e;

    // Resolve the promise, to say that we know we can prompt.
    canPromptPromiseResolved();

    return false;
  });

  const install = {};

  Object.defineProperty(install, "isAvailable", {
    get: function () {
      return promptTriggered;
    },
  });

  install.canPrompt = function () {
    return canPromptPromise;
  };

  install.prompt = function () {
    return new Promise(function (resolve, reject) {
      if (promptTriggered === false) {
        // There can be a whole host or reasons, we should determine them
        reject("User Agent decided not to prompt");
      }

      deferredInstall
        .prompt()
        .then(function () {
          return deferredInstall.userChoice;
        })
        .then(function (choice) {
          resolve(choice.outcome);
        })
        .catch(function (reason) {
          reject(reason);
        });
    });
  };

  window.install = install;
})();
