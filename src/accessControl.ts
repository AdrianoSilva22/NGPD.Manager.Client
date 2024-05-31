const rolePermissions: Record<string, RegExp[]> = {
  Mentor: [
    /^\/mentor.*/,
    /^\/estudante.*/,
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
  ],
  Suporte: [
    /^\/mentor.*/,
    /^\/estudante.*/,
    /^\/instituicao.*/,
    /^\/squad.*/,
    /^\/empresa.*/,
    /^\/dashboard.*/,
  ],
};

export function isAuthorized(role: string, path: string): boolean {
  const permissions = rolePermissions[role] || [];
  return permissions.some((pattern) => pattern.test(path));

}
