const viewportWidth = window.innerWidth;
const viewportHeight = window.innerHeight;
const sensorList = document.getElementsByClassName('sensorList')[0];
const horse = document.getElementsByClassName('horse')[0];
const allSvgs = Array.from(horse.getElementsByTagName('svg'));
const newSensor = document.getElementById('newSensor');
const addSensor = document.getElementById('addSensor');
const remover = document.getElementsByClassName('removeSensor')[0];
const heart = document.getElementById('heartBeat');
let dataRow = []; //sub array to push localstorage
let exists; //to prevent half ass arrays push to localstorage
let sensorData = JSON.parse(localStorage.getItem('sensorVeri'));
if (sensorData === null || sensorData === undefined) {
	sensorData = [];
}
window.addEventListener('load', setList); //load the list on pageload
const horseMuscles = [
	'Trapezius',
	'Latissimus dorsi',
	'Deltoid',
	'Supraspinatus',
	'Infraspinatus',
	'Teres major',
	'Teres minor',
	'Rhomboid',
	'Serratus ventralis',
	'Brachiocephalicus',
	'Sternocephalicus',
	'Sternohyoideus',
	'Splenius',
	'Longissimus dorsi',
	'Iliocostalis',
	'Spinalis',
	'Semispinalis',
	'Multifidus',
	'Gluteus medius',
	'Gluteus maximus',
	'Tensor fasciae latae',
	'Biceps femoris',
	'Semitendinosus',
	'Semimembranosus',
	'Rectus femoris',
	'Vastus lateralis',
	'Vastus medialis',
	'Vastus intermedius',
	'Sartorius',
	'Gracilis',
	'Adductor',
	'Pectoralis',
	'Brachialis',
	'Triceps',
	'Soleus',
];

allSvgs.forEach((area) => {
	//resize the svgs
	area.style.display = 'initial';
	area.setAttribute('width', area.getAttribute('width') * 0.5);
	area.setAttribute('height', area.getAttribute('height') * 0.5);

	area.addEventListener('click', (e) => {
		allSvgs.forEach((x) => {
			//clean this by:
			//2.if active part -> new function, call taht function,
		});

		document.getElementsByClassName('removeThis')[0].style.display = 'none';
		newSensor.readOnly = true;
		addSensor.disabled = true;
		document.getElementsByClassName('modal')[0].style.filter =
			'grayscale(1) blur(2px)';
		document.getElementsByClassName('modal')[0].style.cursor = 'not-allowed';
		newSensor.style.cursor = 'not-allowed';
		addSensor.style.cursor = 'not-allowed';
		let currentSensor;
		let currentSensorColor;
		let currentColor = area.children[0].getAttribute('fill');
		let permission = true;
		if (!area.children[0].classList.contains('active')) {
			newSensor.readOnly = false;
			addSensor.disabled = false;
			console.log(area.children[0].classList.contains('active'));
			document.getElementsByClassName('modal')[0].style.filter =
				'grayscale(0)  blur(0)';
			document.getElementsByClassName('modal')[0].style.cursor = 'initial';

			if (sensorVeri.length < maxSensor) {
				let sensorClass = area.classList[0];
				exists = dataRow.some((entry) => entry[0] === sensorClass); // Check if sensorClass already exists in dataRow
				console.log(sensorClass);
				if (!exists) {
					let randomLightColor = generateLightColor();
					dataRow.push(sensorClass);
					dataRow.push(randomLightColor);
				}
			}
			newSensor.style.cursor = 'initial';
			addSensor.style.cursor = 'pointer';
		}
		if (area.children[0].classList.contains('active')) {
			sensorData.forEach((item) => {
				item.forEach((singleSensor) => {
					//console.log(singleSensor); //0-svgClass, 1-color, 2-sensorNo
					currentSensorColor = singleSensor[1];
					if (currentSensorColor == currentColor) {
						currentSensor = singleSensor[2];
					}
				});
				document.getElementsByClassName(
					'no'
				)[0].children[0].innerHTML = `Sensör ${currentSensor}`;
				document.getElementsByClassName('no')[0].style.backgroundColor =
					currentColor;
				document.querySelectorAll('.chartSecondContainer').forEach((graph) => {
					if (graph.classList.contains(`${currentSensor}no`)) {
						permission = false;
						graph.remove();
					}
				});
			});
			if (permission) {
				addChart(currentSensor, currentColor);
			}
		}
	});
});

