// Detects if device is on iOS 
// https://www.netguru.com/blog/pwa-ios
//
const isIos = () => {
  const userAgent = window.navigator.userAgent.toLowerCase();
  return /iphone|ipad|ipod/.test( userAgent );
}
// Detects if device is in standalone mode
const isInStandaloneMode = () => ('standalone' in window.navigator) && (window.navigator.standalone);

// Checks if should display install popup notification:
function isIosNotInStandaloneMode () {
  // if (isIos() && !isInStandaloneMode()) {
  //   this.setState({ showInstallMessage: true });
  // }
  return isIos() && !isInStandaloneMode()
}

export {isIosNotInStandaloneMode as isMobileNotInStandaloneMode}