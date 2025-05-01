import define1 from "./a33468b95d0b15b0@817.js";
import define2 from "./715b4c45cc45c3b3@223.js";

function _1(md){return(
md`<div style="color: grey; font: 13px/25.5px var(--sans-serif);">

# Spreadsheet Analysis (combined)`
)}

function _2(md){return(
md`<div style="color: black; font: 15px/20px var(--sans-serif);">

## Number of rows in a spreadsheet, split by csv and xls/xlsx`
)}

function _key_1(legend,chart_1){return(
legend({color: chart_1.scales.color, title: "Row number (percentage)"})
)}

function _chart_1(d3,row_no)
{
  // Specify the chart’s dimensions.
  const width = 1020;
  const height = 600;
  const marginTop = 10;
  const marginRight = 10;
  const marginBottom = 20;
  const marginLeft = 40;

  // Prepare the scales for positional and color encodings.
  // Fx encodes the number of rows.
  const fx = d3.scaleBand()
      .domain(new Set(row_no.map(d => d.number_of_rows)))
      .rangeRound([marginLeft, width - marginRight])
      .paddingInner(0.1);

  // Both x and color encode the metric class.
  const metrics = new Set(row_no.map(d => d.metric));

  const x = d3.scaleBand()
      .domain(metrics)
      .rangeRound([0, fx.bandwidth()])
      .padding(0.05);

  const color = d3.scaleOrdinal()
      .domain(metrics)
      .range(["#1f77b4","#ff7f0e","#2ca02c","#d62728","#9467bd","#8c564b","#e377c2","#7f7f7f","#bcbd22","#17becf"])
      .unknown("#ccc");

  // Y encodes the height of the bar.
  const y = d3.scaleLinear()
      .domain([0, 1])
      .rangeRound([height - marginBottom, marginTop]);

  // A function to format the value in the tooltip.
  const formatValue = x => isNaN(x) ? "N/A" : x.toLocaleString("en")

  // Create the SVG container.
  const svg = d3.create("svg")
      .attr("width", width)
      .attr("height", height)
      .attr("viewBox", [0, 0, width, height])
      .attr("style", "max-width: 100%; height: auto;");

  // Append a group for each number of rows, and a rect for each metric.
  svg.append("g")
    .selectAll()
    .data(d3.group(row_no, d => d.number_of_rows))
    .join("g")
      .attr("transform", ([number_of_rows]) => `translate(${fx(number_of_rows)},0)`)
    .selectAll()
    .data(([, d]) => d)
    .join("rect")
      .attr("x", d => x(d.metric))
      .attr("y", d => y(d.value))
      .attr("width", x.bandwidth())
      .attr("height", d => y(0) - y(d.value))
      .attr("fill", d => color(d.metric));

  // Append the horizontal axis.
  svg.append("g")
      .attr("transform", `translate(0,${height - marginBottom})`)
      .call(d3.axisBottom(fx).tickSizeOuter(0))
      .call(g => g.selectAll(".domain").remove());

  // Append the vertical axis.
  svg.append("g")
      .attr("transform", `translate(${marginLeft},0)`)
      .call(d3.axisLeft(y).ticks(null, "s"))
      .call(g => g.selectAll(".domain").remove());

  // Return the chart with the color scale as a property (for the legend).
  return Object.assign(svg.node(), {scales: {color}});
}


function _5(md){return(
md`<div style="color: black; font: 16px/18px var(--sans-serif);">

Here we show the distribution of spreadsheet sizes, as indicated by the number of rows in the spreadsheet spilt into bins organised by order of magnitude. This indicates the spread of sheet sizes, showing that wilst there is a cluster at the lower end of the spectrum, there are a number of very long spreadsheets. We can also see that there is more of a spread of sizes amongst csv sheets than xls(x) sheets, lengths at the upper end of the spectrum are almost exclusively csv sheets. We can infer that csvs are more fequently used for large datasets, whereas xls(x) sheets are more commonly shorter tables. Below is the same data in table form.`
)}

function _6(md){return(
md`<div style="color: black; font: 15px/20px var(--sans-serif);">

## Number of rows in a spreadsheet, split by csv and xls/xlsx`
)}

