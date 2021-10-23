import { app } from "./app";

const PORT = process.env.PORT || 5000

app.listen(PORT, () => console.log("O pai ta on!", PORT));
