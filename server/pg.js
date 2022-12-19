const subjects = [
    "Math",
    "Physics",
    "Chemistry",
    "Biology",
    "History",
    "Geography",
    "Literature",
    "Ethics",
    "Physical Education",
];
const fs = require("fs");
const scores = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

const arr = Array(180)
    .fill(0)
    .map((item, index) => {
        return {
            studentId: index + 1,
            courseName: subjects[4],
            exam15: scores[Math.floor(Math.random() * 10)],
            exam45: scores[Math.floor(Math.random() * 10)],
            examFinal: scores[Math.floor(Math.random() * 10)],
            semesterOne: 1,
            semesterTwo: 0,
        };
    });

// console.log(arr);
let dir = "./data.json";

fs.writeFileSync(dir, JSON.stringify(arr));

// let data = fs.readFileSync(dir, "utf8");

// console.log(data);
