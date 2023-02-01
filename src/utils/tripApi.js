import tokenService from "./tokenService";
const BASE_URL = '/api/trips/';

export function create(trip){
	return fetch(BASE_URL, { // since this is sending a photo (form data) no need to do JSON things
		method: 'POST',
		body: trip,
		headers: {
			Authorization: "Bearer " + tokenService.getToken() 
			
		}

	}).then((responseFromTheServer) =>{
		if(responseFromTheServer.ok) return responseFromTheServer.json() // return if everything okay

		// this is the return if there was an error from the server
		return responseFromTheServer.json().then(res => {
			console.log(res, ' <- this is the response in Posts create function in your utils folder')
			throw new Error('Something went wrong in create Post'); // < this goes to the catch block
			// when you call the create function (in handleAddPost in the feed page)
		})
	})
}


export function getAll() {
	return fetch(BASE_URL, {
	  headers: {
		'Authorization': 'Bearer ' + tokenService.getToken()
	  }
	})
	.then(res => res.json());
  }

  export function deleteTrip(tripId) {
    return fetch(`${BASE_URL}/${tripId}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            Authorization: "Bearer " + tokenService.getToken(),
        }
    }).then((res) => {
        if (res.ok) return res.json();
        throw new Error(res.error);
    })
}