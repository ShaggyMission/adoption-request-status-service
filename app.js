const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors'); 
const routes = require('./routes/adoptionRequest.routes');
const swaggerUi = require('swagger-ui-express');
const YAML = require('yamljs');

const swaggerDocument = YAML.load('./docs/swagger.yaml');

const app = express();

app.use(cors()); 
app.use(bodyParser.json());
app.use('/adoptionStatus-request-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use('/', routes);

module.exports = app;
