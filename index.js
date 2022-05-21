//AIzaSyDsPel8KJONLBfqTiHbAsf2nrRJCfXH8ZM
let map=null;
function initMap(){
    let location =new Object()
    
    navigator.geolocation.getCurrentPosition(function(pos){
        location.lat=pos.coords.latitude
        location.long=pos.coords.longitude
        map=new google.maps.Map(document.getElementById("map"),{
            center:{lat:location.lat,lng:location.long},
            zoom:15
            
        });
        console.log({lat:location.lat,lng:location.long,location})
        getRestaurants(location)
    })
    
}

function getRestaurants(location){
    var payrmont=new google.maps.LatLng(location.lat,location.long);
    var request={
        location:payrmont,
        radius:"1500",
        type:["restaurant"]
    };
    service =new google.maps.places.PlacesService(map);
    service.nearbySearch(request,callback)
}

function callback(results,status){
  //  console.log("callback function is running",results,status)
  console.log("callback",google.maps.places.PlacesServiceStatus.OK)
    if(status==google.maps.places.PlacesServiceStatus.OK){
        //console.log(results)
        for(var i=0;i<results.length;i++){
            console.log(results[i])
            var place=results[i]
            let price=createPrice(place.price_level);
            let content=`<h3>${place.name}</h3>
            <h4>${place.vicinity}</h4>
            <p>Price:${price}<br/>Rating:${place.rating}</p>`

            var marker=new google.maps.Marker({
                position:place.geometry.location,
                map:map,
                title:place.name
            });
            var infowindow=new google.maps.InfoWindow({
                content:content
            });
            bindInfoWindow(marker,map,infowindow,content);
            marker.setMap(map)
        }
    }
}

function bindInfoWindow(marker,map,infowindow,html){
    marker.addListener("click",function(){
        infowindow.setContent(html);
        infowindow.open(map,this)
    })
}

function createPrice(level){
    if(level!="" && level!=null){
        let out="";
        for(var x=0;x<level;x++){
            out+="$"
        }
        return out
    }else{
        return "?"
    }
}
// Initialize and add the map
// function initMap() {
//   // The location of Uluru
//   const uluru = { lat: -25.344, lng: 131.031 };
//   // The map, centered at Uluru
//   const map = new google.maps.Map(document.getElementById("map"), {
//     zoom: 4,
//     center: uluru,
//   });
//   // The marker, positioned at Uluru
//   const marker = new google.maps.Marker({
//     position: uluru,
//     map: map,
//   });
// }

window.initMap = initMap;