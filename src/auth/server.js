import jwt from "express-jwt";
import { expressJwtSecret } from "jwks-rsa";

// Authorization middleware. When used, the
// Access Token must exist and be verified against
// the Auth0 JSON Web Key Set
const checkJwt = jwt({
  // Dynamically provide a signing key
  // based on the kid in the header and
  // the signing keys provided by the JWKS endpoint.
  secret: expressJwtSecret({
    cache: true,
    rateLimit: true,
    jwksRequestsPerMinute: 5,
    jwksUri: "https://ccgg.au.auth0.com/.well-known/jwks.json",
  }),

  // Validate the audience and the issuer.
  audience: "https://cc.gg/api",
  issuer: "https://ccgg.au.auth0.com/",
  algorithms: ["RS256"],
});

export default checkJwt;
