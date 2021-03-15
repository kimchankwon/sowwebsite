export const Roles = {
  Admin: 0,
  Staff: 1,
  Executive: 2,
  StudentLeader: 3,
  Member: 9,
};

export function roleToString(roleNumber) {
  switch (roleNumber) {
    case Roles.Admin:
      return "Admin";
    case Roles.Staff:
      return "Staff";
    case Roles.Executive:
      return "Executive";
    case Roles.StudentLeader:
      return "Student Leader";
    case Roles.Member:
      return "Member";
  }
}
