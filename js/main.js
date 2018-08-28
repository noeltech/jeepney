
mapboxgl.accessToken = 'pk.eyJ1Ijoibm9lbHRlY2giLCJhIjoiY2o2azRiazZ2MTVlZDMxbXdvdTU1OW03YSJ9.eYd9NVbg2cgcrAqs0da8eA';
//Initiate map
var map = new mapboxgl.Map({
  container: 'map', // container id
  //  style: 'mapbox://styles/mapbox/light-v9',
  //style: 'mapbox://styles/mapbox/light-v9', // stylesheet location
  style: 'mapbox://styles/mapbox/dark-v9',
  //maxBounds: [[122.4230575562,10.6292284096],[ 122.6853561401,10.808014608]],
  //maxBounds: [[119.9902,9.119],[ 125.3564,13.0414]],
  //122.4230575562,10.6292284096,122.6853561401,10.808014608

  center: [122.551889,10.718756],
  //pitch: 60, // pitch in degrees
  //bearing: -30,
  //maxZoom: 18
  zoom: 12.7
  });
  var acc = document.getElementsByClassName("accordion");
  var i;

for (i = 0; i < acc.length; i++) {
  acc[i].onclick = function() {
    this.classList.toggle("active");
    var panel = this.nextElementSibling;
    if (panel.style.maxHeight){
      panel.style.maxHeight = null;
    } else {
      panel.style.maxHeight = panel.scrollHeight + "px";
    }
  }
}
map.on('load', function() {
  var AnimatePause=[true,true,true,true,true];
  var AnimateJeepney=[];
  // toggle jeepney routes and Animation on or off
$(".jeepney-routes").click(function(i,){
      var index = $('.jeepney-routes').index(this);
      var color =$(".route-layer:eq("+index+")").css('background-color');
      if (color == "rgb(41, 195, 27)"){
          $(".route-layer:eq("+index+")").css('background-color','#d6d6d6');
          map.setLayoutProperty(toggleableLayerIds[$('.jeepney-routes').index(this)], 'visibility', 'none');
          AnimatePause[$('.jeepney-routes').index(this)]=false;
      }
      else{
          $(".route-layer:eq("+index+")").css('background-color','rgb(41, 195, 27)');
          map.setLayoutProperty(toggleableLayerIds[$('.jeepney-routes').index(this)], 'visibility', 'visible');
          AnimatePause[$('.jeepney-routes').index(this)]=true;
          AnimateJeepney[$('.jeepney-routes').index(this)]();

    }
 });
 // Slide menu button functions and animations
 var menuSlide = [">>  Jeepney Routes",">>  Terminals"]
 $(".slide-button").click(function(i,){
       var text = $(this).text();
       var index = $('.slide-button').index(this)
       if(text==="<<<"){

         $(".overlay-wrapper-info:eq("+index+")").animate({"left":"-305px"},"fast");
         $(this).animate({"left":"-1px"}).text(menuSlide[index]);
         $('.slide-button').not(this).each(function(){
                 $(this).css("display","block");
             });

       }
       else{
         $(".overlay-wrapper-info:eq("+index+")").animate({"left":"5px"},"fast");
         $(this).animate({"left":"305px"}).text("<<<");
         $('.slide-button').not(this).each(function(){
                 $(this).css("display","none");
             });
             ChartsFunction[index]();
       }
  });
 var ChartsFunction=[];
 ChartsFunction[0] = function RouteDistanceChart(){
   var colors=['red','#0e6c1a','#0c4383','#b09b10','#630e96']
   var chart = c3.generate({
     bindto: '#route-chart_1',
     title: {
       text: 'Jeepney Routes Distances',
     },
     size: {
        height: 200,
        width: 300
      },
     padding: {
           left: 75,
           top: 10
         },
    data: {
      x:'x',
        columns: [
            ['x' ,'Villa Bay-bay','Timawa','Baluarte','Calumpang','Jaro CPU'],
            ['kilometers', 0,0,0,0,0]

        ],
        type: 'bar',
          color: function (color, d) {
             return colors[d.index];
         },
       labels: true

     },
    //transition: {
      //   duration: 2000 },
    axis: {
        rotated: true,
        x:{
          type:'category'
         }
      },

      bar: {
        width: {
            ratio: 0.7 // this makes bar width 50% of length between ticks
        }
      }
    });
    setTimeout(function() {
        chart.load({
              columns: [
                  ['kilometers', 12.5,7.9,9.4,15.8,8.4]
              ]

         });
     }, 500);

   var chart1 = c3.generate({
    bindto: '#route-chart_2',
    title: {
    text: 'Number of Route Cycle Per Day',
    },
    size: {
      height: 200,
      width: 300
    },
    padding: {
        left: 30,
        top: 10
      },
    data: {
      x:'x',
     columns: [
         ['x' ,'Villa Bay-bay','Timawa','Baluarte','Calumpang','Jaro CPU'],
         [ 'Routes',0,0,0,0,0]
     ],
     type: 'bar',
       color: function (color, d) {
          return colors[d.index];
      },
    labels: true

     },
    axis: {
    //  rotated: true,
      x:{
       type:'category'
       }
     },

     bar: {
        width: {
           ratio: 0.7 // this makes bar width 50% of length between ticks
       }
    }
    });
    setTimeout(function() {
          chart1.load({
                columns: [
                    [ 'Routes',12,13,18,15.8,11]
                ]

          });
      }, 500);
   var chart2 = c3.generate({
     bindto: '#route-chart_3',
     title: {
       text: 'Registered Jeepney/Franchise',
     },
     size: {
        height: 250,
        width: 300
      },
      data: {
          // iris data from R
          rows: [
            ['Villa Bay-bay','Timawa','Baluarte','Calumpang','Jaro CPU'],
            [ 0,0,0,0,0]
          ],
          type : 'pie',
          colors: {
            'Villa Bay-bay':'red','Timawa':'#0e6c1a','Baluarte':'#0c4383','Calumpang':'#b09b10','Jaro CPU':'#630e96'
          },
          labels: true
        },
      pie: {
        label: {
            format: function (value, ratio, id) {
                return value;
             }
        }
     }
    });

    setTimeout(function () {
      chart2.load({
          rows: [
            ['Villa Bay-bay','Timawa','Baluarte','Calumpang','Jaro CPU'],
            [ 26,35,20,34,19]
          ]

      });
    }, 300);

 }//end of function

 var toggleableLayerIds = [ 'trace', "TimawaLayer","BaluarteLayer","CalumpangLayer","JaroCpuLayer" ];
 map.addLayer({
       "id": "ICTerminals",
       "type": "fill-extrusion",
       'minzoom': 14,
       "source": {
           type: 'vector',
           url: 'mapbox://noeltech.2el0onab'
        },
       "source-layer": "IC_Terminals-1ktq6e",
       "paint": {
           //"fill-color": "#8c23b1",
          //  "fill-opacity" : 0.5,
            "fill-extrusion-height": 20,
            'fill-extrusion-base': 0,
            'fill-extrusion-opacity': .6,
            'fill-extrusion-color': '#357c35'
        }
   });
   map.addLayer({
         "id": "ICTerminalMarkers",
         "type": "symbol",
         'maxzoom': 16,
         "source": {
             type: 'vector',
             url: 'mapbox://noeltech.0q322dxa'
          },
         "source-layer": "IC_Terminal_Points-0rnpbp",
         "layout": {
             "icon-image":{
               property: 'Category',
                type: 'categorical',
                stops: [
                    ['1', 'suitcase-15'],
                    ['2', 'suitcase-15'],
                    ['3', 'suitcase-15'],
                    ['4', 'suitcase-15'],
                    ['8', 'suitcase-15'],
                    ['5', 'harbor-15'],
                    ['6', 'harbor-15'],
                    ['7', 'harbor-15']
                  ]
              },
             "text-field": "{Name}",
             "text-font": ["Open Sans Semibold"],
             "text-offset": [0, 1],
             "text-anchor": "top",
             "text-size": {
                "stops": [
                [0, 0],
                [13,0],
                [17,30]
                ]
              }
          },
          "paint":{
            "text-halo-color":"#f1f1f1",
            "text-halo-width":4

          }
     });
// Zoom out map after map loads
/*map.on("load", function(){
  map.flyTo({
       // These options control the ending camera position: centered at
       // the target, at zoom level 9, and north up.
       zoom: 13,
       // These options control the flight curve, making it move
       // slowly and zoom out almost completely before starting
       // to pan.
       speed: 0.9, // make the flying slow
       curve: 1, // change the speed at which it zooms out
       // This can be any easing function: it takes a number between
       // 0 and 1 and returns another number between 0 and 1.
   });
      });
*/

  // Initiating Villa Route
  $.getJSON('https://api.myjson.com/bins/i1iat', function (route){
      var pointsONroute = [];
      var coordinates = route.features[0].geometry.coordinates;
      var lineDistance = turf.lineDistance(route.features[0], 'kilometers');
      console.log(lineDistance);
      // Divide the route into specific interval and save coordinates
      for (var i = 0; i < lineDistance*10 ; i++) {
          var segment = turf.along(route.features[0],i/10, 'kilometers');
          pointsONroute.push(segment.geometry.coordinates);
          }
          console.log(pointsONroute.length);
          //route.features[0].geometry.coordinates = pointsONroute;
          route.features[0].geometry.coordinates= [pointsONroute[pointsONroute.length-1]]
        map.addSource('trace', { type: 'geojson', data: route });
        map.addLayer({
              "id": "trace",
              "type": "line",
              "source": "trace",
              "paint": {
                    "line-color": "red",
                    "line-opacity": 1,
                    "line-width": 3
                }
            });
            // Animate the route by updating the coordinate through a loop
            var i = pointsONroute.length-1;
            var timer = window.setInterval(function() {
                if (i > 0) {
                    route.features[0].geometry.coordinates.push(pointsONroute[i]);
                    map.getSource('trace').setData(route);
                    //map.panTo(pointsONroute[i]);
                    i--;
                } else {
                    window.clearInterval(timer);
                    AnimateVillaJeep();
                }
            },30);
    });

 // Villa Route Jeepney Animation
  function AnimateVillaJeep(){
   $.getJSON('https://api.myjson.com/bins/i1iat', function (route){
          var pointsONroute = [];
          var coordinates = route.features[0].geometry.coordinates;
          var lineDistance = turf.lineDistance(route.features[0], 'kilometers');
          console.log(lineDistance);
          // Divide the route into specific interval and save coordinates
          for (var i = 0; i < lineDistance*100 ; i++) {
              var segment = turf.along(route.features[0],i/100, 'kilometers');
              pointsONroute.push(segment.geometry.coordinates);
              }
          var counter = 0;
          var fps =60;
          var villaJeep ={
                  "type": "FeatureCollection",
                  "features": [{
                      "type": "Feature",
                      "geometry": {
                          "type": "Point",
                          "coordinates": pointsONroute[0]
                        },
                      },  {
                    "type": "Feature",
                    "geometry": {
                        "type": "Point",
                        "coordinates": pointsONroute[1116]
                    },
                }]
              };
            map.addSource('villaJeepSource', {
                    "type": "geojson",
                    "data": villaJeep
                  });
            map.addLayer({
                    "id": "VillaJeepLayer",
                    "source": 'villaJeepSource',
                    "type": "symbol",
                    "layout": {
                        "icon-image": "bus-15"

                      //  "icon-rotate": 90
                      }
                    });

            var bound = 0;
            var counter2 = 1116;
            AnimateJeepney[0] = function AnimateVilla(){
                  setTimeout(function(){
                  villaJeep.features[0].geometry.coordinates = pointsONroute[counter];
                  villaJeep.features[1].geometry.coordinates = pointsONroute[counter2];
                  map.getSource('villaJeepSource').setData(villaJeep)
                  if (AnimatePause[0]){
                      requestAnimationFrame( AnimateVilla);
                    }
                  if (bound == 0){
                        counter++;
                        counter2--;
                        }
                   if(bound == 1){
                     counter--;
                   counter2++}
                    if (counter==1116){
                    bound=1;
                    }
                    if (counter==0){
                      bound=0;
                   }
                  },1000/fps);
              }
              AnimateJeepney[0]();
          });
      }
  // Initiate Jaro-Cpu Route
  $.getJSON('https://api.myjson.com/bins/15hzj9', function (JaroCpuRoute){
                // measure the distance of the line
                var lineDistance = turf.lineDistance(JaroCpuRoute.features[0], 'kilometers');
                console.log(lineDistance);
                var AlongJaroCpuRoute =[]; // new coordinates container
                // Divide the route into specific interval and save coordinates
                for (var i = 0; i < lineDistance*10 ; i++) {
                    var segment = turf.along(JaroCpuRoute.features[0],i/10, 'kilometers');
                    AlongJaroCpuRoute.push(segment.geometry.coordinates);
                    }
                  console.log(AlongJaroCpuRoute.length);
                  // update the starting point of the line
                  JaroCpuRoute.features[0].geometry.coordinates= [AlongJaroCpuRoute[AlongJaroCpuRoute.length-1]]
                  // add the line layer to be animated, style it according to preference
                  map.addSource('JaroCpuSource', { type: 'geojson', data: JaroCpuRoute });
                  map.addLayer({
                        "id": "JaroCpuLayer",
                        "type": "line",
                        "source": "JaroCpuSource",
                        "paint": {
                              "line-color": "#630e96",
                              "line-opacity": 1,
                              "line-width": 3
                          }
                      });
                      // animate the line by looping through all the coordinates
                      var i = AlongJaroCpuRoute.length-1;
                      var timer = window.setInterval(function() {
                          if (i > 0) {
                              JaroCpuRoute.features[0].geometry.coordinates.push(AlongJaroCpuRoute[i]);
                              map.getSource('JaroCpuSource').setData(JaroCpuRoute);
                              //map.panTo(pointsONroute[i]);
                              i--;
                          } else {
                              window.clearInterval(timer);
                              AnimateJaroCpuJeep()
                          }
                      }, 30);// animation speed
  });
  // Initiate Jaro Jeep Animation
  function AnimateJaroCpuJeep(){
    $.getJSON('https://api.myjson.com/bins/15hzj9', function (JaroCpuRoute){
          var AlongJaroCpuRoute = [];
          var coordinates = JaroCpuRoute.features[0].geometry.coordinates;
          var lineDistance = turf.lineDistance(JaroCpuRoute.features[0], 'kilometers');

          // Divide the route into specific interval and save coordinates
          for (var i = 0; i < lineDistance*100 ; i++) {
              var segment = turf.along(JaroCpuRoute.features[0],i/100, 'kilometers');
              AlongJaroCpuRoute.push(segment.geometry.coordinates);
              }
          var counter = 0;
          var fps =30;
          var JaroCPUJeep ={
                  "type": "FeatureCollection",
                  "features": [{
                      "type": "Feature",
                      "geometry": {
                          "type": "Point",
                          "coordinates": AlongJaroCpuRoute[0]
                        },
                      },  {
                    "type": "Feature",
                    "geometry": {
                        "type": "Point",
                        "coordinates": AlongJaroCpuRoute[778]
                    },
                }]
              };
            map.addSource('JaroCPUSource', {
                    "type": "geojson",
                    "data": JaroCPUJeep
                  });
            map.addLayer({
                    "id": "JaroCPUJeepLayer",
                    "source": 'JaroCPUSource',
                    "type": "symbol",
                    "layout": {
                        "icon-image": "bus-15"
                      //  "icon-rotate": 90
                      }
                    });

            var bound = 0;
            var counter2 = 778;
            AnimateJeepney[4] = function AnimateJaroCPU(){
                  setTimeout(function(){
                  JaroCPUJeep.features[0].geometry.coordinates = AlongJaroCpuRoute[counter];
                  JaroCPUJeep.features[1].geometry.coordinates = AlongJaroCpuRoute[counter2];
                  map.getSource('JaroCPUSource').setData(JaroCPUJeep)
                  if (AnimatePause[4]){
                      requestAnimationFrame(AnimateJaroCPU);

                    }
                  if (bound == 0){
                        counter++;
                        counter2--;
                        }
                   if(bound == 1){
                     counter--;
                   counter2++}
                    if (counter==778){
                    bound=1;
                    }
                    if (counter==0){
                      bound=0;
                   }
                  },1000/fps);
              }
              AnimateJeepney[4]();
          });
      }
  // Initiate Baluarte  Route
  $.getJSON('https://api.myjson.com/bins/rfq85', function (BaluarteRoute){
                    // measure the distance of the line
                      var lineDistance = turf.lineDistance(BaluarteRoute.features[0], 'kilometers');
                      console.log(lineDistance);
                      var AlongBaluarteRoute =[]; // new coordinates container
                      // Divide the route into specific interval and save coordinates
                      for (var i = 0; i < lineDistance*30 ; i++) {
                        var segment = turf.along(BaluarteRoute.features[0],i/10, 'kilometers');
                        AlongBaluarteRoute.push(segment.geometry.coordinates);
                                }
                        console.log(AlongBaluarteRoute.length);
                        // update the starting point of the line
                        BaluarteRoute.features[0].geometry.coordinates= [AlongBaluarteRoute[0]]
                        // add the line layer to be animated, style it according to preference
                        map.addSource('BaluarteRouteSource', { type: 'geojson', data: BaluarteRoute });
                        map.addLayer({
                                  "id": "BaluarteLayer",
                                  "type": "line",
                                  "source": "BaluarteRouteSource",
                                    "paint": {
                                        "line-color": "#0c4383",
                                          "line-opacity": 1,
                                          "line-width": 3
                                        }
                                  });
                            // animate the line by looping through all the coordinates
                            var i = 0;
                            var timer = window.setInterval(function() {
                                    if (i < AlongBaluarteRoute.length-1) {
                                          BaluarteRoute.features[0].geometry.coordinates.push(AlongBaluarteRoute[i]);
                                          map.getSource('BaluarteRouteSource').setData(BaluarteRoute);
                                          //map.panTo(pointsONroute[i]);
                                          i++;
                                      } else {
                                          window.clearInterval(timer);
                                          AnimateBaluarteJeep();
                                          }
                                      }, 30);// animation speed
  });
  // Initiate Baluarte Jeep Animation
  function AnimateBaluarteJeep(){
    $.getJSON('https://api.myjson.com/bins/rfq85', function (BaluarteRoute){
          var AlongBaluarteRoute = [];
          var coordinates = BaluarteRoute.features[0].geometry.coordinates;
          var lineDistance = turf.lineDistance(BaluarteRoute.features[0], 'kilometers');

          // Divide the route into specific interval and save coordinates
          for (var i = 0; i < lineDistance*100 ; i++) {
              var segment = turf.along(BaluarteRoute.features[0],i/100, 'kilometers');
              AlongBaluarteRoute.push(segment.geometry.coordinates);
              }
          var counter = 0;
          var fps =30;
          var BaluarteJeep ={
                  "type": "FeatureCollection",
                  "features": [{
                      "type": "Feature",
                      "geometry": {
                          "type": "Point",
                          "coordinates": AlongBaluarteRoute[0]
                        },
                      },  {
                    "type": "Feature",
                    "geometry": {
                        "type": "Point",
                        "coordinates": AlongBaluarteRoute[830]
                    },
                }]
              };
            map.addSource('BaluarteSource', {
                    "type": "geojson",
                    "data": BaluarteJeep
                  });
            map.addLayer({
                    "id": "BaluarteJeepLayer",
                    "source": 'BaluarteSource',
                    "type": "symbol",
                    "layout": {
                        "icon-image": "bus-15"
                      //  "icon-rotate": 90
                      }
                    });

            var bound = 0;
            var counter2 = 830;
          AnimateJeepney[2] =  function AnimateBaluarte(){
                  setTimeout(function(){
                  BaluarteJeep.features[0].geometry.coordinates = AlongBaluarteRoute[counter];
                  BaluarteJeep.features[1].geometry.coordinates = AlongBaluarteRoute[counter2];
                  map.getSource('BaluarteSource').setData(BaluarteJeep)
                  if (AnimatePause[2]){
                      requestAnimationFrame(AnimateBaluarte);

                    }
                  if (bound == 0){
                        counter++;
                        counter2--;
                        }
                   if(bound == 1){
                     counter--;
                   counter2++}
                    if (counter==830){
                    bound=1;
                    }
                    if (counter==0){
                      bound=0;
                   }
                  },1000/fps);
              }
              AnimateJeepney[2]();
          });
  }
  // initiate Timawa Route
  $.getJSON('https://api.myjson.com/bins/1a0gat', function (TimawaRoute){
                      // measure the distance of the line
                      var lineDistance = turf.lineDistance(TimawaRoute.features[0], 'kilometers');
                      console.log(lineDistance);
                      var AlongTimawaRoute =[]; // new coordinates container
                      // Divide the route into specific interval and save coordinates
                      for (var i = 0; i < lineDistance*10 ; i++) {
                          var segment = turf.along(TimawaRoute.features[0],i/10, 'kilometers');
                          AlongTimawaRoute.push(segment.geometry.coordinates);
                          }
                        console.log(AlongTimawaRoute.length);
                        // update the starting point of the line
                        TimawaRoute.features[0].geometry.coordinates= [AlongTimawaRoute[0]]
                        // add the line layer to be animated, style it according to preference
                        map.addSource('TimawaSource', { type: 'geojson', data: TimawaRoute });
                        map.addLayer({
                              "id": "TimawaLayer",
                              "type": "line",
                              "source": "TimawaSource",
                              "paint": {
                                    "line-color": "#0e6c1a",
                                    "line-opacity": 1,
                                    "line-width": 3
                                }
                            });
                            // animate the line by looping through all the coordinates
                            var i = 0;
                            var timer = window.setInterval(function() {
                                if (i < AlongTimawaRoute.length-1) {
                                    TimawaRoute.features[0].geometry.coordinates.push(AlongTimawaRoute[i]);
                                    map.getSource('TimawaSource').setData(TimawaRoute);
                                    //map.panTo(pointsONroute[i]);
                                    i++;
                                } else {
                                    window.clearInterval(timer);
                                    AnimateTimawaJeep();
                                }
                            }, 30);// animation speed
   });
  // Initiate Baluarte Jeep Animation
  function AnimateTimawaJeep(){
     $.getJSON('https://api.myjson.com/bins/1a0gat', function (TimawaRoute){
           var AlongTimawaRoute = [];
           var coordinates = TimawaRoute.features[0].geometry.coordinates;
           var lineDistance = turf.lineDistance(TimawaRoute.features[0], 'kilometers');

           // Divide the route into specific interval and save coordinates
           for (var i = 0; i < lineDistance*100 ; i++) {
               var segment = turf.along(TimawaRoute.features[0],i/100, 'kilometers');
               AlongTimawaRoute.push(segment.geometry.coordinates);
               }
           var counter = 0;
           var fps =30;
           var TimawaJeep ={
                   "type": "FeatureCollection",
                   "features": [{
                       "type": "Feature",
                       "geometry": {
                           "type": "Point",
                           "coordinates": AlongTimawaRoute[0]
                         },
                       },  {
                     "type": "Feature",
                     "geometry": {
                         "type": "Point",
                         "coordinates": AlongTimawaRoute[628]
                     },
                 }]
               };
             map.addSource('TimawaJeepSource', {
                     "type": "geojson",
                     "data": TimawaJeep
                   });
             map.addLayer({
                     "id": "TimawaJeepLayer",
                     "source": 'TimawaJeepSource',
                     "type": "symbol",
                     "layout": {
                         "icon-image": "bus-15"
                       //  "icon-rotate": 90
                       }
                     });

             var bound = 0;
             var counter2 = 628;
             AnimateJeepney[1] = function AnimateTimawa(){
                   setTimeout(function(){
                   TimawaJeep.features[0].geometry.coordinates = AlongTimawaRoute[counter];
                   TimawaJeep.features[1].geometry.coordinates = AlongTimawaRoute[counter2];
                   map.getSource('TimawaJeepSource').setData(TimawaJeep)
                   if (AnimatePause[1]){
                       requestAnimationFrame(AnimateTimawa);

                     }
                   if (bound == 0){
                         counter++;
                         counter2--;
                         }
                    if(bound == 1){
                      counter--;
                    counter2++}
                     if (counter==628){
                     bound=1;
                     }
                     if (counter==0){
                       bound=0;
                    }
                   },1000/fps);
               }
               AnimateJeepney[1]();
           });
    }

    //animate Calumpang Route
  // Initiate Calumpang Route
  $.getJSON('https://api.myjson.com/bins/myz6t', function (CalumpangRoute){
                        // measure the distance of the line
                        var lineDistance = turf.lineDistance(CalumpangRoute.features[0], 'kilometers');
                        console.log(lineDistance);
                        var AlongCalumpangRoute =[]; // new coordinates container
                        // Divide the route into specific interval and save coordinates
                        for (var i = 0; i < lineDistance*20 ; i++) {
                            var segment = turf.along(CalumpangRoute.features[0],i/10, 'kilometers');
                            AlongCalumpangRoute.push(segment.geometry.coordinates);
                            }
                          console.log(AlongCalumpangRoute.length);
                          // update the starting point of the line
                          CalumpangRoute.features[0].geometry.coordinates= [AlongCalumpangRoute[0]]
                          // add the line layer to be animated, style it according to preference
                          map.addSource('CalumpangSource', { type: 'geojson', data: CalumpangRoute });
                          map.addLayer({
                                "id": "CalumpangLayer",
                                "type": "line",
                                "source": "CalumpangSource",
                                "paint": {
                                      "line-color": "#b09b10",
                                      "line-opacity": 1,
                                      "line-width": 3
                                  }
                              });
                              // animate the line by looping through all the coordinates
                              var i = 0;
                              var timer = window.setInterval(function() {
                                  if (i < AlongCalumpangRoute.length-1) {
                                      CalumpangRoute.features[0].geometry.coordinates.push(AlongCalumpangRoute[i]);
                                      map.getSource('CalumpangSource').setData(CalumpangRoute);
                                      //map.panTo(pointsONroute[i]);
                                      i++;
                                  } else {
                                      window.clearInterval(timer);
                                    AnimateCalumpangJeep();
                                  }
                              }, 30);// animation speed
          });
    // Initiate Calumpang Jeep Animation
  function AnimateCalumpangJeep(){
  $.getJSON('https://api.myjson.com/bins/myz6t', function (CalumpangRoute){
                    // measure the distance of the line
                    var lineDistance = turf.lineDistance(CalumpangRoute.features[0], 'kilometers');
                    console.log(lineDistance);
                    var AlongCalumpangRoute =[]; // new coordinates container
                    // Divide the route into specific interval and save coordinates
                    for (var i = 0; i < lineDistance*100 ; i++) {
                        var segment = turf.along(CalumpangRoute.features[0],i/100, 'kilometers');
                        AlongCalumpangRoute.push(segment.geometry.coordinates);
                    }
                    console.log(AlongCalumpangRoute.length);
                   // update the starting point of the line
                    CalumpangRoute.features[0].geometry.coordinates= [AlongCalumpangRoute[0]]
                    // add the line layer to be animated, style it according to preference
                    var counter = 0;
                    var fps =30;
                    var CalumpangJeep ={
                              "type": "FeatureCollection",
                              "features": [{
                                  "type": "Feature",
                                  "geometry": {
                                      "type": "Point",
                                      "coordinates": [AlongCalumpangRoute[0]]
                                  },
                                },  {
                                  "type": "Feature",
                                  "geometry": {
                                      "type": "Point",
                                      "coordinates": [AlongCalumpangRoute[747]]
                              },
                               }]
                      };
                     map.addSource('CalumpangJeepSource', {
                            "type": "geojson",
                            "data": CalumpangJeep
                     });
                    map.addLayer({
                             "id": "CalumpangJeepLayer",
                              "source": 'CalumpangJeepSource',
                                    "type": "symbol",
                                    "layout": {
                                         "icon-image": "bus-15",
                                         "text-field": "Calumpang",
                                         "text-font": ["Open Sans Semibold", "Arial Unicode MS Bold"],
                                         "text-offset": [0, 0.6],
                                         "text-anchor": "top",
                                         "text-size": 12
                                           //"icon-rotate": 90
                                         }
                                     });

                      var bound = 0;
                      var counter2 = 747;
                    AnimateJeepney[3]=  function AnimateCalumpang(){
                         setTimeout(function(){
                              CalumpangJeep.features[0].geometry.coordinates = AlongCalumpangRoute[counter];
                              CalumpangJeep.features[1].geometry.coordinates = AlongCalumpangRoute[counter2];
                              map.getSource('CalumpangJeepSource').setData(CalumpangJeep)
                              if (AnimatePause[3]){
                                       requestAnimationFrame(AnimateCalumpang);

                                }
                                if (bound == 0){
                                      counter++;
                                      counter2--;
                                      }
                                 if(bound == 1){
                                   counter--;
                                 counter2++}
                                  if (counter==747){
                                  bound=1;
                                  }
                                  if (counter==0){
                                    bound=0;
                                 }

                          },1000/fps);
                      }
                      AnimateJeepney[3]();
            });
      }



});
