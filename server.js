const express = require('express');
const app = express();
const fileUpload = require('express-fileupload');
const fs = require('fs');
const port = 8080;



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
        console.log(req.files)
        json = JSON.parse(req.files.upload.data.toString());
    }
    var counter = 0;
    var getColumns = (input) => {
        var keys = Object.keys(input);
        var columnString = 'id,parentId,';
        for (var i = 0; i < keys.length; i++) {
            if (keys[i] != 'children') {
                columnString += keys[i] + ',';
            }
        }
        columnString = columnString.substring(0, columnString.length-1) + '\n';
        return columnString;
    }
    
    var handleJSON = (input, parent) => {
        
        var jsonObj = input;
        var csv = counter + ',' + parent + ',';
        var currentCounter = counter;
        counter++;
        var keys = Object.keys(jsonObj);
    
        for (var i = 0; i < keys.length; i++) {
            if (keys[i] != 'children') {
                csv += jsonObj[keys[i]] + ',';
            }
        }
        csv = csv.substring(0, csv.length-1);
    
        if (jsonObj.children) {
            for (var i = 0; i < jsonObj.children.length; i++) {
                csv += '\n' + handleJSON(jsonObj.children[i], currentCounter);
            }
        }
    
        return csv;
    }

    var csv = handleJSON(json, -1);
    csv = getColumns(json) + csv;
    console.log(csv)
    res.send(csv);
})

app.listen(port, () => {
    console.log('listening!');
});

// var getColumns = (input) => {
//     var keys = Object.keys(input);
//     var columnString = '';

//     for (var i = 0; i < keys.length; i++) {
//         if (keys[i] != 'children') {
//             columnString += keys[i] + ',';
//         }
//     }
//     columnString = columnString.substring(0, columnString.length-1) + '\n';
//     return columnString;
// }

// var handleJSON = (input) => {
    
//     var jsonObj = input;
//     var csv = '';
//     var keys = Object.keys(jsonObj);

//     for (var i = 0; i < keys.length; i++) {
//         if (keys[i] != 'children') {
//             csv += jsonObj[keys[i]] + ',';
//         }
//     }
//     csv = csv.substring(0, csv.length-1);

//     if (jsonObj.children) {
//         for (var i = 0; i < jsonObj.children.length; i++) {
//             csv += '\n' + handleJSON(jsonObj.children[i]);
//         }
//     }

//     return csv;
// }