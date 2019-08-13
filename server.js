const express = require('express');
const app = express();
const fileUpload = require('express-fileupload');
const port = 8080;

var bodyParser = require('body-parser')

// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));
app.use(fileUpload());


app.get('/', (req, res, next) => {
	
    res.sendFile(__dirname + '/client/index.html');
});

app.get('/app.js', (req, res, next) => {
    res.sendFile(__dirname + '/client/app.js');
})

app.post('/', (req, res, next) => {
    var json;
    if (req.headers.json) {
        json = JSON.parse(req.headers.json);
    } else {
        json = JSON.parse(req.files.upload.data.toString());
    }

    var csv = handleJSON(json);
    res.send(getColumns(json) + csv);
})  

app.listen(port, () => {
    console.log('listening!');
});

var getColumns = (input) => {
    console.log("I:",input);
    var keys = Object.keys(input);
    var columnString = '';

    for (var i = 0; i < keys.length; i++) {
        if (keys[i] != 'children') {
            columnString += keys[i] + ',';
        }
    }
    columnString = columnString.substring(0, columnString.length-1) + '\n';
    return columnString;
}

var handleJSON = (input) => {
    var jsonObj = input;
    var csv = '';
    var keys = Object.keys(jsonObj);

    for (var i = 0; i < keys.length; i++) {
        if (keys[i] != 'children') {
            csv += jsonObj[keys[i]] + ',';
        }
    }
    csv = csv.substring(0, csv.length-1);

    if (jsonObj.children) {
        for (var i = 0; i < jsonObj.children.length; i++) {
            csv += '\n' + handleJSON(jsonObj.children[i]);
        }
    }

    return csv;
}