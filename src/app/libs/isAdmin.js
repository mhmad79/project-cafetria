async function isAdmin() {
    const session = await getServerSession(authOptions);
    const userEmail = session?.user?.email;
    if (!userEmail) {
      return false;
    }
    const userInfo = await User.findOne({ email: userEmail });
    if (!userInfo) {
      return false;
    }
    return userInfo.admin;
}
