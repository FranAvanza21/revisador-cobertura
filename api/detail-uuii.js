module.exports = async function handler(req, res) {
  const { id } = req.query;
  if (!id) return res.status(400).json({ error: 'Missing id' });

  const auth = req.headers['authorization'] || '';
  const url  = `https://api.avanzafibra.net/gestfy/v1/getDetailUUII/${encodeURIComponent(id)}`;

  try {
    const upstream = await fetch(url, {
      headers: { 'Authorization': auth, 'Accept': 'application/json' },
    });
    const data = await upstream.json();
    res.status(upstream.status).json(data);
  } catch (e) {
    res.status(502).json({ error: 'proxy error' });
  }
};
