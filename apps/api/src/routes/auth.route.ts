import { Router } from "express";
import {
    createUserController,
    userLogin,
    userLogout,
} from "../controllers/auth.controller";
import validate from "../middlewares/validateResources";
import { userRequestValidateSchema } from "../Schemas/user.schema";

const router = Router({ mergeParams: true });

router.post(
    "/signup",
    validate(userRequestValidateSchema),
    createUserController
);

router.post("/login", userLogin);
router.post("/logout", userLogout);
router.get("/profile");

export = router;
