import { OktaAuth } from "@okta/okta-auth-js";

const oktaAuth = new OktaAuth({
  issuer: "https://{yourOktaDomain}/oauth2/default",
  clientId: "{clientId}",
  redirectUri: "{redirectUri}",
  scopes: ["openid", "profile", "email"],
});

export { oktaAuth };