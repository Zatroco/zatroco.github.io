/*	SK_Boxes_Simulator.js by Zatroco, made in 9/21/2019, all rights reserved
*	Table of Content
*
*	Global Variables:
*		allValid	
*		colorInvalid
*		colorValid
*		defaultTitle
*		percentMin
*		percentMax
*		prizePools
*		textBoxInvalid
*		textBoxValid
*
*	Functions:
*		checkValid(id)
*		percentSum()
*		isEmpty(str)
*		isInRange(num, min, max)
*		isLargerThan(num, min)
*		feedBack(place, str, color)
*		debug(args)
*		timeStamp()
*		itemHTML(target)
*		poolHTML(target)
*		addItem(num)
*		removeitem(num)
*		bridge()
*		doSampling()
*
*	jQuery Functions:
*		#addPool
*		#removePool
*
*/
var allValid = false;
var colorInvalid = "#FF0E00";
var colorValid = "#00E715";
var defaultTitle = "Zatroco's Prize Box";
var percentMin = 0.0001;
var percentMax = 100;
var prizePools = 1;
var prizes = [1];
var textBoxInvalid = "2px solid " + colorInvalid;
var textBoxValid = "2px solid " + colorValid;

//Check whether each of the element in the input form is valid
function checkValid(id) {
	//Check which part of the element(s) should be checked
	debug("Checking valid for " + id, "o");
	var element = document.getElementById(id);
	//Check Title or Prize name
	if (id == "prizeBoxTitle") {
		var checkType = "title";
		var name = element.value;
		debug("Check type: Title", "i");
	}
	else if (id == "attempts" || id == "samples") {
		var checkType = "attempts";
		var num = element.value;
		debug("Check type: Attempts", "i");
	}
	else if (id.slice(0, 4) == "pool" && id.slice(6, 10) == "item") {
		var checkType = "prize";
		var name = element.value;
		debug("Check type: Prize", "i");
	}
	
	if (checkType == "title") {
		//Check if the string of the title is empty
		if (isEmpty(name)) {
			document.getElementById(id).value = defaultTitle;
			debug("The title is empty, changed to default", "w");
		}
		else {
			document.getElementById(id).style.border = textBoxValid;
			feedBack(id, "", colorValid)
			debug("Name of the title: " + name, "i");			
		}
		return;
	}
	else if (checkType == "prize") {
		//Check if the string of the title is empty
		if (isEmpty(name)) {
			allValid = false;
			document.getElementById(id).style.border = textBoxInvalid;
			feedBack(id, "Prize name cannot be empty.", colorInvalid)
			debug("The prize name is empty", "w");
		}
		else {
			document.getElementById(id).style.border = textBoxValid;
			feedBack(id, "", colorValid)
			debug("Name of the prize: " + name, "i");			
		}
		return;
	}
	else if (checkType == "attempts") {
		//Check if the string of the title is empty
		if (isEmpty(num)) {
			allValid = false;
			document.getElementById(id).style.border = textBoxInvalid;
			feedBack(id, "Attempts cannot be empty.", colorInvalid)
			debug("The attempt input is empty", "w");
		}
		else if (!isLargerThan(parseFloat(num), 1)) {
			allValid = false;
			document.getElementById(id).style.border = textBoxInvalid;
			feedBack(id, "Invalid attempts.", colorInvalid)
			debug("Input invalid number of attempts", "w");
		}
		else if (!Number.isInteger(parseFloat(num))) {
			allValid = false;
			document.getElementById(id).style.border = textBoxInvalid;
			feedBack(id, "Attempts must be in integer.", colorInvalid)
			debug("Number of attempts is not in integer", "w");
		}
		else {
			document.getElementById(id).style.border = textBoxValid;
			feedBack(id, "", colorValid)
			debug("Attempts: " + num, "i");			
		}
		return;
	}
	
	//Check Pool Percentage input
	if (id.slice(0, 4) == "pool") {
		var base = id.slice(0, 4);
		var index = id.slice(4, 5);
		debug("The base of the element is: " + base + ", and the index is: " + index, "i");	
		var percent = element.value;
		if (isEmpty(percent)) {
			allValid = false;
			document.getElementById(id).style.border = textBoxInvalid;
			feedBack(id, "Input cannot be empty.", colorInvalid)
			debug("The input was empty", "w");
		}
		else if (!isInRange(percent, percentMin, percentMax)) {
			allValid = false;
			document.getElementById(id).style.border = textBoxInvalid;
			feedBack(id, "Percentage must be in range between " + percentMin + " and " + percentMax, colorInvalid)
			debug("The input was out of range", "w");
		}
		else {
			document.getElementById(id).style.border = textBoxValid;
			feedBack(id, "", colorValid)
			debug("Percentage is: " + percent, "i");			
		}
		if (!percentSum()) {
			allValid = false;
			debug("The percentage sum is not at 100%", "w");
		}
		else {
			debug("The percentage sum stays at 100%", "i");
		}
		return;
	}
}

