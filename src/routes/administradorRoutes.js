import administradorController from '../controllers/administradorController';
import { Router } from 'express';
const router = Router();

router.get('/', administradorController.index);
router.post('/create', administradorController.store);
router.get('/show/:id', administradorController.show);
router.post('/update/:id', administradorController.update);
router.delete('delete/:id', administradorController.delete);

export default router;
