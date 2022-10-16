import { Router } from "express";
import {
  findAllProjectOfTheUserController,
  findEncryptedPrivateByIdController,
  findPublicKeyByEmailIdController,
} from "../controllers/users.controller";
import validate from "../middlewares/validateResources";
import {
  userEncryptedKeyValidateSchema,
  userPublicKeyValidateSchema,
} from "../Schemas/user.schema";

import { route } from "./auth.route";

const router = Router({ mergeParams: true });

//profile

//myProjects

router.get(
  "/get-private-key",
  validate(userEncryptedKeyValidateSchema),
  findEncryptedPrivateByIdController
);

router.post(
  "/get-public-key",
  validate(userPublicKeyValidateSchema),
  findPublicKeyByEmailIdController
);

router.get("/get-project", findAllProjectOfTheUserController);

export = router;
