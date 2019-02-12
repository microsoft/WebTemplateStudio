
import { EngineAPIService } from "./EngineAPIService";
import { watchFile } from "fs";
import SelectPreference from "../components/SelectPreference";



// You can import and use all API from the 'vscode' module
// as well as import your extension to test it
// import * as vscode from 'vscode';
// import * as myExtension from '../extension';

// Defines a Mocha test suite to group tests of similar kind together
const svc = new EngineAPIService("5000", "http://localhost");



// You can import and use all API from the 'vscode' module
// as well as import your extension to test it
// import * as vscode from 'vscode';
// import * as myExtension from '../extension';

// Defines a Mocha test suite to group tests of similar kind together
it("Extension Tests", () => {
    console.log(svc.getProjectTypes("web", "Javascript"));
    SelectPreference({ title: "Hello world", buttons: ["Click me"] });
});

