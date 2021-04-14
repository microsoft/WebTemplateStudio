This project was created using [Microsoft Web Template Studio](https://github.com/Microsoft/WebTemplateStudio).

## Getting Started
To start the application:
  1. Open the project on **vscode** and open the terminal. You may need to have **admin rights**.
  1. From the project root folder run the following command to restore all the dependencies:
        `yarn`
  1. Start development app using one of the following commands depending on the platform you want to run:

        **Windows**: `yarn windows`

        **Android**: `yarn android`

        **iOS**: `yarn ios`

### Run the sample on Windows 10

#### Requirements for React Native Windows ####
Make sure your computer satisfies all the system requirements listed in the [official documentation](https://microsoft.github.io/react-native-windows/docs/rnw-dependencies).

**Option 1**

1. You need to open a terminal or vscode with **administrator rights**.
2. Run the following commands:
    `yarn windows`
3. The tool will deploy the application on your machine, run it and launch the packager.

**Option 2**
1. Open the `windows` folder in File Explorer.
2. Double click on the `.sln` file to open the solution with Visual Studio 2019.
3. Double check in Configuration Manager that you're compiling the project with a suitable architecture for your computer (x86 or x64).
4. Right click on the project root project in Solution Explorer and choose **Deploy**.
5. Once the deploy is completed, open a terminal on the project root folder.
6. Run the following command:

    `yarn start`
7. Launch from the Start menu the app.


### Run the sample on iOS
[Go to React Native Documentation](https://reactnative.dev/docs/environment-setup)
Once you have the repo and the environment setup, you will just need to run:
```bash
    yarn react-native link
    yarn ios
```

*Note*: If navigation icons doesn´t display correctly you may need to go to ```ios``` folder and run ```pod install```

### Run the sample on Android
[Go to React Native Documentation](https://reactnative.dev/docs/environment-setup)
As a summary it should just work if after configuring your PC you just run:
```bash
    yarn react-native link
    yarn android
```


## File Structure
```
.
├── __tests__/ - Test files
├── .vscode/ - Visual Studio Code configuration files
├── android/ - Native Android code
├── ios/ - Native iOS code
├── src/ - application code
  └─ App.tsx - main root module
├── windows/ - Native iOS code
└── README.md
```

## Additional Documentation
- React Native https://reactnative.dev/

- React Native Windows https://microsoft.github.io/react-native-windows/


## Feedback welcome
Do not hesitate to create any issues on our [repo](https://github.com/microsoft/WebTemplateStudio/issues).
