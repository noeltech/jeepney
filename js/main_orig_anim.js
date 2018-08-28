
mapboxgl.accessToken = 'pk.eyJ1Ijoibm9lbHRlY2giLCJhIjoiY2o2azRiazZ2MTVlZDMxbXdvdTU1OW03YSJ9.eYd9NVbg2cgcrAqs0da8eA';
//Initiate map
var map = new mapboxgl.Map({
  container: 'map', // container id
  //  style: 'mapbox://styles/mapbox/light-v9',
  style: 'mapbox://styles/mapbox/light-v9', // stylesheet location
  //maxBounds: [[122.4230575562,10.6292284096],[ 122.6853561401,10.808014608]],
  //maxBounds: [[119.9902,9.119],[ 125.3564,13.0414]],
  //122.4230575562,10.6292284096,122.6853561401,10.808014608

  center: [122.568369,10.702864],
  //pitch: 60, // pitch in degrees
  //bearing: -30,
  //maxZoom: 18
  zoom: 13
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
*/// classify the building


var route = {
    "type": "FeatureCollection",
    "features": [{
        "type": "Feature",
        "geometry": {
            "type": "LineString",
            "coordinates": [
              [ 122.5006071, 10.6866187 ],
               [ 122.5014296, 10.6865421 ],
               [ 122.503467, 10.6864435 ],
               [ 122.5044701, 10.6865596 ],
               [ 122.5055356, 10.6865574 ],
               [ 122.5060884, 10.6864829 ],
               [ 122.506853, 10.6862748 ],
              [ 122.5077224, 10.6861084 ],
              [ 122.5090519, 10.6859024 ],
              [ 122.509375, 10.68589 ],
              [ 122.5098526, 10.6859102 ],
              [ 122.5106659, 10.6859876 ],
              [ 122.5113491, 10.686116 ],
              [ 122.5115977, 10.686173 ],
              [ 122.5123473, 10.6863127 ],
              [ 122.5132322, 10.6864813 ],
              [ 122.5140942, 10.6866614 ],
              [ 122.5150699, 10.6868286 ],
              [ 122.5159526, 10.6869603 ],
              [ 122.5166286, 10.6870571 ],
              [ 122.516628608140763, 10.687057104879264 ],
              [ 122.522255852431968, 10.687673010587256 ],
              [ 122.527003699868146, 10.688665906438926 ],
               [122.528863123008549, 10.68911722273514 ],
               [ 122.530487861674928, 10.689983750023874 ],
               [ 122.533972023481681, 10.691319646260672 ],
               [ 122.536066131096121, 10.692709700453014 ],
               [ 122.53998355654727, 10.695381492926606 ],
              [ 122.54355798161329, 10.6973853372818 ],
               [ 122.54437035094648, 10.696049441045004 ],
               [ 122.548775197997529, 10.698630970259352 ],
               [ 122.550273568100948, 10.699262813074053 ],
               [ 122.554263204159497, 10.699750234673965 ],
               [ 122.554570099240919, 10.698865654733384 ],
               [ 122.554858941670503, 10.696536862644916 ],
              [ 122.545670141879569, 10.695562019445092 ]
            ]
        }
    }]
};
var geojson = {
    "type": "FeatureCollection",
    "features": [{
        "type": "Feature",
        "geometry": {
            "type": "LineString",
            "coordinates": [122.5006071, 10.6866187]

        }
    }]
};

var coordinates = route.features[0].geometry.coordinates;

var lineDistance = turf.lineDistance(route.features[0], 'kilometers');
console.log(lineDistance);
var pointsONroute = [];

// Draw an arc between the `origin` & `destination` of the two points
for (var i = 0; i < lineDistance*100 ; i++) {
   var segment = turf.along(route.features[0],i/100, 'kilometers');

    pointsONroute.push(segment.geometry.coordinates);
  //  console.log(pointsONroute.length);
}
// Update the route with calculated arc coordinates
//route.features[0].geometry.coordinates = pointsONroute;
route.features[0].geometry.coordinates= [coordinates[0]]
map.on('load', function() {

            map.addSource('trace', { type: 'geojson', data: route });
            map.addLayer({
                "id": "trace",
                "type": "line",
                "source": "trace",
                "paint": {
                    "line-color": "red",
                    "line-opacity": 1,
                    "line-width": 5
                }
            });

            // setup the viewport
         map.jumpTo({ 'center': coordinates[0], 'zoom': 14 });
          //  map.setPitch(30);

            // on a regular basis, add more coordinates from the saved list and update the map
            var i = 0;
            var timer = window.setInterval(function() {
                if (i < pointsONroute.length) {
                    route.features[0].geometry.coordinates.push(pointsONroute[i]);
                    map.getSource('trace').setData(route);
                    map.panTo(pointsONroute[i]);
                    i++;
                } else {
                    window.clearInterval(timer);
                }
            }, 10);


});
