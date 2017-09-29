function initMap() {

	var hospitalUnimed = {
		info: '<strong>Hospital Unimed</strong><br>\
			   Tempo de espera: 15 minutos',
		lat: -29.164730,
		long: -51.200866
	};

	var hospitalCirculo = {
		info: '<strong>Hospital do Círculo</strong> <br> \
		       Tempo de espera: 10 minutos',
		lat: -29.153545,
		long: -51.173444
	};

	var hospitalSaude = {
		info: '<strong>Hospital Saúde</strong> <br> \
			   Tempo de espera: 20 minutos',
		lat: -29.164720,
		long: -51.183480
	};

	var locations = [
      [hospitalUnimed.info, hospitalUnimed.lat, hospitalUnimed.long, 0],
      [hospitalCirculo.info, hospitalCirculo.lat, hospitalCirculo.long, 1],
      [hospitalSaude.info, hospitalSaude.lat, hospitalSaude.long, 2],
    ];

	var map = new google.maps.Map(document.getElementById('map'), {
		zoom: 13,
		center: new google.maps.LatLng(-29.163403, -51.179668),
		mapTypeId: google.maps.MapTypeId.ROADMAP
	});

	var infowindow = new google.maps.InfoWindow({});

	var marker, i;

	for (i = 0; i < locations.length; i++) {
		marker = new google.maps.Marker({
			position: new google.maps.LatLng(locations[i][1], locations[i][2]),
			map: map
		});

		google.maps.event.addListener(marker, 'click', (function (marker, i) {
			return function () {
				infowindow.setContent(locations[i][0]);
				infowindow.open(map, marker);
			}
		})(marker, i));
	}
}

function tempoAtendimento() {
	
	var tempoAtendimentoRecepcao = getNumeroRandomico();
	var tempoAtendimentoTriagem = getNumeroRandomico();
	var tempoAtendimentoConsulta = getNumeroRandomico();
	
	var qtdPessoasRecepcao = getNumeroRandomico();
	var qtdPessoasTriagem = getNumeroRandomico();
	var qtdPessoasConsulta = getNumeroRandomico();
	
	// Tempo para todas as pessoas na recepção serem atendidas
	var esperaRecepcao = tempoAtendimentoRecepcao * qtdPessoasRecepcao;
	
	// Tempo para todas as pessoas na triagem serem atendidas menos o tempo que já esperei na recepção
	var esperaTriagem = (tempoAtendimentoTriagem * qtdPessoasTriagem) - esperaRecepcao;
	
	// Tempo para todas as pessoas na consulta serem atendidas menos o tempo que já esperei na triagem
	var esperaConsulta = (tempoAtendimentoConsulta * qtdPessoasConsulta) - esperaTriagem;
	
	return esperaConsulta;
	
}

function getNumeroRandomico() {
	
	return (Math.floor(Math.random() * 10)) + 1;

}