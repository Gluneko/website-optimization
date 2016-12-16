###Udacity Front-End Web Developer Nanodegree – Project 04


# Website Performance Optimization

###Project Requirements:

Optimize a online portfolio in terms of critical rendering path and frames per second (FPS).

### Get started

#### Part 1: Optimize PageSpeed Insights score for index.html

- Download the project from Github.
- Use the python server to display the website or go to the [live version](https://gluneko.github.io/)

  ```bash
  $> cd /path/to/your-project-folder
  $> python -m SimpleHTTPServer 8080
  ```

- Open a browser and visit localhost:8080
- Download and install [ngrok](https://ngrok.com/) to make your local server accessible remotely.

  ``` bash
  $> cd /path/to/your-project-folder
  $> ./ngrok http 8080
  ```

- Copy the public URL ngrok gives you and paste it in the analyze field at [PageSpeed Insights](https://developers.google.com/speed/pagespeed/insights) to view the scores.

##### Optimizations

1. index.html:

    - Using Grunt to compress images and minify js,cs,html files.The source codes are in src file and the processed codes are in dist file.In order to use grunt,you need to install [nodejs](https://nodejs.org/en/) first and then Grunt.

    ``` bash
    npm install -g grunt-cli
    cd /path/to/your-project-folder
    npm install grunt --save-dev
    npm install --save-dev grunt-contrib-copy grunt-contrib-clean grunt-contrib-imagemin grunt-contrib-cssmin grunt-contrib-uglify grunt-contrib-htmlmin
    grunt
    ```

    - Inline style.css,google font and add media query to print.css, Asynchronous loading of javascript files to prvent from render blocking.

#### Part 2: Optimize Frames per Second in pizza.html

- Click on the "Cam's Pizzeria" link.

- Use Dev Tools to show the page speed.


##### Optimizations:

1. views/css/style.css:

	- Added below code to both `.mover` and `.randomPizzaContainer` class to increased the site performance with hardware accelerated CSS :

    ``` bash
    transform: translateZ(0);
    will-change:transform;
    ```

2. views/js/main.js:

	-	Removed function `determineDx` since it was redundant. Refactored the function `changePizzaSizes` using percentage width according to changes in size sliding bar. This avoids calculating pixel values repeatedly.Put `var len` in  the loop initialization so that they are not checked at each iteration.

    -   Replaced all `querySelectorAll` with `getElementsByClassName` and Replaced all `querySelector` with `getElementById` for a more specific and time-saving query.

	-	Refactored function `updatePositions` by taking `var phase` out of the loop to do 5 calculations once and then reference in for loop.Put `var len` in  the loop initialization.Changed `style.transform` instead of `style.left` in the loop to get rid of the need to trigger a read layout.

    -   In scroll event listener using `requestAnimationFrame` to make sure function `updatePositions` isn't firing unnecessarily.

    -   In DOMContentLoaded event listener,taking `getElementById` out of the loop,placing the var 'elem' in the loop initialization,Reducing number of pizzas from 200 to 24 since they are actually seen on the screen.Set the initial left value in the loop.


