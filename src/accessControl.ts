const rolePermissions: Record<string, RegExp[]> = {
  Mentor: [
    /^\/squad.*/,
    /^\/dashboard.*/,
  ],
  Gerente: [
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
