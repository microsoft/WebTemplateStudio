var sampleData = {};

const longLoremIpsum = `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
tempor incididunt ut labore et dolore magna aliqua. Rhoncus dolor purus
non enim praesent elementum facilisis leo vel. Risus at ultrices mi
tempus imperdiet. Semper risus in hendrerit gravida rutrum quisque non
tellus. Convallis convallis tellus id interdum velit laoreet id donec
ultrices. Odio morbi quis commodo odio aenean sed adipiscing. Amet nisl
suscipit adipiscing bibendum est ultricies integer quis. Cursus euismod
quis viverra nibh cras. Metus vulputate eu scelerisque felis imperdiet
proin fermentum leo. Mauris commodo quis imperdiet massa tincidunt. Cras
tincidunt lobortis feugiat vivamus at augue. At augue eget arcu dictum
varius duis at consectetur lorem. Velit sed ullamcorper morbi tincidunt.
Lorem donec massa sapien faucibus et molestie ac.`;

const shortLoremIpsum = `Lorem id sint aliqua tempor tempor sit. Ad dolor dolor ut nulla mollit dolore non eiusmod Lorem tempor nisi cillum minim.
                         Dolore fugiat consectetur laborum laboris labore sit veniam deserunt id dolor laboris ad veniam.`;

// This class holds sample data used by some generated pages to show how they can be used.
// TODO WTS: Delete this file once your app is using real data.
sampleData.listTextAssets = [
  {
    text: shortLoremIpsum,
    _id: 1
  },
  {
    text: shortLoremIpsum,
    _id: 2
  }
];

sampleData.gridTextAssets = [
  {
    description: shortLoremIpsum,
    header: "Heading",
    id: 1
  },
  {
    description: shortLoremIpsum,
    header: "Heading",
    id: 2
  },
  {
    description: shortLoremIpsum,
    header: "Heading",
    id: 3
  },
  {
    description: shortLoremIpsum,
    header: "Heading",
    id: 4
  },
  {
    description: shortLoremIpsum,
    header: "Heading",
    id: 5
  },
  {
    description: shortLoremIpsum,
    header: "Heading",
    id: 6
  },
  {
    description: shortLoremIpsum,
    header: "Heading",
    id: 7
  },
  {
    description: shortLoremIpsum,
    header: "Heading",
    id: 8
  },
  {
    description: shortLoremIpsum,
    header: "Heading",
    id: 9
  }
];

sampleData.masterDetailTextAssets = [
  {
    paragraph: longLoremIpsum,
    title: "Company A",
    tabName: "Company A",
    id: 0
  },
  {
    paragraph: longLoremIpsum,
    title: "Company B",
    tabName: "Company B",
    id: 1
  },
  {
    paragraph: longLoremIpsum,
    title: "Company C",
    tabName: "Company C",
    id: 2
  },
  {
    paragraph: longLoremIpsum,
    title: "Company D",
    tabName: "Company D",
    id: 3
  },
  {
    paragraph: longLoremIpsum,
    title: "Company E",
    tabName: "Company E",
    id: 4
  },
  {
    paragraph: longLoremIpsum,
    title: "Company F",
    tabName: "Company F",
    id: 5
  },
  {
    paragraph: longLoremIpsum,
    title: "Company G",
    tabName: "Company G",
    id: 6
  },
  {
    paragraph: longLoremIpsum,
    title: "Company H",
    tabName: "Company H",
    id: 7
  }
];

module.exports = sampleData;
