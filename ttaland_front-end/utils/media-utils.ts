/**
 * Chuyển đổi YouTube URL thành embed URL
 * @param url - YouTube URL (bao gồm youtube.com, youtu.be, m.youtube.com)
 * @returns Embed URL hoặc null nếu không hợp lệ
 */
export function convertYouTubeToEmbed(url: string): string | null {
  // Pattern để match YouTube URLs
  const patterns = [
    /(?:https?:\/\/)?(?:www\.)?youtube\.com\/watch\?v=([^&\n?#]+)/,
    /(?:https?:\/\/)?(?:www\.)?youtu\.be\/([^&\n?#]+)/,
    /(?:https?:\/\/)?(?:www\.)?m\.youtube\.com\/watch\?v=([^&\n?#]+)/,
    /(?:https?:\/\/)?(?:www\.)?youtube\.com\/embed\/([^&\n?#]+)/,
  ];

  for (const pattern of patterns) {
    const match = url.match(pattern);
    if (match && match[1]) {
      return `https://www.youtube.com/embed/${match[1]}?rel=0&showinfo=0&autoplay=0&enablejsapi=1`;
    }
  }

  return null;
}

/**
 * Chuyển đổi TikTok URL thành embed URL
 * @param url - TikTok URL
 * @returns Embed URL hoặc null nếu không hợp lệ
 */
export function convertTikTokToEmbed(url: string): string | null {
  // Pattern để match TikTok URLs và lấy video ID
  const videoPattern = /(?:https?:\/\/)?(?:www\.)?tiktok\.com\/@[^\/]+\/video\/(\d+)/;
  const match = url.match(videoPattern);
  
  if (match && match[1]) {
    const videoId = match[1];
    // Sử dụng format embed chính thức của TikTok
    return `https://www.tiktok.com/embed/v2/${videoId}`;
  }

  // Fallback cho các format khác
  return url;
}

/**
 * Kiểm tra xem URL có phải là YouTube không
 */
export function isYouTubeUrl(url: string): boolean {
  return /(?:youtube\.com|youtu\.be|m\.youtube\.com)/i.test(url);
}

/**
 * Kiểm tra xem URL có phải là TikTok không
 */
export function isTikTokUrl(url: string): boolean {
  return /(?:tiktok\.com|vm\.tiktok\.com|vt\.tiktok\.com)/i.test(url);
}
