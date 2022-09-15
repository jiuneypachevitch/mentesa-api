import App from '@/app';
import validateEnv from '@utils/validateEnv';
import { AuthRoute } from '@routes/auth.route';
import { ResourceRoute } from '@routes/resource.route';

validateEnv();

const app = new App([
    //new AuthRoute(),
    new ResourceRoute()
]);

app.listen();
