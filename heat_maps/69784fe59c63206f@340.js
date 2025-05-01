function _1(md){return(
md`<div style="color: black; font: 13px/25.5px var(--sans-serif);">

# Heat Maps`
)}

function _2(md){return(
md`<div style="color: black; font: 14px/20px var(--sans-serif);">

## Median complexity sheets
Complexity is measured by the length of the spreadsheet's fingerprint, these are four heat maps of spreadsheets with a median fingerprint length, accompanied by displays of the sheets themselves, images for xlsx files and interactive tabels for csvs.`
)}

function _3(d3,width,mid_7908_hm,color)
{
  var height = 500
  var max = 1
  const svg = d3.create('svg')
    .attr('viewBox', [0, 0, width, height]);

  var data_height = mid_7908_hm.length
  var data_width = mid_7908_hm[0].length
  
  
  for (let i = 0; i < data_width; i++) {
    for (let j = 0; j < data_height; j++) {
      svg
        .append('rect')
        .attr('fill', color(mid_7908_hm[j][i] * max/1.25))
        .attr('x', i * width / data_width)
        .attr('y', j * height / data_height)
        .attr('height', height / data_height)
        .attr('width', width / data_width);
    }
  }
  
  
  return svg.node()
}


function _mid_7908(FileAttachment){return(
FileAttachment("mid_7908@1.png").image()
)}

function _5(d3,width,mid_29_hm,color)
{
  var height = 500
  var max = 1
  const svg = d3.create('svg')
    .attr('viewBox', [0, 0, width, height]);

  var data_height = mid_29_hm.length
  var data_width = mid_29_hm[0].length
  
  
  for (let i = 0; i < data_width; i++) {
    for (let j = 0; j < data_height; j++) {
      svg
        .append('rect')
        .attr('fill', color(mid_29_hm[j][i] * max/1.25))
        .attr('x', i * width / data_width)
        .attr('y', j * height / data_height)
        .attr('height', height / data_height)
        .attr('width', width / data_width);
    }
  }
  
  
  return svg.node()
}


function _6(Inputs,FileAttachment){return(
Inputs.table(FileAttachment("APHA0296-Colonies_Inspected_2006.csv").csv())
)}

function _7(d3,width,mid_5541_hm,color)
{
  var height = 500
  var max = 1
  const svg = d3.create('svg')
    .attr('viewBox', [0, 0, width, height]);

  var data_height = mid_5541_hm.length
  var data_width = mid_5541_hm[0].length
  
  
  for (let i = 0; i < data_width; i++) {
    for (let j = 0; j < data_height; j++) {
      svg
        .append('rect')
        .attr('fill', color(mid_5541_hm[j][i] * max/1.25))
        .attr('x', i * width / data_width)
        .attr('y', j * height / data_height)
        .attr('height', height / data_height)
        .attr('width', width / data_width);
    }
  }
  
  
  return svg.node()
}


function _8(Inputs,FileAttachment){return(
Inputs.table(FileAttachment("DfT_permanent_secretaries-meetings-apr-jun-2022.csv").csv())
)}

function _9(d3,width,mid_28031_hm,color)
{
  var height = 500
  var max = 1
  const svg = d3.create('svg')
    .attr('viewBox', [0, 0, width, height]);

  var data_height = mid_28031_hm.length
  var data_width = mid_28031_hm[0].length
  
  
  for (let i = 0; i < data_width; i++) {
    for (let j = 0; j < data_height; j++) {
      svg
        .append('rect')
        .attr('fill', color(mid_28031_hm[j][i] * max/1.25))
        .attr('x', i * width / data_width)
        .attr('y', j * height / data_height)
        .attr('height', height / data_height)
        .attr('width', width / data_width);
    }
  }
  
  
  return svg.node()
}


function _10(Inputs,FileAttachment){return(
Inputs.table(FileAttachment("Invoices-over-25k-April-2023.csv").csv())
)}

function _11(md){return(
md`<div style="color: black; font: 14px/20px var(--sans-serif);">

## High complexity sheets
Complexity is measured by the length of the spreadsheet's fingerprint, these are four heat maps of spreadsheets with the longest fingerprint. You will see they are all quite similar, all being from spreadsheets displaying the same information for different months. Thus they are all structured similarly (but not identically). We have displayed images together with the first of these, the remainder are structured similarly.`
)}

