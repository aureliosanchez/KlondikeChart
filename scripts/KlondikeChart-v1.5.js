/*Klondike Chart V1.5
	Developed by Aurelio Sanchez Carrillo.
	OpenSource Project - Last Update 14/07/2016
	Aurelio Carrillo (AC)
	Read the License Attached to this Project
*/

DonutChart = function(){ 
	/*Store the canvas object into a variable and declares all of its properties:*/
	//var myDonutCanvas = defined by user in html document;
	//var DonutRadius = defined by user in html document;
	//var DonutStroke = defined by user in html document;
	//var DonutXPosition = defined by user in html document;
	//var DonutYPosition = defined by user in html document;
	var decColor = 10347033;
	var hexColor = 0;

	/*Store the values and all its variants to be displayed:*/
	//var statsNames = defined by user in html document;
	//var stats = defined by user in html document;
	var percentages = [];
	var degrees = [];
	var StartPoints = [];
	var EndPoints = [];

	/*Transforms the original values into all required variants*/
	var totalStats = 0;
	for(i = 0; i<stats.length; i++){totalStats = totalStats + stats[i];}
	for(i = 0; i<stats.length; i++){
		var percent = (stats[i] * 100) / totalStats;
		percentages[i] = percent;
	}
	for(i = 0; i<stats.length; i++){
		var degree = (percentages[i] * 360) / 100;
		degrees[i] = degree;
	}

	/*Draws the chart usign the previously transformed data*/
	var startingPoint = 0;
	var endPoint = 0; 
	for(i=0; i<stats.length; i++){
		endPoint = endPoint + degrees[i];
		hexColor = decColor.toString(16);
		myDonutCanvas.drawArc({
			strokeStyle: "#" + hexColor,
			strokeWidth: DonutStroke,
			x: DonutXPosition, y: DonutYPosition,
			radius: DonutRadius,
			start: startingPoint, end: endPoint 
		});
		StartPoints [i] = startingPoint;
		EndPoints [i] = endPoint; 
		startingPoint = endPoint;
		decColor = decColor - 857569;
		if(decColor == 6916757){
			decColor = decColor + 3*857569;
		}
	}

	/*Creates StatDiv*/
	myDonutCanvas.after("<div id='StatBox'></div>");

	/*Detects if the mouse muves over the chart*/
	myDonutCanvas.mousemove(function(event){
		var CanvasPosition = myDonutCanvas.position()
		var Xposition = ((event.pageX) - DonutXPosition) - CanvasPosition.left;
		var Yposition = (((event.pageY) - DonutYPosition) - CanvasPosition.top) * -1;
		var MagPosition = Math.sqrt((Xposition * Xposition) + (Yposition * Yposition));
		var PointingArea = DonutRadius + DonutStroke/2;
		
		if(MagPosition < PointingArea){
			var Deg = Math.atan2(Xposition, Yposition) * (180/Math.PI) ;
			var pointingAtStatName;
			var pointingAtStat;
			var pointingAtPercent;
			if(Deg < 0){
				Deg = (((Deg * -1) - 180) * -1) + 180;
			} 
			for (i=0; i<stats.length; i++){
				if(Deg >= StartPoints[i] && Deg < EndPoints[i]){
					pointingAtStatName = statsNames[i];
					pointingAtStat = stats[i];
					pointingAtPercent = percentages[i]
				}
			}
			$("#StatBox").css("visibility", "visible");
			$("#StatBox").css("top", Yposition * -1 + CanvasPosition.top + DonutYPosition);
			$("#StatBox").css("left", Xposition + CanvasPosition.left + DonutXPosition + 40);
			$("#StatBox").text(pointingAtStatName + ": " + pointingAtStat + " = " + pointingAtPercent.toFixed(2) + "%");
		}else{
			$("#StatBox").css("visibility", "hidden");
		}

	});
};

