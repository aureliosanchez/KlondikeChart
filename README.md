# KlondikeChart
jQuery Library for Creating HTML5 Charts
<br>
Current Release Version 1.5
<br>
Copyrigth 2016, Aurelio Sanchez Carrillo
<br>
Released under the GNU GENERAL PUBLIC LICENSE

This is an open source project that allows users to create data charts inmediatly using HTML5's Canvas property and the jCanvas plugin (see GitHub project: https://github.com/caleb531/jcanvas)

#Release Features
<h3>Full Responsive Line Chart:</h3>
<img src="https://raw.githubusercontent.com/aureliosanchez/KlondikeChart/master/SampleImages/KlonidkeChartProjectImage1.png">
<h3>Full Responsive Donut Chart:</h3>
<img src="https://raw.githubusercontent.com/aureliosanchez/KlondikeChart/master/SampleImages/KlonidkeChartProjectImage2.png">

# SetUp
This project requires jQuery 2.1 or later 
<br>
Add the jQuery library to your HTML head tag (visit: http://jquery.com/download/)
<br>
Add the jCanvas plugin to your HTML head tag (visit: http://projects.calebevans.me/jcanvas/)
<br>
Add the KlondikeChart jQuery library to your HTML head tag (download from this post located in the "Script" folder)
<br>
Add the KlondikeChart Main CSS file to your HTML head tag (download from this post located in the "CSS" folder)
<br><br>
<h3>Line Chart SetUp:</h3>
Open a `<script>` tag in your html document where you call the `LineChart()` function and declare all of its configuration variables:
<br>
```
<script type="text/javascript">
	var myLineCanvas = $("#LineChart"); //Stores the Canvas ID
	var lineColor = "#e88320"; //Sets the color of the line in the chart 
	var lineStroke = 3; //Determines the line stroke width
	var CanvasBackground = "#2a343f"; //Sets the color of the Canvas Background
	var gridLineColor = "#767676"; //Sets the chart's grid lining color 
	var gridNumeralColor = "#fff"; //
	var gridLineFrecuency = .005;
	var GridNumeralDecimals = 4;
	var ChartAvarage = true;
	var XValues = ["Jan", "Feb", ""];
	var YValues = [1.1292, 1.1207,  1.1260, 1.1225, 1.1277, 1.1314, 1.1242, 1.1296, 1.1385, 1.1117, 1.1025, 1.1065, 1.1125, 1.1106, 1.1136, 1.1154, 1.1076, 1.1100, 1.1063, 1.1051, 1.1058, 1.1062];
	LineChart();
</script>
```



