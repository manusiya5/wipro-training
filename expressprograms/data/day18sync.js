// const fs = require("fs");
// fs.readFile("data.txt", "utf8", (err, data) => {
//     if (err) {
//         console.log("Error reading file");
//     } else {
//         console.log(data);
//         console.log("Read operation completed");
//     }
// });




const fs = require("fs").promises;
fs.readFile("data.txt", "utf8")
    .then((data) => {
        return fs.writeFile("data1.txt", data);
    })
    .then(() => {
        console.log("File copied successfully!");
    });
