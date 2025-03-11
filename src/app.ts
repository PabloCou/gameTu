import express, { Response, Request } from 'express';
import authRouter from './routes/auth.routes';
import userRouter from './routes/user.routes';
import offerRouter from './routes/offer.routes';
import categoryRouter from './routes/category.routes';

import rateLimit from 'express-rate-limit';
import helmet from 'helmet';
import compression from 'compression';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import morgan from 'morgan';

const app = express();

// Middleware para manejar cookies
app.use(cookieParser());

// Configuración de CORS
app.use(cors({
  origin: ['http://localhost:5173', 'https://empleatetufront.onrender.com'], // Ajusta según tu frontend
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true,  // Permite que se envíen cookies
  allowedHeaders: ['Content-Type', 'Authorization'],
}));


app.use(express.json()); 
app.use(helmet()); 
app.use(compression()); 
app.use(morgan('tiny'));  

// Configuración de limitación de peticiones (Rate Limiting)
const limiter = rateLimit({
  max: 1000,  // Máximo de 1000 peticiones
  windowMs: 1000 * 15 * 60,  // Durante 15 minutos
});
app.use(limiter);

// Rutas de la API
app.use('/api/auth', authRouter);
app.use('/api/users', userRouter);
app.use('/api/offers', offerRouter);
app.use('/api/categories', categoryRouter);

// Ruta de bienvenida
app.get('/', (req: Request, res: Response) => {
  res.send('Bienvenido al backend (API REST)');
});

export default app;
