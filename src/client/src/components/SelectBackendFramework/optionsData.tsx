import NodeJS from '../../assets/NodeJS.svg';
import NET from '../../assets/NET.svg';

import { Option } from '../../types/option';

const options: Array<Option> = [
    {
        svgUrl: process.env.REACT_APP_RELATIVE_PATH + NodeJS,
        title: "Node.JS",
        body: "Node.js is an open-source, cross-platform JavaScript run-time environment that executes JavaScript outside of a browser.",
        selected: false
    },
    {
        svgUrl: process.env.REACT_APP_RELATIVE_PATH + NET,
        title: "ASP.NET",
        body: "ASP.NET creates websites based on HTML5, CSS and JavaScript that are simple, fast and scalable.",
        selected: false
    }
]

export default options;