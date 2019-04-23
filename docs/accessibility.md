# Accessibility

The generated code was tested against [Accessibility Insights](https://accessibilityinsights.io/) and [Lighthouse](https://developers.google.com/web/tools/lighthouse/) to ensure web accessibility standards were met. The full assessment through Accessibility Insights was used to measure compliance against the [Web Content Accessibility Guidelines](https://www.w3.org/WAI/WCAG21/quickref/?currentsidebar=%23col_overview&versions=2.0&levels=aaa) (WCAG) 2.0 Level AA Success Criteria. Please ensure all pull requests meet the [WCAG](https://www.w3.org/WAI/WCAG21/quickref/?currentsidebar=%23col_overview&versions=2.0&levels=aaa) success criteria with the exception of [WCAG 2.4.5](https://www.w3.org/WAI/WCAG21/Understanding/multiple-ways.html).

## Results
The following test results hold as of April 23, 2019.


| React          | Lighthouse  | Accessibility Insights Fast Pass  | Accessibility Insights Assessment  |
|----------------|-------------|-----------------------------------|------------------------------------|
| Grid           | 100%        |  Pass                             |  Pass with exception WCAG 2.4.5    |
| List           | 100%        |  Pass                             |  Pass with exception WCAG 2.4.5    |
| Master Detail  | 100%        |  Pass                             |  Pass with exception WCAG 2.4.5    |
| Blank          | 100%        |  Pass                             |  Pass with exception WCAG 2.4.5    |

<br/>

| Angular        | Lighthouse  | Accessibility Insights Fast Pass  | Accessibility Insights Assessment  |
|----------------|-------------|-----------------------------------|------------------------------------|
| Grid           | 100%        |  Pass                             |  Pass with exception WCAG 2.4.5    |
| List           | 100%        |  Pass                             |  Pass with exception WCAG 2.4.5    |
| Master Detail  | 100%        |  Pass                             |  Pass with exception WCAG 2.4.5    |
| Blank          | 100%        |  Pass                             |  Pass with exception WCAG 2.4.5    |

## Exceptions:

[WCAG 2.4.5 Multiple Ways (Level AA)](https://www.w3.org/WAI/WCAG21/Understanding/multiple-ways.html): 
More than one way is available to locate a web page within a set of web pages except where the Web Page is the result of, or a step in, a process.


In order to make the generated code as easy to build off of as possible the only form of navigation included in the generated code is the navbar. Developers who build off of the generated code are encouraged to add a second form of navigation (preferably site search) to ensure that the web app is fully compliant with WCAG 2.0 Level AA Success Criteria.