LineChart = function(){
	/*Store the canvas object into a variable and declares all of its properties:*/
	//var myLineCanvas = defined by user in html document
	//var lineColor = defined by user in html document
	//var lineStroke = defined by user in html document
	//var CanvasBackground = defined by user in html document
	//var gridLineColor = defined by user in html document
	//var gridScale = defined by user in html document
	var canvasHeight = myLineCanvas.attr("height") - 10;
	var canvasWidth = myLineCanvas.attr("width") - 45;
	myLineCanvas.css("background", CanvasBackground);

	/*Stores the values later to be used in the chart*/
	//var XValues = defined by user in html document
	//var YValues = defined by user in html document
	var DiferentialValues = [];
	var YProportionalValues = [];
	var XCoordinates = [];
	var YCoordinates = [];

	/*Determines the limit for both X and Y values to compress data in the chart*/
	var XInterval = canvasWidth / XValues.length;
	console.log("El intervalo de aumento en x es = " + XInterval);//delete  reference only
	var YHighest = YValues[0];
	var YLowest = YValues[0];
	var HighesLowestDif = 0;
	for(i=0; i<YValues.length; i++){
		if(YValues[i] > YHighest){
			YHighest = YValues[i];
		}else if(YValues[i] < YLowest){
			YLowest = YValues[i];
		}
	}
	HighesLowestDif = (YHighest - YLowest) + ((YHighest - YLowest) * .15);
	console.log("El valor mayor de la serie de valores es = " + YHighest + " el menor es = " + YLowest + " y la diferencia aplicada el 15% - es de = " + HighesLowestDif);//de;ete  reference only
	for (i=0; i<YValues.length; i++){
		DiferentialValues[i] = YValues[i] - YLowest;
	}
	for (i=0; i<YValues.length; i++){
		YProportionalValues[i] = (DiferentialValues[i] * canvasHeight) / HighesLowestDif;
	}

	/*Draws the grid*/
	//var gridLineFrecuency = defined by user in html document
	//var GridNumeralDecimals = defined by user in html document
	//var gridNumeralColor = defined by user in html document
	var e = 1;
	for(i=YLowest; i<=YHighest; i += gridLineFrecuency){
		myLineCanvas.drawLine({
			layer: true,
			name: "GridLining" + e,
			strokeStyle: gridLineColor,
			strokeWidth: 1,
			x1: 0, y1: canvasHeight - (((i - YLowest) * canvasHeight) / HighesLowestDif),
			x2: canvasWidth, y2: canvasHeight - (((i - YLowest) * canvasHeight) / HighesLowestDif)
		});
		myLineCanvas.drawText({
			layer: true,
			name: "GridNumeral" + e,
		  	fillStyle: gridNumeralColor,
		  	x: canvasWidth + 20, y: canvasHeight - (((i - YLowest) * canvasHeight) / HighesLowestDif) - 2,
		  	fontSize: 10,
		  	fontFamily: 'Arial',
		  	text: i.toFixed(GridNumeralDecimals)
		});
		e = e + 1;
	}
	
	/*Draws the Chart*/
	//var ChartAvarage = defined by user in html document
	var XStart = 0;
	var obj = {
	  layer: true,
	  name: "Chart",	
	  strokeStyle: lineColor,
	  strokeWidth: lineStroke,
	};
	if(ChartAvarage == true){
		var YValuesSum = 0;
		var YValuesAvg = 0;
		for(i=0; i<YValues.length; i++){
			YValuesSum = YValuesSum + YValues[i];
		}
		YValuesAvg = YValuesSum / YValues.length;
		myLineCanvas.drawLine({
			layer: true,
			name: "ChartAvarage",
			strokeStyle: lineColor,
			strokeWidth: 2,
			strokeDash: [3],
 			strokeDashOffset: 0,
			x1: 0, y1: canvasHeight - (((YValuesAvg - YLowest) * canvasHeight) / HighesLowestDif),
			x2: canvasWidth, y2: canvasHeight - (((YValuesAvg - YLowest) * canvasHeight) / HighesLowestDif)
		});
		console.log("El promedio es = " + YValuesAvg);//delete  reference only
		for (i = 0; i < XValues.length; i++) {
		  obj['x'+(i+1)] = XStart;
		  obj['y'+(i+1)] = canvasHeight - YProportionalValues[i];
		  XCoordinates[i] = XStart;
		  YCoordinates[i] = canvasHeight - YProportionalValues[i];
		  XStart = XStart + XInterval;
		}
		myLineCanvas.drawLine(obj);
	}else{
		for (i = 0; i < XValues.length; i++) {
		  obj['x'+(i+1)] = XStart;
		  obj['y'+(i+1)] = canvasHeight - YProportionalValues[i];
		  XCoordinates[i] = XStart;
		  YCoordinates[i] = canvasHeight - YProportionalValues[i];
		  XStart = XStart + XInterval;
		}
		myLineCanvas.drawLine(obj);
	}
	myLineCanvas.drawLine({
		layer: true,
		name: "MovingRow",
		strokeStyle: lineColor,
		strokeWidth: 1,
		strokeDash: [2],
		strokeDashOffset: 3,
		x1: XCoordinates[XCoordinates.length-1], y1: 0,
		x2: XCoordinates[XCoordinates.length-1], y2: canvasHeight
	});
	myLineCanvas.drawArc({
		layer: true,
		name: "MovingDot",
		fillStyle: lineColor,
		strokeStyle: gridNumeralColor,
		strokeWidth: 2,
		x: XCoordinates[XCoordinates.length-1], y: YCoordinates[YCoordinates.length-1],
		radius: 6
	});
	myLineCanvas.drawRect({
		layer: true,
		name: "MovingSquere",
		fillStyle: lineColor,
	  	x:XCoordinates[XCoordinates.length-1], y: 10,
	  	width: 85,
	  	height: 20
	});
	myLineCanvas.drawText({
		layer: true,
		name: "PointingValue",
	  	fillStyle: "#fff",
	  	x: XCoordinates[XCoordinates.length-1], y: 10,
	  	fontSize: 10,
	  	fontFamily: 'Arial',
	  	text: XValues[XValues.length-1] + " = " + YValues[YValues.length-1]
	});

	/*Detects if the mouse muves over the chart*/
	myLineCanvas.mousemove(function(event){
		var LineCanvasPosition = myLineCanvas.position();
		var LineXposition = event.pageX - LineCanvasPosition.left;
		var LineYposition = ((event.pageY - LineCanvasPosition.top));
		for(i=0; i<=XValues.length; i++){
			var PreviousCoordinate = XCoordinates[i-1];
			var NextCoordinate = XCoordinates[i];
			if(LineXposition.toFixed(0) < NextCoordinate && LineXposition.toFixed(0) > PreviousCoordinate){
				myLineCanvas.removeLayer("MovingRow").drawLayers();
				myLineCanvas.removeLayer("MovingDot").drawLayers();
				myLineCanvas.removeLayer("MovingSquere").drawLayers();
				myLineCanvas.removeLayer("PointingValue").drawLayers();
				myLineCanvas.drawLine({
					layer: true,
					name: "MovingRow",
					strokeStyle: lineColor,
					strokeWidth: 1,
					strokeDash: [2],
					strokeDashOffset: 3,
					x1: XCoordinates[i], y1: 0,
					x2: XCoordinates[i], y2: canvasHeight
				});
				myLineCanvas.drawArc({
					layer: true,
					name: "MovingDot",
					fillStyle: lineColor,
					strokeStyle: gridNumeralColor,
					strokeWidth: 2,
					x: XCoordinates[i], y: YCoordinates[i],
					radius: 6
				});
				if(i == 1){
					myLineCanvas.drawRect({
						layer: true,
						name: "MovingSquere",
						fillStyle: lineColor,
					  	x: XCoordinates[i] + 20, y: 10,
					  	width: 85,
					  	height: 20
					});
					myLineCanvas.drawText({
						layer: true,
						name: "PointingValue",
					  	fillStyle: "#fff",
					  	x: XCoordinates[i] + 20, y: 10,
					  	fontSize: 10,
					  	fontFamily: 'Arial',
					  	text: XValues[i] + " = " + YValues[i]
					});
				}else{
					myLineCanvas.drawRect({
						layer: true,
						name: "MovingSquere",
						fillStyle: lineColor,
					  	x: XCoordinates[i], y: 10,
					  	width: 85,
					  	height: 20
					});
					myLineCanvas.drawText({
						layer: true,
						name: "PointingValue",
					  	fillStyle: "#fff",
					  	x: XCoordinates[i], y: 10,
					  	fontSize: 10,
					  	fontFamily: 'Arial',
					  	text: XValues[i] + " = " + YValues[i]
					});
				}
			}
		}
	});
};

