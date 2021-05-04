import nock from "nock";
import jwt from "jsonwebtoken";

const nockReply = {
  keys: [
    {
      alg: "RS256",
      kty: "RSA",
      use: "sig",
      n:
        // "vs4cgur-CYLH1hthfFfSZDQibKxxIwtCn37uwaJKYC0g935TB0w2Pog_7ISGfqvWAii502Cl12ceU8ha5wJpTrbCp6Oktt5kNaTQNSqjZ_cRPkOzBQfKe_7R66xHcbetduuSnrUw1fO_wdmBH-DnIPvty_OdMMeqLHgqv7DDosCbH4PjVLNIYEW9a9BcYrhZgS0hKUbvrDtwU51h4d45lVomRFVOLc3WuLg5HMUTiq5Lg5xSaEcP5zIRdei7g1mR_oTwqMZE_17M4UU-v9CWFd-juqvl5X1npQdh3l5CGhJKGZU5ZqmAedKgWPTVtQN-n2vVLmJupQzRCG0F8Rr0SQ",
        "w1jGqwsYf0nGtQj_fO-MfKDnTVQrJAdIsqYQD4eu_gFaoerqQUgmdnOLsGGKuYV24uoekSODTjkPX6SuMckiWwBhp8fr9v340a9T5o6kOrollVQ0B14NcivYPamq55NtmHFaJt-n_9kwIEF-4i3LD0VZQimAZ1uiBHGgG3zXShohJQ3YP-osXG9NS2cofMcM5UVzmTQvY9F6osZFWL_J7h6cxLN6pgS27iBKM7cJcs1tDZI5IF6UgQx7zTNYacHXJEA-73bZjya4arNQDGfaN69Qw0tbdnNDWtIAR9mB4fdqJibx946uIEImL6L6LRpnKm4IS-hCNtD8RR2_pzWiLw",
      e: "AQAB",
      kid: "0",
    },
  ],
};
nock("https://ccgg.au.auth0.com")
  .persist()
  .get("/.well-known/jwks.json")
  .reply(200, nockReply);

const getToken = (info) => {
  // A real payload will generally have a lot of stuff in it
  // these fields are common but it doesn't really matter.
  const payload = {
    sub: info.sub,
  };

  const options = {
    header: { kid: "0" }, // Needs to match the `kid` in our jwks.json mock
    algorithm: "RS256", // Needs to match our expressJwt instance
    expiresIn: "1d",
    audience: "https://cc.gg/api", // Needs to match our expressJwt instance
    issuer: "https://ccgg.au.auth0.com/", // Needs to match our expressJwt instance
  };

  let token;
  try {
    const privateKey = `-----BEGIN RSA PRIVATE KEY-----
MIIEowIBAAKCAQEAw1jGqwsYf0nGtQj/fO+MfKDnTVQrJAdIsqYQD4eu/gFaoerq
QUgmdnOLsGGKuYV24uoekSODTjkPX6SuMckiWwBhp8fr9v340a9T5o6kOrollVQ0
B14NcivYPamq55NtmHFaJt+n/9kwIEF+4i3LD0VZQimAZ1uiBHGgG3zXShohJQ3Y
P+osXG9NS2cofMcM5UVzmTQvY9F6osZFWL/J7h6cxLN6pgS27iBKM7cJcs1tDZI5
IF6UgQx7zTNYacHXJEA+73bZjya4arNQDGfaN69Qw0tbdnNDWtIAR9mB4fdqJibx
946uIEImL6L6LRpnKm4IS+hCNtD8RR2/pzWiLwIDAQABAoIBACyzovq/FkMCifMh
dP2M/7QBSgzbBug+tncTIze6j+PWQXwt+p8nuI2AkWWyXIFptjPk6UvDOafrzMXR
NH92DGOQqcgwKqIhqg+ptGRdHd3GfRU36JQLBL6so9Ywfkhx5zFsNvoQUixs8eNf
uX5ehkofT3ahcp20TVYA/mdr4QQ2oVwtBiKV4cMhxBWEExcocmcCtRI3Utb46FPD
x0tz3wL2GEINwbDT80kpjsAMLgkqnZO16xGv7dJAUA6ljXucQn/46UEYsGxGeNu7
+W18DfbNw/rFb++7vxwg//i7rnjUgiXTGyDhkIrkRAFxBw+R9X8glDxcEDrxXGkc
nRbvMHECgYEAxWncdgKfWjh9dlDHuWhJpVoJ09gfCWEqlKGK4jBfuI/5Q5EspdJL
6+e830F7gdyh9KazKoBng50Y4lDrNdhtK69DTOj2qDjaEFyK6D5lyJ9LKzaQooC7
vxy+aTFh3dkcRvlmya/P394skPJCHFuPkF0h4triJPbk9ZMfQN+UmIkCgYEA/VHl
6V9y/3YTr6CthgBNyVSftFvvhmrIpBGVVB1ylLmSSTQ+ThDbHnqJLaMhh813O1HM
Yt9Yqf0pao9+Bed84o4kcRPvlUzTzEqj1iNMjg4/ZgOmRwxbcXevqQQSXEfCdFZc
9sKanCHx0qm0XV9/Ldc/fbqf/a/f4h+D7bnZRvcCgYAK6peuTubQ7l7BtCXXMtUf
t6LjfAf7VMwt++DaMSKZ6hw2iEiXwtE/8kiXb9+Mhs7N4In3x7HxrTY7DY50I8ul
psNp9VfuZXZpgTSNMyYdufFGKnZFBilboBNHbdujkOXnZtMwQ/CSyI5eVYciWk3O
Bdhh2wi2UpDGo6QOyk5FQQKBgHU1Fo7DRh8jD/q7+m286EDWMcqumwXzlIAtTo2L
zn832ZKbZJSUQf45Lg16pEIEdD1zHIFG2+xTIX2XhPTQZb0hjYTwd3L6CClHA8VJ
sdsshnL6D05iTlES0qj+JEykOzm+1+aopgbFwfD56mUlkV+xb0QKPIqRfKJQeKde
zUSDAoGBAIi3kKDW/J4oOLY1Qniw22K45D2kVN9ysjd/LDt7pki1STzh7o6E3bkA
VMh1k8g2T+37zNX8A+X7SYJMLF7ZoTEipqcR/aT31zjpXvxkUzniFcW7POW8dg94
ZKcI4Kx8Z9Hy+9Sn+aE3l+KSWIdWmQ5/NYjVmlp3nhd6phVGsUGi
-----END RSA PRIVATE KEY-----`;
    token = jwt.sign(payload, privateKey, options);
  } catch (err) {
    console.log(err);
    throw err;
  }

  return token;
};

export default getToken;
