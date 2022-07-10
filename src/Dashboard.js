import React, {useState,useEffect} from 'react';


function Main(props) {

	let api_address = null;
	if(window.location.host === "soundfound.io" ){
		api_address = "https://api.soundfound.io"
	}else if(window.location.host === "sweet-trifle-5834dc.netlify.app" ){
		api_address = "https://api.soundfound.io"
	}else{
		api_address = "http://localhost:8888"
	}
	// function randomNotification(rec) {
	// 	new Notification("getPlaying", {body:JSON.stringify(rec)});
	// }

	const ask = () =>{
		Notification.requestPermission().then((result) => {
			if (result === 'granted') {
				setAccess(result)
				new Notification("access", {body:result});
			}
		});
	}

	const [playing, setPlaying] = useState(null);
	const [access, setAccess] = useState(false);

	var get =  function(){
		return new Promise(function(done, fail) {
			// console.log("code for accessToken fetch",code);
			fetch(api_address + '/getPlaying', {
				method: 'POST', // *GET, POST, PUT, DELETE, etc.
				mode: 'cors', // no-cors, *cors, same-origin
				headers: {
					'Content-Type': 'application/json'
				},
				// body: JSON.stringify({code:code})
			})
				.then(res => res.json())
				.then(function(res){
					console.log("getPlaying response: ",res);
				    var rec = 	{id:res.item.id,artist: res.item.artists[0].name,track: res.item.name}
					setPlaying(rec)
					done(rec)
				},e =>{fail(e)})

		})
	}

	var prevId = null;
	useEffect(() => {
		setInterval(function(){
			get()
				.then(_rec =>{
					if(prevId === null){prevId = _rec.id}
					if(prevId !== _rec.id){
						prevId = _rec.id
						console.log("Notification",_rec);
						new Notification("getPlaying", {body:_rec});
					}else{
						console.log("no change",_rec);
					}
				},e =>{
					console.error("useEffect > get | error",e);
				})
		}, 5000);
	},[]);


	return(<div>
		logged in
		{/*{JSON.stringify(params)}*/}
		<button onClick={() =>{ask()}}>ask </button> {access ? 'true':'false'}
		{/*<button onClick={() =>{get()}}>getPlaying</button>*/}
		{playing &&
		<div>
			<div> artist: {playing.artist}</div>
			<div> track: {playing.track}</div>
			<div> id: {playing.id}</div>
		</div>
		}
	</div>)
}
export default Main;
