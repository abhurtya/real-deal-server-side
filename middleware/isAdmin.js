/**/
/*
isAdmin Middleware

NAME
    isAdmin - Verifies if the authenticated user has admin role.

SYNOPSIS
    export const isAdmin(req, res, next)

DESCRIPTION
    This middleware checks if the user making the request is authenticated and has a role of "admin".
    If these conditions are met, the middleware invokes the next function, allowing the request to continue.
    If not, a 403 Forbidden response is sent, indicating that the user does not have the appropriate permissions.

PARAMETERS
    - req: The HTTP request object.
    - res: The HTTP response object.
    - next: A callback to the next middleware/function in the sequence.

RETURNS
    Calls next() if user is an admin, else sends a 403 status code with an error message.
*/
/**/

export const isAdmin = (req, res, next) => {
  if (req.isAuthenticated() && req.user.role === "admin") {
    return next();
  } else {
    return res
      .status(403)
      .json({ message: "Sorry, Admin Only: You do not have permission to perform this action" });
  }
};
