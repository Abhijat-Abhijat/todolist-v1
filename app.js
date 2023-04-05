const express = require('express');
const app = express();
const port = 3000;
const bodyParser = require('body-parser');
const ejs = require('ejs');
const date = require(__dirname + "/date.js");

const items = ["Test Data"];
const workItems = [];
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static('public'));

app.get('/', (req, res) => {
    let day = date.getDate();
    res.render('list', {listTitle: day, newListItems: items});
    // res.render('list');
    }
);

app.post('/', (req, res) => {
    if(req.body.list === 'Work'){
        workItems.push(req.body.newItem);
        res.redirect('/work');
    } else {
        items.push(req.body.newItem);
        res.redirect('/');
    }
    }
);
app.get('/work', (req, res) => {
    res.render('list', {listTitle: 'Work', newListItems: workItems});
    }
);
app.post('/work', (req, res) => {
    let item = req.body.newItem;
    workItems.push(item);
    res.redirect('/work');
    }
);
app.get('/about', (req, res) => {
    res.render('about');
    }
);


app.listen(port, () => {
    console.log(`Server Chala diya hai ${port} port pe bhai`);
    }
);