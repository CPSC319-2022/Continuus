import { Role } from "@prisma/client";
import { useState } from "react";

export const UserRoleDropDown: React.FC<{
    userId: string,
    defaultRole: Role,
    setRoleUpdate: (userId: string, role: Role) => void,
    removeUpdate: (userId: string) => void
}> = ({
    userId,
    defaultRole,
    setRoleUpdate,
    removeUpdate
}) => {
    const [roleValue, setRoleValue] = useState<Role>(defaultRole);

    console.log(userId, defaultRole);
    

    return (
        <select
            className="p-2"
            value={roleValue}
            onChange={e => {
                const targetValue = e.target.value as Role;
                if (Object.values(Role).includes(targetValue)) {
                    setRoleValue(targetValue);
                    if (targetValue !== defaultRole) {
                        setRoleUpdate(userId, targetValue);
                    } else {
                        removeUpdate(userId);
                    }
                }
            }}
        >
            {Object.values(Role).map(role => (
                <option key={role} value={role}>
                    {role}
                </option>
            ))}
        </select>
    );
}