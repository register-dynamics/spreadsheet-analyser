import define1 from "./a33468b95d0b15b0@817.js";
import define2 from "./715b4c45cc45c3b3@223.js";

function _1(md){return(
md`<div style="color: grey; font: 13px/25.5px var(--sans-serif);">

# Machine Unfrinedliness score and analysis`
)}

function _2(md){return(
md`<div style="color: black; font: 18px/25px var(--sans-serif);">

In our analysis of governement spreadsheets one of the core metrics we have produced is a soce, which we have termed 'Machine Unfrinedliness' (MU), which gives an indication of how difficult it is to machine read the spreadsheet. This score is comprised of eight factors: empty rows, multiple tables, empty top rows, empty bottom rows, merged cells, title row, subtitles, and data that does not start in A1. The presence of each of these factros contributed one to the MU score, hence the MU score ranges from 0 to 8, with zero being fully machine frinedly and eight being the most machine unfriendly.`
)}

function _key_1(legend,chart_1){return(
legend({color: chart_1.scales.color, title: "Sheet type"})
)}

function _chart_1(d3,MU_score)
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
      .domain(new Set(MU_score.map(d => d.MU_score)))
      .rangeRound([marginLeft, width - marginRight])
      .paddingInner(0.1);

  // Both x and color encode the metric class.
  const metrics = new Set(MU_score.map(d => d.metric));

  const x = d3.scaleBand()
      .domain(metrics)
      .rangeRound([0, fx.bandwidth()])
      .padding(0.05);

  const color = d3.scaleOrdinal()
      .domain(metrics)
      .range(["#9F6BFF","#c8fa64","#00461e"])
      .unknown("#ccc");

  // Y encodes the height of the bar.
  const y = d3.scaleLinear()
      .domain([0, 17000])
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
    .data(d3.group(MU_score, d => d.MU_score))
    .join("g")
      .attr("transform", ([MU_score]) => `translate(${fx(MU_score)},0)`)
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
md`<div style="color: black; font: 18px/25px var(--sans-serif);">

Here we examine the distribution of the MU score. We can see that the majority of spreadsheets have a score of zero, but there are still over 40% of sheets that have some complication. Most of these (~35% of all sheets) have a MU score from 1 to 4, with just over 5% having a score above 4. Also csvs account for the majority of 0 and 1 score sheets, whereas excel sheets are much more prevalent in higher MU scores, the highest two scores (7 and 8) have no csv sheets at all. Below are the figures in a table`
)}

function _6(table,mu_score_dist){return(
table(mu_score_dist)
)}

function _7(md){return(
md`<div style="color: black; font: 18px/25px var(--sans-serif);">

We can also examine what sheets look like at different MU scores. Below is a series of heat maps, colour coded bu MU score, from 8 (dark red) down to 0 (dark green). These were randomly selected and we aimed to have a represnetative sample whilst ensuring that each score was represented. We can see that the amount of 'complexity' of the layout of the data does not necessarily impact machine unfriendlyness, and that even appaerntly simple spreadsheets can prove to be unfriendly to machine reading.`
)}

function _8(plt,plt2,plt3,plt4,plt5,plt6,plt7,plt8,plt9,plt10,plt11,plt12,plt13,plt14,plt15,plt16,plt17,plt18,plt19,plt20,plt21,plt22,plt23,plt24,plt25,htl){return(
htl.html`<html>
 <head>
 </head>
 <body>
    <div class="container" style="display: flex; flex-wrap: wrap;  justify-content: space-around; height: 500px; width: 1000px;">
        <div style="width: 19%; background: white;">
            ${plt}
        </div>
        <div style="width: 19%; background: white;">
            ${plt2}
        </div>
      <div style="width: 19%; background: white;">
            ${plt3}
        </div>
      <div style="width: 19%; background: white;">
            ${plt4}
        </div>
      <div style="width: 19%; background: white;">
            ${plt5}
        </div>
      <div style="width: 19%; background: white;">
            ${plt6}
        </div>
        <div style="width: 19%; background: white;">
            ${plt7}
        </div>
      <div style="width: 19%; background: white;">
            ${plt8}
        </div>
      <div style="width: 19%; background: white;">
            ${plt9}
        </div>
      <div style="width: 19%; background: white;">
            ${plt10}
        </div>
      <div style="width: 19%; background: white;">
            ${plt11}
        </div>
        <div style="width: 19%; background: white;">
            ${plt12}
        </div>
      <div style="width: 19%; background: white;">
            ${plt13}
        </div>
      <div style="width: 19%; background: white;">
            ${plt14}
        </div>
      <div style="width: 19%; background: white;">
            ${plt15}
        </div>
      <div style="width: 19%; background: white;">
            ${plt16}
        </div>
        <div style="width: 19%; background: white;">
            ${plt17}
        </div>
      <div style="width: 19%; background: white;">
            ${plt18}
        </div>
      <div style="width: 19%; background: white;">
            ${plt19}
        </div>
      <div style="width: 19%; background: white;">
            ${plt20}
        </div>
      <div style="width: 19%; background: white;">
            ${plt21}
        </div>
        <div style="width: 19%; background: white;">
            ${plt22}
        </div>
      <div style="width: 19%; background: white;">
            ${plt23}
        </div>
      <div style="width: 19%; background: white;">
            ${plt24}
        </div>
      <div style="width: 19%; background: white;">
            ${plt25}
        </div>
    </div>
	<br>
	<br>
 </body>
</html>`
)}

function _plt(d3,width,hm_12124_0_8,color8)
{
  var height = 1000
  var max = 1
  const svg = d3.create('svg')
    .attr('viewBox', [0, 0, width/5, height/5]);

  var data_height = hm_12124_0_8.length
  var data_width = hm_12124_0_8[0].length
  
  
  for (let i = 0; i < data_width; i++) {
    for (let j = 0; j < data_height; j++) {
      svg
        .append('rect')
        .attr('fill', color8[hm_12124_0_8[j][i]])
        .attr('x', i * (width/5) / data_width)
        .attr('y', j * (height/5) / data_height)
        .attr('height', (height/5) / data_height)
        .attr('width', (width/5) / data_width);
    }
  }
  
  
  return svg.node()
}


function _plt2(d3,width,hm_6136_24_7,color7)
{
  var height = 1000
  var max = 1
  const svg = d3.create('svg')
    .attr('viewBox', [0, 0, width/5, height/5]);

  var data_height = hm_6136_24_7.length
  var data_width = hm_6136_24_7[0].length
  
  
  for (let i = 0; i < data_width; i++) {
    for (let j = 0; j < data_height; j++) {
      svg
        .append('rect')
        .attr('fill', color7[hm_6136_24_7[j][i]])
        .attr('x', i * (width/5) / data_width)
        .attr('y', j * (height/5) / data_height)
        .attr('height', (height/5) / data_height)
        .attr('width', (width/5) / data_width);
    }
  }
  
  
  return svg.node()
}


