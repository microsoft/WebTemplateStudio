//{[{
const { v4: uuidv4 } = require('uuid');

const shortLoremIpsum = `Lorem id sint aliqua tempor tempor sit. Ad dolor dolor ut nulla mollit dolore non eiusmod Lorem tempor nisi cillum.`;
//}]}
const sampleData = {};

// This class holds sample data used by some generated pages to show how they can be used.
// TODO Web Template Studio: Delete this file once your app is using real data.
//{[{
sampleData.listTextAssets = [
  {
    text: shortLoremIpsum,
    id: uuidv4()
  },
  {
    text: shortLoremIpsum,
    id: uuidv4()
  }
];
//}]}

module.exports = sampleData;
