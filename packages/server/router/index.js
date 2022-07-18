import { LANG } from "../settings/lang.js";
import {
  createOrUpdateChart, listCharts,
  showChart,
} from "../controllers/chart.js";
import { ROUTES } from "../settings/routes.js";

export const router = (app, serverPort) => {
  // Root route.
  app.get(ROUTES.ROOT, (req, res) => res.send(LANG.serverIsRunning(serverPort)))

  // TODO In case of using authorization uncomment and add additional logic.
  // app.post(ROUTES.AUTH_WITH_ONE_TIME_TOKEN, authWithOneTimeToken);

  // Charts.
  app.get(`${ROUTES.CHARTS}`, listCharts);
  app.get(`${ROUTES.CHART}/:id`, showChart);
  app.post(ROUTES.CHART, createOrUpdateChart);
}

