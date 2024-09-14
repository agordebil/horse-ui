let localHorses = JSON.parse(localStorage.getItem('addedHorses'));
if (localHorses === null || localHorses === undefined) {
	localHorses = [];
}

let data = {};
let inputIds = [
	'atIsmi',
	'atMikrocip',
	'atCins',
	'atRenk',
	'atLeke',
	'atDogum',
	'atKilo',
	'atBoy',
	'atCinsiyet',
	'atAsi',
	'atSolucan',
	'atAlerji',
	'atDis',
	'atIlac',
	'atAmeliyat',
	'atDiyet',
];

const recordButton = document.getElementById('addRecord');
recordButton.addEventListener('click', function (e) {
	e.preventDefault();

	inputIds.forEach((id) => {
		let element = document.getElementById(id);
		if (element) {
			data[id] = element.value;
		}
	});
	localHorses.push(data);

	let horseHolder = JSON.stringify(localHorses);
	localStorage.setItem('addedHorses', horseHolder);

	window.location.href = 'horses.html';
});
