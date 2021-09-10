// this file is a wrapper with defaults to be used in both API routes and `getServerSideProps` functions
import { withIronSession } from "next-iron-session";

const withSession = (handler) =>
  withIronSession(handler, {
    password: process.env.SECRET_COOKIE_PASSWORD,
    cookieName: "next-iron-session/examples/next.js",
    cookieOptions: {
      // the next line allows to use the session in non-https environments like
      // Next.js dev mode (http://localhost:3000)
      secure: process.env.NODE_ENV === "production",
    },
  });

export const checkSession = (req, res) => {
  const user = req.session.get("user");

  //if user has no session redirect to login
  if (user === undefined) {
    res.setHeader("location", "/auth/login");
    res.statusCode = 302;
    res.end();
    return { props: {} };
  }

  return { user };
};

export default withSession;
