import define1 from "./a33468b95d0b15b0@817.js";
import define2 from "./715b4c45cc45c3b3@223.js";

function _1(md){return(
md`<div style="color: grey; font: 13px/25.5px var(--sans-serif);">

# Spreadsheet Analysis (row number)`
)}

function _key(legend,chart){return(
legend({color: chart.scales.color, title: "Row number (percentage)"})
)}

function _chart(d3,data)
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
      .domain(new Set(data.map(d => d.number_of_rows)))
      .rangeRound([marginLeft, width - marginRight])
      .paddingInner(0.1);

  // Both x and color encode the metric class.
  const metrics = new Set(data.map(d => d.metric));

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
    .data(d3.group(data, d => d.number_of_rows))
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


function _4(table,row_number){return(
table(row_number)
)}

function _max(d3,data){return(
d3.max(data, d => d.value)
)}

async function _data(row_number_perc)
{
  let data = await row_number_perc;
  const metrics = data.columns.slice(1);
  return metrics.flatMap((metric) => data.map((d) => ({number_of_rows: d.number_of_rows, metric, value: d[metric]})));
}


function _row_number_perc(FileAttachment){return(
FileAttachment("row_number_perc.csv").csv({typed: true})
)}

function _row_number(FileAttachment){return(
FileAttachment("row_number.csv").csv({typed: true})
)}

export default function define(runtime, observer) {
  const main = runtime.module();
  function toString() { return this.url; }
  const fileAttachments = new Map([
    ["row_number_perc.csv", {url: new URL("./files/d5464becfc5a2cd6fba48c200d39d3fb05360a9f2722639872255214f3cde20d441070611fb53cb599e39f36aedd5de998652e179e524822f5c9323976d4a388.csv", import.meta.url), mimeType: "text/csv", toString}],
    ["row_number.csv", {url: new URL("./files/21e55f128b8f17031b39b4bcb74e3abb399634ed21ac11e723284817c3267d7e4995c4bb5139c910b2f1109b19bcd692a386558cc8905a301f8b88e3fa116d88.csv", import.meta.url), mimeType: "text/csv", toString}]
  ]);
  main.builtin("FileAttachment", runtime.fileAttachments(name => fileAttachments.get(name)));
  main.variable(observer()).define(["md"], _1);
  main.variable(observer("key")).define("key", ["legend","chart"], _key);
  main.variable(observer("chart")).define("chart", ["d3","data"], _chart);
  main.variable(observer()).define(["table","row_number"], _4);
  main.variable(observer("max")).define("max", ["d3","data"], _max);
  main.variable(observer("data")).define("data", ["row_number_perc"], _data);
  main.variable(observer("row_number_perc")).define("row_number_perc", ["FileAttachment"], _row_number_perc);
  main.variable(observer("row_number")).define("row_number", ["FileAttachment"], _row_number);
  const child1 = runtime.module(define1);
  main.import("legend", child1);
  const child2 = runtime.module(define2);
  main.import("table", child2);
  return main;
}
