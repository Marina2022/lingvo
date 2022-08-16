// 
// helps you detect mobile browsers (to show a relevant message as the process of installing your PWA changes from browser to browser)
// https://stackoverflow.com/a/69398583
//
const isMobile = {
  Android: function () {
    return navigator.userAgent.match(/Android/i);
  },
  BlackBerry: function () {
    return navigator.userAgent.match(/BlackBerry/i);
  },
  iOs: function () {
    return navigator.userAgent.match(/iPhone|iPad|iPod/i);
  },
  iPhone: function () {
    return navigator.userAgent.match(/iPhone/i);
  },
  iPad: function () {
    return navigator.userAgent.match(/iPad/i);
  },
  iPod: function () {
    return navigator.userAgent.match(/iPod/i);
  },
  Opera: function () {
    return navigator.userAgent.match(/Opera Mini/i);
  },
  Samsung: function () {
    return navigator.userAgent.match(
    /SAMSUNG|Samsung|SGH-[I|N|T]|GT-[I|N]|SM-[A|N|P|T|Z]|SHV-E|SCH-[I|J|R|S]|SPH-L/i,
    );
  },
  Windows: function () {
    return (
    navigator.userAgent.match(/IEMobile/i) ||
    navigator.userAgent.match(/WPDesktop/i)
    );
  },
  any: function () {
    return (
    isMobile.Android() ||
    isMobile.BlackBerry() ||
    isMobile.iOs() ||
    isMobile.Opera() ||
    isMobile.Windows()
    );
  },
}

// use this to check if the user is already using your PWA - no need to prompt if in standalone
function isStandalone () {
const isStandalone = window.matchMedia("(display-mode: standalone)").matches;
if (document.referrer.startsWith("android-app://")) {
  return true; // Trusted web app
} else if (navigator["standalone"] || isStandalone) {
  return true;
}
return false;
}

const __isMobile = isMobile.any()

function isMobileNotInStandaloneMode () {
  return __isMobile && !isStandalone()
}

function isDesktopNotInStandaloneMode () {
  return !__isMobile && !isStandalone()
}

export {isMobile, isStandalone, isMobileNotInStandaloneMode, isDesktopNotInStandaloneMode};
