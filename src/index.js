import Express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
dotenv.config();

import adminRoutes from './routes/administradorRoutes';
import arrendatarioRoutes from './routes/arrendatarioRoutes';
import proprietariosRoutes from './routes/proprietarioRoutes';
import propriedadesRoutes from './routes/propriedadesRoutes';
import reservasRoutes from './routes/reservasRoutes';
import enderecosRoutes from './routes/enderecosRoutes';
import avaliacaosRoutes from './routes/avaliacaoRoutes';

const app = Express();
const port = process.env.SERVER;

app.use(Express.urlencoded({ extended: true }));
app.use(Express.json());
app.use(cors());

app.use('/admin', adminRoutes);
app.use('/arrendatario', arrendatarioRoutes);
app.use('/proprietario', proprietariosRoutes);
app.use('/propriedades', propriedadesRoutes);
app.use('/reservas', reservasRoutes);
app.use('/enderecos', enderecosRoutes);
app.use('/avaliacoes', avaliacaosRoutes);

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