function _12(d3,width,long_7886_hm,color)
{
  var height = 500
  var max = 1
  const svg = d3.create('svg')
    .attr('viewBox', [0, 0, width, height]);

  var data_height = long_7886_hm.length
  var data_width = long_7886_hm[0].length
  
  
  for (let i = 0; i < data_width; i++) {
    for (let j = 0; j < data_height; j++) {
      svg
        .append('rect')
        .attr('fill', color(long_7886_hm[j][i] * max/1.25))
        .attr('x', i * width / data_width)
        .attr('y', j * height / data_height)
        .attr('height', height / data_height)
        .attr('width', width / data_width);
    }
  }
  
  
  return svg.node()
}


function __1(FileAttachment){return(
FileAttachment("7886_1.png").image()
)}

function __2(FileAttachment){return(
FileAttachment("7886_2.png").image()
)}

function _15(d3,width,long_5728_hm,color)
{
  var height = 500
  var max = 1
  const svg = d3.create('svg')
    .attr('viewBox', [0, 0, width, height]);

  var data_height = long_5728_hm.length
  var data_width = long_5728_hm[0].length
  
  
  for (let i = 0; i < data_width; i++) {
    for (let j = 0; j < data_height; j++) {
      svg
        .append('rect')
        .attr('fill', color(long_5728_hm[j][i] * max/1.25))
        .attr('x', i * width / data_width)
        .attr('y', j * height / data_height)
        .attr('height', height / data_height)
        .attr('width', width / data_width);
    }
  }
  
  
  return svg.node()
}


function _16(d3,width,long_5993_hm,color)
{
  var height = 500
  var max = 1
  const svg = d3.create('svg')
    .attr('viewBox', [0, 0, width, height]);

  var data_height = long_5993_hm.length
  var data_width = long_5993_hm[0].length
  
  
  for (let i = 0; i < data_width; i++) {
    for (let j = 0; j < data_height; j++) {
      svg
        .append('rect')
        .attr('fill', color(long_5993_hm[j][i] * max/1.25))
        .attr('x', i * width / data_width)
        .attr('y', j * height / data_height)
        .attr('height', height / data_height)
        .attr('width', width / data_width);
    }
  }
  
  
  return svg.node()
}


function _17(d3,width,long_7680_hm,color)
{
  var height = 500
  var max = 1
  const svg = d3.create('svg')
    .attr('viewBox', [0, 0, width, height]);

  var data_height = long_7680_hm.length
  var data_width = long_7680_hm[0].length
  
  
  for (let i = 0; i < data_width; i++) {
    for (let j = 0; j < data_height; j++) {
      svg
        .append('rect')
        .attr('fill', color(long_7680_hm[j][i] * max/1.25))
        .attr('x', i * width / data_width)
        .attr('y', j * height / data_height)
        .attr('height', height / data_height)
        .attr('width', width / data_width);
    }
  }
  
  
  return svg.node()
}


function _18(md){return(
md`<div style="color: black; font: 14px/20px var(--sans-serif);">

## Low complexity sheets
We also examine the heat maps of low complexity sheets. The four sheets with the shortest fingerprints are all small tables with no NA vales, hence all the heat maps are soild blocks, as shown below. We show only the first one, the others are also solid blocks just with different numbers of rows/columns.`
)}

function _19(d3,width,short_5123_hm,color)
{
  var height = 500
  var max = 1
  const svg = d3.create('svg')
    .attr('viewBox', [0, 0, width, height]);

  var data_height = short_5123_hm.length
  var data_width = short_5123_hm[0].length
  
  
  for (let i = 0; i < data_width; i++) {
    for (let j = 0; j < data_height; j++) {
      svg
        .append('rect')
        .attr('fill', color(short_5123_hm[j][i] * max/1.25))
        .attr('x', i * width / data_width)
        .attr('y', j * height / data_height)
        .attr('height', height / data_height)
        .attr('width', width / data_width);
    }
  }
  
  
  return svg.node()
}


function _20(md){return(
md`<div style="color: black; font: 14px/20px var(--sans-serif);">

# Appendices`
)}

function _color(d3){return(
d3.interpolateOrRd
)}

function _mid_7908_hm(FileAttachment){return(
FileAttachment("mid_7908_hm@1.csv").csv({array: true, typed: true})
)}

function _mid_29_hm(FileAttachment){return(
FileAttachment("mid_29_hm.csv").csv({array: true, typed: true})
)}

function _mid_5541_hm(FileAttachment){return(
FileAttachment("mid_5541_hm.csv").csv({array: true, typed: true})
)}

function _mid_28031_hm(FileAttachment){return(
FileAttachment("mid_28031_hm.csv").csv({array: true, typed: true})
)}

