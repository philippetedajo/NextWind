import withSession from "../../../utils/session";

export default withSession(async (req, res) => {
  try {
    req.session.destroy();
    res.json({ isLoggedIn: false, data: null });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
