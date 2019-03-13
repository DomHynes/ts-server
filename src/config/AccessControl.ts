import { AccessControl } from "role-acl";

export default new AccessControl({
    USER: {
        grants: [
            {
                resource: "user",
                action: "read",
            }
        ]
    },
    ADMIN: {
        grants: [
            {
                resource: "user",
                action: "*"
            }
        ]
    }
});