function _plt3(d3,width,hm_12245_6_6,color6)
{
  var height = 1000
  var max = 1
  const svg = d3.create('svg')
    .attr('viewBox', [0, 0, width/5, height/5]);

  var data_height = hm_12245_6_6.length
  var data_width = hm_12245_6_6[0].length
  
  
  for (let i = 0; i < data_width; i++) {
    for (let j = 0; j < data_height; j++) {
      svg
        .append('rect')
        .attr('fill', color6[hm_12245_6_6[j][i]])
        .attr('x', i * (width/5) / data_width)
        .attr('y', j * (height/5) / data_height)
        .attr('height', (height/5) / data_height)
        .attr('width', (width/5) / data_width);
    }
  }
  
  
  return svg.node()
}


function _plt4(d3,width,hm_21680_1_5,color5)
{
  var height = 1000
  var max = 1
  const svg = d3.create('svg')
    .attr('viewBox', [0, 0, width/5, height/5]);

  var data_height = hm_21680_1_5.length
  var data_width = hm_21680_1_5[0].length
  
  
  for (let i = 0; i < data_width; i++) {
    for (let j = 0; j < data_height; j++) {
      svg
        .append('rect')
        .attr('fill', color5[hm_21680_1_5[j][i]])
        .attr('x', i * (width/5) / data_width)
        .attr('y', j * (height/5) / data_height)
        .attr('height', (height/5) / data_height)
        .attr('width', (width/5) / data_width);
    }
  }
  
  
  return svg.node()
}


function _plt5(d3,width,hm_5961_16_4,color4)
{
  var height = 1000
  var max = 1
  const svg = d3.create('svg')
    .attr('viewBox', [0, 0, width/5, height/5]);

  var data_height = hm_5961_16_4.length
  var data_width = hm_5961_16_4[0].length
  
  
  for (let i = 0; i < data_width; i++) {
    for (let j = 0; j < data_height; j++) {
      svg
        .append('rect')
        .attr('fill', color4[hm_5961_16_4[j][i]])
        .attr('x', i * (width/5) / data_width)
        .attr('y', j * (height/5) / data_height)
        .attr('height', (height/5) / data_height)
        .attr('width', (width/5) / data_width);
    }
  }
  
  
  return svg.node()
}


function _plt6(d3,width,hm_5891_6_4,color4)
{
  var height = 1000
  var max = 1
  const svg = d3.create('svg')
    .attr('viewBox', [0, 0, width/5, height/5]);

  var data_height = hm_5891_6_4.length
  var data_width = hm_5891_6_4[0].length
  
  
  for (let i = 0; i < data_width; i++) {
    for (let j = 0; j < data_height; j++) {
      svg
        .append('rect')
        .attr('fill', color4[hm_5891_6_4[j][i]])
        .attr('x', i * (width/5) / data_width)
        .attr('y', j * (height/5) / data_height)
        .attr('height', (height/5) / data_height)
        .attr('width', (width/5) / data_width);
    }
  }
  
  
  return svg.node()
}


function _plt7(d3,width,hm_277_1_4,color4)
{
  var height = 1000
  var max = 1
  const svg = d3.create('svg')
    .attr('viewBox', [0, 0, width/5, height/5]);

  var data_height = hm_277_1_4.length
  var data_width = hm_277_1_4[0].length
  
  
  for (let i = 0; i < data_width; i++) {
    for (let j = 0; j < data_height; j++) {
      svg
        .append('rect')
        .attr('fill', color4[hm_277_1_4[j][i]])
        .attr('x', i * (width/5) / data_width)
        .attr('y', j * (height/5) / data_height)
        .attr('height', (height/5) / data_height)
        .attr('width', (width/5) / data_width);
    }
  }
  
  
  return svg.node()
}


function _plt8(d3,width,hm_277_4_3,color3)
{
  var height = 1000
  var max = 1
  const svg = d3.create('svg')
    .attr('viewBox', [0, 0, width/5, height/5]);

  var data_height = hm_277_4_3.length
  var data_width = hm_277_4_3[0].length
  
  
  for (let i = 0; i < data_width; i++) {
    for (let j = 0; j < data_height; j++) {
      svg
        .append('rect')
        .attr('fill', color3[hm_277_4_3[j][i]])
        .attr('x', i * (width/5) / data_width)
        .attr('y', j * (height/5) / data_height)
        .attr('height', (height/5) / data_height)
        .attr('width', (width/5) / data_width);
    }
  }
  
  
  return svg.node()
}


function _plt9(d3,width,hm_442_0_3,color3)
{
  var height = 1000
  var max = 1
  const svg = d3.create('svg')
    .attr('viewBox', [0, 0, width/5, height/5]);

  var data_height = hm_442_0_3.length
  var data_width = hm_442_0_3[0].length
  
  
  for (let i = 0; i < data_width; i++) {
    for (let j = 0; j < data_height; j++) {
      svg
        .append('rect')
        .attr('fill', color3[hm_442_0_3[j][i]])
        .attr('x', i * (width/5) / data_width)
        .attr('y', j * (height/5) / data_height)
        .attr('height', (height/5) / data_height)
        .attr('width', (width/5) / data_width);
    }
  }
  
  
  return svg.node()
}


function _plt10(d3,width,hm_5578_7_2,color2)
{
  var height = 1000
  var max = 1
  const svg = d3.create('svg')
    .attr('viewBox', [0, 0, width/5, height/5]);

  var data_height = hm_5578_7_2.length
  var data_width = hm_5578_7_2[0].length
  
  
  for (let i = 0; i < data_width; i++) {
    for (let j = 0; j < data_height; j++) {
      svg
        .append('rect')
        .attr('fill', color2[hm_5578_7_2[j][i]])
        .attr('x', i * (width/5) / data_width)
        .attr('y', j * (height/5) / data_height)
        .attr('height', (height/5) / data_height)
        .attr('width', (width/5) / data_width);
    }
  }
  
  
  return svg.node()
}


function _plt11(d3,width,hm_6981_0_1,color1)
{
  var height = 1000
  var max = 1
  const svg = d3.create('svg')
    .attr('viewBox', [0, 0, width/5, height/5]);

  var data_height = hm_6981_0_1.length
  var data_width = hm_6981_0_1[0].length
  
  
  for (let i = 0; i < data_width; i++) {
    for (let j = 0; j < data_height; j++) {
      svg
        .append('rect')
        .attr('fill', color1[hm_6981_0_1[j][i]])
        .attr('x', i * (width/5) / data_width)
        .attr('y', j * (height/5) / data_height)
        .attr('height', (height/5) / data_height)
        .attr('width', (width/5) / data_width);
    }
  }
  
  
  return svg.node()
}


function _plt12(d3,width,hm_19232_5_1_hm,color1)
{
  var height = 1000
  var max = 1
  const svg = d3.create('svg')
    .attr('viewBox', [0, 0, width/5, height/5]);

  var data_height = hm_19232_5_1_hm.length
  var data_width = hm_19232_5_1_hm[0].length
  
  
  for (let i = 0; i < data_width; i++) {
    for (let j = 0; j < data_height; j++) {
      svg
        .append('rect')
        .attr('fill', color1[hm_19232_5_1_hm[j][i]])
        .attr('x', i * (width/5) / data_width)
        .attr('y', j * (height/5) / data_height)
        .attr('height', (height/5) / data_height)
        .attr('width', (width/5) / data_width);
    }
  }
  
  
  return svg.node()
}