//Calculate the sum of the percentage of the prize pool(s)
function percentSum() {
	var sum = 0;
	for (var i = 0; i < prizePools; i++) {
		sum += parseFloat(document.getElementById("pool" + i).value);
	}
	sum = parseFloat(sum);
	if (sum == 100) {
		feedBack("percentSum", sum + "%", colorValid)
		return true;
	}
	else {
		feedBack("percentSum", sum + "%, the total MUST be 100%", colorInvalid)
		return false;
	}
	return false;
}

//Check if the input is empty
function isEmpty(str) {
	if (str === "")
		return true;
	else
		return false;
}

//Check if the input is out of range
function isInRange(num, min, max) {
	return (num >= min && num <= max)
}
function isLargerThan(num, min) {
	debug("num: " + num + "; min: " + min, "i");
	return (num >= min)
}

//Send feedback to user
function feedBack(place, str, color) {
	var checkPlace = place + "_check";
	document.getElementById(checkPlace).style.color = color;
	document.getElementById(checkPlace).innerHTML = str;
}

//Debug log to console, which add a time stamp in front of it
function debug(str, type) {
	var op = "";
	var color = "color: #";
	switch (type) {
		case "i":	//Info: Display information about the operation
			op = "(INFO)"; 
			color += "0065A2";
			break;	
		case "o":	//Operation: Display operation action done
			op = "(OPERATION)"; 
			color += "590073";
			break;	
		case "w":	//Warning: Display warning in the operation, user may need to review the action
			op = "(WARNING)"; 
			color += "B96C00";
			break;	
	}
	//Combine the string together to generate a log report
	str = "[" + timeStamp() + "] " + op + " " + str;
	console.log("%c" + str, color);
}

//Automatic function that place a fixed time stamp format to debug() function
function timeStamp() {
	var finalStr = "";
	var d = new Date();
	finalStr = (d.getMonth() + 1) + "/" 
			+ d.getDate() + "/"
			+ d.getFullYear() + " "
			+ d.getHours() + ":"
			+ d.getMinutes() + ":"
			+ d.getSeconds();
	return finalStr;
}

//Preset HTML for adding a new item
function itemHTML(target, item) {
	return "<p id = \"pool" + target + "_prize" + (item - 1) + "\">"
			+ "Prize " + item + ": "
			+ "<input type = \"text\" id = \"pool" + target + "_item" + (item - 1) + "\" size = \"50\" value = \"\" onchange = \"checkValid('pool" + target + "_item" + (item - 1) + "')\" /> "
			+ "<span id = \"pool" + target + "_item" + (item - 1) + "_check\"></span>"
			+ "</p>";
}

function poolHTML(target) {
	return "<div id = \"pool_" + target + "\">"
			+ "<h4>Pool " + (target + 1) + ":</h4>"
			+ "<input type = \"button\" id = \"addItem" + target + "\" value = \"Add Prize Item\" onclick = \"addItem(" + target + ")\" /> "
			+ "<input type = \"button\" id = \"removeItem" + target + "\" value = \"Remove Prize Item\" onclick = \"removeItem(" + target + ")\" />"
			+ "<p id = \"pool" + target + "_percent\">"
			+ "Win Percentage: "
			+ "<input type = \"number\" id = \"pool" + target + "\" size = \"10\" value = \"1\" min = \"0.0001\" max = \"100\" onchange = \"checkValid('pool" + target + "')\" />"
			+ "%"
			+ "<span id = \"pool" + target + "_check\"></span>"
			+ "<p>"
			+ "<div class = \"prizes\" id = \"pool" + target + "_prize\">"
			+ itemHTML(target, 1)
			+ "</div>";
}

