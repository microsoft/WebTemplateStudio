// This class holds sample data used by some generated pages to show how they can be used.
// TODO Web Template Studio: Delete this file once your app is using real data.

const shortLoremIpsum =
  'Lorem id sint aliqua tempor tempor sit. Ad dolor dolor ut nulla mollit dolore non eiusmod Lorem tempor nisi cillum.';
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

interface Company {
  shortDescription: string;
  longDescription: string;
  title: string;
  status: string;
  shipTo: string;
  orderTotal: number;
  orderDate: string;
  icon: string;
  id: number;
}

const companies: Company[] = [
  {
    shortDescription: shortLoremIpsum,
    longDescription: longLoremIpsum,
    title: 'Company A',
    status: 'Closed',
    shipTo: 'Francisco Pérez-Olaeta',
    orderTotal: 2490.0,
    orderDate: new Date(2017, 5, 24).toDateString(),
    icon: 'md-person-outline',
    id: 1,
  },
  {
    shortDescription: shortLoremIpsum,
    longDescription: longLoremIpsum,
    title: 'Company B',
    status: 'Closed',
    shipTo: 'Soo Jung Lee',
    orderTotal: 1760.0,
    orderDate: new Date(2017, 5, 24).toDateString(),
    icon: 'md-medal-outline',
    id: 2,
  },
  {
    shortDescription: shortLoremIpsum,
    longDescription: longLoremIpsum,
    title: 'Company C',
    status: 'Shipped',
    shipTo: 'Run Liu',
    orderTotal: 665.0,
    orderDate: new Date(2017, 6, 3).toDateString(),
    icon: 'md-moon-outline',
    id: 3,
  },
  {
    shortDescription: shortLoremIpsum,
    longDescription: longLoremIpsum,
    title: 'Company D',
    status: 'Shipped',
    shipTo: 'Soo Jung Lee',
    orderTotal: 560.0,
    orderDate: new Date(2017, 6, 5).toDateString(),
    icon: 'md-musical-notes-outline',
    id: 4,
  },
  {
    shortDescription: shortLoremIpsum,
    longDescription: longLoremIpsum,
    title: 'Company E',
    status: 'New',
    shipTo: 'John Rodman',
    orderTotal: 810.0,
    orderDate: new Date(2017, 6, 7).toDateString(),
    icon: 'md-paper-plane-outline',
    id: 5,
  },
  {
    shortDescription: shortLoremIpsum,
    longDescription: longLoremIpsum,
    title: 'Company F',
    status: 'New',
    shipTo: 'Elizabeth Andersen',
    orderTotal: 196.5,
    orderDate: new Date(2017, 6, 7).toDateString(),
    icon: 'md-star-outline',
    id: 6,
  },
  {
    shortDescription: shortLoremIpsum,
    longDescription: longLoremIpsum,
    title: 'Company G',
    status: 'Closed',
    shipTo: 'Peter Krschne',
    orderTotal: 270.0,
    orderDate: new Date(2017, 6, 11).toDateString(),
    icon: 'md-camera-outline',
    id: 7,
  },
];

const sampleData = {companies: companies};

export default sampleData;
