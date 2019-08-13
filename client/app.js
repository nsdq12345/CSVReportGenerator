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