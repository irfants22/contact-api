import { Router } from "express";
import { authMiddleware } from "../middleware/auth-middleware.js";
import userController from "../controller/user-controller.js";
import contactController from "../controller/contact-controller.js";
import addressController from "../controller/address-controller.js";

const authorizedRouter = Router();
authorizedRouter.use(authMiddleware);

// User API
authorizedRouter.get("/api/users/current", userController.getUser);
authorizedRouter.patch("/api/users/current", userController.updateUser);
authorizedRouter.delete("/api/users/logout", userController.logoutUser);

// Contact API
authorizedRouter.get("/api/contacts/:contactId", contactController.getContact);
authorizedRouter.get("/api/contacts", contactController.searchContact);
authorizedRouter.post("/api/contacts", contactController.createContact);
authorizedRouter.put("/api/contacts/:contactId", contactController.updateContact);
authorizedRouter.delete("/api/contacts/:contactId", contactController.removeContact);

// Address API
authorizedRouter.get("/api/contacts/:contactId/addresses", addressController.listAddress);
authorizedRouter.get("/api/contacts/:contactId/addresses/:addressId", addressController.getAddress);
authorizedRouter.post("/api/contacts/:contactId/addresses", addressController.createAddress);
authorizedRouter.put("/api/contacts/:contactId/addresses/:addressId", addressController.updateAddress);
authorizedRouter.delete("/api/contacts/:contactId/addresses/:addressId", addressController.removeAddress);

export { authorizedRouter };
