var tempoAtendimentoRecepcao = 1;
var tempoAtendimentoTriagem = 2;
var tempoAtendimentoConsulta = 5;
	
function initMap() {

	var hospitalUnimed = {
		info: '<strong>Hospital Unimed</strong><br>\
			   Tempo de espera: ' + tempoAtendimento() + ' minutos',
		lat: -29.164730,
		long: -51.200866
	};

	var hospitalCirculo = {
		info: '<strong>Hospital do Círculo</strong> <br> \
		       Tempo de espera: ' + tempoAtendimento() + ' minutos',
		lat: -29.153545,
		long: -51.173444
	};

	var hospitalSaude = {
		info: '<strong>Hospital Saúde</strong> <br> \
			   Tempo de espera: ' + tempoAtendimento() + ' minutos',
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
	
	var qtdPessoasRecepcao = getNumeroRandomico();
	var qtdPessoasTriagem = getNumeroRandomico();
	var qtdPessoasConsulta = getNumeroRandomico();
	
	// Tempo para todas as pessoas na recepção serem atendidas
	var esperaRecepcao = getEsperaRecepcao(qtdPessoasRecepcao);
	
	// Tempo para todas as pessoas na triagem serem atendidas menos o tempo que já esperei na recepção
	var esperaTriagem = getEsperaTriagem(qtdPessoasTriagem, esperaRecepcao);
	
	// Tempo para todas as pessoas na consulta serem atendidas menos o tempo que já esperei na triagem
	var esperaConsulta = getEsperaConsulta(qtdPessoasConsulta, esperaTriagem);	
	
	var tempoTotal = (esperaRecepcao + esperaTriagem + esperaConsulta);
	
	//alert("TEMPO qtdPessoasRecepcao " + qtdPessoasRecepcao + " qtdPessoasTriagem " + qtdPessoasTriagem + " qtdPessoasConsulta " +qtdPessoasConsulta );
	//alert("TEMPO esperaRecepcao " + esperaRecepcao + " esperaTriagem " + esperaTriagem + " esperaConsulta " + esperaConsulta);
	
	return tempoTotal;	
}

function getEsperaRecepcao(qtdPessoasRecepcao) {
	
	var esperaRecepcao = tempoAtendimentoRecepcao * qtdPessoasRecepcao;
	if(esperaRecepcao < 0) esperaRecepcao = 0;
	
	return esperaRecepcao;
	
}

function getEsperaTriagem(qtdPessoasTriagem, esperaRecepcao) {
	var esperaTriagem = (tempoAtendimentoTriagem * qtdPessoasTriagem) - esperaRecepcao;
	if(esperaTriagem < 0) esperaTriagem = 0;
	
	return esperaTriagem;
}

function getEsperaConsulta(qtdPessoasConsulta, esperaTriagem) {
	
	var esperaConsulta = (tempoAtendimentoConsulta * qtdPessoasConsulta) - esperaTriagem;
	if(esperaConsulta < 0) esperaConsulta = 0;	
	
	return esperaConsulta;
}

function preencheTela() {
	var qtdPessoasRecepcao = getNumeroRandomico();
	var qtdPessoasTriagem = getNumeroRandomico();
	var qtdPessoasConsulta = getNumeroRandomico()
	
	var esperaRecepcao = getEsperaRecepcao(qtdPessoasRecepcao);
	
	// Tempo para todas as pessoas na triagem serem atendidas menos o tempo que já esperei na recepção
	var esperaTriagem = getEsperaTriagem(qtdPessoasTriagem, esperaRecepcao);
	
	// Tempo para todas as pessoas na consulta serem atendidas menos o tempo que já esperei na triagem
	var esperaConsulta = getEsperaConsulta(qtdPessoasConsulta, esperaTriagem);	
	
	var tempoTotal = (esperaRecepcao + esperaTriagem + esperaConsulta);
	
	document.getElementById('qtdPessoasRecepcao').innerHTML = qtdPessoasRecepcao + " pacientes na espera";
	document.getElementById('qtdPessoasTriagem').innerHTML = qtdPessoasTriagem + " pacientes na espera";
	document.getElementById('qtdPessoasConsulta').innerHTML = qtdPessoasConsulta + " pacientes na espera";
	
	document.getElementById('tempoRecepcao').innerHTML = "Recepção: " + esperaRecepcao + " minutos";
	document.getElementById('tempoTriagem').innerHTML = "Triagem: " + esperaTriagem + " minutos";
	document.getElementById('tempoConsulta').innerHTML = "Consulta: " + esperaConsulta + " minutos";

	document.getElementById('tempoTotal').innerHTML = "Tempo Total para o seu Atendimento: " + tempoTotal + " minutos";
	
}

function getNumeroRandomico() {	
	return (Math.floor(Math.random() * 10)) + 1;
}

/*function setCookie(cname, cvalue) {	
	if(getCookie(cname) == "") {
		document.cookie += cname + "=" + cvalue + ";";
		alert("SET " + document.cookie);
	}	
}

function getCookie(cname) {
    var name = cname + "=";
    var ca = document.cookie.split(';');
	
	for(var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}*/