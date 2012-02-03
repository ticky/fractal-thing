
function draw()
{

	// Start Timer
	var testingtimerstart = new Date();

	// Detect Canvas Support
	var displayCanvas = document.getElementById('display');

	if (displayCanvas.getContext)
	{

		var displayContext = displayCanvas.getContext('2d');

		// Get maximum iterations from control panel.
		iteration_max = document.getElementById('iterations').value;

		// Get hue adjustment from control panel.
		hueadjust = document.getElementById('hueadj').value;

		logcolor = document.getElementById('logcolor').checked;

		for (var ii = 0; ii < displayContext.canvas.width; ii++)
		{

			for (var jj = 0; jj < displayContext.canvas.height; jj++)
			{
				
				// Map display pixels to algorithm coordinates.
				var xzero = (((ii / displayContext.canvas.width) * 3.5) - 2.5);
				var yzero = (((jj / displayContext.canvas.height) * 2) - 1);

				var x = 0;
				var y = 0;

				iteration_current = 0;

				while( (x*x + y*y < 4) && (iteration_current < iteration_max))
				{
					
					var xtmp = x*x - y*y + xzero;
					y = 2*x*y + yzero;

					x = xtmp;

					iteration_current++;

				}

				// Choose a hue, taking into account the hue adjustment.
				if(logcolor == true)
				{
					var newhue = (Math.log(iteration_current) / Math.log(iteration_max)) + (hueadjust / 360);
				}
				else
				{
					var newhue = (iteration_current / iteration_max) + (hueadjust / 360);
				}

				// Limit hue value to the range of 0 to 1
				if(newhue > 1)
				{

					newhue--;

				}

				displayContext.fillStyle = hsvToRgb(newhue, 1, 1);

				// Draw ourselves a pixel.
				displayContext.fillRect(ii, jj, ii, jj);

			}

		}

	}
	else
	{

		alert("Hi there, you're using an older browser which doesn't support Canvas, so unfortunately I can't show you this demo. Sorry!");
		
	}

	// Stop timer, and write to log.
	var testingtimerstop = new Date();
	var logarea = document.getElementById('loginfo');
	var newitem = document.createElement('div');
	newitem.innerHTML = "<logentry><span class=\"logtime\">" + (testingtimerstop - testingtimerstart) + "ms</span><span class=\"logits\">" + document.getElementById('iterations').value + "</span><span class=\"loglogarithm\">" + document.getElementById('logcolor').checked; + "</span></logentry>";

	while (newitem.firstChild) {
        logarea.appendChild(newitem.firstChild);
    }

}

function hsvToRgb(h, s, v)
{

    var r, g, b;

    var i = Math.floor(h * 6);
    var f = h * 6 - i;
    var p = v * (1 - s);
    var q = v * (1 - f * s);
    var t = v * (1 - (1 - f) * s);

    switch(i % 6){

        case 0: r = v, g = t, b = p; break;
        case 1: r = q, g = v, b = p; break;
        case 2: r = p, g = v, b = t; break;
        case 3: r = p, g = q, b = v; break;
        case 4: r = t, g = p, b = v; break;
        case 5: r = v, g = p, b = q; break;

    }

    return "rgb(" + Math.round(r * 255) + "," + Math.round(g * 255) + "," + Math.round(b * 255) + ")";
}

function updatesliderlabel(newValue, updateobj)
{

	document.getElementById(updateobj).innerHTML=newValue;

}

function setup()
{
	document.getElementById('renderbtn').onclick = draw;
}

window.onload = setup;