function setList() {
	if (sensorData != null) {
		let counter = 0;
		// Create a Set to keep track of added items
		let addedItems = new Set();
		// Iterate over existing list items and add them to the Set
		sensorList.querySelectorAll('li').forEach((li) => {
			addedItems.add(li.textContent.trim().split(' ')[1]); // Extracting sensor number
		});

		sensorData.forEach((data) => {
			if (counter >= maxSensor) return;
			data.forEach((item) => {
				// Check if the item's identifier is already in the Set
				if (!addedItems.has(item[2])) {
					// Update SVG elements based on sensor data
					allSvgs.forEach((svg) => {
						if (svg.classList.contains(item[0])) {
							svg.children[0].setAttribute('fill', `${item[1]}`);
							svg.children[0].classList.add('active');
						}
					});

					let listItem = document.createElement('li');
					listItem.innerHTML = `Sensör ${item[2]}`;
					listItem.style.backgroundColor = `${item[1]}`;
					listItem.style.cursor = 'pointer';

					listItem.style.boxShadow = getComputedStyle(
						document.documentElement
					).getPropertyValue('--buttonShadow');
					sensorList.appendChild(listItem);

					// Add the item's identifier to the Set
					addedItems.add(item[2]);

					// Increment counter
					counter++;
				}
			});
		});
	}
}
function sensorListing() {
	sensorList.querySelectorAll('li').forEach((listElem) => {
		let currentSensor;
		let currentSensorColor;
		let currentColor;

		console.log('one');
		listElem.addEventListener('click', function () {
			let permission = true;
			//this will loop over added graph array and adds a new one
			//if there is an existing graph for that, removes it.
			currentSensor = listElem.textContent.trim().split(' ')[1];
			currentColor = rgbToHex(listElem.style.backgroundColor);
			document.getElementsByClassName(
				'no'
			)[0].children[0].innerHTML = `Sensör ${currentSensor}`;
			document.getElementsByClassName('no')[0].style.backgroundColor =
				currentColor;
			sensorData.forEach((item) => {
				item.forEach((singleSensor) => {
					listElem.style.filter = 'grayscale(.65)';
					listElem.style.outline = 'solid 2px #056364';

					//console.log(singleSensor); //0-svgClass, 1-color, 2-sensorNo
					currentSensorColor = singleSensor[1];
					if (currentSensorColor == currentColor) {
						currentSensor = singleSensor[2];
					}
				});
				document.querySelectorAll('.chartSecondContainer').forEach((graph) => {
					if (graph.classList.contains(`${currentSensor}no`)) {
						console.log('falsepermit');
						permission = false;
						graph.remove(); //remove if it already exist
						listElem.style.filter = 'grayscale(0)';
						listElem.style.outline = 'none';
					}
				});
			});
			if (permission) {
				addChart(currentSensor, currentColor);
			}
		});
	});
}
window.addEventListener('load', function () {
	sensorListing();
});

function rgbToHex(rgb) {
	let rgbArray = rgb.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/);
	function hex(x) {
		return ('0' + parseInt(x).toString(16)).slice(-2);
	}
	return '#' + hex(rgbArray[1]) + hex(rgbArray[2]) + hex(rgbArray[3]);
}
function generateLightColor() {
	let red = Math.floor(Math.random() * 128) + 128;
	let green = Math.floor(Math.random() * 128) + 128;
	let blue = Math.floor(Math.random() * 128) + 128;
	let color = '#' + red.toString(16) + green.toString(16) + blue.toString(16);
	return color;
}

