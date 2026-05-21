export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET');
  
  const { q, type, letter, start } = req.query;
  
  let url;
  if (letter) {
    url = `https://www.metal-archives.com/browse/ajax-letter/l/${encodeURIComponent(letter)}/json/1?sEcho=1&iColumns=4&iDisplayStart=${start||0}&iDisplayLength=500`;
  } else {
    url = `https://www.metal-archives.com/search/ajax-band-search/?field=name&query=${encodeURIComponent(q)}&sEcho=1&iColumns=3&iDisplayStart=0&iDisplayLength=50`;
  }

  try {
    const response = await fetch(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0',
        'Accept': 'application/json',
        'Referer': 'https://www.metal-archives.com'
      }
    });
    const data = await response.json();
    res.status(200).json(data);
  } catch (e) {
    res.status(500).json({ error: 'Error conectando con Metal Archives' });
  }
}