function _plt13(d3,width,hm_22755_0_0,color1)
{
  var height = 1000
  var max = 1
  const svg = d3.create('svg')
    .attr('viewBox', [0, 0, width/5, height/5]);

  var data_height = hm_22755_0_0.length
  var data_width = hm_22755_0_0[0].length
  
  
  for (let i = 0; i < data_width; i++) {
    for (let j = 0; j < data_height; j++) {
      svg
        .append('rect')
        .attr('fill', color1[hm_22755_0_0[j][i]])
        .attr('x', i * (width/5) / data_width)
        .attr('y', j * (height/5) / data_height)
        .attr('height', (height/5) / data_height)
        .attr('width', (width/5) / data_width);
    }
  }
  
  
  return svg.node()
}


function _plt14(d3,width,hm_261_0_0,color)
{
  var height = 1000
  var max = 1
  const svg = d3.create('svg')
    .attr('viewBox', [0, 0, width/5, height/5]);

  var data_height = hm_261_0_0.length
  var data_width = hm_261_0_0[0].length
  
  
  for (let i = 0; i < data_width; i++) {
    for (let j = 0; j < data_height; j++) {
      svg
        .append('rect')
        .attr('fill', color[hm_261_0_0[j][i]])
        .attr('x', i * (width/5) / data_width)
        .attr('y', j * (height/5) / data_height)
        .attr('height', (height/5) / data_height)
        .attr('width', (width/5) / data_width);
    }
  }
  
  
  return svg.node()
}


function _plt15(d3,width,hm_14480_0_0,color)
{
  var height = 1000
  var max = 1
  const svg = d3.create('svg')
    .attr('viewBox', [0, 0, width/5, height/5]);

  var data_height = hm_14480_0_0.length
  var data_width = hm_14480_0_0[0].length
  
  
  for (let i = 0; i < data_width; i++) {
    for (let j = 0; j < data_height; j++) {
      svg
        .append('rect')
        .attr('fill', color[hm_14480_0_0[j][i]])
        .attr('x', i * (width/5) / data_width)
        .attr('y', j * (height/5) / data_height)
        .attr('height', (height/5) / data_height)
        .attr('width', (width/5) / data_width);
    }
  }
   
  return svg.node()
}


function _plt16(d3,width,hm_23791_0_0,color)
{
  var height = 1000
  var max = 1
  const svg = d3.create('svg')
    .attr('viewBox', [0, 0, width/5, height/5]);

  var data_height = hm_23791_0_0.length
  var data_width = hm_23791_0_0[0].length
  
  
  for (let i = 0; i < data_width; i++) {
    for (let j = 0; j < data_height; j++) {
      svg
        .append('rect')
        .attr('fill', color[hm_23791_0_0[j][i]])
        .attr('x', i * (width/5) / data_width)
        .attr('y', j * (height/5) / data_height)
        .attr('height', (height/5) / data_height)
        .attr('width', (width/5) / data_width);
    }
  }
   
  return svg.node()
}


function _plt17(d3,width,hm_14475_0_0,color)
{
  var height = 1000
  var max = 1
  const svg = d3.create('svg')
    .attr('viewBox', [0, 0, width/5, height/5]);

  var data_height = hm_14475_0_0.length
  var data_width = hm_14475_0_0[0].length
  
  
  for (let i = 0; i < data_width; i++) {
    for (let j = 0; j < data_height; j++) {
      svg
        .append('rect')
        .attr('fill', color[hm_14475_0_0[j][i]])
        .attr('x', i * (width/5) / data_width)
        .attr('y', j * (height/5) / data_height)
        .attr('height', (height/5) / data_height)
        .attr('width', (width/5) / data_width);
    }
  }
   
  return svg.node()
}


function _plt18(d3,width,hm_23419_0_0,color)
{
  var height = 1000
  var max = 1
  const svg = d3.create('svg')
    .attr('viewBox', [0, 0, width/5, height/5]);

  var data_height = hm_23419_0_0.length
  var data_width = hm_23419_0_0[0].length
  
  
  for (let i = 0; i < data_width; i++) {
    for (let j = 0; j < data_height; j++) {
      svg
        .append('rect')
        .attr('fill', color[hm_23419_0_0[j][i]])
        .attr('x', i * (width/5) / data_width)
        .attr('y', j * (height/5) / data_height)
        .attr('height', (height/5) / data_height)
        .attr('width', (width/5) / data_width);
    }
  }
   
  return svg.node()
}


function _plt19(d3,width,hm_15012_0_0,color)
{
  var height = 1000
  var max = 1
  const svg = d3.create('svg')
    .attr('viewBox', [0, 0, width/5, height/5]);

  var data_height = hm_15012_0_0.length
  var data_width = hm_15012_0_0[0].length
  
  
  for (let i = 0; i < data_width; i++) {
    for (let j = 0; j < data_height; j++) {
      svg
        .append('rect')
        .attr('fill', color[hm_15012_0_0[j][i]])
        .attr('x', i * (width/5) / data_width)
        .attr('y', j * (height/5) / data_height)
        .attr('height', (height/5) / data_height)
        .attr('width', (width/5) / data_width);
    }
  }
   
  return svg.node()
}


function _plt20(d3,width,hm_25943_0_0,color)
{
  var height = 1000
  var max = 1
  const svg = d3.create('svg')
    .attr('viewBox', [0, 0, width/5, height/5]);

  var data_height = hm_25943_0_0.length
  var data_width = hm_25943_0_0[0].length
  
  
  for (let i = 0; i < data_width; i++) {
    for (let j = 0; j < data_height; j++) {
      svg
        .append('rect')
        .attr('fill', color[hm_25943_0_0[j][i]])
        .attr('x', i * (width/5) / data_width)
        .attr('y', j * (height/5) / data_height)
        .attr('height', (height/5) / data_height)
        .attr('width', (width/5) / data_width);
    }
  }
   
  return svg.node()
}


function _plt21(d3,width,hm_300_3_0,color)
{
  var height = 1000
  var max = 1
  const svg = d3.create('svg')
    .attr('viewBox', [0, 0, width/5, height/5]);

  var data_height = hm_300_3_0.length
  var data_width = hm_300_3_0[0].length
  
  
  for (let i = 0; i < data_width; i++) {
    for (let j = 0; j < data_height; j++) {
      svg
        .append('rect')
        .attr('fill', color[hm_300_3_0[j][i]])
        .attr('x', i * (width/5) / data_width)
        .attr('y', j * (height/5) / data_height)
        .attr('height', (height/5) / data_height)
        .attr('width', (width/5) / data_width);
    }
  }
   
  return svg.node()
}


function _plt22(d3,width,hm_6417_0_0,color)
{
  var height = 1000
  var max = 1
  const svg = d3.create('svg')
    .attr('viewBox', [0, 0, width/5, height/5]);

  var data_height = hm_6417_0_0.length
  var data_width = hm_6417_0_0[0].length
  
  
  for (let i = 0; i < data_width; i++) {
    for (let j = 0; j < data_height; j++) {
      svg
        .append('rect')
        .attr('fill', color[hm_6417_0_0[j][i]])
        .attr('x', i * (width/5) / data_width)
        .attr('y', j * (height/5) / data_height)
        .attr('height', (height/5) / data_height)
        .attr('width', (width/5) / data_width);
    }
  }
   
  return svg.node()
}


