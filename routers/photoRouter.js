import { Router } from 'express';
import { displayPhoto, uploadPhoto } from '../controllers/photoController.js';
import authMiddleware from '../middlewares/authMiddlewares.js';


const routes = new Router();


routes.post('/upload-photo',authMiddleware, uploadPhoto);
routes.get('/',authMiddleware, displayPhoto);


export default routes
