var url = 'http://localhost:8080/';

$('#submitButton').on('click', () => {
    fetch(url, {
        method: 'POST',
        headers: {
            json: $('#inputField')[0].value
        }
    })
    .then((data) => {
        return data.text();
    })
    .then(data => {
        $('#results').text(data);

        $('#download').on('click', () => {
            var link = document.createElement('a');
            link.setAttribute('download', 'json.txt');
            link.setAttribute('href', 'data:text/plain;charset=utf-8,' + data);
            link.click();
        });
    });
});

$('#submitFileButton').on('click', () => {
    var fileToSend = $('#fileInput')[0].files[0];
    var fd = new FormData();
    fd.append('upload', fileToSend);

    fetch(url, {
        method: 'POST',
        body: fd
    })
    .then(data => {
        return data.text();
    })
    .then(data => {
        $('#results').text(data);

        $('#download').on('click', () => {
            var link = document.createElement('a');
            link.setAttribute('download', 'json.txt');
            link.setAttribute('href', 'data:text/plain;charset=utf-8,' + data);    
            link.click();
        });
    })
});

/*
$('#submitButton').on('click', () => {
    $.ajax({
        url: 'http://localhost:8080/',
        method: 'POST',
        headers: {
            json: $('#inputField')[0].value
        },
        success: function(data){
            $('#results').text(data);

            $('#download').on('click', () => {
                var link = document.createElement('a');
                link.setAttribute('download', 'json.txt');
                link.setAttribute('href', 'data:text/plain;charset=utf-8,' + data);
                link.click();
            });
        }
    });
});


$('#submitFileButton').on('click', () => {
    var fileToSend = $('#fileInput')[0].files[0];
    var fd = new FormData();
    fd.append('upload', fileToSend);

    $.ajax({
        url: 'http://localhost:8080/',
        method: 'POST',
        data: fd,
        processData: false,
        contentType: false,
        success: function(data){
            $('#results').text(data);

            $('#download').on('click', () => {
                var link = document.createElement('a');
                link.setAttribute('download', 'json.txt');
                link.setAttribute('href', 'data:text/plain;charset=utf-8,' + data);    
                link.click();
            });
        }
    });
});*/

/*
var req = new XMLHttpRequest();

$('#submitButton').on('click', () => {
    req.open('POST', 'http://localhost:8080/');
    req.setRequestHeader('json', $('#inputField')[0].value);
    req.send();

    req.onreadystatechange = function() {
        console.log(req.response);
        $('#results').text(req.response);
    }
});


$('#submitFileButton').on('click', () => {

    var fileToSend = $('#fileInput')[0].files[0];

    var fd = new FormData();
    fd.append('upload', fileToSend);

    req.open('POST', 'http://localhost:8080/');
    //req.setRequestHeader('jsonfile', fileToSend);
    req.send(fd);

    req.onreadystatechange = function() {
        console.log(req.response);
        $('#results').text(req.response);
    }
});
*/
