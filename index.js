const express = require('express');
const bodyParser = require('body-parser');
const http = require('http');
const cors = require('cors');
const morgan = require('morgan');
const app = express();
const router = require('./router');

router(app);

app.disable('x-powered-by');
app.use(morgan('combined'));
app.use(cors());
app.use(bodyParser.json({ type: '*/*' }));

const PORT = process.env.PORT || 8000;
const server = http.createServer(app);
server.listen(PORT);