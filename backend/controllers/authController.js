exports.login = (req, res) => {
    const { username, password } = req.body;
    if (username === 'admin' && password === 'admin') {
      return res.json({ token: 'mock-token', user: { role: 'admin' } });
    }
    return res.status(401).json({ error: 'Invalid credentials' });
  };
  