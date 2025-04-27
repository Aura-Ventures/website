export const openApp = (path = '') => {
  const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent);
  const isAndroid = /Android/.test(navigator.userAgent);
  const appStoreUrl = 'https://apps.apple.com/us/app/aura-personal-bible-prayer/id6736381898';
  const playStoreUrl = 'https://play.google.com/store/apps/details?id=com.aura.letspray';
  const appDeepLink = `aura://${path}`;

  // 记录当前时间
  const startTime = Date.now();

  // 尝试打开应用
  window.location.href = appDeepLink;

  // 监听页面可见性变化
  document.addEventListener('visibilitychange', function () {
    // 如果页面变为隐藏状态（应用被打开），且时间间隔小于2秒
    if (document.hidden && Date.now() - startTime < 2000) {
      // 应用已安装并成功打开
      return;
    }

    // 如果页面仍然可见，说明应用未安装
    if (!document.hidden) {
      // 跳转到应用商店
      if (isIOS) {
        window.location.href = appStoreUrl;
      } else if (isAndroid) {
        window.location.href = playStoreUrl;
      }
    }
  });
};
