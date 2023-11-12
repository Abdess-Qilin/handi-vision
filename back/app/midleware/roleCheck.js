
export const roleCheck = (allowedRoles) => {
    return (req, res, next) => {

        try {
            const userRole = req.user.code_role;

            let isRoleAllowed = false;

            for (let i = 0; i < allowedRoles.length; i++) {
                if (allowedRoles[i] == userRole) {
                    isRoleAllowed = true;
                    break;
                }
            }

            if (isRoleAllowed) {
                next(); // Accès autorisé
            } else {
                res.status(403).json({ message: 'Accès refusé. Vous n\'avez pas la permission.' });
            }
        } catch (e) {
            res.status(401).send(e.message);
        }


    }
}
