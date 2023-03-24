import { Role } from "@prisma/client";
import { MutableRefObject, useEffect, useMemo, useState } from "react";

export const UserRoleDropDown: React.FC<{
    userId: string,
    defaultRole: Role,
    disabled: boolean,
    setRoleUpdate: (userId: string, role: Role) => void,
    removeUpdate: (userId: string) => void
}> = ({
    userId,
    defaultRole,
    disabled,
    setRoleUpdate,
    removeUpdate
}) => {
    const [roleValue, setRoleValue] = useState<Role>(defaultRole);    
    
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
            disabled={disabled}
        >
            {Object.values(Role).map(role => (
                <option key={role} value={role}>
                    {role}
                </option>
            ))}
        </select>
    );
}