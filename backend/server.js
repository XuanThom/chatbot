const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const messagesRouter = require('./routes/messages');
const aiRouter = require('./routes/ai');

const app = express();
const PORT = 5000;

app.use(cors());
app.use(bodyParser.json());

app.use('/api/messages', messagesRouter);

app.use('/api/ai', aiRouter);


app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