function _long_7886_hm(FileAttachment){return(
FileAttachment("long_7886_hm.csv").csv({array: true, typed: true})
)}

function _long_5728_hm(FileAttachment){return(
FileAttachment("long_5728_hm.csv").csv({array: true, typed: true})
)}

function _long_5993_hm(FileAttachment){return(
FileAttachment("long_5993_hm.csv").csv({array: true, typed: true})
)}

function _long_7680_hm(FileAttachment){return(
FileAttachment("long_7680_hm.csv").csv({array: true, typed: true})
)}

function _short_5123_hm(FileAttachment){return(
FileAttachment("short_5123_hm.csv").csv({array: true, typed: true})
)}

function _d3(require){return(
require('d3@5')
)}

export default function define(runtime, observer) {
  const main = runtime.module();
  function toString() { return this.url; }
  const fileAttachments = new Map([
    ["mid_7908_hm@1.csv", {url: new URL("./files/34eec900efced01d391f3dd5887c4570ef80e2eaa90dcf3b30af4a18b9b8af7492484e273c5c659e1be69787d19407fd99a51dc99508f41665910e4776bf542d.csv", import.meta.url), mimeType: "text/csv", toString}],
    ["mid_7908@1.png", {url: new URL("./files/a10682f61fa0613ebe0c4284d21cfce4531c29cf253a435fca2932ea5c7adfff5cae87a27e13d82e7132762bb2dfcf2c97dc64007c41015fed8ddb74552a400d.png", import.meta.url), mimeType: "image/png", toString}],
    ["mid_29_hm.csv", {url: new URL("./files/c8e128695fee6b8d946e5046714724f9b625c96123915de015f191e6c76bdbcd55b44fd03e0f37463b51615b669e6b13b4317ba703ff60564c23c03dee5cbb1c.csv", import.meta.url), mimeType: "text/csv", toString}],
    ["APHA0296-Colonies_Inspected_2006.csv", {url: new URL("./files/11bb0ab95a3433969d2227c41c92b85b622e32160beec2ff0bf25e07c7e1cf26318cfab6c7bc3f1ef2f800f33d4a7be4d11b99a3e8bc2511f152fa726ae49f73.csv", import.meta.url), mimeType: "text/csv", toString}],
    ["mid_5541_hm.csv", {url: new URL("./files/9546ea78ef30e52a50e6f9430781a4fc2af8c4638ae854a093afe275b99f88164d431fb479bb06f4d81056c17514074c87d87c674824f6f7d673cbcac2bea12d.csv", import.meta.url), mimeType: "text/csv", toString}],
    ["DfT_permanent_secretaries-meetings-apr-jun-2022.csv", {url: new URL("./files/09de0ea7c52ef569bdb79a389840b0ec05ba49ff0ef004e5fed6d621428486184ca7e9da5d352d084f2c85daf15af0f9f14b36392864dc9e9229f7524796be3d.csv", import.meta.url), mimeType: "text/csv", toString}],
    ["mid_28031_hm.csv", {url: new URL("./files/220b8c3c6f49290de1831c5276b06fade31e572c32764e2fb9a444294ff6098b8f62bd7bfd41564174415c37801fabd3844bfc815878aa6f4c1c5a520db5c8fb.csv", import.meta.url), mimeType: "text/csv", toString}],
    ["Invoices-over-25k-April-2023.csv", {url: new URL("./files/1652c4350c5fdcfe015e517f3b4bb682ad9306047807a26068e00eed0e47d314dcce6966ee5dc1f3bf736164988142b657fcaf6a81446eaf89560b09aca7b9e5.csv", import.meta.url), mimeType: "text/csv", toString}],
    ["long_7886_hm.csv", {url: new URL("./files/a568621ded33bb24c8d5d318e5de7e4e52a3f643c9bc45ade5f59a9cf1a2ce88755f071082b74d987534678363dc8534882f2dfee41a6b9aa0ef7bd08add0e67.csv", import.meta.url), mimeType: "text/csv", toString}],
    ["long_5728_hm.csv", {url: new URL("./files/6fdab0f120f0201e5b09ac8de65a37287c5c1cade139c96da9ec3b8fa9f22d8819412c0f51edd206bf97b97b1be19450a89c4793812332f15fa513643e84abef.csv", import.meta.url), mimeType: "text/csv", toString}],
    ["long_5993_hm.csv", {url: new URL("./files/28f023c65c89ad1f296a568f67d21b04fedc7c036426c0200707f6e1f6713b67e8b0bd43ffd560d6c7c0ae57db1d4fccfff2edec4c60310b5de45f663c614319.csv", import.meta.url), mimeType: "text/csv", toString}],
    ["long_7680_hm.csv", {url: new URL("./files/28f023c65c89ad1f296a568f67d21b04fedc7c036426c0200707f6e1f6713b67e8b0bd43ffd560d6c7c0ae57db1d4fccfff2edec4c60310b5de45f663c614319.csv", import.meta.url), mimeType: "text/csv", toString}],
    ["short_5123_hm.csv", {url: new URL("./files/ecafab5aeb487d21ed2be69f56bf37fa6cece3efeb2e7549ed75aea02a33d451dc19ec7d51f063ff08e293c077d71b6e19285d9019ad687a9b7c9ea6b58f7c22.csv", import.meta.url), mimeType: "text/csv", toString}],
    ["7886_1.png", {url: new URL("./files/d51ce6db01d8d1048cde7aa2900f329ffb23de884698d98ed9d6e88609c9dd1e81c63331c39e3e5af512acbf49eb4c184b4fc46ea7d9923ecdaedbbc6fb8baa7.png", import.meta.url), mimeType: "image/png", toString}],
    ["7886_2.png", {url: new URL("./files/835ad06e9fad70bbb3646c86ddc90a594c051ff2eb07fb7f0ebcb58df5a9009eec9cf2d9c94457bc4fee047afdc2bd1dfc6100bcd86a36d176eb905759730c8a.png", import.meta.url), mimeType: "image/png", toString}]
  ]);
  main.builtin("FileAttachment", runtime.fileAttachments(name => fileAttachments.get(name)));
  main.variable(observer()).define(["md"], _1);
  main.variable(observer()).define(["md"], _2);
  main.variable(observer()).define(["d3","width","mid_7908_hm","color"], _3);
  main.variable(observer("mid_7908")).define("mid_7908", ["FileAttachment"], _mid_7908);
  main.variable(observer()).define(["d3","width","mid_29_hm","color"], _5);
  main.variable(observer()).define(["Inputs","FileAttachment"], _6);
  main.variable(observer()).define(["d3","width","mid_5541_hm","color"], _7);
  main.variable(observer()).define(["Inputs","FileAttachment"], _8);
  main.variable(observer()).define(["d3","width","mid_28031_hm","color"], _9);
  main.variable(observer()).define(["Inputs","FileAttachment"], _10);
  main.variable(observer()).define(["md"], _11);
  main.variable(observer()).define(["d3","width","long_7886_hm","color"], _12);
  main.variable(observer("_1")).define("_1", ["FileAttachment"], __1);
  main.variable(observer("_2")).define("_2", ["FileAttachment"], __2);
  main.variable(observer()).define(["d3","width","long_5728_hm","color"], _15);
  main.variable(observer()).define(["d3","width","long_5993_hm","color"], _16);
  main.variable(observer()).define(["d3","width","long_7680_hm","color"], _17);
  main.variable(observer()).define(["md"], _18);
  main.variable(observer()).define(["d3","width","short_5123_hm","color"], _19);
  main.variable(observer()).define(["md"], _20);
  main.variable(observer("color")).define("color", ["d3"], _color);
  main.variable(observer("mid_7908_hm")).define("mid_7908_hm", ["FileAttachment"], _mid_7908_hm);
  main.variable(observer("mid_29_hm")).define("mid_29_hm", ["FileAttachment"], _mid_29_hm);
  main.variable(observer("mid_5541_hm")).define("mid_5541_hm", ["FileAttachment"], _mid_5541_hm);
  main.variable(observer("mid_28031_hm")).define("mid_28031_hm", ["FileAttachment"], _mid_28031_hm);
  main.variable(observer("long_7886_hm")).define("long_7886_hm", ["FileAttachment"], _long_7886_hm);
  main.variable(observer("long_5728_hm")).define("long_5728_hm", ["FileAttachment"], _long_5728_hm);
  main.variable(observer("long_5993_hm")).define("long_5993_hm", ["FileAttachment"], _long_5993_hm);
  main.variable(observer("long_7680_hm")).define("long_7680_hm", ["FileAttachment"], _long_7680_hm);
  main.variable(observer("short_5123_hm")).define("short_5123_hm", ["FileAttachment"], _short_5123_hm);
  main.variable(observer("d3")).define("d3", ["require"], _d3);
  return main;
}
