window.onload = function(){
    var w = 950, h = 500;
      
    var container = d3.select("body") //get the <body> element from the DOM
    .append("svg") //put a new svg in the body
    .attr("width", w) //assign the width
    .attr("height", h) //assign the height
    .attr("class", "container") //always assign a class (as the block name) for styling and future selection
    .style("background-color", "rgba(0,0,0,0.2)");
    console.log(container);

    var title = container.append("text")
        .attr("class", "title")
        .attr("text-anchor", "middle")
        .attr("x", 450)
        .attr("y", 30)
        .text("City Populations");
    
    //innerRect block
    var innerRect = container.append("rect") //put a new rect in the svg
        .datum(400)
        .attr("width", function(d){ //rectangle width
            return d * 2; //400 * 2 = 800
        })//rectangle width
        
        .attr("height", function(d){ //rectangle height
            return d; //400
        })
        .attr("class", "innerRect") //class name
        .attr("x", 50) //position from left on the x (horizontal) axis
        .attr("y", 50) //position from top on the y (vertical) axis
        .style("fill", "#FFFFFF"); //fill color
        console.log(innerRect);
    
    var x = d3.scaleLinear() //create the scale
        .range([90, 700]) //output min and max
        .domain([0, 3]); //input min and max    
    
    

    var cityPop = [
        {
            city :'Oakland',
            population: 406253         
        },
        
        {
            city:'Minneapolis',
            population: 400070
        },
        
        {
            city:'Houston',
            population: 2196000
        },
        
        {
            city:'Atlanta',
            population: 447841
        }   
    ];
     //find the minimum value of the array
    var minPop = d3.min(cityPop, function(d){
        return d.population;
    });

    //find the maximum value of the array
    var maxPop = d3.max(cityPop, function(d){
        return d.population;
    });

    //scale for circles center y coordinate
    var y = d3.scaleLinear()
        .range([450, 50])
        .domain([0, 2500000]);    
    //color scale generator 
    var color = d3.scaleLinear()
        .range([
            "#FDBE85",
            "#D94701"
        ])
        .domain([
            minPop, 
            maxPop
        ]);
    var labels = container.selectAll(".labels")
        .data(cityPop)
        .enter()
        .append("text")
        .attr("class", "labels")
        .attr("text-anchor", "left")
        .attr("x", function(d,i){
            //horizontal position to the right of each circle
            return x(i) + Math.sqrt(d.population * 0.01 / Math.PI) + 5;
        })
        .attr("y", function(d){
            //vertical position centered on each circle
            return y(d.population) + 2;
        });
    //first line of label
    var nameLine = labels.append("tspan")
        .attr("class", "nameLine")
        .attr("x", function(d,i){
            //horizontal position to the right of each circle
            return x(i) + Math.sqrt(d.population * 0.01 / Math.PI);
        })
        .text(function(d){
            return d.city;
        });

    var format = d3.format(",");    
    
    //second line of label
    var popLine = labels.append("tspan")
        .attr("class", "popLine")
        .attr("x", function(d,i){
            //horizontal position to the right of each circle
            return x(i) + Math.sqrt(d.population * 0.01 / Math.PI);
        })
        .attr("dy", "15") //vertical offset
        .text(function(d){
            return "Pop. " + format(d.population);
        });    
         

          
    var circles = container.selectAll(".circles")
      .data(cityPop) //here we feed in an array
      .enter()
      .append("circle") //add a circle to a datum
      .attr("class", "circles") //apply a class name to all circles
      .attr("id", function(d){
        return d.city;
      })
      .attr("r", function(d){ 
      //circle radius
        var area = d.population *0.001;    
            return Math.sqrt(area/Math.PI);
        })
        
        .attr("cx", function(d, i){
            //use the scale generator with the index to place each circle horizontally
            return x(i);
        })   
        .attr("cy", function(d){ 
           //subtract value from 450 to "grow" circles up from the bottom instead of down from the top of the SVG  
            return y(d.population);
        })
         .style("fill", function(d, i){ //add a fill based on the color scale generator
            return color(d.population);
        })
        .style("stroke", "#000"); //black circle stroke
     
    var yAxis = d3.axisLeft(y);        
    //create axis g element and add axis
    var axis = container.append("g")
        .attr("class", "axis")
        .attr("transform", "translate(50, 0)")
        .call(yAxis);
  
  };
 