function _plt23(d3,width,hm_8217_0_0,color)
{
  var height = 1000
  var max = 1
  const svg = d3.create('svg')
    .attr('viewBox', [0, 0, width/5, height/5]);

  var data_height = hm_8217_0_0.length
  var data_width = hm_8217_0_0[0].length
  
  
  for (let i = 0; i < data_width; i++) {
    for (let j = 0; j < data_height; j++) {
      svg
        .append('rect')
        .attr('fill', color[hm_8217_0_0[j][i]])
        .attr('x', i * (width/5) / data_width)
        .attr('y', j * (height/5) / data_height)
        .attr('height', (height/5) / data_height)
        .attr('width', (width/5) / data_width);
    }
  }
   
  return svg.node()
}


function _plt24(d3,width,hm_19875_0_0,color)
{
  var height = 1000
  var max = 1
  const svg = d3.create('svg')
    .attr('viewBox', [0, 0, width/5, height/5]);

  var data_height = hm_19875_0_0.length
  var data_width = hm_19875_0_0[0].length
  
  
  for (let i = 0; i < data_width; i++) {
    for (let j = 0; j < data_height; j++) {
      svg
        .append('rect')
        .attr('fill', color[hm_19875_0_0[j][i]])
        .attr('x', i * (width/5) / data_width)
        .attr('y', j * (height/5) / data_height)
        .attr('height', (height/5) / data_height)
        .attr('width', (width/5) / data_width);
    }
  }
   
  return svg.node()
}


function _plt25(d3,width,hm_26596_0_0,color)
{
  var height = 1000
  var max = 1
  const svg = d3.create('svg')
    .attr('viewBox', [0, 0, width/5, height/5]);

  var data_height = hm_26596_0_0.length
  var data_width = hm_26596_0_0[0].length
  
  
  for (let i = 0; i < data_width; i++) {
    for (let j = 0; j < data_height; j++) {
      svg
        .append('rect')
        .attr('fill', color[hm_26596_0_0[j][i]])
        .attr('x', i * (width/5) / data_width)
        .attr('y', j * (height/5) / data_height)
        .attr('height', (height/5) / data_height)
        .attr('width', (width/5) / data_width);
    }
  }
   
  return svg.node()
}


function _key_2(legend,chart_2){return(
legend({color: chart_2.scales.color, title: "Sheet type"})
)}

function _chart_2(d3,MU_factor)
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
      .domain(new Set(MU_factor.map(d => d.MU_factor)))
      .rangeRound([marginLeft, width - marginRight])
      .paddingInner(0.1);

  // Both x and color encode the metric class.
  const metrics = new Set(MU_factor.map(d => d.metric));

  const x = d3.scaleBand()
      .domain(metrics)
      .rangeRound([0, fx.bandwidth()])
      .padding(0.05);

  const color = d3.scaleOrdinal()
      .domain(metrics)
      .range(["#9F6BFF","#c8fa64","#00461e"])
      .unknown("#ccc");

  // Y encodes the height of the bar.
  const y = d3.scaleLinear()
      .domain([0, 12000])
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
    .data(d3.group(MU_factor, d => d.MU_factor))
    .join("g")
      .attr("transform", ([MU_factor]) => `translate(${fx(MU_factor)},0)`)
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


function _36(md){return(
md`<div style="color: black; font: 18px/25px var(--sans-serif);">

Here we see the frequency of MU factors by sheet type, from most to least prevalent. In all cases we can see that excel sheets considerably outweigh csvs. Below we can also see a full breakdown of the numbers by MU score and factor.`
)}

function _key_3(legend,chart_3){return(
legend({color: chart_3.scales.color, title: "MU score"})
)}

function _chart_3(d3,MU_full)
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
      .domain(new Set(MU_full.map(d => d.MU_factor)))
      .rangeRound([marginLeft, width - marginRight])
      .paddingInner(0.1);

  // Both x and color encode the metric class.
  const metrics = new Set(MU_full.map(d => d.metric));

  const x = d3.scaleBand()
      .domain(metrics)
      .rangeRound([0, fx.bandwidth()])
      .padding(0.05);

  const color = d3.scaleOrdinal()
      .domain(metrics)
      .range(["#c8fa64","#B4FAFF","#3278FF","#9F6BFF","#FFb432","#FAD464","#FA8282","#731E14"])
      .unknown("#ccc");

  // Y encodes the height of the bar.
  const y = d3.scaleLinear()
      .domain([0, 3500])
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
    .data(d3.group(MU_full, d => d.MU_factor))
    .join("g")
      .attr("transform", ([MU_factor]) => `translate(${fx(MU_factor)},0)`)
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


function _39(md){return(
md`<div style="color: black; font: 14px/20px var(--sans-serif);">

# Appendices`
)}

function _color8(){return(
["#e8e8e8","#731E14"]
)}

function _color7(){return(
["#e8e8e8","#FA8282"]
)}

function _color6(){return(
["#e8e8e8","#FAD464"]
)}

function _color5(){return(
["#e8e8e8","#FFb432"]
)}

function _color4(){return(
["#e8e8e8","#9F6BFF"]
)}

function _color3(){return(
["#e8e8e8","#3278FF"]
)}

function _color2(){return(
["#e8e8e8","#B4FAFF"]
)}

function _color1(){return(
["#e8e8e8","#c8fa64"]
)}

function _color(){return(
["#e8e8e8","#00461e"]
)}

async function _MU_score(mu_score_dist)
{
  let MU_score = await mu_score_dist;
  const metrics = MU_score.columns.slice(1);
  return metrics.flatMap((metric) => MU_score.map((d) => ({MU_score: d.MU_score, metric, value: d[metric]})));
}


async function _MU_factor(mu_factor_raw)
{
  let MU_factor = await mu_factor_raw;
  const metrics = MU_factor.columns.slice(1);
  return metrics.flatMap((metric) => MU_factor.map((d) => ({MU_factor: d.MU_factor, metric, value: d[metric]})));
}


async function _MU_full(mu_by_factor1)
{
  let MU_full = await mu_by_factor1;
  const metrics = MU_full.columns.slice(1);
  return metrics.flatMap((metric) => MU_full.map((d) => ({MU_factor: d.MU_factor, metric, value: d[metric]})));
}


function _mu_score_dist(FileAttachment){return(
FileAttachment("mu_score_dist@1.csv").csv({typed: true})
)}

function _mu_by_factor1(FileAttachment){return(
FileAttachment("mu_by_factor@2.csv").csv({typed: true})
)}

function _mu_factor_raw(FileAttachment){return(
FileAttachment("mu_factor@6.csv").csv({typed: true})
)}

function _hm_22755_0_0(FileAttachment){return(
FileAttachment("hm_22755_0_0.csv").csv({array: true, typed: true})
)}

function _hm_26596_0_0(FileAttachment){return(
FileAttachment("26596_0_0_hm.csv").csv({array: true, typed: true})
)}

function _hm_19875_0_0(FileAttachment){return(
FileAttachment("19875_0_0_hm.csv").csv({array: true, typed: true})
)}

