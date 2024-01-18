import { User, UserRoles } from "../models/user";

export const jwtRolesKey =
  "http://schemas.microsoft.com/ws/2008/06/identity/claims/role";

export function getRolesFromJWT(token: string) {
  const base64JwtPayload = token?.split?.(".")?.[1] ?? "";
  const claims = JSON.parse(atob(base64JwtPayload));
  const roles = claims[jwtRolesKey];
  return typeof roles === "string" ? [roles] : roles;
}

export function hasRoles(
  user: User | null | undefined,
  roles: UserRoles[] | null | undefined = [],
  matchAll: boolean = false
) {
  if (!roles?.length) {
    return true;
  }

  const matchFunc = matchAll ? Array.prototype.every : Array.prototype.some;
  const predicate = (role: string) =>
    !!user?.roles?.find?.(
      (userRole) =>
        userRole.localeCompare(role, undefined, {
          sensitivity: "base",
        }) === 0
    );

  return matchFunc.call(roles, predicate);
}

export function isAdmin(user: User | null) {
  return hasRoles(user, [UserRoles.admin]);
}
