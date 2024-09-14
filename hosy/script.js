const areaChart = Array.from(document.getElementsByClassName('area'))[0];
const horse = document.getElementsByClassName('horse')[0];
const svgs = Array.from(document.getElementsByTagName('svg'));
const spanny = document.getElementsByTagName('span')[0];
const horseContainer = document.getElementsByClassName('horseContainer')[0];
const sensorDetail = document.getElementsByClassName('sensorDetail')[0];
const sensorList = document.getElementsByClassName('sensorList')[0];
const sensorRenk = document.getElementsByClassName('sensorRenk');

let bottomSmall = document.getElementsByClassName('bottomSmall')[0];

let detailSensor = sensorDetail.children[0].children[0]; //sensor no
let muscleName = sensorDetail.children[1].children[0]; //kas adı
let detailStatus = sensorDetail.children[2].children[0]; //status
let detailColor = sensorDetail.children[3].children[0]; //renk

let modal = document.getElementsByClassName('modal')[0];
let newSensor = document.getElementById('newSensor');
let addSensor = document.getElementById('addSensor');
let sensorNum = 0;

document
	.getElementsByClassName('closeModal')[0]
	.addEventListener('click', function () {
		modal.style.display = 'none';
	});

//horse.addEventListener('click', function revealModal(e) {});
let newRow = [];

function rgbToHex(rgb) {
	let rgbArray = rgb.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/);
	function hex(x) {
		return ('0' + parseInt(x).toString(16)).slice(-2);
	}
	return '#' + hex(rgbArray[1]) + hex(rgbArray[2]) + hex(rgbArray[3]);
}

//horse list page

let sensorData = JSON.parse(localStorage.getItem('sensorVeri'));
if (sensorData === null || sensorData === undefined) {
	sensorData = [];
}

window.addEventListener('load', function () {
	Array.from(sensorRenk).forEach((renk) => {
		renk.addEventListener('click', function () {
			svgs.forEach((svg) => {
				let color = rgbToHex(renk.style.backgroundColor);

				if ((svg.style.opacity = '1')) {
					svg.style.opacity = '.65';
				}
				if (svg.children[0].getAttribute('fill') == color) {
					svg.style.opacity = '1';
					sensorData.forEach((item) => {
						item.forEach((each) => {
							if (each[1] == color) {
								detailSensor.innerHTML = `Sensör ${each[2]}`;
								let musch = `${horseMuscles[each[2]]}`;
								if (horseMuscles[each[2]] == undefined) {
									musch = horseMuscles[1];
								}
								muscleName.innerHTML = musch;
								muscleName.style.width = '100%';
								detailStatus.style.backgroundColor = '#4cbb17';
								detailColor.style.backgroundColor = `${each[1]}`;
							}
						});
					});
				}
			});
		});
	});
});

let theList = document.getElementsByClassName('list')[0];

let index = 0;
if (sensorData != null) {
	let counter = 0;
	sensorData.forEach((data) => {
		if (counter >= 5) return;

		data.forEach((item) => {
			let listItem = document.createElement('li');
			listItem.innerHTML = `<h6>Sensör ${item[2]}</h6>
				<div class="sensorStatus style="background-color:#7CFC00;"></div>
				<div class="sensorRenk" style="background-color:${item[1]};"></div>`;
			sensorList.appendChild(listItem);

			svgs.forEach((svg) => {
				if (svg.classList.contains(item[0])) {
					svg.children[0].setAttribute('fill', `${item[1]}`);
					svg.children[0].classList.add('active');
				}
			});
			counter++;
		});
	});
}

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

let sensorVeri = [];
let maxSensor = 10; //Eklenebilir sensör limiti

svgs.forEach((item) => {
	if (!item.classList.contains('hors')) {
		item.addEventListener('mouseenter', function () {
			item.style.opacity = '1';
			let randomColor = Math.floor(Math.random() * 16777215).toString(16);
			if (sensorVeri.length < maxSensor) {
				newRow.push(item.classList[0]);
				newRow.push(`#${randomColor}`);
			}
		});
		item.addEventListener('mouseleave', function () {
			item.style.opacity = '.65';
		});
	}
});

