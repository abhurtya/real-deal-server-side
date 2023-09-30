/**/
/*
NAME
    getGeocode - Retrieves geographical coordinates for a given location.

SYNOPSIS
    getGeocode(req, res)

DESCRIPTION
    This function makes an outgoing request to the Nominatim geocoding service to fetch geographical 
    coordinates for the provided location name. The location name is taken from the query parameter of the 
    incoming request. If the location name is not provided, a 400 status code with an error message is sent back.
    On a successful fetch, the geographical coordinates are sent back in a JSON format. If an error occurs while 
    fetching the coordinates, a 500 status code with an appropriate error message is sent.

PARAMETERS
    - req: The HTTP request object, which contains the 'location' query parameter.
    - res: The HTTP response object, used to send back the fetched coordinates or an error message.

RETURNS
    - On Success: Geographical coordinates for the provided location in JSON format.
    - On Missing Location: 400 status code with an error message.
    - On Error: 500 status code with an error message.
*/
/**/


// used to make this outgoing request from  server to the geocoding service
import fetch from 'node-fetch';

export const getGeocode = async (req, res) => {
    const { location } = req.query;
    
    if (!location) {
        return res.status(400).send({ error: 'Location is required' });
    }

    try {
        const response = await fetch(`https://nominatim.openstreetmap.org/search?format=json&limit=1&q=${location}`);
        const data = await response.json();
        res.send(data[0]);
    } catch (error) {
        console.error("Error geocoding:", error);
        res.status(500).send({ error: 'Failed to geocode' });
    }
};
