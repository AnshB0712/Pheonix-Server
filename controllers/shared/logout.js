const logout = (req, res) => {
	const {cookies} = req;
	if (!cookies?.refresh) {
		return res.sendStatus(204);
	} // No content

	res.clearCookie('refresh', {httpOnly: true, sameSite: 'None', secure: true});
	res.sendStatus(204);
};

module.exports = logout;
