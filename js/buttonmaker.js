var cssText              = '',
    forValue             = '';

var cssStuff = new Array();

cssStuff['buttonPadding']      = "5px 10px";
cssStuff['backgroundBottom']   = "#65a9d7";
cssStuff['backgroundTop']      = "#3e779d";
cssStuff['borderTopColor']     = "#96d1f8";
cssStuff['borderRadius']       = "8px";
cssStuff['textColor']          = "white";
cssStuff['hoverColor']         = "#ccc";
cssStuff['hoverBackground']    = "#28597a";
cssStuff['activeBackground']   = "#1b435e";
cssStuff['fontSize']           = "14px";
cssStuff['fontStack']          = "Georgia, serif";
    
function createCSS() {    
    cssText              = "  .button { ";
    cssText             += "     border-top: 1px solid " + cssStuff['borderTopColor'] + ";";
    
    cssText             += "     background: " + cssStuff['backgroundBottom'] + ";";
    cssText             += "     background: -webkit-gradient(linear, left top, left bottom, from(" + cssStuff['backgroundTop'] + "), to(" + cssStuff['backgroundBottom'] + "));";
    cssText             += "     background: -moz-linear-gradient(top, " + cssStuff['backgroundTop'] + ", " + cssStuff['backgroundBottom'] + ");";
    
    cssText             += "     padding: " + cssStuff['buttonPadding'] + ";";
    
    cssText             += "     -webkit-border-radius: " + cssStuff['borderRadius'] + ";";
    cssText             += "     -moz-border-radius: " + cssStuff['borderRadius'] + ";";
    cssText             += "     border-radius: " + cssStuff['borderRadius'] + ";";
    
    cssText             += "     -webkit-box-shadow: rgba(0,0,0,1) 0 1px 0;";
    cssText             += "     -moz-box-shadow: rgba(0,0,0,1) 0 1px 0;";
    cssText             += "     box-shadow: rgba(0,0,0,1) 0 1px 0;";
    
    cssText             += "     text-shadow: rgba(0,0,0,.4) 0 1px 0;";
    
    cssText             += "     color: " + cssStuff['textColor'] + ";";
    cssText             += "     font-size: " + cssStuff['fontSize'] + ";";
    cssText             += "     font-family: " + cssStuff['fontStack'] + ";";
    cssText             += "     text-decoration: none;";
    cssText             += "     vertical-align: middle;";
    
    cssText             += "  }";
    
    cssText             += "  .button:hover { ";
    cssText             += "     border-top-color: " + cssStuff['hoverBackground'] + ";";
    cssText             += "     background: " + cssStuff['hoverBackground'] + ";";
    cssText             += "     color: " + cssStuff['hoverColor'] + ";";
    cssText             += "  }";
    
    cssText             += "  .button:active { ";
    cssText             += "     border-top-color: " + cssStuff['activeBackground'] + ";";
    cssText             += "     background: " + cssStuff['activeBackground'] + ";";
    cssText             += "  }";
            
    $("style").replaceWith("<style type='text/css'>" + cssText + "</style>");
    $("#the-css").text(cssText);
}

function reCenterButton() {
    $(".button").position({
    	"my": "center center",
    	"at": "center center",
    	"of": $("#button-box")
    });
};

$(function() {

    $("head").append("<style type='text/css'></style>");

    reCenterButton();
    createCSS();
    
    $('#sizer').slider({
		values: [10],
		min: 4,
		max: 40,
		slide: function(event, ui) {
		    cssStuff['buttonPadding'] = ui.value/2 + "px " + ui.value + "px";
		    reCenterButton();
		    createCSS();
		}
	});
	
	$('#font-sizer').slider({
		values: [12],
		min: 8,
		max: 24,
		slide: function(event, ui) {
		    cssStuff['fontSize'] = ui.value + "px";
		    reCenterButton();
		    createCSS();
		}
	});
	
	$('#border-rounder').slider({
		values: [8],
		min: 0,
		max: 40,
		slide: function(event, ui) {
		    cssStuff['borderRadius'] = ui.value + "px";
		    createCSS();
		}
	});
	
	$('.pickable').ColorPicker({
    	onSubmit: function(hsb, hex, rgb, el) {
    		$(el).val(hex).css("background", "#" + hex);
    		$(el).ColorPickerHide();
    		
    		forValue = $(el).attr("rel");
    		    		
    		cssStuff[forValue] = "#" + hex;
    		createCSS();
    		
    	},
    	onChange: function(hsb, hex, rgb, el) {
    	
    		$($(this).data('colorpicker').el).val(hex).css("background", "#" + hex);
    		
    		forValue = $($(this).data('colorpicker').el).attr("rel");
    		    		
    		cssStuff[forValue] = "#" + hex;
    		createCSS();
    		
    	},
    	onBeforeShow: function () {
    		$(this).ColorPickerSetColor(this.value);
    	}
    });
    
    $("#fontSelector").change(function() {
    
        cssStuff['fontStack'] = $(this).val();
        createCSS();
    
    });
    
    $(".button").click(function() {
        $("#the-css").dialog({
            "title": "The CSS",
            "width": 400
        });
    });
    


});