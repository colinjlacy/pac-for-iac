import express from 'express';
import {listResources, replaceResources, patchAllowDelete} from "./endpoints/resources.js";
const app = express();

app.use(express.json());

app.listen(8084, () => {
    console.log("Server running on port 8084");
});

app.get("/resources", await listResources);
app.post("/resources", await replaceResources);
app.patch("/resources/:id/allowDelete", await patchAllowDelete);