function _7(table,row_number){return(
table(row_number)
)}

function _8(md){return(
md`<div style="color: black; font: 15px/22px var(--sans-serif);">

## Sheets with empty top/bottom rows, titles, subtitles, full tables and instances of merged cells or non data sheets (latter two for xls/xlsx only), split by csv and xls/xlsx`
)}

function _key_2(legend,chart_2){return(
legend({color: chart_2.scales.color, title: "Empty top/bottom rows, title rows and subtitles, non data sheets and sheets with merged cells (percentage)"})
)}

function _chart_2(d3,titles)
{
  // Specify the chart’s dimensions.
  const width = 1020;
  const height = 600;
  const marginTop = 10;
  const marginRight = 10;
  const marginBottom = 20;
  const marginLeft = 40;

  // Prepare the scales for positional and color encodings.
  // Fx encodes the state.
  const fx = d3.scaleBand()
      .domain(new Set(titles.map(d => d.Category)))
      .rangeRound([marginLeft, width - marginRight])
      .paddingInner(0.1);

  // Both x and color encode the metric class.
  const metrics = new Set(titles.map(d => d.metric));

  const x = d3.scaleBand()
      .domain(metrics)
      .rangeRound([0, fx.bandwidth()])
      .padding(0.05);

  const color = d3.scaleOrdinal()
      .domain(metrics)
      .range(["#1f77b4","#ff7f0e","#2ca02c","#d62728","#9467bd","#8c564b","#e377c2","#7f7f7f","#bcbd22","#17becf"])
      .unknown("#ccc");

  // Y encodes the height of the bar.
  const y = d3.scaleLinear()
      .domain([0, 1])
      .rangeRound([height - marginBottom, marginTop]);

  // A function to format the value in the tooltip.
  const formatValue = x => isNaN(x) ? "N/A" : x.toLocaleString("en")

  // Create the SVG container.
  const svg = d3.create("svg")
      .attr("width", width)
      .attr("height", height)
      .attr("viewBox", [0, 0, width, height])
      .attr("style", "max-width: 100%; height: auto;");

  // Append a group for each number of rows, and a rect for each metric.
  svg.append("g")
    .selectAll()
    .data(d3.group(titles, d => d.Category))
    .join("g")
      .attr("transform", ([Category]) => `translate(${fx(Category)},0)`)
    .selectAll()
    .data(([, d]) => d)
    .join("rect")
      .attr("x", d => x(d.metric))
      .attr("y", d => y(d.value))
      .attr("width", x.bandwidth())
      .attr("height", d => y(0) - y(d.value))
      .attr("fill", d => color(d.metric));

  // Append the horizontal axis.
  svg.append("g")
      .attr("transform", `translate(0,${height - marginBottom})`)
      .call(d3.axisBottom(fx).tickSizeOuter(0))
      .call(g => g.selectAll(".domain").remove());

  // Append the vertical axis.
  svg.append("g")
      .attr("transform", `translate(${marginLeft},0)`)
      .call(d3.axisLeft(y).ticks(null, "s"))
      .call(g => g.selectAll(".domain").remove());

  // Return the chart with the color scale as a property (for the legend).
  return Object.assign(svg.node(), {scales: {color}});
}


function _11(md){return(
md`<div style="color: black; font: 16px/18px var(--sans-serif);">

This chart displays a variety of information, largely around the structure of sheets, and itentifying the ways in which sheets are often not simply tables of data. Just looking at the full table variable, which indicates if the sheet consists of a full table of data with no empty cells, we see that xls(x) sheets are often unlikely to conform to this, with only 16% of them being full tables, even among csvs, this rises to only 73%. Empty top and bottom rows show where there are superfluous empty rows above or below the data, again more common among xls(x) sheets than csvs. 

The presence of title rows and subtitles indicates the presence of formatting/structuring which is designed to provide context to human viewers but which may not contain data outside that purpose. Merged cell instancies indicate where a sheet contains cells that have been merged together, how merged cells are interpreted between different sheet reading software can vary and may produce interesting results when machine reading the sheet (see our heat maps page for more examples). 

Non-data sheets indicate sheets which are named in such a way as to indicate that they do not contain data, with their titles containing words such as Title, Contents, Appendicies, etc. Showing that a significant proportion of xls(x) sheets do not contain raw data, but rather contain things such a summaries or metadata. The latter two variables only appear amongst xls(x) files, as csvs do not have the functionality for merged cells or multiple sheets. Again, the same data is shown below as a table.`
)}

