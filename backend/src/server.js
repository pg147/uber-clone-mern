import http from 'http';
import {app} from "./app.js";
import connectDB from "./db/db.js";

const PORT = process.env.PORT || 3000;
const server = http.createServer(app);

connectDB().then(() => {
    server.listen(PORT, () => {
        console.log(`Server running at http://localhost:${PORT}`);
    });
}).catch((error) => console.log(error.message));
