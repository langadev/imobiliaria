import Express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
dotenv.config();
const app = Express();
import adminRoutes from './routes/administradorRoutes';

const port = process.env.SERVER;

app.use(Express.urlencoded({ extended: true }));
app.use(Express.json());
app.use(cors());
app.use('/admin', adminRoutes);

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
