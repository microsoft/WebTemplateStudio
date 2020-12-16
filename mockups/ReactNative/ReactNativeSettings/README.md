# WORK IN PROGRESS
This is still work in progress.
We will appreciate any feedback provided. 
- Opinion about the mockups available in [repo](). 
- Desired features for the future. 
- Suggestions about the generated code or the wizard experience.
- Anything else you could think of ;-).

# React Native App (Tabbed)
This sample demonstrates a React Native application with Tab Menu and a Settings Page:

- Runs on mobile devices: iOS, android.
- Runs on desktop: Windows and MacOS.

### Initialize the sample

1. Open Powershell with **admin rights**.
1. Clone the repository on your machine
1. From the project root folder, run the following command to restore all the dependencies:

    ```bash
    yarn install
    ```
### Run the sample on Windows 10

#### Requirements ####
Make sure your computer satisfies all the system requirements listed in the [official documentation](https://microsoft.github.io/react-native-windows/docs/rnw-dependencies).

**Option 1**

1. Open a terminal with **administrator rights** on the project root folder
2. Run the following command:

    ```bash
    npx react-native run-windows
    ```
3. The tool will deploy the application on your machine, run it and launch the packager

**Option 2**
1. Open the `windows` folder in File Explorer.
2. Double click on the `.sln` file to open the solution with Visual Studio 2019.
3. Double check in Configuration Manager that you're compiling the project with a suitable architecture for your computer (x86 or x64).
4. Right click on the project root project in Solution Explorer and choose **Deploy**.
5. Once the deploy is completed, open a terminal on the project root folder.
6. Run the following command:

    ```bash
    yarn start
    ```
7. Launch from the Start menu the app.

### Run the sample on MacOS

#### Requirements ####
Make sure your Mac satisfies all the system requirements listed in the [official documentation](https://microsoft.github.io/react-native-windows/docs/rnm-dependencies).

1. Open a terminal on the project root folder.
2. Move into the `macos` folder:

    ```bash
    cd macos
    ```
3. Type the following command:

   ```bash
    pod install
    ```
4. Once the operation is finished, go back to the project root folder:

    ```bash
    cd ..
    ```

5. Open another tab of terminal by pressing **cmd-T**.
6. In this new tab, run the following command:

   ```bash
    yarn start:macos
    ```
7. Go back to the first tab and run the following command:

   ```bash
    npx react-native run-macos
    ```


### Run the sample on iOS
[Go to React Native Documentation](https://reactnative.dev/docs/environment-setup)
### Run the sample on Android
[Go to React Native Documentation](https://reactnative.dev/docs/environment-setup)


### Useful links
REACT NATIVE WINDOWS APP WITH NAVIGATION: https://reactnavigation.org/docs/getting-started

TAB NAVIGATION (https://reactnavigation.org/docs/tab-based-navigation)

ICONS https://github.com/oblador/react-native-vector-icons


