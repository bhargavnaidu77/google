const express = require('express');
const cors = require('cors');
const authRoutes= require('./auth_routes');

const app = express();

// Allow all origins
app.use(cors(
    {
        origin:"*"
    }
));

app.use('/',authRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