function _12(table,titles_etc){return(
table(titles_etc)
)}

function _13(md){return(
md`<div style="color: black; font: 15px/20px var(--sans-serif);">

## Number of empty rows in a sheet`
)}

function _key_3(legend,chart_3){return(
legend({color: chart_3.scales.color, title: "Number of empty rows (percentage)"})
)}

function _chart_3(d3,empty_row)
{
  // Specify the chart’s dimensions.
  const width = 1020;
  const height = 600;
  const marginTop = 10;
  const marginRight = 10;
  const marginBottom = 20;
  const marginLeft = 40;

  // Prepare the scales for positional and color encodings.
  // Fx encodes the number of rows.
  const fx = d3.scaleBand()
      .domain(new Set(empty_row.map(d => d.number_of_empty_rows)))
      .rangeRound([marginLeft, width - marginRight])
      .paddingInner(0.1);

  // Both x and color encode the metric class.
  const metrics = new Set(empty_row.map(d => d.metric));

  const x = d3.scaleBand()
      .domain(metrics)
      .rangeRound([0, fx.bandwidth()])
      .padding(0.05);

  const color = d3.scaleOrdinal()
      .domain(metrics)
      .range(["#1f77b4","#ff7f0e","#2ca02c","#d62728","#9467bd","#8c564b","#e377c2","#7f7f7f","#bcbd22","#17becf"])
      .unknown("#ccc");

  // Y encodes the height of the bar.
  const y = d3.scaleLinear()
      .domain([0, 1])
      .rangeRound([height - marginBottom, marginTop]);

  // A function to format the value in the tooltip.
  const formatValue = x => isNaN(x) ? "N/A" : x.toLocaleString("en")

  // Create the SVG container.
  const svg = d3.create("svg")
      .attr("width", width)
      .attr("height", height)
      .attr("viewBox", [0, 0, width, height])
      .attr("style", "max-width: 100%; height: auto;");

  // Append a group for each number of rows, and a rect for each metric.
  svg.append("g")
    .selectAll()
    .data(d3.group(empty_row, d => d.number_of_empty_rows))
    .join("g")
      .attr("transform", ([number_of_empty_rows]) => `translate(${fx(number_of_empty_rows)},0)`)
    .selectAll()
    .data(([, d]) => d)
    .join("rect")
      .attr("x", d => x(d.metric))
      .attr("y", d => y(d.value))
      .attr("width", x.bandwidth())
      .attr("height", d => y(0) - y(d.value))
      .attr("fill", d => color(d.metric));

  // Append the horizontal axis.
  svg.append("g")
      .attr("transform", `translate(0,${height - marginBottom})`)
      .call(d3.axisBottom(fx).tickSizeOuter(0))
      .call(g => g.selectAll(".domain").remove());

  // Append the vertical axis.
  svg.append("g")
      .attr("transform", `translate(${marginLeft},0)`)
      .call(d3.axisLeft(y).ticks(null, "s"))
      .call(g => g.selectAll(".domain").remove());

  // Return the chart with the color scale as a property (for the legend).
  return Object.assign(svg.node(), {scales: {color}});
}


function _16(md){return(
md`<div style="color: black; font: 16px/18px var(--sans-serif);">

Here we see a histogram indicating the frequency of occurances of counts of empty rows within a sheet. the presence of empty rows can indicate the sepration of multiple tables of data within one sheet, or the separation of titles, subtitles or subtotals from the main body(ies) of data. Again there is significant discrepancy between csvs and xls(x) sheets with the former having many more occurances of no empty rows than the latter. But for those that do have empty rows xls(x) sheets are more clustered around the lower empty row counts wheras csvs are more spread out. Again, the same data is shown below in table format.`
)}

