const express = require('express');
const mongoose = require('mongoose');
const routes = require('./routes');

const app = express();

// Configuração mongodb atlass cluster
mongoose.connect('mongodb+srv://jonas:jna012017@cluster0-yhpy1.mongodb.net/week10?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

app.use(express.json());
app.use(routes);

app.listen(3333);