//let randomLightColor = generateLightColor();

let sensorVeri = [];
let maxSensor = 10; //Sensor limit

const muscleTooltip = document.getElementsByClassName('muscleName')[0];
let tooltipTimeout;
let lastX, lastY;
const sensitivity = 20; // Adjust as needed

document.addEventListener('mousemove', function (event) {
	const mouseX = event.clientX;
	const mouseY = event.clientY;
	if (
		Math.abs(mouseX - lastX) < sensitivity &&
		Math.abs(mouseY - lastY) < sensitivity
	) {
		return; // Ignore small movements
	}

	// Clear any existing timeout
	clearTimeout(tooltipTimeout);

	// Set a timeout to update the tooltip position after a short delay
	tooltipTimeout = setTimeout(function () {
		// Set the tooltip position to the mouse coordinates
		muscleTooltip.style.left = mouseX + 'px';
		muscleTooltip.style.top = mouseY + 'px';
	}, 0);

	lastX = mouseX;
	lastY = mouseY;
});

allSvgs.forEach((item) => {
	item.addEventListener('mouseenter', function (e) {
		item.style.opacity = '1';
		muscleTooltip.style.display = 'block';
		let toolP = horseMuscles[item.classList.value];
		muscleTooltip.getElementsByTagName('p')[0].innerHTML = `${toolP}`;
	});
	item.addEventListener('mouseleave', function () {
		item.style.opacity = '.65';
		muscleTooltip.style.display = 'none';
		muscleTooltip.getElementsByTagName('p')[0].innerHTML = ` `;
	});
});

let sensorNum = 0;
addSensor.addEventListener('click', function putInside() {
	let sensorNum = newSensor.value;

	if (!exists) dataRow.push(sensorNum);
	if (dataRow.length == 3) sensorVeri.push(dataRow);
	sensorData = [sensorVeri];

	dataRow = [];

	let lData = JSON.stringify(sensorData);
	localStorage.setItem('sensorVeri', lData);

	newSensor.value = '';

	setList();
	sensorListing();
});

let chartCount = 0;

function addChart(sensorNumberOnList, sensorColorOnList) {
	chartCount++;
	// Create canvas element
	const canvasContainer = document.createElement('div');
	canvasContainer.id = 'chartContainer' + chartCount;
	canvasContainer.classList.add('chartContainer');
	//Canvas Container
	const canvasSecondContainer = document.createElement('div');
	canvasSecondContainer.classList.add('chartSecondContainer');
	canvasSecondContainer.classList.add(`${sensorNumberOnList}no`);

	//Canvas
	const canvas = document.createElement('canvas');
	canvas.id = 'chart' + chartCount;
	// Append canvas to container

	document
		.getElementsByClassName('greatChartContainer')[0]
		.appendChild(canvasSecondContainer);
	canvasSecondContainer.appendChild(canvasContainer);
	canvasContainer.appendChild(canvas);
	//canvasContainer.style.top = `${30 * (chartCount - 1)}vh`;
	// Get the canvas element

	// Function to generate random EMG data
	function generateEMGData(numPoints, maxAmplitude) {
		var data = [];
		for (var i = 0; i < numPoints; i++) {
			var amplitude = Math.random() * maxAmplitude;
			data.push(amplitude);
		}
		return data;
	}

	// Sample EMG data (replace with actual data if available)
	var emgData = {
		labels: Array.from(Array(20).keys()), // Sample time labels
		datasets: [
			{
				label: `${sensorNumberOnList} No'lu EMG`,
				data: generateEMGData(20, 1000), // Generate 10 points of EMG data with a max amplitude of 10
				borderColor: '#063148', // Color of the line
				borderWidth: 2, // Width of the line
				fill: sensorColorOnList, // Do not fill the area under the line
			},
		],
	};

	// Configuration options
	var options = {
		maintainAspectRatio: false,
		scales: {
			x: {
				title: {
					display: true,
					text: 'Time (s)', // X-axis label
				},
			},
			y: {
				title: {
					display: true,
					text: 'Amplitude', // Y-axis label
				},
			},
		},
	};

	// Create the line chart
	var emgChart = new Chart(canvas, {
		type: 'line',
		data: emgData,
		options: options,
	});
	emgChart;
}
document
	.getElementsByClassName('removeSensor')[0]
	.addEventListener('click', removeIt);

