/**/
/*
Geocode Routes

NAME
    Geocode Routing - Handles routing for geocode-related operations in the application.

DESCRIPTION
    This module sets up the routing endpoints related to geocoding services. 
    Currently, it provides a single endpoint to retrieve geocode data.

ROUTES
    - GET "/": Fetches the geocode data for a given address or set of coordinates.

EXPORT
    Exports the router to be used in the main server setup.
*/
/**/


import express from 'express';
import { getGeocode } from '../controllers/geocode.js';

const router = express.Router();

router.get('/', getGeocode);

export default router;
