const middleware = require("../../../../middleware/middleware");
const { verifyToken } = require("../../../../services/auth");
const hasRole = require("../../../../middleware/hasRole");
const {
  createValidator,
  updateValidator,
} = require("./validation");
const {
  createController,
  updateController,
  listController,
  getDetailController,
  deleteController,
  statusController,
  dropdownOptionsController,
  cardListController,
  getYarnDetailController,
} = require("./controller");
const { asyncHandler } = require("../../../../utils/asyncHandler");
const { IdValidator, listValidator, statusValidator } = require("../../../../utils/validation");
const { uploadYarnFields } = require("../../../../middleware/uploadProductFieldsMiddleware");

module.exports = (app) => {
  app.post(
    "/yarn/add",
    verifyToken,
    hasRole(["admin"]),
    (req, res, next) => {
      const count = parseInt(req.headers["count"] || "0", 10);
      const uploadMiddleware = uploadYarnFields(count);
      uploadMiddleware(req, res, next);
    },
    middleware(createValidator),
    asyncHandler(createController)
  );
  app.put(
    "/yarn/update",
    verifyToken,
    hasRole(["admin"]),
    (req, res, next) => {
      const count = parseInt(req.headers["count"] || "0", 10);
      const uploadMiddleware = uploadYarnFields(count);
      uploadMiddleware(req, res, next);
    },
    middleware(updateValidator),
    asyncHandler(updateController)
  );
  app.get(
    "/yarn/:_id",
    verifyToken,
    hasRole(["admin"]),
    middleware(IdValidator),
    asyncHandler(getDetailController)
  );
  app.get("/yarn/details/:_id", verifyToken, middleware(IdValidator), asyncHandler(getYarnDetailController))
  app.post(
    "/yarn/list",
    verifyToken,
    hasRole(["admin"]),
    middleware(listValidator),
    asyncHandler(listController)
  );
  app.post(
    "/yarn/card-list",
    verifyToken,
    hasRole(["admin"]),
    middleware(listValidator),
    asyncHandler(cardListController)
  );
  app.post("/yarn/options", asyncHandler(dropdownOptionsController));
  app.delete(
    "/yarn/:_id",
    verifyToken,
    hasRole(["admin"]),
    middleware(IdValidator),
    asyncHandler(deleteController)
  );
  app.patch(
    "/yarn/status",
    verifyToken,
    hasRole(["admin"]),
    middleware(statusValidator),
    asyncHandler(statusController)
  );
};
