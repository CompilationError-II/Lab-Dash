var config = {
    type: Phaser.AUTO,
    width: 512,
    height: 272,
    backgroundColor: 0x000000,
    scene: [Scene1, Scene2],
    pixelArt: true,
    physics: {
        default: 'arcade',
        arcade: {
            debug: false             
        }   
    }
};

var game = new Phaser.Game(config);



navigator.geolocation.getCurrentPosition((position) => {
    console.log(position.coords.latitude, position.coords.longitude);
     lat=position.coords.latitude;
     lon=position.coords.longitude;
    //  document.getElementById(`location1`).innerHTML=lat;
    //  document.getElementById(`location2`).innerHTML=lon;
      console.log(typeof lat)
      var time = new Date();
      console.log(time.getHours() + ":" + time.getMinutes() + ":" + time.getSeconds());
      async function getc(){
    
    
        city=await  getcity(lat,lon);
        
        console.log(city)
       }
       function getcity(a,b){
        console.log(`getting city location`)
          
          return fetch(`http://open.mapquestapi.com/geocoding/v1/reverse?key=u6x7nLz17CyMEb4AmTCK96A2yGkMqepE&location=${a},${b}&includeRoadMetadata=true&includeNearestIntersection=true`)
          .then((r)  => r.json())
          .then((r)=> document.getElementById(`location`).innerHTML=`Welcome   `+`<br />` +`Time: `+time.getHours()+`:`+time.getMinutes()+`<br />`+`Your Location: `+(r.results[0].locations[0].adminArea5));
          // .then((r) => r.result);       
      }
      getc();
      
  });