function _hm_8217_0_0(FileAttachment){return(
FileAttachment("8217_0_0_hm.csv").csv({array: true, typed: true})
)}

function _hm_6417_0_0(FileAttachment){return(
FileAttachment("6417_0_0_hm.csv").csv({array: true, typed: true})
)}

function _hm_300_3_0(FileAttachment){return(
FileAttachment("300_3_0_hm.csv").csv({array: true, typed: true})
)}

function _hm_6981_0_1(FileAttachment){return(
FileAttachment("hm_6981_0_1.csv").csv({array: true, typed: true})
)}

function _hm_442_0_3(FileAttachment){return(
FileAttachment("hm_442_0_3.csv").csv({array: true, typed: true})
)}

function _hm_5891_6_4(FileAttachment){return(
FileAttachment("hm_5891_6_4.csv").csv({array: true, typed: true})
)}

function _hm_277_1_4(FileAttachment){return(
FileAttachment("hm_277_1_4.csv").csv({array: true, typed: true})
)}

function _hm_12124_0_8(FileAttachment){return(
FileAttachment("12124_0_8_hm.csv").csv({array: true, typed: true})
)}

function _hm_6136_24_7(FileAttachment){return(
FileAttachment("6136_24_7_hm.csv").csv({array: true, typed: true})
)}

function _hm_12245_6_6(FileAttachment){return(
FileAttachment("12245_6_6_hm.csv").csv({array: true, typed: true})
)}

function _hm_21680_1_5(FileAttachment){return(
FileAttachment("21680_1_5_hm.csv").csv({array: true, typed: true})
)}

function _hm_5961_16_4(FileAttachment){return(
FileAttachment("5961_16_4_hm.csv").csv({array: true, typed: true})
)}

function _hm_277_4_3(FileAttachment){return(
FileAttachment("277_4_3_hm.csv").csv({array: true, typed: true})
)}

function _hm_5578_7_2(FileAttachment){return(
FileAttachment("5578_7_2_hm.csv").csv({array: true, typed: true})
)}

function _hm_19232_5_1_hm(FileAttachment){return(
FileAttachment("19232_5_1_hm.csv").csv({array: true, typed: true})
)}

function _hm_261_0_0(FileAttachment){return(
FileAttachment("261_0_0_hm.csv").csv({array: true, typed: true})
)}

function _hm_14480_0_0(FileAttachment){return(
FileAttachment("14480_0_0_hm.csv").csv({array: true, typed: true})
)}

function _hm_23791_0_0(FileAttachment){return(
FileAttachment("23791_0_0_hm.csv").csv({array: true, typed: true})
)}

function _hm_14475_0_0(FileAttachment){return(
FileAttachment("14475_0_0_hm.csv").csv({array: true, typed: true})
)}

function _hm_23419_0_0(FileAttachment){return(
FileAttachment("23419_0_0_hm.csv").csv({array: true, typed: true})
)}

function _hm_15012_0_0(FileAttachment){return(
FileAttachment("15012_0_0_hm.csv").csv({array: true, typed: true})
)}

