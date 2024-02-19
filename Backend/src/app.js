const express = require("express");
const createError = require("http-errors");
const multer = require("multer");
const morgan = require("morgan");
const xssClean = require("xss-clean");
const cookieParser = require("cookie-parser");
const rateLimit = require("express-rate-limit");

const userRouter = require("./routes/user.route");
const seedRouter = require("./routes/seed.route");
const { errorResponse } = require("./helper/responseHelper");
const authRouter = require("./routes/auth.route");
const { categoryRouter } = require("./routes/category.route");
const { productRouter } = require("./routes/product.route");

const app = express();
const limitter = rateLimit({
  windowMs: 1 * 60 * 1000,
  limit: 10,
  message: "Too may request for this ip! Please try again Later."
});

app.use(limitter);
app.use(xssClean());
app.use(morgan("dev"));
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get("/test", (req, res, next) => {
  try {
    res.status(200).json({ success: true, message: "Test  page" });
  } catch (error) {
    res.status(500).send("error is here");
  }
});

app.use("/api/seed", seedRouter);
app.use("/api/users", userRouter);
app.use("/api/auth", authRouter);
app.use("/api/categories", categoryRouter);
app.use("/api/products", productRouter);

app.use((req, res, next) => {
  next(createError(404, "Route not Found!"));
});

app.use((err, req, res, next) => {
  console.log(err.status);
  if (err instanceof multer.MulterError) {
    return errorResponse(res, {
      statusCode: 400,
      message: err.message
    });
  }
  return res.status(err.status || 500).json({
    statusCode: err.status || 500,
    message: err.message || "Internal Server Error"
  });
});

module.exports = app;
