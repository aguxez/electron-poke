// MAIN REQUEST FOR POKEMON INFORMATION ON WEBSITE
$('#search').on("click", () => 
{
	String.prototype.capitalizeFirstLetter = function () {
		return this.charAt(0).toUpperCase() + this.slice(1);
	};

	// POKEMON NAME TO SEARCH
	var name = $("#pokemonName").val().split(" ").join("-").toLowerCase();
	
	// VAR OUTSIDE SO I CAN ACCES CONTENT FROM OTHER REQUEST
	var typeArr = [];

	$.ajax({
		type: "GET",
		url: `http://pokeapi.co/api/v2/pokemon/${name}`,
		cache: true,
		ifModified: true,
		data: "jsonp",
		success: data => 
		{
			// LOAD EVERYTHING AND PUT IT ON IT'S ON SPACE IN THE WEBPAGE
			// GET STATS AND EV
			var statArr = [];
			var evArr = [];

			for (let x in data.stats) {
				statArr.unshift(data.stats[x].base_stat);
				evArr.unshift(data.stats[x].effort);
			}

			for (let l in data.types) {
				typeArr.unshift(data.types[l].type.name);
			}
			console.log(typeArr);

			// LOAD BUTTON GROUPS
			$('#button-group').show();


			// POKEMON NAME ABOVE TABLE
			$("#pokName").html(`${data.name.capitalizeFirstLetter().split("-").join(" ")}`);

			// CHANGE COLOR OF EACH POKEMON TYPE ACCORDINGLY
			var wordColor = {
				"Normal": "#919160",
				"Fire": "#e5711d",
				"Water": "#5682ee",
				"Electric": "#f1c30e",
				"Grass": "#65b33d",
				"Ice": "#7fcece",
				"Fighting": "#a42922",
				"Poison": "#a42922",
				"Ground": "#d7ad3b",
				"Flying": "#9381c7",
				"Psychic": "#f72463",
				"Bug": "#9dac1e",
				"Rock": "#9e8a30",
				"Ghost": "#5a477b",
				"Dragon": "#5e20f4",
				"Dark": "#665042",
				"Steel": "#afafca",
				"Fairy": "#e281e2" 
			};

			let k = wordColor;
			let kk = typeArr[0].capitalizeFirstLetter();

			if ($.inArray(wordColor, typeArr))
			{
				$('#types').html(`<a href="https://pokemondb.net/type/${typeArr[0]}" target="_blank">
				${typeArr[0].capitalizeFirstLetter()}</a>`).css( "color", k[kk]);
				
				if (typeArr[1] !== undefined)
				{
					$('#secondType').html(`<a href="https://pokemondb.net/type/${typeArr[1]}" target="_blank"> 
					${typeArr[1].capitalizeFirstLetter()}</a>`).css( "color", k[typeArr[1].capitalizeFirstLetter()]);
				}
				else 
				{
					$('#secondType').html("");
				}
			}



			// TABLE; REMOVE ACTIVE CLASS AND PUT IT ON THE CLICKED BUTTON
			var statsTable = () => {
				$("#main").html("<br/><div class=\"table-responsive\"><table class=\"table\"><thead><tr><th>Stat</th><th>Val</th><th>E.V.</th></thead>" +
				"<tbody><tr><td>Health</td><td>" + statArr[0] + "</td><td>" + evArr[0] + "</td></tr></tbody>" +
				"<tbody><tr><td>Attack</td><td>" + statArr[1] + "</td><td>" + evArr[1] + "</td></tr></tbody>" +
				"<tbody><tr><td>Defense</td><td>" + statArr[2] + "</td><td>" + evArr[2] + "</td></tr></tbody>" +
				"<tbody><tr><td>Sp. Attack</td><td>" + statArr[3] + "</td><td>" + evArr[3] + "</td></tr></tbody>" +
				"<tbody><tr><td>Sp. Defense</td><td>" + statArr[4] + "</td><td>" + evArr[4] + "</td></tr></tbody>" +
				"<tbody><tr><td>Speed</td><td>" + statArr[5] + "</td><td>" + evArr[5] + "</td></tr></tbody></table></div>");

				$('#button-group button').removeClass("active");
				$('#mainBtn').addClass("active");
			};


			// SPRITE CODE
			var sprite;
			// CHECKS FOR FRONT SPRITE OF POKEMON, I HAD TO DO THIS BECAUSE THERE IS DATA WITHOUT FRONT SPRITE
			if (data.sprites.front_default === null)
			{
				sprite = $('#sprite').html('<h3>Sprite not available for this Pokemon, sorry for the inconvenience.</h3><br/>');
			}
			else
			{
				sprite = $('#sprite').html('<img src="images/pokemon/' + data.id + '.png" class="img-responsive img-pad"/>');
			}

			// CHECK IF THE POKEMON IS NOT A MEGA EVOLUTION AND THEN TRIES TO GET OTHER SPRITES
			if($("#pokemonName").val().indexOf("mega") === -1)
			{
				// BACK SPRITE
				if (data.sprites.back_default !== null)
				{
					sprite.append(`<img src="images/pokemon/back/${data.id}.png" class="img-responsive img-pad"/>`);
				}

				// FRONT AND BACK FEMALE
				if (data.sprites.front_female !== null)
				{
					sprite.append(`<img src="images/pokemon/female/${data.id}.png" class"img-responsive img-pad/>`);
					
					if (data.sprites.back_female !== null)
					{
						sprite.append(`<img src="images/pokemon/back/female/${data.id}.png" class"img-responsive img-pad/>`);
					}
				}

				// FRONT AND BACK SHINY
				if (data.sprites.front_shiny !== null)
				{
					sprite.append(`<img src="images/pokemon/shiny/${data.id}.png" class"img-responsive img-pad/>`);

					if (data.sprites.back_shiny !== null)
					{
						sprite.append(`<img src="images/pokemon/back/shiny/${data.id}.png" class"img-responsive img-pad/>`);
					}
				}

				// FRONT AND BACK SHINY FEMALE
				if (data.sprites.front_shiny_female !== null)
				{
					sprite.append(`<img src="images/pokemon/shiny/female/${data.id}.png" class"img-responsive img-pad/>`);

					if (data.sprites.back_shiny_female !== null)
					{
						sprite.append(`<img src="images/pokemon/back/shiny/female/${data.id}.png" class"img-responsive img-pad/>`);
					}
				}

			}

			// LOAD THIS ON HIDDEN DIVs
			// ABILITIES
			var abHidden = [];
			var abName = [];

			for (var t in data.abilities)
			{
				abHidden.unshift(data.abilities[t].is_hidden);
				abName.unshift(data.abilities[t].ability.name);
			}




			// LISTEN ON CLICKS ON BUTTONS TO LOAD CONTENT OF EACH
			//MAIN
			$('#mainBtn').on("click", () => 
			{
				$('#button-group button').removeClass("active");
				$('#mainBtn').addClass("active");
				$('#main').html(statsTable());
			});

			//ABILITIES
			$('#abiBtn').on("click", () => 
			{
				$('#button-group button').removeClass("active");
				$('#abiBtn').addClass("active");

				// ABILITY NAME
				$('#main').html(
					`<br/><div class="table-responsive"><table class="table"><thead><tr><th>Ability</th><th>Hidden</th></tr></thead>
					<tbody> <tr><td>${abName[0].split("-").join(" ").capitalizeFirstLetter()}</td> <td>${abHidden[0]}</td></tr>`
				);

				// CHECK IF ABILITY NAME EXISTS AND APPEND TO THE TABLE
				if(abName[1] !== undefined)
				{
					$('#main div table').append(`<tr><td>${abName[1].split("-").join(" ").capitalizeFirstLetter()}</td> <td>${abHidden[1]}</td></tr>`);
					
					if (abName[2] !== undefined)
					{
						$('#main div table').append(`<tr><td>${abName[2].split("-").join(" ").capitalizeFirstLetter()}</td> <td>${abHidden[2]}</td></tr></table></div>`);
					}
				}

			});



			// FOOTER
			$('.footer').html(`<br /><p class="text-muted">This was made for fun. Follow <a href="http://twitter.com/fuhrerguxez" target="_blank">@Fuhrerguxez</a>. 
			All wallpapers were provided by <a href="https://pokewalls.wordpress.com" target="_blank">Pokewalls</a></p>`).css({
				"margin-top": "-1px"
			});

			// FIRE THIS TO ALWAYS SHOW THE MAIN BUTTON PAGE WHENEVER A NEW REQUEST IS MADE
			statsTable();


		},
		error: error =>
		{
			// MODAL TOGGLE ON ERROR
			$('#myModal').modal('show');
		}
	});

});