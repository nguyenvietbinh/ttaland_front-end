import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { url } = req.query;
  if (typeof url !== 'string') return res.status(400).json({ error: 'missing url' });

  try {
    const r = await fetch(
      `https://www.tiktok.com/oembed?url=${encodeURIComponent(url)}`,
      { headers: { 'User-Agent': 'Mozilla/5.0' } }  // tránh một số chặn mặc định
    );
    if (!r.ok) return res.status(r.status).json({ error: 'tiktok oembed error' });
    const { thumbnail_url } = await r.json();
    res.setHeader('Cache-Control', 's-maxage=86400');   // CDN & ISR cache 1 ngày
    res.status(200).json({ thumbnail: thumbnail_url });
  } catch {
    res.status(500).json({ error: 'internal' });
  }
}