addSensor.addEventListener('click', function putInside() {
	//bottomSmall.innerHTML = `${newSensor.value} is the new sensor`;
	sensorNum = newSensor.value;
	newRow.push(sensorNum);
	sensorVeri.push(newRow);
	/*document
		.getElementsByClassName(`${newRow[-1]}`)[0]
		.setAttribute('fill', `#${randomColor}`);*/

	document
		.getElementsByClassName(newRow[0])[0]
		.children[0].setAttribute('fill', `${newRow[1]}`);

	newRow = [];
	//console.log(sensorVeri);
	//let string = JSON.stringify(sensorVeri);
	sensorData.push(sensorVeri);
	let lData = JSON.stringify(sensorData);
	localStorage.setItem('sensorVeri', lData);

	modal.style.display = 'none';
});

let isSmall = false;
svgs.forEach((area) => {
	area.addEventListener('click', (e) => {
		if (!isSmall) {
			svgs.forEach((x) => {
				//?? try ratio here -> ratio = (100% - screenwidth/1920)
				let xW = x.getAttribute('width');
				let xH = x.getAttribute('height');

				//clean this by:
				//1.transform part  - xW & xH -> new function, call that function.
				//2.if active part -> new function, call taht function,
				//3.generate a new chart on click part -> another function with parameters, call that function with arguments.

				x.setAttribute('width', xW * 0.45);
				x.setAttribute('height', xH * 0.45);
				isSmall = true;
				modal.style.display = 'block';

				if (area.children[0].classList.contains('active')) {
					//console.log(area.classList[0]);
					//console.log(sensorData); //sensor data içindeki verilerden birinin 0 indexi classliste sahip
					sensorData.forEach((item) => {
						if (area.classList.contains(item[0])) {
							console.log('here!');
							detailSensor.innerHTML = `Sensör ${each[2]}`;
							let musch = `${horseMuscles[each[2]]}`;
							if (horseMuscles[each[2]] == undefined) {
								musch = horseMuscles[1];
							}
							muscleName.innerHTML = musch;
							muscleName.style.width = '100%';
							detailStatus.style.backgroundColor = '#4cbb17';
							detailColor.style.backgroundColor = `${each[1]}`;
						}
						modal.style.display = 'none';
					});
				}
			});

			document.getElementsByClassName('top2')[0].style.display = 'none';
			document.getElementsByClassName('top3')[0].style.display = 'none';
			document.getElementsByClassName('bottomWide')[0].style.display = 'none';
			document.getElementsByClassName('top1')[0].style.gridRow = '1/3';
			document.getElementsByClassName('top1')[0].style.gridColumn = '1/3';
		}
		modal.style.display = 'block';
		if (area.children[0].classList.contains('active')) {
			sensorData.forEach((item) => {
				item.forEach((each) => {
					if (area.classList.contains(each[0])) {
						console.log('here!');
						detailSensor.innerHTML = `Sensör ${each[2]}`;
						let musch = `${horseMuscles[each[2]]}`;
						if (horseMuscles[each[2]] == undefined) {
							musch = horseMuscles[1];
						}
						muscleName.innerHTML = musch;
						muscleName.style.width = '100%';
						detailStatus.style.backgroundColor = '#4cbb17';
						detailColor.style.backgroundColor = `${each[1]}`;
					}
					modal.style.display = 'none';
				});
			});
		}
		document.getElementsByClassName('top1')[0].style.gridRow = '1/2';
		document.getElementsByClassName('top1')[0].style.gridColumn = '1/2';
		document.getElementsByClassName('top2')[0].style.display = 'initial';
		document.getElementsByClassName('top3')[0].style.display = 'initial';
		document.getElementsByClassName('bottomWide')[0].style.display = 'initial';
	});
});

// Get the canvas element
var ctxEcg = document.getElementById('ecgChart').getContext('2d');

// Sample data for ECG (you can replace it with your actual ECG data)
var ecgData = {
	labels: ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10'],
	datasets: [
		{
			label: 'ECG',
			data: [0, 1, 2, 3, 4, 5, 4, 3, 2, 1, 0], // Sample data for ECG
			borderColor: '#063148', // Color of the line
			borderWidth: 2, // Width of the line
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

// Get the canvas element
var ctx = document.getElementById('myChart').getContext('2d');

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
			label: `${sensorData[2]} No'lu EMG`,
			data: generateEMGData(20, 1000), // Generate 10 points of EMG data with a max amplitude of 10
			borderColor: '#063148', // Color of the line
			borderWidth: 2, // Width of the line
			fill: false, // Do not fill the area under the line
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
var emgChart = new Chart(ctx, {
	type: 'line',
	data: emgData,
	options: options,
});
