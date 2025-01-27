import app from "./app.js";
import { connectToDatabase } from "./db/connection.js";
// Connections and listeners
const PORT = process.env.PORT || 5001;
connectToDatabase().then(() => {
    app.listen(PORT, () => {
        console.log(`Server Running on PORT ${PORT} & Connected to Database`);
    });
});
//# sourceMappingURL=index.js.map