import App from '@/app';
import validateEnv from '@utils/validateEnv';
import { AuthRoute } from './routes/auth.route';

validateEnv();

const app = new App([new AuthRoute()]);

app.listen();