function removeIt() {
	const confirmIt = document.createElement('div');
	confirmIt.classList.add('confirm');

	const confirmButtonContainer = document.createElement('div');
	confirmButtonContainer.classList.add('confirmButtonContainer');

	const confirmText = document.createElement('p');
	confirmText.innerHTML =
		'This process will remove the sensor, do you confirm?';

	const confirmButton = document.createElement('button');
	confirmButton.classList.add('confirmButton');
	confirmButton.innerHTML = 'CONFIRM';

	const declineButton = document.createElement('button');
	declineButton.classList.add('declineButton');
	declineButton.innerHTML = 'DECLINE';

	confirmIt.appendChild(confirmText);
	confirmButtonContainer.appendChild(confirmButton);
	confirmButtonContainer.appendChild(declineButton);
	confirmIt.appendChild(confirmButtonContainer);
	document.body.appendChild(confirmIt);

	confirmButton.addEventListener('click', function () {
		let querySensor = document
			.getElementsByClassName('no')[0]
			.children[0].innerHTML.split(' ')[1];

		// Filter out elements from sensorData where the third element matches querySensor
		let filteredData = sensorData.map((item) =>
			item.filter((x) => x[2] !== querySensor)
		);

		// Update sensorData with the filtered array
		sensorData = filteredData;

		// Store updated sensorData in local storage
		let lData = JSON.stringify(sensorData);
		localStorage.setItem('sensorVeri', lData);

		// Remove the confirmation dialog
		confirmIt.style.display = 'none';
		location.reload();
	});

	declineButton.addEventListener('click', function () {
		// Hide the confirmation dialog
		confirmIt.style.display = 'none';
	});
}

// Parameters
const durationInSeconds = 10;
const sampleRate = 100; // Number of samples per second

// Function to generate ECG data for Chart.js
function generateECGData(durationInSeconds, sampleRate) {
	const numSamples = durationInSeconds * sampleRate;
	const data = [];

	// Generate ECG-like waveform using a sine wave
	for (let i = 0; i < numSamples; i++) {
		const t = i / sampleRate; // Time in seconds
		const ecgValue =
			Math.sin(2 * Math.PI * 1.5 * t) + 0.5 * Math.sin(2 * Math.PI * 2.5 * t); // Modify this function for different waveforms
		data.push(ecgValue);
	}

	return data;
}

// Generate ECG data
//const ecgData = generateECGData(durationInSeconds, sampleRate);

// Get the canvas element
var ctxEcg = document.getElementById('ecgChart').getContext('2d');

// Sample data for ECG (you can replace it with your actual ECG data)
var ecgData = {
	labels: Array.from({length: durationInSeconds * sampleRate}, (_, i) =>
		(i / sampleRate).toFixed(1)
	),
	datasets: [
		{
			label: 'ECG',
			data: generateECGData(durationInSeconds, sampleRate), // Use generated ECG data
			borderColor: '#063148', // Color of the line
			borderWidth: 1, // Width of the line
			pointRadius: 0, // Hide data points
		},
	],
};

// Configuration options
var options = {
	maintainAspectRatio: false, // Keep aspect ratio
	scales: {
		x: {
			title: {
				display: true,
				text: 'Time (s)', // X-axis label
			},
		},
		y: {
			title: {
				display: true,
				text: 'Voltage (mV)', // Y-axis label
			},
		},
	},
};

// Create the line chart
var ecgChart = new Chart(ctxEcg, {
	type: 'line',
	data: ecgData,
	options: options,
});
