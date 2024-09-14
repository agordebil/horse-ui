let atIsmi,
	atMikrocip,
	atCins,
	atRenk,
	atLeke,
	atDogum,
	atKilo,
	atBoy,
	atCinsiyet,
	atAsi,
	atSolucan,
	atAlerji,
	atDis,
	atIlac,
	atAmeliyat,
	atDiyet;

const tableBody = document.getElementsByTagName('tbody')[0];

let localHorses = JSON.parse(localStorage.getItem('addedHorses'));
if (localHorses === null || localHorses === undefined) {
	localHorses = [];
}
let lastClicked = JSON.parse(localStorage.getItem('nextStation'));
if (lastClicked === null || lastClicked === undefined) {
	lastClicked = [];
}

const tableRows = document.getElementsByTagName('tr');

if (localHorses != []) {
	localHorses.forEach((horse, index) => {
		let horseRow = document.createElement('tr');
		horseRow.innerHTML = `<td>${index + 4}</td>
      <td>${horse['atIsmi']}</td>
      <td>${horse['atCins']}</td>
      <td>${horse['atRenk']}</td>`;
		tableBody.appendChild(horseRow);
	});
}
window.addEventListener('load', () => {
	Array.from(tableRows).forEach((row) => {
		row.addEventListener('click', (x) => {
			if (!x.target.parentNode.classList.contains('headRow')) {
				let findName = x.target.parentNode.children[1].innerHTML;
				lastClicked = [];
				lastClicked.push(findName);

				let clickHolder = JSON.stringify(lastClicked);
				localStorage.setItem('nextStation', clickHolder);
				window.location.href = 'oneHorse.html';
			}
		});
	});
});

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
