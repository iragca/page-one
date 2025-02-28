import app from "./app.js";
import { dbConnect } from "./config/db.js";

const PORT = process.env.PORT || 5000;

dbConnect(() => {
  console.log("🚀 Starting server...");
  try {
    app.listen(PORT, () => {
      console.log(`🟩 Server is running on http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error(error);
    console.error("🟥 Could not start the server");
    process.exit(1);
  }
});