function _17(table,empty_row_number){return(
table(empty_row_number)
)}

function _18(md){return(
md`<div style="color: black; font: 20px/40px var(--sans-serif);">

Estimates of number of sheets with more than one table`
)}

function _19(table,multi_tables){return(
table(multi_tables)
)}

function _20(md){return(
md`<div style="color: black; font: 16px/18px var(--sans-serif);">

Finally, we provide estimates of the number of sheets with multiple tables. We examine a foew possibilities which may indicate this, all based on the fingerprint variable. This is a list of tuples indicating sets of empty and non empty rows. For example a fingerprint of [(0, 1)] would indicate a sheet with a single line of data (i.e. no empty rows followed by one populated row); [(0, 1), (1, 23)] would inidcate one populated row (likely a title), followed by one empty row and 23 populated rows (likely a table of data). 

We examine some ways in which multiple tables may be indicated. First, by simply having multiple tuples in the fingerprint, indicating one or more groups of populated rows separated by empty rows. However, in some cases, this would capture sheets containing just a title and a single table separated by an empty row, so we filter out those cases where the first tuple is (0, 1), and thus is liley a title of some sort. the third category is where there are three or more tuples, where there is more likelihood of this indicating multiple tabels even accounting for the presence of titles/subtitles.`
)}

function _21(md){return(
md`<div style="color: black; font: 15px/20px var(--sans-serif);">

## Data Objects`
)}

async function _row_no(row_number_perc)
{
  let row_no = await row_number_perc;
  const metrics = row_no.columns.slice(1);
  return metrics.flatMap((metric) => row_no.map((d) => ({number_of_rows: d.number_of_rows, metric, value: d[metric]})));
}


async function _empty_row(empty_row_perc)
{
  let empty_row = await empty_row_perc;
  const metrics = empty_row.columns.slice(1);
  return metrics.flatMap((metric) => empty_row.map((d) => ({number_of_empty_rows: d.Number_of_empty_rows, metric, value: d[metric]})));
}


async function _titles(titles_etc_perc)
{
  let titles = await titles_etc_perc;
  const metrics = titles.columns.slice(1);
  return metrics.flatMap((metric) => titles.map((d) => ({Category: d.Categories, metric, value: d[metric]})));
}


function _row_number_perc(FileAttachment){return(
FileAttachment("row_number_perc.csv").csv({typed: true})
)}

function _row_number(FileAttachment){return(
FileAttachment("row_number.csv").csv({typed: true})
)}

function _empty_row_perc(FileAttachment){return(
FileAttachment("empty_row_perc.csv").csv({typed: true})
)}

function _empty_row_number(FileAttachment){return(
FileAttachment("empty_row_number.csv").csv({typed: true})
)}

function _multi_tables(FileAttachment){return(
FileAttachment("multi_tables.csv").csv({typed: true})
)}

function _titles_etc(FileAttachment){return(
FileAttachment("titles_etc.csv").csv({typed: true})
)}

function _titles_etc_perc(FileAttachment){return(
FileAttachment("titles_etc_perc.csv").csv({typed: true})
)}

