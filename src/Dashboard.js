import React, {useState} from 'react';


function Main(props) {
	//note: 405
	//const params = JSON.parse(localStorage.getItem('params'));
	// const get = () =>{
	// 	let uri = "https://api.spotify.com/v1/me/player/currently-playing"
	// 	let options = {
	// 		method: "POST",
	// 		uri:uri,
	// 		headers: {
	// 			'User-Agent': 'Request-Promise',
	// 			"Authorization":'Bearer ' + params.access_token
	// 		},
	// 		json: true
	// 	};
	// 	console.log({options});
	// 	fetch(uri,options)
	// 		.then(r =>{
	// 			console.log(r);
	//
	// 		},e =>{
	// 			console.log(e);
	//
	// 		})
	// }

	let api_address = null;
	if(window.location.host === "soundfound.io" ){
		api_address = "https://api.soundfound.io"
	}else if(window.location.host === "sweet-trifle-5834dc.netlify.app" ){
		api_address = "https://api.soundfound.io"
	}else{
		api_address = "http://localhost:8888"
	}
	function randomNotification(rec) {
		// const randomItem = Math.floor(Math.random() * games.length);
		// const notifTitle = games[randomItem].name;
		// const notifBody = `Created by ${games[randomItem].author}.`;
		// const notifImg = `data/img/${games[randomItem].slug}.jpg`;
		// const options = {
		//   body: notifBody,
		//   icon: notifImg,
		// };
		new Notification("getPlaying", {body:JSON.stringify(rec)});
		new Notification("testtitle", {body:"testbody"});

		//setTimeout(randomNotification, 30000);
	}

	const ask = (rec) =>{
		Notification.requestPermission().then((result) => {
			if (result === 'granted') {
				randomNotification(rec);
			}
		});
	}
	const [playing, setPlaying] = useState(null);
	var get =  function(code){
		return new Promise(function(done, fail) {
			// console.log("code for accessToken fetch",code);
			fetch(api_address + '/getPlaying', {
				method: 'POST', // *GET, POST, PUT, DELETE, etc.
				mode: 'cors', // no-cors, *cors, same-origin
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({code:code})
			})
				.then(res => res.json())
				.then(function(res){
					console.log("getPlaying response: ",res);
					setPlaying(res.item)
					new Notification("testtitle", {body:"testbody"});
				    var rec = 	{artist: playing.artists[0].name,track: playing.name}
				    ask(rec)
					// new Notification("getPlaying", {body:JSON.stringify(rec)});
					// new Notification("getPlayingraw", {body:rec});
					done(res)
				})

		})
	}

	return(<div>
		logged in
		{/*{JSON.stringify(params)}*/}
		<button onClick={() =>{get()}}>get</button>
		getPlaying
		{playing &&
		<div>
			<div>artist: {playing.artists[0].name}</div>
			<div> track: {playing.name}</div>
		</div>
		}
	</div>)
}
export default Main;
