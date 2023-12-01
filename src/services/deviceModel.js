import { UAParser } from "ua-parser-js";
import { toast } from "react-toastify";
export let userAgent = window.navigator.userAgent,
  platform = window.navigator.platform,
  macosPlatforms = ["Macintosh", "MacIntel", "MacPPC", "Mac68K"],
  windowsPlatforms = ["Win32", "Win64", "Windows", "WinCE"],
  iosPlatforms = ["iPhone", "iPad", "iPod"];
export function getOS() {
  let os = "";
  if (macosPlatforms.indexOf(platform) !== -1) {
    os = "Mac OS";
  } else if (iosPlatforms.indexOf(platform) !== -1) {
    os = "iOS";
  } else if (windowsPlatforms.indexOf(platform) !== -1) {
    os = "Windows";
  } else if (/Android/.test(userAgent)) {
    os = "Android";
  } else if (!os && /Linux/.test(platform)) {
    os = "Linux";
  }
  return os;
}

export const DEVICE = {
  MACOS: "Mac OS",
  WINDOWS: "Windows",
  LINUX: "Linux",
  IOS: "iOS",
  ANDROID: "Android",
};

export function getDeviceInfo() {
  let parser = new UAParser();
  let info = parser.getResult();
  return info;
}
export function isWebKitBrowser() {
  let deviceInfo = getDeviceInfo();
  return deviceInfo.browser.name === "WebKit";
}
export function isMobileDevice() {
  let os = getOS();

  return os === DEVICE.ANDROID || os === DEVICE.IOS;
}

export function isSupportedBrowser() {
  let deviceInfo = getDeviceInfo();

  return (
    deviceInfo.browser.name === "Chrome" ||
    deviceInfo.browser.name === "Safari" ||
    deviceInfo.browser.name === "Mobile Safari" ||
    deviceInfo.browser.name === "Samsung Browser" ||
    deviceInfo.browser.name === "MIUI Browser"
  );
}

export function isLocalhost() {
  const host = window.location.origin;
  return host.includes("localhost");
}
