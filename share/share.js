'use strict';
const website = 'https://lauhs.cn/';
const status = document.getElementById('share-status');
const copyButton = document.getElementById('copy-link');
copyButton.addEventListener('click', async () => {
  try {
    if (!navigator.clipboard?.writeText) throw new Error('Clipboard unavailable');
    await navigator.clipboard.writeText(website);
    status.textContent = '网址已复制，可以发给朋友了。';
    document.getElementById('copy-fallback').hidden = true;
  } catch {
    status.textContent = '请复制下方网址。';
    const fallback = document.getElementById('copy-fallback');
    fallback.hidden = false;
    const input = document.getElementById('site-url');
    input.focus();
    input.select();
  }
});
const nativeButton = document.getElementById('native-share');
if (typeof navigator.share === 'function') {
  nativeButton.hidden = false;
  nativeButton.addEventListener('click', async () => {
    try {
      await navigator.share({ title: '阿海 / MR.NICE — 做策略，也做创作。', text: '工作中的思考，与生活里的片刻。来看看我的 AI 实践与摄影作品。', url: website });
      status.textContent = '';
    } catch (error) {
      if (error.name !== 'AbortError') status.textContent = '可以点“复制网址”，或保存分享卡发给朋友。';
    }
  });
}
