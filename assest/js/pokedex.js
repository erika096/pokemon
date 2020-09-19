var urlpokemonSeleccionado = '';
var ataques = [
	{ label: "hp",  y: 10  },
	{ label: "attack", y: 15  },
	{ label: "defense", y: 25  },
	{ label: "special attack",  y: 30  },
	{ label: "special defense",  y: 28  },
	{ label: "speed",  y: 28  }
]

$(document).ready(function () {
	api(`https://pokeapi.co/api/v2/pokemon/`, "listaPokemon");

    $('.botonbuscar').click(function() {
	   api(`${urlpokemonSeleccionado}`, "dataPokemonSeleccionado")
	});

	$('#buscatupokemon').on('change', function() {
		urlpokemonSeleccionado= this.value;
	 });
})

function api(url,parametro) {
	$.ajax({
		//método de consumo con verbo get
		type: "GET",
		//url de consumo
		url: url,
		//tipo de respuesta
		dataType: "json",
		//función que efectúa el consumo
		success: function (data) {
			if (parametro == "listaPokemon") {
				listaPokemon(data)
			} else {
			 dataPokemonSeleccionado(data)
			}
		}
	});
}

function listaPokemon(data) {
	data.results.forEach(item => {
		$('#buscatupokemon').append(`<option value="${item.url}"> ${item.name} </option>`);
	});
}

function dataPokemonSeleccionado(data) {
	$('#imagenPokemon').attr("src", data.sprites.front_default);
	console.log('11111',data);
}


window.onload = function () {
	var chart = new CanvasJS.Chart("chartContainer", {
		theme: "light1", // "light2", "dark1", "dark2"
		animationEnabled: false, // change to true		
		title:{
			text: "Ataques"
		},
		data: [
		{
			// Change type to "bar", "area", "spline", "pie",etc.
			type: "pie",
			dataPoints: ataques
		}
		]
	});
	chart.render();

}

