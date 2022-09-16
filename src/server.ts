import App from '@/app';
import validateEnv from '@utils/validateEnv';
import { AuthRoute } from './routes/auth.route';
import { ResourceRoute } from '@routes/resource.route';
import { UserRoute } from './routes/user.route';
import { ProfessionalRoute } from './routes/professional.route';

validateEnv();

const app = new App([
  new AuthRoute(),
  new UserRoute(),
  new ResourceRoute(),
  new ProfessionalRoute(),
]);

app.listen();
