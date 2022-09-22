import App from "@/app";
import validateEnv from "@utils/validateEnv";
import { AuthRoute } from "./routes/auth.route";
import { ResourceRoute } from "@routes/resource.route";
import { SessionRoute } from "@routes/session.route";
import { UserRoute } from "./routes/user.route";
import { ProfessionalRoute } from "./routes/professional.route";
import { PatientRoute } from "./routes/patient.route";
import { ScheduleRoute } from "./routes/schedule.route";
import { DashboardRoute } from "./routes/dashboard.route";

validateEnv();

const app = new App([
  new AuthRoute(),
  new UserRoute(),
  new ResourceRoute(),
  new ProfessionalRoute(),
  new PatientRoute(),
  new SessionRoute(),
  new ScheduleRoute(),
  new DashboardRoute(),
]);

app.listen();