//Add a prize item at the specific pool, num = pool's location
function addItem(num) {
	var target = parseInt(num);
	debug("Adding an item at Pool " + (target + 1), "o");
	prizes[target]++;
	var newItem = itemHTML(target, prizes[target]);
	/*var newItem = "<p id = \"pool" + target + "_prize" + (prizes[target] - 1) + "\">"
			+ "Prize " + prizes[target] + ": "
			+ "<input type = \"text\" id = \"pool" + target + "_item" + (prizes[target] - 1) + "\" size = \"50\" value = \"\" onchange = \"checkValid('pool" + target + "_item" + (prizes[target] - 1) + "')\" />"
			+ "<span id = \"pool" + target + "_item" + (prizes[target] - 1) + "_check\"></span>"
			+ "</p>";*/
	$("#pool" + target + "_prize").append(newItem);
	$("#removeItem" + target).show();
	debug("There are " + prizes[target] + " items at Pool " + (target + 1) + " now", "i");
}

//Remove a prize item at the specific pool, num = pool's location
function removeItem(num) {
	var target = parseInt(num);
	debug("Removing an item at Pool " + (target + 1), "o");
	if (prizes[target] > 1) {
		var targetID = "pool" + target + "_prize" + (prizes[target] - 1);
		$("#" + targetID).remove();
		prizes[target]--;
		if (prizes[target] <= 1) {
			$("#removeItem" + target).hide();
		}
	}	
	debug("There " + (prizes[target] == 1 ? "is " : "are ") + prizes[target] + " item" + (prizes[target] == 1 ? "" : "s") + " at Pool " + (target + 1) + " left", "i");
}

function bridge() {
	allValid = true;
	checkValid("prizeBoxTitle");
	checkValid("attempts");
	checkValid("samples");
	for (i = 0; i < prizePools; i++) {
		checkValid("pool" + i);
		debug("Check on Pool " + (i + 1) + " win percentage", "i");
		for (j = 0; j < prizes[i]; j++) {
			checkValid("pool" + i + "_item" + j);
			debug("Check on Item " + (j + 1) + " at Pool " + (i + 1), "i");
		}
	}
	if (allValid) {
		debug("All input are valid, move on to sampling", "i");
		doSampling();
		return;
	}
	else {
		return;
	}
}

