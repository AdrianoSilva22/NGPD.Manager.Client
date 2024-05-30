const rolePermissions: Record<string, RegExp[]> = {
  user: [
    /^\/estudante\/.*/,
  ],
  mentor: [
    /^\/mentor\/.*/,
    /^\/estudante\/.*/,
    /^\/squad\/.*/,
  ],
  Gerente: [
    /^\/mentor\/.*/,
    /^\/estudante\/.*/,
    /^\/squad\/.*/,
    /^\/empresa\/.*/,
  ],
};

export function isAuthorized(role: string, path: string): boolean {
  const permissions = rolePermissions[role] || [];
  return permissions.some((pattern) => pattern.test(path));
}
