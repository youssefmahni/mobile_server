const express = require('express')
const cookieParser = require("cookie-parser");
const cors = require('cors');
const app = express()
const port = 3000

app.use(cors({
  origin: true, // Adjust this to your frontend's URL
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true, // Allow cookies to be sent
}));
app.use(cookieParser());
app.use(express.json());


const useRouter1 = require("./apis/todos/router");
const useRouter2 = require("./apis/users/router");

// print request url and method
app.use((req, res, next) => {
  console.log(`Request URL: ${req.url}, Method: ${req.method}`);
  next();
});


app.use("/todo", useRouter1);
app.use("/user", useRouter2);

app.listen(port, () => {
  console.log(`server listening on port ${port}`)
})