function _hm_25943_0_0(FileAttachment){return(
FileAttachment("25943_0_0_hm.csv").csv({array: true, typed: true})
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

function _long_4871_1(FileAttachment){return(
FileAttachment("long_4871_1.csv").csv({array: true, typed: true})
)}

function _long_5726_16(FileAttachment){return(
FileAttachment("long_5726_16.csv").csv({array: true, typed: true})
)}

function _long_12210_4(FileAttachment){return(
FileAttachment("long_12210_4.csv").csv({array: true, typed: true})
)}

function _long_22007_5(FileAttachment){return(
FileAttachment("long_22007_5.csv").csv({array: true, typed: true})
)}

function _short_5123_hm(FileAttachment){return(
FileAttachment("short_5123_hm.csv").csv({array: true, typed: true})
)}

function _95(htl){return(
htl.html`<div id="wrapper"></div>
<script src="http://d3js.org/d3.v5.min.js"></script>
<script src="https://d3js.org/d3-array.v2.min.js"></script>
<script src="./bar_chart.js"></script>`
)}

export default function define(runtime, observer) {
  const main = runtime.module();
  function toString() { return this.url; }
  const fileAttachments = new Map([
    ["mid_7908_hm@1.csv", {url: new URL("./files/34eec900efced01d391f3dd5887c4570ef80e2eaa90dcf3b30af4a18b9b8af7492484e273c5c659e1be69787d19407fd99a51dc99508f41665910e4776bf542d.csv", import.meta.url), mimeType: "text/csv", toString}],
    ["long_4871_1.csv", {url: new URL("./files/0b752c85753d921020ee72cfb94cd15584b3518a041dbe8cdcc5a297831b8b20cb4c93fefca4d6a2416cff6565bf5256e419235d1757ae02ecd23dc5cafc3035.csv", import.meta.url), mimeType: "text/csv", toString}],
    ["long_5726_16.csv", {url: new URL("./files/3b8892cda89fde54cf2b6b269a32b688ee87ba0c7bacd18a5d21e8b300a128a5fd90c2fc9a6bcaceb6a51b754376b064ba7d1e30a10e9e7b55f649fa6575b0e7.csv", import.meta.url), mimeType: "text/csv", toString}],
    ["long_12210_4.csv", {url: new URL("./files/692895b3e576aa240b333749b6bfffc52cfa581c9124419ceb8ceca3308290409ecfd5711eb98f2f3df2d09fafa3bcd5f6bb634a6018e3f918da3f12ffad7d03.csv", import.meta.url), mimeType: "text/csv", toString}],
    ["long_22007_5.csv", {url: new URL("./files/683f06d190b9134f032859bd87f48572500c9c3c432eb7713fff56400aa8ac1df628270e8b695dbab7a74fdb7c26b45bd6ffe52648a44fe629916ced43a3ffab.csv", import.meta.url), mimeType: "text/csv", toString}],
    ["mid_29_hm.csv", {url: new URL("./files/c8e128695fee6b8d946e5046714724f9b625c96123915de015f191e6c76bdbcd55b44fd03e0f37463b51615b669e6b13b4317ba703ff60564c23c03dee5cbb1c.csv", import.meta.url), mimeType: "text/csv", toString}],
    ["mid_5541_hm.csv", {url: new URL("./files/9546ea78ef30e52a50e6f9430781a4fc2af8c4638ae854a093afe275b99f88164d431fb479bb06f4d81056c17514074c87d87c674824f6f7d673cbcac2bea12d.csv", import.meta.url), mimeType: "text/csv", toString}],
    ["mid_28031_hm.csv", {url: new URL("./files/220b8c3c6f49290de1831c5276b06fade31e572c32764e2fb9a444294ff6098b8f62bd7bfd41564174415c37801fabd3844bfc815878aa6f4c1c5a520db5c8fb.csv", import.meta.url), mimeType: "text/csv", toString}],
    ["long_7680_hm.csv", {url: new URL("./files/28f023c65c89ad1f296a568f67d21b04fedc7c036426c0200707f6e1f6713b67e8b0bd43ffd560d6c7c0ae57db1d4fccfff2edec4c60310b5de45f663c614319.csv", import.meta.url), mimeType: "text/csv", toString}],
    ["long_5728_hm.csv", {url: new URL("./files/6fdab0f120f0201e5b09ac8de65a37287c5c1cade139c96da9ec3b8fa9f22d8819412c0f51edd206bf97b97b1be19450a89c4793812332f15fa513643e84abef.csv", import.meta.url), mimeType: "text/csv", toString}],
    ["short_5123_hm.csv", {url: new URL("./files/ecafab5aeb487d21ed2be69f56bf37fa6cece3efeb2e7549ed75aea02a33d451dc19ec7d51f063ff08e293c077d71b6e19285d9019ad687a9b7c9ea6b58f7c22.csv", import.meta.url), mimeType: "text/csv", toString}],
    ["long_5993_hm.csv", {url: new URL("./files/28f023c65c89ad1f296a568f67d21b04fedc7c036426c0200707f6e1f6713b67e8b0bd43ffd560d6c7c0ae57db1d4fccfff2edec4c60310b5de45f663c614319.csv", import.meta.url), mimeType: "text/csv", toString}],
    ["long_7886_hm.csv", {url: new URL("./files/a568621ded33bb24c8d5d318e5de7e4e52a3f643c9bc45ade5f59a9cf1a2ce88755f071082b74d987534678363dc8534882f2dfee41a6b9aa0ef7bd08add0e67.csv", import.meta.url), mimeType: "text/csv", toString}],
    ["25943_0_0_hm.csv", {url: new URL("./files/44f7af07302385a114ad26f69662983f74c1051773e780cda84a155784366ca6efd2417260dd78d54b41e5a0faaf5a1d650f96532cec95edf2c44206dea403b6.csv", import.meta.url), mimeType: "text/csv", toString}],
    ["15012_0_0_hm.csv", {url: new URL("./files/26ba82c4f29ea66e288a3e5ae0ff2f88cd3bc3dee502dc4f5e660055aac53467ed27fa16b770d13dce14144747ff9b9122ad8b2106e7147b917d807d61fdf4e7.csv", import.meta.url), mimeType: "text/csv", toString}],
    ["23419_0_0_hm.csv", {url: new URL("./files/c15a9e2e4dfcf62662d88fdfb2691254ac72519157837315da1fbd3de91b78abd48f65e2d3a9855565938dc55d71e89e211b1fe8cf3c5a783329a321605dceb4.csv", import.meta.url), mimeType: "text/csv", toString}],
    ["14475_0_0_hm.csv", {url: new URL("./files/f60541c1c7f6b958cb4a6a9a9fb0d68be8786fb910bb80fcbf75d5469c63f98420886964510a6d2a55104ba74a64dd8d2904045b5c0282326e7651a4ac7d17bc.csv", import.meta.url), mimeType: "text/csv", toString}],
    ["23791_0_0_hm.csv", {url: new URL("./files/9cd4a93763099ec0d94120592d0b5adad6bcd69feaea953cf088458dd7e33c68c0a6d0796dc9ff44a8cfd060d95087f8fe72a2724e1c89267a934e9051964581.csv", import.meta.url), mimeType: "text/csv", toString}],
    ["14480_0_0_hm.csv", {url: new URL("./files/671c462fec63efedfac0da53d33d8426538d7877fbc646957d33402be0c59bef42124c9be1d5955793c0bc79757ce5319bbfe8e0cc2993734a6d73669f2f83bb.csv", import.meta.url), mimeType: "text/csv", toString}],
    ["261_0_0_hm.csv", {url: new URL("./files/e105b0ffed04e1be30a0efaceeb1a23349bbde19a36b6b942f3239e7033692ce1a558aae24c0ed9e9132fbc18f7e58cdd0e23f263786fd21fa03b8a5d6eebb87.csv", import.meta.url), mimeType: "text/csv", toString}],
    ["19232_5_1_hm.csv", {url: new URL("./files/00492190a572b46d231bbcd092bb1c7944048f5068b6df92f3d568147f92f1655d8db71bd8af236ae4ab858ac22eaeb3c7a8cabab9197fc361551ca3aaf51b3f.csv", import.meta.url), mimeType: "text/csv", toString}],
    ["5578_7_2_hm.csv", {url: new URL("./files/64db51a5a4da6ffbdadf52c6775046dd6c431653f39e5935a527fb2328456e69f40a2bc351dda5de407f819f3d2959e40fcaff232c4a5d27f607f410010e5827.csv", import.meta.url), mimeType: "text/csv", toString}],
    ["277_4_3_hm.csv", {url: new URL("./files/9bbe73dd975632b9064b309ab01dcf8c64c623dbc87cb5b422a71e9b37276c928fa38b454e1de85f2a9b5073faa80fa579b8df2d866527790c33b050bed7061d.csv", import.meta.url), mimeType: "text/csv", toString}],
    ["5961_16_4_hm.csv", {url: new URL("./files/e70fde56fe7ab5c60540fa7eda10187b95dd18eb20bab9b851f2b7591dbd61b21af7cc502114f1483aba7cba25362a3944fd5d7871b5560d60243b10cc6b4f59.csv", import.meta.url), mimeType: "text/csv", toString}],
    ["21680_1_5_hm.csv", {url: new URL("./files/e2b72557d581bcc13991388eeafcc4f2ee04c1b507a1e65da0bd8a48ad98c1c11431367c7cb56146f5f5ad8010b8c2c221ea35a15002294a8c5bc02e1fc27a4a.csv", import.meta.url), mimeType: "text/csv", toString}],
    ["12245_6_6_hm.csv", {url: new URL("./files/935c563be75a5499c8108f73dacb713b48ba4f3756ba9d7cb4c494f08f135c2dc99a6c113b84f1b444c75df6c4085a962f28fef743d3c6d7552267d0d648c681.csv", import.meta.url), mimeType: "text/csv", toString}],
    ["6136_24_7_hm.csv", {url: new URL("./files/b7e0f3b4ee2f5dd7adc99c31e5f2dd15767155075831ea16204acae698701fd17cd9ab81d6fbe08dbe0574789fd76fa94d35a47ede56cf20135485485a471796.csv", import.meta.url), mimeType: "text/csv", toString}],
    ["12124_0_8_hm.csv", {url: new URL("./files/a345d3055bd2db980d9bb0afcf0a43fcbff50a4004176202315f1c8ee6466ebd13c403c8615dffd235102edece52ecdcb114cc1cc5ef7a01520d4618c0c2e11d.csv", import.meta.url), mimeType: "text/csv", toString}],
    ["hm_277_1_4.csv", {url: new URL("./files/72d38296d82640efe99a3d43da39f651d1afc45d89e83a192f3705815a6404ce5f8f5fd6bf27229b03fb1591b59b43903fe042b4cb380c1da8928d5c2a3d97b6.csv", import.meta.url), mimeType: "text/csv", toString}],
    ["hm_5891_6_4.csv", {url: new URL("./files/0ac99d72f7a33065d4be67a6b03668966e8502dfbdec2e3e8f0687ace8942d230bfdf7780ad10348f5d340625787211e7d30530326ad85be4b9686a293eb835f.csv", import.meta.url), mimeType: "text/csv", toString}],
    ["hm_442_0_3.csv", {url: new URL("./files/070982017e71f235677cae60a2f3b8a995a261daf6114c042eb1feed87777164e2152cfdec891bbdcea9a5e547c66f477221c3250bda3f737d4b2436d222b712.csv", import.meta.url), mimeType: "text/csv", toString}],
    ["hm_6981_0_1.csv", {url: new URL("./files/40ee8aa7340f5a3539cf6a5fc5d4c52087c4078e371eff1403235b1130efd2ccd5fd3c3469fb02a3470618f82957915d993eab361fd6f5022a7179b59a8ce81b.csv", import.meta.url), mimeType: "text/csv", toString}],
    ["300_3_0_hm.csv", {url: new URL("./files/ebceb463f4a4e5720764dbf6fbec3cf9ce9315dc8a9ce3d435ac03b6a1403857f47b126b8235720c188b7a904620ad395a5c4da0b28b877db2712c2fa9fc1ca3.csv", import.meta.url), mimeType: "text/csv", toString}],
    ["6417_0_0_hm.csv", {url: new URL("./files/cd92bc1ffa18c104d3d4216822227ecf776e6e84f31a99ee0c10ad364f3b83a6e2bdd978980768076cee0d5587509f5c00c92cb8dc7a32c387be457ca00c95e7.csv", import.meta.url), mimeType: "text/csv", toString}],
    ["8217_0_0_hm.csv", {url: new URL("./files/906b746d3803ab06f0f2b857bcafc6565c5ec2d09ebd248aebd43a96c44194f72340019d1e197f8ad0a48ea3e0ade0bae2c0b901568c2d018f8476fdf994bf05.csv", import.meta.url), mimeType: "text/csv", toString}],
    ["19875_0_0_hm.csv", {url: new URL("./files/51a4d484c7de2b0c5984cfc4ddd14600f8b169ccd80c3f95b9f50d866bcdfcc3a447c641fcf062d178d2b26a000bcdeeae3ae655731577d7a8af1ce5905c9c58.csv", import.meta.url), mimeType: "text/csv", toString}],
    ["26596_0_0_hm.csv", {url: new URL("./files/3ba6283d8d0e6cfcfa53032e713193918e79abec0102fa63d6fb1b37f3cc05b444cd0b8a96b711a9dc16f11f1f6c976f8607784310c1aad2f2a89bc6fc354977.csv", import.meta.url), mimeType: "text/csv", toString}],
    ["hm_22755_0_0.csv", {url: new URL("./files/366f31ac72815adc9f00a96bbc1217e6cf7979bc3fa5867843f007a4c78ed535ff46b46c5bf019ed6893b29239a6b569cf595b28426fab36c791c8079aed7481.csv", import.meta.url), mimeType: "text/csv", toString}],
    ["mu_score_dist@1.csv", {url: new URL("./files/5f125d90fefb4e090e471977b3a423463b2ead65370288cb9cd9dc4490f8b096d9d05dff58e52990207df6dfe8b4e58ce9d968fd05e2c9c5d9b9201110abc89e.csv", import.meta.url), mimeType: "text/csv", toString}],
    ["mu_factor@6.csv", {url: new URL("./files/f364937530e759d1de5bbd3c1e07b5ff9bb595626cf4a9031537cf0e7eaf846e8c453584120b35e6e1a57fb7569350d068b8eb98bb4467d2a681a1d33e01fbb5.csv", import.meta.url), mimeType: "text/csv", toString}],
    ["mu_by_factor@2.csv", {url: new URL("./files/50b68959ce1ecf15eddb0937990b7c32b8ccc3cb256725b5cd6061fe736351d8d762f35178b745fecf31a66b1edd50da539fb8b01cd878576be7f3735a470c74.csv", import.meta.url), mimeType: "text/csv", toString}]
  ]);
  main.builtin("FileAttachment", runtime.fileAttachments(name => fileAttachments.get(name)));
  main.variable(observer()).define(["md"], _1);
  main.variable(observer()).define(["md"], _2);
  main.variable(observer("key_1")).define("key_1", ["legend","chart_1"], _key_1);
  main.variable(observer("chart_1")).define("chart_1", ["d3","MU_score"], _chart_1);
  main.variable(observer()).define(["md"], _5);
  main.variable(observer()).define(["table","mu_score_dist"], _6);
  main.variable(observer()).define(["md"], _7);
  main.variable(observer()).define(["plt","plt2","plt3","plt4","plt5","plt6","plt7","plt8","plt9","plt10","plt11","plt12","plt13","plt14","plt15","plt16","plt17","plt18","plt19","plt20","plt21","plt22","plt23","plt24","plt25","htl"], _8);
  main.variable(observer("plt")).define("plt", ["d3","width","hm_12124_0_8","color8"], _plt);
  main.variable(observer("plt2")).define("plt2", ["d3","width","hm_6136_24_7","color7"], _plt2);
  main.variable(observer("plt3")).define("plt3", ["d3","width","hm_12245_6_6","color6"], _plt3);
  main.variable(observer("plt4")).define("plt4", ["d3","width","hm_21680_1_5","color5"], _plt4);
  main.variable(observer("plt5")).define("plt5", ["d3","width","hm_5961_16_4","color4"], _plt5);
  main.variable(observer("plt6")).define("plt6", ["d3","width","hm_5891_6_4","color4"], _plt6);
  main.variable(observer("plt7")).define("plt7", ["d3","width","hm_277_1_4","color4"], _plt7);
  main.variable(observer("plt8")).define("plt8", ["d3","width","hm_277_4_3","color3"], _plt8);
  main.variable(observer("plt9")).define("plt9", ["d3","width","hm_442_0_3","color3"], _plt9);
  main.variable(observer("plt10")).define("plt10", ["d3","width","hm_5578_7_2","color2"], _plt10);
  main.variable(observer("plt11")).define("plt11", ["d3","width","hm_6981_0_1","color1"], _plt11);
  main.variable(observer("plt12")).define("plt12", ["d3","width","hm_19232_5_1_hm","color1"], _plt12);
  main.variable(observer("plt13")).define("plt13", ["d3","width","hm_22755_0_0","color1"], _plt13);
  main.variable(observer("plt14")).define("plt14", ["d3","width","hm_261_0_0","color"], _plt14);
  main.variable(observer("plt15")).define("plt15", ["d3","width","hm_14480_0_0","color"], _plt15);
  main.variable(observer("plt16")).define("plt16", ["d3","width","hm_23791_0_0","color"], _plt16);
  main.variable(observer("plt17")).define("plt17", ["d3","width","hm_14475_0_0","color"], _plt17);
  main.variable(observer("plt18")).define("plt18", ["d3","width","hm_23419_0_0","color"], _plt18);
  main.variable(observer("plt19")).define("plt19", ["d3","width","hm_15012_0_0","color"], _plt19);
  main.variable(observer("plt20")).define("plt20", ["d3","width","hm_25943_0_0","color"], _plt20);
  main.variable(observer("plt21")).define("plt21", ["d3","width","hm_300_3_0","color"], _plt21);
  main.variable(observer("plt22")).define("plt22", ["d3","width","hm_6417_0_0","color"], _plt22);
  main.variable(observer("plt23")).define("plt23", ["d3","width","hm_8217_0_0","color"], _plt23);
  main.variable(observer("plt24")).define("plt24", ["d3","width","hm_19875_0_0","color"], _plt24);
  main.variable(observer("plt25")).define("plt25", ["d3","width","hm_26596_0_0","color"], _plt25);
  main.variable(observer("key_2")).define("key_2", ["legend","chart_2"], _key_2);
  main.variable(observer("chart_2")).define("chart_2", ["d3","MU_factor"], _chart_2);
  main.variable(observer()).define(["md"], _36);
  main.variable(observer("key_3")).define("key_3", ["legend","chart_3"], _key_3);
  main.variable(observer("chart_3")).define("chart_3", ["d3","MU_full"], _chart_3);
  main.variable(observer()).define(["md"], _39);
  main.variable(observer("color8")).define("color8", _color8);
  main.variable(observer("color7")).define("color7", _color7);
  main.variable(observer("color6")).define("color6", _color6);
  main.variable(observer("color5")).define("color5", _color5);
  main.variable(observer("color4")).define("color4", _color4);
  main.variable(observer("color3")).define("color3", _color3);
  main.variable(observer("color2")).define("color2", _color2);
  main.variable(observer("color1")).define("color1", _color1);
  main.variable(observer("color")).define("color", _color);
  main.variable(observer("MU_score")).define("MU_score", ["mu_score_dist"], _MU_score);
  main.variable(observer("MU_factor")).define("MU_factor", ["mu_factor_raw"], _MU_factor);
  main.variable(observer("MU_full")).define("MU_full", ["mu_by_factor1"], _MU_full);
  main.variable(observer("mu_score_dist")).define("mu_score_dist", ["FileAttachment"], _mu_score_dist);
  main.variable(observer("mu_by_factor1")).define("mu_by_factor1", ["FileAttachment"], _mu_by_factor1);
  main.variable(observer("mu_factor_raw")).define("mu_factor_raw", ["FileAttachment"], _mu_factor_raw);
  main.variable(observer("hm_22755_0_0")).define("hm_22755_0_0", ["FileAttachment"], _hm_22755_0_0);
  main.variable(observer("hm_26596_0_0")).define("hm_26596_0_0", ["FileAttachment"], _hm_26596_0_0);
  main.variable(observer("hm_19875_0_0")).define("hm_19875_0_0", ["FileAttachment"], _hm_19875_0_0);
  main.variable(observer("hm_8217_0_0")).define("hm_8217_0_0", ["FileAttachment"], _hm_8217_0_0);
  main.variable(observer("hm_6417_0_0")).define("hm_6417_0_0", ["FileAttachment"], _hm_6417_0_0);
  main.variable(observer("hm_300_3_0")).define("hm_300_3_0", ["FileAttachment"], _hm_300_3_0);
  main.variable(observer("hm_6981_0_1")).define("hm_6981_0_1", ["FileAttachment"], _hm_6981_0_1);
  main.variable(observer("hm_442_0_3")).define("hm_442_0_3", ["FileAttachment"], _hm_442_0_3);
  main.variable(observer("hm_5891_6_4")).define("hm_5891_6_4", ["FileAttachment"], _hm_5891_6_4);
  main.variable(observer("hm_277_1_4")).define("hm_277_1_4", ["FileAttachment"], _hm_277_1_4);
  main.variable(observer("hm_12124_0_8")).define("hm_12124_0_8", ["FileAttachment"], _hm_12124_0_8);
  main.variable(observer("hm_6136_24_7")).define("hm_6136_24_7", ["FileAttachment"], _hm_6136_24_7);
  main.variable(observer("hm_12245_6_6")).define("hm_12245_6_6", ["FileAttachment"], _hm_12245_6_6);
  main.variable(observer("hm_21680_1_5")).define("hm_21680_1_5", ["FileAttachment"], _hm_21680_1_5);
  main.variable(observer("hm_5961_16_4")).define("hm_5961_16_4", ["FileAttachment"], _hm_5961_16_4);
  main.variable(observer("hm_277_4_3")).define("hm_277_4_3", ["FileAttachment"], _hm_277_4_3);
  main.variable(observer("hm_5578_7_2")).define("hm_5578_7_2", ["FileAttachment"], _hm_5578_7_2);
  main.variable(observer("hm_19232_5_1_hm")).define("hm_19232_5_1_hm", ["FileAttachment"], _hm_19232_5_1_hm);
  main.variable(observer("hm_261_0_0")).define("hm_261_0_0", ["FileAttachment"], _hm_261_0_0);
  main.variable(observer("hm_14480_0_0")).define("hm_14480_0_0", ["FileAttachment"], _hm_14480_0_0);
  main.variable(observer("hm_23791_0_0")).define("hm_23791_0_0", ["FileAttachment"], _hm_23791_0_0);
  main.variable(observer("hm_14475_0_0")).define("hm_14475_0_0", ["FileAttachment"], _hm_14475_0_0);
  main.variable(observer("hm_23419_0_0")).define("hm_23419_0_0", ["FileAttachment"], _hm_23419_0_0);
  main.variable(observer("hm_15012_0_0")).define("hm_15012_0_0", ["FileAttachment"], _hm_15012_0_0);
  main.variable(observer("hm_25943_0_0")).define("hm_25943_0_0", ["FileAttachment"], _hm_25943_0_0);
  main.variable(observer("mid_7908_hm")).define("mid_7908_hm", ["FileAttachment"], _mid_7908_hm);
  main.variable(observer("mid_29_hm")).define("mid_29_hm", ["FileAttachment"], _mid_29_hm);
  main.variable(observer("mid_5541_hm")).define("mid_5541_hm", ["FileAttachment"], _mid_5541_hm);
  main.variable(observer("mid_28031_hm")).define("mid_28031_hm", ["FileAttachment"], _mid_28031_hm);
  main.variable(observer("long_7886_hm")).define("long_7886_hm", ["FileAttachment"], _long_7886_hm);
  main.variable(observer("long_5728_hm")).define("long_5728_hm", ["FileAttachment"], _long_5728_hm);
  main.variable(observer("long_5993_hm")).define("long_5993_hm", ["FileAttachment"], _long_5993_hm);
  main.variable(observer("long_7680_hm")).define("long_7680_hm", ["FileAttachment"], _long_7680_hm);
  main.variable(observer("long_4871_1")).define("long_4871_1", ["FileAttachment"], _long_4871_1);
  main.variable(observer("long_5726_16")).define("long_5726_16", ["FileAttachment"], _long_5726_16);
  main.variable(observer("long_12210_4")).define("long_12210_4", ["FileAttachment"], _long_12210_4);
  main.variable(observer("long_22007_5")).define("long_22007_5", ["FileAttachment"], _long_22007_5);
  main.variable(observer("short_5123_hm")).define("short_5123_hm", ["FileAttachment"], _short_5123_hm);
  const child1 = runtime.module(define1);
  main.import("legend", child1);
  const child2 = runtime.module(define2);
  main.import("table", child2);
  main.variable(observer()).define(["htl"], _95);
  return main;
}
