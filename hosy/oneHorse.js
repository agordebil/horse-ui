const gelisim = document.getElementsByClassName('gelisim')[0];
const graphy = document.getElementsByClassName('graph')[0];
const tableBody = document.getElementsByTagName('tbody')[0];

let localHorses = JSON.parse(localStorage.getItem('addedHorses'));
if (localHorses === null || localHorses === undefined) {
	localHorses = [];
}
let lastClicked = JSON.parse(localStorage.getItem('nextStation'));
if (lastClicked === null || lastClicked === undefined) {
	lastClicked = [];
}

function filterForClick(item) {
	if (item['atIsmi'] == lastClicked[0]) {
		return true;
	}
}

const filtered = localHorses.filter(filterForClick);

if (filtered != undefined && filtered.length > 0) {
	tableBody.innerHTML = `<tr>
  <td>Adı</td> <td>:</td> <td>${filtered[0]['atIsmi']}</td>
  </tr><tr>
  <td>Mikroçip Nu</td> <td>:</td> <td>${filtered[0]['atMikrocip']}</td>
  </tr><tr>
  <td>Irk/Cins</td> <td>:</td> <td>${filtered[0]['atCins']}</td>
  </tr><tr>
  <td>Renk</td> <td>:</td> <td>${filtered[0]['atRenk']}</td>
  </tr><tr>
  <td>Lekeler/İşaretler</td> <td>:</td> <td>${filtered[0]['atLeke']}</td>
  </tr><tr>
  <td>Doğum Tarihi</td> <td>:</td> <td>${filtered[0]['atDogum']}</td>
  </tr><tr>
  <td>Kilo</td> <td>:</td> <td>${filtered[0]['atKilo']}</td>
  </tr><tr>
  <td>Boy</td> <td>:</td> <td>${filtered[0]['atBoy']}</td>
  </tr><tr>
  <td>Sağlık Bilgileri</td> <td></td> <td></td>
  </tr><tr>
  <td>Cinsiyet</td> <td>:</td> <td>${filtered[0]['atCinsiyet']}</td>
  </tr><tr>
  <td>Aşı Geçmişi</td> <td>:</td> <td>${filtered[0]['atAsi']}</td>
  </tr><tr>
  <td>Solucan Giderme</td> <td>:</td> <td>${filtered[0]['atSolucan']}</td>
  </tr><tr>
  <td>Alerji</td> <td>:</td> <td>${filtered[0]['atAlerji']}</td>
  </tr><tr>
  <td>Diş Kontrolü</td> <td>:</td> <td>${filtered[0]['atDis']}</td>
  </tr><tr>
  <td>Kullandığı İlaçlar</td> <td>:</td> <td>${filtered[0]['atIlac']}</td>
  </tr><tr>
  <td>Ameliyat Geçmişi</td> <td>:</td> <td>${filtered[0]['atAmeliyat']}</td>
  </tr><tr>
  <td>Diyet</td> <td>:</td><td>${filtered[0]['atDiyet']}</td>
  </tr>`;
}
/*
s.innerHTML = `<tbody>
  <tr>
  <td>Adı</td> <td>:</td> <td>${atIsmi}</td>
  </tr><tr>
  <td>Mikroçip Nu</td> <td>:</td> <td>${atMikrocip}</td>
  </tr><tr>
  <td>Irk/Cins</td> <td>:</td> <td>${atCins}</td>
  </tr><tr>
  <td>Renk</td> <td>:</td> <td>${atRenk}</td>
  </tr><tr>
  <td>Lekeler/İşaretler</td> <td>:</td> <td>${atLeke}</td>
  </tr><tr>
  <td>Doğum Tarihi</td> <td>:</td> <td>${atDogum}</td>
  </tr><tr>
  <td>Kilo</td> <td>:</td> <td>${atKilo}</td>
  </tr><tr>
  <td>Boy</td> <td>:</td> <td>${atBoy}</td>
  </tr><tr>
  <td>Sağlık Bilgileri</td> <td></td> <td></td>
  </tr><tr>
  <td>Cinsiyet</td> <td>:</td> <td>${atCinsiyet}</td>
  </tr><tr>
  <td>Aşı Geçmişi</td> <td>:</td> <td>${atAsi}</td>
  </tr><tr>
  <td>Solucan Giderme</td> <td>:</td> <td>${atSolucan}</td>
  </tr><tr>
  <td>Alerji</td> <td>:</td> <td>${atAlerji}</td>
  </tr><tr>
  <td>Diş Kontrolü</td> <td>:</td> <td>${atDis}</td>
  </tr><tr>
  <td>Kullandığı İlaçlar</td> <td>:</td> <td>${atIlac}</td>
  </tr><tr>
  <td>Ameliyat Geçmişi</td> <td>:</td> <td>${atAmeliyat}</td>
  </tr><tr>
  <td>Diyet</td> <td>:</td><td>${atDiyet}</td>
  </tr>
  </tbody>`;
*/

gelisim.addEventListener('click', function (e) {
	e.preventDefault();
	graphy.classList.toggle('display');
});

var ctx = document.getElementById('horsyChart').getContext('2d');

// Function to generate random EMG data
function generateEMGData(numPoints, maxAmplitude) {
	let index = 0;
	let data = [];
	for (var i = 0; i < numPoints; i++) {
		var amplitude = Math.random() * maxAmplitude;
		data.push(amplitude);
	}
	return data;
}

// Sample EMG data (replace with actual data if available)
var emgData = {
	labels: [
		'Pazartesi',
		'Salı',
		'Çarşamba',
		'Perşembe',
		'Cuma',
		'Cumartesi',
		'Pazar',
	], // Sample time labels
	datasets: [
		{
			label: 'Haftalık Gelişim',
			data: generateEMGData(7, 1000), // Generate 10 points of EMG data with a max amplitude of 10
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
