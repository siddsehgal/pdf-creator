const PDFDocument = require("pdfkit");
const fs = require("fs");
var sizeOf = require("image-size");

// INIT NEW DOC
const doc = new PDFDocument();

doc.pipe(fs.createWriteStream("New Stand List Grass.pdf"));

const data = [
  { name: "1", price: 1000 },
  { name: "2", price: 850 },
  { name: "2B", price: 950 },
  { name: "3", price: 900 },
  { name: "4", price: 900 },
  { name: "5", price: 900 },
  { name: "6A", price: 900 },
  { name: "6B", price: 1200 },
  { name: "6C", price: 500 },
  { name: "6D", price: 1100 },
  { name: "6E", price: 1400 },
  { name: "7", price: 850 },
  { name: "8", price: 800 },
  { name: "11", price: 1300 },
  { name: "13C", price: 1400 },
  { name: "15", price: 1100 },
  { name: "17", price: 1000 },
  { name: "20", price: 1400 },
  { name: "21", price: 950 },
  { name: "22A", price: 400 },
  { name: "22B", price: 500 },
  { name: "22C", price: 600 },
  { name: "23", price: 1200 },
  { name: "24", price: 1200 },
  { name: "25", price: 950 },
  { name: "26", price: 900 },
  { name: "28", price: 1000 },
  { name: "29A", price: 400 },
  { name: "30", price: 150 },
  { name: "31A", price: 250 },
  { name: "31B", price: 450 },
  { name: "32", price: 150 },
  { name: "36", price: 900 },
  { name: "41", price: 0 },
];

const PAGE_WIDTH = 612;

data.forEach((item, index) => {
  const path = `./public/images/${item.name}.jpeg`;
  const { height, width } = sizeOf(path);
  let y = 0;
  const x = 0;
  let color = "white";

  if (height < width) {
    color = "black";
    y = 150;
  }

  doc
    .image(path, x, y, { width: PAGE_WIDTH })
    .fontSize(20)
    .fillColor(color)
    .text(`No. ${item.name}`, 10, 10, { width: 100 })
    .text(`Rs. ${item.price * 2}`, 510, 10, { width: 100 });

  if (index != data.length - 1) doc.addPage();
});

// Finalize PDF name
doc.end();
