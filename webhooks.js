import express from "express";
import http from "http";
import bodyParser from "body-parser";

const app = express();
const server = http.createServer(app);
const accessToekn = 'eyJhbGciOiJIUzI1NiJ9.eyJ0aWQiOjI5OTA5NDY5NiwiYWFpIjoxMSwidWlkIjo1MjQ4NTAxNiwiaWFkIjoiMjAyMy0xMS0yOFQxMToyMzo0NS4wMDBaIiwicGVyIjoibWU6d3JpdGUiLCJhY3RpZCI6MjAwMzc5MDEsInJnbiI6ImV1YzEifQ.PcDYn3I9Ya0hMDGVWS0QSPuU5fM7zqtdc8avl4sqs7YeyJhbGciOiJIUzI1NiJ9.eyJ0aWQiOjI5OTA5NDY5NiwiYWFpIjoxMSwidWlkIjo1MjQ4NTAxNiwiaWFkIjoiMjAyMy0xMS0yOFQxMToyMzo0NS4wMDBaIiwicGVyIjoibWU6d3JpdGUiLCJhY3RpZCI6MjAwMzc5MDEsInJnbiI6ImV1YzEifQ.PcDYn3I9Ya0hMDGVWS0QSPuU5fM7zqtdc8avl4sqs7Y';
app.use(bodyParser.json());


app.post("/", function (req, res) {
    //console.log(JSON.stringify(req.body, 0, 2));
    let status = req?.body?.event?.value?.label?.text;
    let boardID = req?.body?.event?.boardId;
    if (!!req?.body?.event) {
        fetch("https://api.monday.com/v2", {
            method: 'post',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': accessToekn,
                'API-Version': '2023-04'
            },
            body: JSON.stringify({
                'query': `query{boards (ids:[${boardID}]) {id name} }`
            })
        })
        .then(res => res.json())
        .then(res => {
            let boardName = res?.data?.boards?.[0]?.name;
            console.log("status: ", status);
            console.log("boardID: ", boardID);
            console.log("boardName: ", boardName);
            console.log(JSON.stringify(req.body, 0, 2));
        });

    }

    res.status(200).send(req.body);
}
);

server.listen(process.env.PORT || 3000, function () {
    console.log('Express server listening on port 3000.');
})