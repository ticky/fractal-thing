# Fractal Thing

Fractal Thing is a fairly simplistic Mandelbrot renderer written in standard Javascript and HTML5 Canvas.

Rendering is performed asynchronously and there are a few options you can mess about with. (You can even mess about with them while the renderer is running - creating some interesting effects.)

Since rendering was switched to an asynchronous model, the rendering time is increased two-fold, but the browser doesn't lock up anymore, so it's a win.