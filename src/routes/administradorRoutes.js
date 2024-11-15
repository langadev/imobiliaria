import administradorController from '../controllers/administradorController';
import { auth } from '../auth/auth';
import { Router } from 'express';
const router = Router();

router.get('/', administradorController.index);
router.post('/create', administradorController.store);
router.get('/show/:id', auth, administradorController.show);
router.post('/update/:id', administradorController.update);
router.delete('delete/:id', administradorController.delete);
router.post('/auth', administradorController.login);

export default router;
