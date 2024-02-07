const { SERVER_PORT } = require("./secret");
const app = require("./app");
const connectDatabase = require("./config/db");

app.listen(SERVER_PORT, async () => {
  console.log(`Server is runnig at http://localhost:${SERVER_PORT}`);
  await connectDatabase();
});
