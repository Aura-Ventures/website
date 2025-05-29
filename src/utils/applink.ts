export const openApp = (path = '') => {
  const userAgent = navigator.userAgent;
  const isIOS = /iPad|iPhone|iPod/.test(userAgent);
  const isAndroid = /Android/.test(userAgent);
  const isMac = /Macintosh/.test(userAgent);

  const APP_STORE_URL = 'https://apps.apple.com/us/app/aura-personal-bible-prayer/id6736381898';
  const PLAY_STORE_URL = 'https://play.google.com/store/apps/details?id=com.aura.letspray';
  const APP_SCHEME = `aura://${path}`;

  if (isIOS) {
    handleIOSDeepLink(APP_SCHEME, APP_STORE_URL);
  } else if (isAndroid) {
    handleAndroidDeepLink(path, PLAY_STORE_URL);
  } else if (isMac) {
    // Mac用户直接跳转到App Store
    window.location.href = APP_STORE_URL;
  } else {
    console.log('不支持的平台');
  }
};

/**
 * 处理iOS深度链接
 */
function handleIOSDeepLink(scheme: string, fallbackUrl: string) {
  try {
    window.location.href = scheme;

    // 设置较短的超时时间检查
    setTimeout(() => {
      console.log('应用未安装，跳转到App Store');
      window.location.href = fallbackUrl;
    }, 1000);
  } catch {
    console.log('iOS深度链接失败，跳转到App Store');
    window.location.href = fallbackUrl;
  }
}

/**
 * 处理Android深度链接
 */
function handleAndroidDeepLink(path: string, playStoreUrl: string) {
  const customScheme = `aura://${path}`;

  try {
    // 首先尝试自定义scheme
    attemptAppOpen(customScheme, () => {
      // 如果自定义scheme失败，直接跳转到Play Store
      console.log('应用未安装，跳转到Play Store');
      window.location.href = playStoreUrl;
    });
  } catch {
    // 如果出现异常，直接跳转到Play Store
    console.log('深度链接异常，跳转到Play Store');
    window.location.href = playStoreUrl;
  }
}

/**
 * 尝试打开应用，如果失败执行回调
 */
function attemptAppOpen(scheme: string, onFail: () => void) {
  const startTime = Date.now();
  let hasAppOpened = false;

  // 监听页面可见性变化（应用打开时页面会隐藏）
  const handleVisibilityChange = () => {
    if (document.hidden) {
      hasAppOpened = true;
    }
  };

  document.addEventListener('visibilitychange', handleVisibilityChange);

  // 尝试打开应用
  window.location.href = scheme;

  // 检查应用是否成功打开
  setTimeout(() => {
    document.removeEventListener('visibilitychange', handleVisibilityChange);
    console.log(hasAppOpened, Date.now() - startTime);

    // 如果应用没有打开且时间较短，说明应用未安装
    if (!hasAppOpened && Date.now() - startTime < 2000) {
      console.log(hasAppOpened, Date.now() - startTime);
      onFail();
    }
  }, 1000);
}