function doSampling() {
	debug("Samling commencing", "o");
	var attempts = document.getElementById("attempts").value;
	var samples = document.getElementById("samples").value;	
	debug("Do " + samples + ", each does " + attempts + " attempt" + (attempts == 1 ? "" : "s"), "o");
	
	//Make Table Title
	$("#sampleTable").show();
	var tableTitle = "<tr>"
			+ "<th colspan = \"" + (samples + 1) + "\" style = \"padding: 10px\">" + document.getElementById("prizeBoxTitle").value + "</th>"
			+ "</tr>"
			+ "<tr>"
			+ "<th></th>"
			+ "<th colspan = \"" + samples + "\" style = \"padding: 10px\">Samples, each attempts: " + attempts + "</th>"
			+ "</tr>"
			+ "<tr>"
			+ "<th style = \"padding: 10px\">Items</th>";
	for (var i = 0; i < samples; i++) {
		tableTitle += "<th style = \"padding: 10px\">" + (i + 1) + "</th>";
	}
	tableTitle += "</tr>";
	document.getElementById("sampleTable").innerHTML = tableTitle;
	
	//Make Sampling Tally Array
	/*	Tally is a 3 dimensional array, each dimensional represents the type of the table
	*	1st dimension: Number of Pools
	*	2nd dimension: Number of Prizes in the Pool
	*	3rd dimension: Number of Samples
	*/
	var numberOfItems = 0;
	var tally = new Array(prizePools);
	for (var i = 0; i < tally.length; i++) {
		tally[i] = new Array(prizes[i]);
		numberOfItems += prizes[i];
		debug("There are " + numberOfItems + " item" + (tally[i].length == 1 ? "" : "s") + " in Pool " + (i + 1), "i");
		for (j = 0; j < prizes[i]; j++) {
			tally[i][j] = new Array(parseInt(samples)).fill(0);
			//console.log(samples + " " + tally[i][j].length);
		}
	}
	debug("There are a total " + numberOfItems + " item" + (numberOfItems == 1 ? "" : "s") + " in total", "i");
	
	//Make Tier Map for each Pool
	var maps = new Array(prizePools);
	var total = 100; //Total Percentage
	for (var i = 0; i < maps.length; i++) {
		maps[i] = total;	//Pool i
		total -= document.getElementById("pool" + i).value;
	}
	maps.push(0);
	debug("The mapping number" + (maps.length == 1 ? "" : "s") + " boundary of each pool " + (maps.length == 1 ? "is " : "are ") + maps, "i");
	
	for (var s = 0; s < samples; s++) {			//Samples
		debug("Sample " + s, "o");
		for (var a = 0; a < attempts; a++) {	//Attempts
			debug("Attempt " + a, "o");
			//First random for pool
			var randomPool = Math.random()*100;
			var targetPool = 0;
			var upper = 100;	//Upper limit for second mapping
			var lower = 0;		//Lower limit for second mapping
			if (maps.length > 1)
				for (var i = 0; i < (maps.length - 1); i++) {
					upper = maps[i];
					lower = maps[i + 1];
					if (randomPool >= maps[i + 1]) {
						targetPool = i;
						break;
					}
				}
			debug("The random number is " + randomPool + ", lies at Pool " + (targetPool + 1), "i");
			debug("New upper limit is " + upper + ", and lower limit is " + lower, "i");
			
			//Second random for pirze, using the same random value but the mapping is narrowed down
			var prizeMap = new Array(prizes[targetPool])
			var upperClone = upper;
			for (i = 0; i < prizeMap.length; i++) {
				prizeMap[i] = upper;
				upper -= (upperClone - lower)/prizeMap.length;
			}
			prizeMap.push(lower);
			debug("The mapping number in pool " + targetPool + (prizeMap.length == 1 ? " is " : " are ") + prizeMap, "i");
			var targetPrize = 0;
			if (prizeMap.length > 1) {
				for (var i = 0; i < (prizeMap.length - 1); i++) {
					if (randomPool >= prizeMap[i + 1]) {
						targetPrize = i;
						break;
					}
				}
			}
			tally[targetPool][targetPrize][s]++;
			debug("The item will be " + document.getElementById("pool" + targetPool + "_item" + targetPrize).value + "; Location: " + targetPool + ", " + targetPrize + ", " + s + "; Count: " + tally[targetPool][targetPrize][s], "i");
		}
	}
	
	//Make the second half of the table, a.k.a. the data collected
	var tableData = "";
	for (var p = 0; p < prizePools; p++) {	//Pools
		tableData += "<tr>"
				+ "<td colspan = \"" + (samples + 1) + "\" style = \"padding-left: 10px\"> Pool " + (p + 1) + ": " + document.getElementById("pool" + p).value + "%</td>"
				+ "</tr>";
		for (var z = 0; z < prizes[p]; z++) {	//Prizes
			tableData += "<tr>"
					+ "<td>" + document.getElementById("pool" + p + "_item" + z).value + "</td>";
			for (var sam = 0; sam < samples; sam++) {	//Samples
				tableData += "<td>" + tally[p][z][sam] + "</td>";
			}
			tableData += "</tr>";
		}
	}
	$("#sampleTable").append(tableData);
}

//jQuery Part
$(document).ready(function() {
	//Remove Remove Pool and Item button at the beginning
	$("#removeItem" + (prizePools - 1)).hide();
	$("#removePool").hide();
	$("#sampleTable").hide();
	
	//Add a Pool
	$("#addPool").click(function() {
		debug("Adding a pool...", "o");
		var newPool = poolHTML(prizePools);
		$(".form").append(newPool);
		$("#removeItem" + prizePools).hide();
		prizes[prizePools] = 1;
		prizes.push();
		prizePools++;
		debug("Pool " + prizePools + " added with " + prizes[prizePools - 1] + " item", "i");
		$("#removePool").show();
	});
	
	//Remove a Pool
	$("#removePool").click(function() {
		debug("Removing a pool...", "o");
		if (prizePools > 1) {
			var targetID = "pool_" + (prizePools - 1);
			$("#" + targetID).remove();
			debug("Pool " + (prizes.length) + " has been removed", "o");
			prizePools--;
			prizes.length = prizePools;
			//Hide the remove button if there is only one prize pool left
			if (prizePools <= 1) {
				$("#removePool").hide();
			}
		}
	});
});