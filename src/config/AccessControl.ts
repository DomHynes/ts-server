import { AccessControl } from 'role-acl';

const accesscontrol = new AccessControl({
  USER: {
    grants: [
      {
        resource: 'user',
        action: 'read',
      },
      {
        resource: 'user',
        action: 'update',
        condition: {
          Fn: 'EQUALS',
          args: {
            requester: '$.owner',
          },
        },
      },
    ],
  },
  ADMIN: {
    grants: [
      {
        resource: 'user',
        action: '*',
      },
    ],
  },
});

export default accesscontrol;
