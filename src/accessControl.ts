const rolePermissions: Record<string, RegExp[]> = {
  mentor: [
    /^\/squad.*/,
    /^\/dashboard.*/,
  ],
  gerente: [
    /^\/mentor.*/,
    /^\/estudante.*/,
    /^\/instituicao.*/,
    /^\/squad.*/,
    /^\/empresa.*/,
    /^\/dashboard.*/,
    /^\/user.*/,
  ],
  Suporte: [
    /^\/mentor.*/,
    /^\/estudante.*/,
    /^\/instituicao.*/,
    /^\/squad.*/,
    /^\/empresa.*/,
    /^\/dashboard.*/,
    /^\/user.*/,
  ],
};

export function isAuthorized(role: string, path: string): boolean {
  const permissions = rolePermissions[role] || [];
  return permissions.some((pattern) => pattern.test(path));

}
