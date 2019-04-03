# Release Notes

<!-- Commenting out temporarily for readability
All notable changes to the extension and client will be documented in this file.

Check [Read Me](https://github.com/Microsoft/WebTemplateStudio/blob/master/README.md/) for overview of Project

Check [Issues Page](https://github.com/Microsoft/WebTemplateStudio/issues/) for existing Github issues of Project 
-->

## Release __VERSIONNUMBER__
<!-- 
NOTE TO DEVS: Every PR Move Unimplemented Features and Known Issues to the "Completed" heading below 
-->
#### New Implemented Features and Fixes


#### Unimplemented Features and Known Issues

- WCAG 2.4.1: Page must have means to bypass repeated blocks (html) [#120][1]
- WCAG 1.1.1: Images must have alternate text (.styles_icon__lZfWw) [#121][2]
- WCAG 1.3.1,WCAG 3.3.2: Form elements must have labels (#react-select-5-input) [#122][3]
- WCAG 4.1.1: id attribute value must be unique (svg) [#123][4]
- WCAG 1.3.1,WCAG 4.1.1,WCAG 4.1.2: ARIA roles used must conform to valid values (.styles_details__3DvFP[role="Button"]) [#124][5]
- Feature: Setup Theme in Wizard to Match VSCode [#129][6]
- Details Page Shifts with Description [#178][7]
- add in contribute.md [#184][8]
- Readme.MD needs to be more customer-centric [#188][9]
- Error message in Page Name Validation extends out of the display box [#205][10]
- Cannot create a folder that starts with a number [#221][11]
- hover on blue is hard to read. 0.0.19087-40 [#225][12]
- ux: boxes for services need to be uniform 0.0.19087-40 [#226][13]
- wizard itself should have a little intro like WinTS 0.0.19087-40 [#227][14]
- wizard needs to have "you accept licenses" - 0.0.19087-40 [#228][15]
- wizard needs to show all licenses you will be accepting when generating [#229][16]
- able to multi-generate - 0.0.19087-40 [#232][17]
- multiple page naming convention [#235][18]
- failure to yarn start when multiple pages are there - 0.0.19087-40 [#236][19]
- errors don't go away when valid folder / name are put there - 0.0.19087-40 [#237][20]
- long list without cosmos doesn't do anything - 0.0.19087-40 [#238][21]
- Post-generation Modal [#240][22]
- wizard node.js should match version we support [#241][23]
- Projects Detail (Shopping Cart) Breaks When Multiple Pages are Added and Deleted [#246][24]
- Cosmos name validation not quick enough/loses track [#248][25]
- Generate is clickable but disabled [#249][26]
- Wizard does not send Mongo/SQL data to the engine [#251][27]
- Wizard does not send Azure Functions details to the Engine [#252][28]
- prereq not needed? - 0.0.19092 [#256][29]
- in welcome screen, able to do invalid name - 0.0.19092 [#257][30]
- Azure resource page needs multiple fixes- 0.0.19092 [#259][31]
- Able to generate page without yarn or node.js installed - 0.0.19092 [#260][32]
- don't change UX metaphors for moving to next screen - 0.0.19092 [#261][33]
- Server still doesn't dispose properly - 0.0.19092 [#262][34]
- Next Button should be greyed out on summary page - 0.0.19092 [#264][35]
- Swap Acorn to Microsoft Web Template Studio [#265][36]
- First Page loaded the one i put on top - 0.0.19092 [#266][37]
- On Step 5 Review and Geenerate Template, Generate Button hover behavior is non-standard [#269][38]
- Review and Generate Template is miss-named [#270][39]
<!-- 
- title [#num][40]
- title [#num][41]
- title [#num][42]
- title [#num][43]
- title [#num][44]
- title [#num][45]
- title [#num][46]
- title [#num][47]
- title [#num][48]
- title [#num][49] -->

[1]: <https://github.com/Microsoft/WebTemplateStudio/issues/120> "Bug"
[2]: <https://github.com/Microsoft/WebTemplateStudio/issues/121> "Bug"
[3]: <https://github.com/Microsoft/WebTemplateStudio/issues/122> "Bug"
[4]: <https://github.com/Microsoft/WebTemplateStudio/issues/123> "Bug"
[5]: <https://github.com/Microsoft/WebTemplateStudio/issues/124> "Bug"
[6]: <https://github.com/Microsoft/WebTemplateStudio/issues/129> "Feature"
[7]: <https://github.com/Microsoft/WebTemplateStudio/issues/178> "Bug"
[8]: <https://github.com/Microsoft/WebTemplateStudio/issues/184> "Feature"
[9]: <https://github.com/Microsoft/WebTemplateStudio/issues/188> "Feature"
[10]: <https://github.com/Microsoft/WebTemplateStudio/issues/205> "Bug"
[11]: <https://github.com/Microsoft/WebTemplateStudio/issues/221> "Bug"
[12]: <https://github.com/Microsoft/WebTemplateStudio/issues/225> "Polish"
[13]: <https://github.com/Microsoft/WebTemplateStudio/issues/226> "Polish"
[14]: <https://github.com/Microsoft/WebTemplateStudio/issues/227> "Feature"
[15]: <https://github.com/Microsoft/WebTemplateStudio/issues/228> "Feature"
[16]: <https://github.com/Microsoft/WebTemplateStudio/issues/229> "Feature"
[17]: <https://github.com/Microsoft/WebTemplateStudio/issues/232> "Bug"
[18]: <https://github.com/Microsoft/WebTemplateStudio/issues/235> "Bug"
[19]: <https://github.com/Microsoft/WebTemplateStudio/issues/236> "Bug"
[20]: <https://github.com/Microsoft/WebTemplateStudio/issues/237> "Bug"
[21]: <https://github.com/Microsoft/WebTemplateStudio/issues/238> "Bug"
[22]: <https://github.com/Microsoft/WebTemplateStudio/issues/240> "Bug"
[23]: <https://github.com/Microsoft/WebTemplateStudio/issues/241> "Polish"
[24]: <https://github.com/Microsoft/WebTemplateStudio/issues/246> "Bug"
[25]: <https://github.com/Microsoft/WebTemplateStudio/issues/248> "Bug"
[26]: <https://github.com/Microsoft/WebTemplateStudio/issues/249> "Bug"
[27]: <https://github.com/Microsoft/WebTemplateStudio/issues/251> "Bug"
[28]: <https://github.com/Microsoft/WebTemplateStudio/issues/252> "Bug"
[29]: <https://github.com/Microsoft/WebTemplateStudio/issues/256> "Bug"
[30]: <https://github.com/Microsoft/WebTemplateStudio/issues/257> "Bug"
[31]: <https://github.com/Microsoft/WebTemplateStudio/issues/259> "Bug"
[32]: <https://github.com/Microsoft/WebTemplateStudio/issues/260> "Bug"
[33]: <https://github.com/Microsoft/WebTemplateStudio/issues/261> "Bug"
[34]: <https://github.com/Microsoft/WebTemplateStudio/issues/262> "Bug"
[35]: <https://github.com/Microsoft/WebTemplateStudio/issues/264> "Design"
[36]: <https://github.com/Microsoft/WebTemplateStudio/issues/265> "Bug"
[37]: <https://github.com/Microsoft/WebTemplateStudio/issues/266> "Bug"
[38]: <https://github.com/Microsoft/WebTemplateStudio/issues/269> "Bug"
[39]: <https://github.com/Microsoft/WebTemplateStudio/issues/270> "Bug"
[40]: <https://github.com/Microsoft/WebTemplateStudio/issues/#number> "Bug"
[41]: <https://github.com/Microsoft/WebTemplateStudio/issues/#number> "Bug"
[42]: <https://github.com/Microsoft/WebTemplateStudio/issues/#number> "Bug"
[43]: <https://github.com/Microsoft/WebTemplateStudio/issues/#number> "Bug"
[44]: <https://github.com/Microsoft/WebTemplateStudio/issues/#number> "Bug"
[45]: <https://github.com/Microsoft/WebTemplateStudio/issues/#number> "Bug"
[46]: <https://github.com/Microsoft/WebTemplateStudio/issues/#number> "Bug"
[47]: <https://github.com/Microsoft/WebTemplateStudio/issues/#number> "Bug"
[48]: <https://github.com/Microsoft/WebTemplateStudio/issues/#number> "Bug"
[49]: <https://github.com/Microsoft/WebTemplateStudio/issues/#number> "Bug"