Web Template Studio is a Visual Studio Code Extension built in Typescript/React.tsx. It leverages the templating engine (Core Template Studio) used by Windows Template Studio. For more info on the terminology, please refer to the terminology document.

Core Template Studio serves both Web and Windows Template Studios in merging the templates selected by the user. For more information on Core Template Studio, refer to its documentation.

Web Template studio has two major components. The extension's backend (referred to as the extension), which is written in Typescript and the front-end wizard (referred to as the client), written in React.tsx.

Here is a diagram that illustrates the high level functionality of each of the components:

![Architecture Diagram](./arch-diagram.png)

Before the extension is ready to run, the build script compiles the wizard's React code into javascript that gets injected into html, which then gets served using VSCode's Webview API. As the extension is launching, it starts up the Engine (which will by default run on PORT 9502) and updates the cache with the updated templates (if any where added). The Engine will keep listening to the extension's requests such as generation, etc.

We will discuss the two components separately later. There are a few important concepts that will help you get started on development quickly:

## **Communication**

    The wizard runs in an isolated environment, and mimics how applications run on a browser. For example, the wizard does not have access to the local storage of the user, or any of the OS's resources/actions. For this reason, most of the logic is done in the extension. The wizard communicates with the extension using the WebView API, with a command defined for each function (look at the extension's constants file and the wizard's constants file to see the currently defined commands).
    For example, if we want to send the email of a user from the extension to the wizard, you can use the vscode object to do so:

```js
vscode.postMessage({
  command: "sendEmailCommand",
  payload: {
    email: "example@email.com"
  }
});
```

        This sends the email using the WebView API and

```js
panel.webview.onDidReceiveMessage(
  message => {
    switch (message.command) {
      case "sendEmailCommand":
        return;
      // other commands
    }
  },
  undefined,
  context.subscriptions
);
```

    receives the email.

    We receive all the commands from the extension in App.tsx and receive all the commands from the wizard in the controller.ts.

## **Separating the UI from the Logic**:

    One of our main concerns is increasing the speed of the wizard and making it as light as possible. Therefore, the wizard does not perform any expensive computations, and does not make any API requests. Most of these actions are done in the extension. So as the user navigates through the wizard, the selections are validated in the wizard and stored. When the user clicks generate, these selections will then be sent to the extension, which will deal with them synchronously. The extension starts with the templates (if any were selected), which will get sent to the Engine (Core Template Studio). After their successful generation, the extension uses Azure SDK to deploy the resources if the user selects any.

We will briefly discuss the architecture of the extension and the wizard:

## **Client**:

As previously mentioned, the client is written in React.js. It keeps track of the state using Redux. If you are not familiar with Redux, we suggest familiarizing yourself with it before you start development on the wizard.

## **Extension**:
