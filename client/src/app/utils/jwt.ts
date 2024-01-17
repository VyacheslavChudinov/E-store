export const jwtRolesKey =
  "http://schemas.microsoft.com/ws/2008/06/identity/claims/role";

export default function getRolesFromJWT(token: string) {
  const base64JwtPayload = token?.split?.(".")?.[1] ?? "";
  const claims = JSON.parse(atob(base64JwtPayload));
  const roles = claims[jwtRolesKey];
  return typeof roles === "string" ? [roles] : roles;
}