export default function define(runtime, observer) {
  const main = runtime.module();
  function toString() { return this.url; }
  const fileAttachments = new Map([
    ["row_number.csv", {url: new URL("./files/21e55f128b8f17031b39b4bcb74e3abb399634ed21ac11e723284817c3267d7e4995c4bb5139c910b2f1109b19bcd692a386558cc8905a301f8b88e3fa116d88.csv", import.meta.url), mimeType: "text/csv", toString}],
    ["row_number_perc.csv", {url: new URL("./files/d5464becfc5a2cd6fba48c200d39d3fb05360a9f2722639872255214f3cde20d441070611fb53cb599e39f36aedd5de998652e179e524822f5c9323976d4a388.csv", import.meta.url), mimeType: "text/csv", toString}],
    ["multi_tables.csv", {url: new URL("./files/d26e35005e43185982de5a019075ff37813dc3bff8b194036fcfaf02f706722c7c81c242da82915b7cec9bdbb569d67ff6b05bfeccdc484d9ca01ab5422c79b0.csv", import.meta.url), mimeType: "text/csv", toString}],
    ["titles_etc.csv", {url: new URL("./files/152d4d84d7b0ddc88c370d05f87e23749bafa6531607d2a34941a44dc406596e96bd8832e9ffb9f4b33587bfc1705a13a3f7489bc72d5bc5f69e04b776d762e4.csv", import.meta.url), mimeType: "text/csv", toString}],
    ["empty_row_perc.csv", {url: new URL("./files/bdf5337b68a8455e4ee2f3e05c2ea72a87540d4b1a47805aceb43376c076f61efb092fe708dc9c8eefff97b9884f3658d9c421f44a8d930a20ad3c97cc23e3dc.csv", import.meta.url), mimeType: "text/csv", toString}],
    ["empty_row_number.csv", {url: new URL("./files/e7775779d785474b92bece074bb904c6a16915784f9734689fca8737bb6a5a5755d61d74129ab9c5da969553ea850bf07ff4c08a18781fca874828ef3a3666fc.csv", import.meta.url), mimeType: "text/csv", toString}],
    ["titles_etc_perc.csv", {url: new URL("./files/832f26d0d74af8a428e157c38b8fff247349024a46519abc2ce30181f8f3606e7aad0d4a6d36c48e9c625578ae91fd51622ef29904fe812ed12db137a2217de7.csv", import.meta.url), mimeType: "text/csv", toString}]
  ]);
  main.builtin("FileAttachment", runtime.fileAttachments(name => fileAttachments.get(name)));
  main.variable(observer()).define(["md"], _1);
  main.variable(observer()).define(["md"], _2);
  main.variable(observer("key_1")).define("key_1", ["legend","chart_1"], _key_1);
  main.variable(observer("chart_1")).define("chart_1", ["d3","row_no"], _chart_1);
  main.variable(observer()).define(["md"], _5);
  main.variable(observer()).define(["md"], _6);
  main.variable(observer()).define(["table","row_number"], _7);
  main.variable(observer()).define(["md"], _8);
  main.variable(observer("key_2")).define("key_2", ["legend","chart_2"], _key_2);
  main.variable(observer("chart_2")).define("chart_2", ["d3","titles"], _chart_2);
  main.variable(observer()).define(["md"], _11);
  main.variable(observer()).define(["table","titles_etc"], _12);
  main.variable(observer()).define(["md"], _13);
  main.variable(observer("key_3")).define("key_3", ["legend","chart_3"], _key_3);
  main.variable(observer("chart_3")).define("chart_3", ["d3","empty_row"], _chart_3);
  main.variable(observer()).define(["md"], _16);
  main.variable(observer()).define(["table","empty_row_number"], _17);
  main.variable(observer()).define(["md"], _18);
  main.variable(observer()).define(["table","multi_tables"], _19);
  main.variable(observer()).define(["md"], _20);
  main.variable(observer()).define(["md"], _21);
  main.variable(observer("row_no")).define("row_no", ["row_number_perc"], _row_no);
  main.variable(observer("empty_row")).define("empty_row", ["empty_row_perc"], _empty_row);
  main.variable(observer("titles")).define("titles", ["titles_etc_perc"], _titles);
  main.variable(observer("row_number_perc")).define("row_number_perc", ["FileAttachment"], _row_number_perc);
  main.variable(observer("row_number")).define("row_number", ["FileAttachment"], _row_number);
  main.variable(observer("empty_row_perc")).define("empty_row_perc", ["FileAttachment"], _empty_row_perc);
  main.variable(observer("empty_row_number")).define("empty_row_number", ["FileAttachment"], _empty_row_number);
  main.variable(observer("multi_tables")).define("multi_tables", ["FileAttachment"], _multi_tables);
  main.variable(observer("titles_etc")).define("titles_etc", ["FileAttachment"], _titles_etc);
  main.variable(observer("titles_etc_perc")).define("titles_etc_perc", ["FileAttachment"], _titles_etc_perc);
  const child1 = runtime.module(define1);
  main.import("legend", child1);
  const child2 = runtime.module(define2);
  main.import("table", child2);
  return main;
}
