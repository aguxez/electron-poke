// LOADING ICON
$body = $("body");

//open links externally by default
var handleRedirect = (e, url) => {
  if(url != webContents.getURL()) {
    e.preventDefault()
    require('electron').shell.openExternal(url);
  }
};

// LOADS ICON WHEN AJAX EVENTS HAPPEN AND ANIMATE THE BACKGROUND ONLY WHEN THE REQUEST IS SUCCESSFUL
$(document).on({
	ajaxStart: function() { 
		$body.addClass("loading");
	},
	ajaxStop: function() { 
		$body.removeClass("loading"); 
	},
	ajaxSuccess: () => {
		$('#backgroundPokemon').animate({
			"padding-top": "0",
			"padding-bottom": "5%"
		}, 700);
		$imgRefres();
	}
});

// ZOOMS IN IMAGE ON CLICK
var $zoom = 0;
$('#sprite').on("click", () => {
    if ($zoom === 0)
    {
        $('#sprite img').animate({ "width": "17%" });
        $zoom++;
    }
    else 
    {
        $('#sprite img').animate({ "width": "9%"});
        $zoom--;
    }
});


// CHANGES BACKGROUND ON EACH REFRESH
var $imgRefres = () => $('#backgroundPokemon').css({'background-image': "url(./images/backgrounds/" + Math.floor(Math.random() * 48) + ".jpg)"});
$imgRefres();

// FIRES SEARCH FUNCTION WHEN ENTER KEY IS PRESSED OR WHEN SEARCH BUTTON IS CLICKED AND SUBMIT BUTTON IS DISABLED BY DEFAULT... MAYBE ADD MORE SHORTCUTS
$('#search').attr('disabled', true);

$("#pokemonName").keyup(event => {
	// DISABLE SEARCH BUTTON & CAN'T MAKE A SEARCH IF INPUT IS EMPTY
	if($('#pokemonName').val() !== "")
	{
		if (event.keyCode === 13) {
			$("#search").click();
		}
		$('#search').attr('disabled', false).css('oppacity', "100%");
	}
	else {
		$('#search').attr('disabled', true);
	}
});

// RELOADS WHEN TITLE IS CLICKED

$('#page').on("click", () => {
    window.location.reload();
});