const http = require('http');
const url = require('url');
const fs = require('fs');
const PORT = process.env.PORT || 8080;

http.createServer((req, res) => {

    if(req.url === "/"){
        fs.readFile('views/index.html', (err, data) => {
            res.end(data);
        });
    } else if (req.url === "/api/timestamp" || req.url.split("/api/timestamp/")[1] || req.url === "/api/timestamp/") {
        const con = req.url.split("api/timestamp/")[1];
        
        if (req.url === "/api/timestamp" || req.url === "/api/timestamp/") {
            res.writeHead(200, { "Content-type": "application/json" });
            res.write(Date());
            res.end();
        } else {
            hh = Date();
            if (con.length == 13) {
                hh = new Date(parseInt(con));
            } else {
                hh = new Date(con);
            }
            
            let dateObject = { unix: hh.getTime(), utc: hh.toUTCString(), utcDate: hh.toDateString(), day: hh.getUTCDate(), month: hh.getUTCMonth() + 1, year: hh.getUTCFullYear() }
            let dateJson = JSON.stringify(dateObject)
            let dateInvalid = { error: "Invalid Date" }
            dateInvalid = JSON.stringify(dateInvalid);

            res.writeHead(200, { "Content-type": "application/json" });
            if(hh == "Invalid Date"){
                res.write(`${dateInvalid}`);
            } else {
                res.write(`${dateJson}`);
            }
            res.end();
        }
    } else {

        fs.readFile('views/404.html', (err, data) => {
            res.end(data);
        });
    }

}).listen(PORT, () => {
    console.log(`Server is running at Port: ${PORT}`);
});