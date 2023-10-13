if (window.vuplex) {
  addMessageListener();
}
else {
  window.addEventListener('vuplexready', addMessageListener);
}
function addMessageListener() {
  window.vuplex.addEventListener('message', (event) => {
    if (OnUnityMsgCallback)
      OnUnityMsgCallback(event.data);
  });
}

function OnUnityMsg(msg) {
  if (OnUnityMsgCallback)
    OnUnityMsgCallback(msg);
  else
    console.error("--------- No Register Msg Callback ---------");
}

var OnUnityMsgCallback;
function RegisterOnUnityMsg(callback) {
  // console.log("--------- Register Msg Callback ---------");
  OnUnityMsgCallback = callback;
}
function SendMsgToUnity(msg) {
  if (window.vuplex)
    window.vuplex.postMessage(msg);
}

function delay(time) {
  return new Promise(resolve => setTimeout(resolve, time * 1000));
}

function IsMobile() {
  let params = new URLSearchParams(window.location.search);
  var useragent = navigator.userAgent;
  useragent = useragent.toLowerCase();
  var isMobile = true;
  var flag = -1;
  if (useragent.indexOf('iphone') != -1)  //iPhone
  {
    flag = 0;
  }
  else if (useragent.indexOf('ipad') != -1 || useragent.indexOf('ipod') != -1)    //iPad
  {
    flag = 1;
  }
  else if (useragent.indexOf('android') != -1)   //Android
  {
    flag = 2;
  }
  else     // PC
  {
    if (window.navigator.standalone) {
      flag = 3;
    }
    else {
      try {
        if (window.navigator.standalone === false) {
          flag = 4;
        }
        else {
          flag = 5;
          isMobile = false;
        }
      }
      catch (e) {
        flag = 6;
      }
    }
  }
  // window.alert(`standalone = ${window.navigator.standalone} => flag = ${flag} => useragent = ${useragent}`);
  return isMobile;
}

function AttachSerialNumber(url) {
  let result = url;
  if (result) {
    if (result.indexOf('sn') < 0) {
      result += "&sn=" + GetSerialNumber();
    }
    let timestamp = new Date().getTime();
    result += "&v=" + timestamp;
  }
  return result;
}

var SerialNumber = "";
function GetSerialNumber() {
  if (!SerialNumber) {
    var chars = '1234567890ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz',

      serialLength = 10,

      randomSerial = "",

      i,

      randomNumber;

    for (i = 0; i < serialLength; i = i + 1) {
      randomNumber = Math.floor(Math.random() * chars.length);
      randomSerial += chars.substring(randomNumber, randomNumber + 1);
    }
    SerialNumber = randomSerial;
  }
  return SerialNumber;
}

function GetDivElement(elementID) {
  var p = document.getElementById(elementID);
  if (!p) {
    p = document.createElement("div");
    p.id = elementID;

    var parent = document.getElementById("iframeParent");
    parent.appendChild(p);
  }
  return p;
}

function GetIframeWindow(elementID) {
  var iframe_object = document.getElementById(elementID);

  if (!iframe_object) return undefined;
  if (iframe_object.contentWindow) return iframe_object.contentWindow;
  if (iframe_object.window) return iframe_object.window;

  var doc;
  if (!doc && iframe_object.contentDocument)
    doc = iframe_object.contentDocument;

  if (!doc && iframe_object.document)
    doc = iframe_object.document;

  if (doc && doc.defaultView) return doc.defaultView;
  if (doc && doc.parentWindow) return doc.parentWindow;

  return undefined;
}

//---------------- Login ----------------------

var LoginCallback;
var LoginIframeID = "LoginIframe";
function EnableLoginPage(active, callback) {
  LoginCallback = callback;
  var info = GetLoginIFrameString(LoginIframeID);
  var p = GetDivElement("LoginIframeParent");
  if (p) {
    if (active) {
      p.style.display = 'block';

      if (p.innerHTML != info)
        p.innerHTML = info;
    }
    else {
      p.style.display = 'none';
      p.innerHTML = "";
    }
  }
}

function SetLanguage(langIndex, langDic, callback) {
  var iframeWindow = GetIframeWindow(LoginIframeID);
  if (iframeWindow) {
    try { iframeWindow.SetLanguage(langIndex, langDic, callback); }
    catch (e) { console.error(e); }
  }
}
function InitInputField(account, password) {
  var iframeWindow = GetIframeWindow(LoginIframeID);
  if (iframeWindow) {
    try { iframeWindow.InitInputField(account, password); }
    catch (e) { console.error(e); }
  }
}
function OpenChangePasswordPage(account) {
  var iframeWindow = GetIframeWindow(LoginIframeID);
  if (iframeWindow) {
    try { iframeWindow.OpenChangePasswordPage(account); }
    catch (e) { console.error(e); }
  }
}
function OnServerCallback(msg, key) {
  var iframeWindow = GetIframeWindow(LoginIframeID);
  if (iframeWindow) {
    try { iframeWindow.OnServerCallback(msg, key); }
    catch (e) { console.error(e); }
  }
}
function ShowMsgWindow(msgInfo, callback) {
  var iframeWindow = GetIframeWindow(LoginIframeID);
  if (iframeWindow) {
    try { iframeWindow.ShowMsgWindow(msgInfo, callback); }
    catch (e) { console.error(e); }
  }
}

function GetLoginIFrameString(id) {
  let timestamp = new Date().getTime();
  var src = './resource/HtmlLogin/Login.html?v=' + timestamp;
  return '<iframe frameborder="0"' +
    'noresize="noresize"' +
    'id="' + id + '"' +
    'src="' + src + '"' +
    'frameborder="0" width="100%" height="100%">' +
    '</iframe>\n';
}
//---------------- Login ----------------------


var VideoIframeID = "VideoPlayerIframe";
window.addEventListener('message', ExeActionFromIframe, false);
async function ExeActionFromIframe(event) {
  var json = ('ExeActionFromIframe', event.data);
  // console.log(`data = ${event.data}`);
  // console.log(`ExeActionFromIframe : Action = ${json.Action}, Params = ${json.Params}`);

  switch (json.Action) {
    case "OnIframeReady":

      if (json.Params[0] == "video") {
        var iframeWindow = GetIframeWindow(VideoIframeID);
        if (iframeWindow) {
          try {
            iframeWindow.SetCallback(Callback);
            iframeWindow.SetErrorCallback(ErrorCallback);
          }
          catch (e) { console.error(e); }
          // await delay(2);
        }
      }
      else if (json.Params[0] == "login") {
        if (LoginCallback)
          LoginCallback(json);
      }
      else {
      }
      break;

    case "OnSubmitLogin":
    case "OnSubmitChangePassword":
      if (LoginCallback)
        LoginCallback(json);
      break;

    case "OpenURL":
      let url = json.Params[0];
      let openMethod = "_blank";
      if (IsUnityApp) {
        let jsonString = '{"cmd":"OpenURL","Data":{"Key":"' + url + '", "Value": "' + openMethod + '"}}';
        SendMsgToUnity(jsonString);
      }
      else {
        OpenURL(url, openMethod);
      }
      break;

    case "CloseBanner":
      CloseBanner();
      break;
  }
}


//---------------- Video ----------------------
var Callback;
var ErrorCallback;
var Mute = false;
function PlayVideo(playerType, url, appName, streamingName, callback, errorCallback) {
  Callback = callback;
  ErrorCallback = errorCallback;

  var info = '';
  switch (playerType) {
    case 0:     //Wowza
      info = GetWowzaVideoIFrameString(VideoIframeID, url, appName, streamingName);
      break;
    case 1:     //TC
      info = GetTCVideoIFrameString(VideoIframeID, url, appName, streamingName);
      break;
  }

  var p = GetDivElement("VideoPlayerDiv");
  if (p) {
    if (p.innerHTML != info)
      p.innerHTML = info;
  }
}
function StopVideo() {
  var iframeWindow = GetIframeWindow(VideoIframeID);
  if (iframeWindow) {
    try { iframeWindow.StopVideo(); }
    catch (e) { }
  }
  var p = document.getElementById("VideoPlayerDiv");
  if (p)
    p.remove();
}
function TouchPlayVideo() {
  var iframeWindow = GetIframeWindow(VideoIframeID);
  if (iframeWindow) {
    try { iframeWindow.TouchPlay(); }
    catch (e) { }
  }
}
function IsPlaying() {
  var iframeWindow = GetIframeWindow(VideoIframeID);
  if (iframeWindow) {
    try {
      if (iframeWindow["IsPlaying"])
        return iframeWindow.IsPlaying();
      else
        return false;
    }
    catch (e) { console.error(e); }
    // await delay(2);
  }
  return false;
}
function GetPlayingSec() {
  var iframeWindow = GetIframeWindow(VideoIframeID);
  if (iframeWindow) {
    try {
      if (iframeWindow["GetPlayingSec"])
        return iframeWindow.GetPlayingSec();
      else
        return 0;
    }
    catch (e) { console.error(e); }
  }
  return 0;
}
function SetMute(mute) {
  Mute = mute;
  var iframeWindow = GetIframeWindow(VideoIframeID);
  if (iframeWindow) {
    try { iframeWindow.SetMute(mute); }
    catch (e) { }
  }
}
function IsMuted() {
  return Mute;
}

function GetTCVideoIFrameString(id, url) {
  let timestamp = new Date().getTime();
  var src = './Video/TCVideoPlayer.html?url=' + url + "&v=" + timestamp;
  return '<iframe frameborder="0"' +
    'noresize="noresize"' +
    'id="' + id + '"' +
    'src="' + src + '"' +
    'frameborder="0">' +
    '</iframe>\n';
}
function GetWowzaVideoIFrameString(id, url, appName, streamingName) {
  let timestamp = new Date().getTime();
  var src = './Video/VideoPlayer.html?url=' + url + "&appName=" + appName + "&streamingName=" + streamingName + "&v=" + timestamp;
  return '<iframe frameborder="0"' +
    'noresize="noresize"' +
    'id="' + id + '"' +
    'src="' + src + '"' +
    'frameborder="0">' +
    '</iframe>\n';
}
var iFrameID_Precautions = "GamePrecautionsIframe";
function OpenGamePrecautions(url) {
  var info = GetGamePrecautionsIFrameString(iFrameID_Precautions, url);
  var p = GetDivElement("GamePrecautionsDiv");    //CSS套版
  if (p) {
    if (p.innerHTML != info)
      p.innerHTML = info;
  }
}
function GetGamePrecautionsIFrameString(id, url) {
  return '<iframe frameborder="0"' +
    'noresize="noresize"' +
    'id="' + id + '"' +
    'src="' + url + '"' +
    'frameborder="0">' +    //不顯示邊框
    '</iframe>\n';
}

var iFrameID_GameActivity = "GameActivityIframe";
function OpenGameActivity(url) {
  var info = GetGameActivityIframeString(iFrameID_GameActivity, url);
  var p = GetDivElement("GameActivityDiv");    //CSS套版
  if (p) {
    if (p.innerHTML != info)
      p.innerHTML = info;
  }
}
function GetGameActivityIframeString(id, url) {
  return '<iframe frameborder="0"' +
    'noresize="noresize"' +
    'id="' + id + '"' +
    'src="' + url + '"' +
    'frameborder="0">' +    //不顯示邊框
    '</iframe>\n';
}

var iFrameID_Banner = "BannerIframe";
function OpenBanner(url, closeCallback) {
  CloseBannerCallback = closeCallback;
  var info = GetBannerIFrameString(iFrameID_Banner, url);
  var p = GetDivElement("BannerDiv");    //CSS套版
  if (p) {
    if (p.innerHTML != info)
      p.innerHTML = info;
  }
}
var CloseBannerCallback;
function CloseBanner() {
  if (CloseBannerCallback)
    CloseBannerCallback();
}
function GetBannerIFrameString(id, url) {
  return '<iframe frameborder="0"' +
    'noresize="noresize"' +
    'id="' + id + '"' +
    'src="' + url + '"' +
    'frameborder="0">' +    //不顯示邊框
    '</iframe>\n';
}
//---------------- Video ----------------------
//---------------- 翻牌 ----------------------
var TurnCardIframeID = "TurnCardIframe";
/**插入 index.html */
function OpenTurnCard(index) {
  var info = GetTurnCardIFrameString(TurnCardIframeID);
  var p = GetDivElement("TurnCardDiv" + "_" + index);
  if (p) {
    if (p.innerHTML != info)
      p.innerHTML = info;

    p.style.transform = "rotate(90deg)";
  }
}
/**從 index.html 拔除 */
function CloseTurnCard(index) {
  var p = document.getElementById("TurnCardDiv" + "_" + index);
  if (p)
    p.remove();
}
function SetPokerActive(index, active) {
  var p = document.getElementById("TurnCardDiv" + "_" + index);
  if (p) {
    try {
      if (active)
        p.style.visibility = 'visible';
      else
        p.style.visibility = 'hidden';
    }
    catch (e) { console.error("Poker Error => " + e); }
  }
}
function DestroyTurnCard(index) {
  var p = document.getElementById("TurnCardDiv" + "_" + index);
  if (p && p.children) {
    try { p.children.TurnCardIframe.contentWindow.window.Destroy(); }
    catch (e) { console.error("Poker Error => " + e); }
  }
}
function SetPoker(index, pokerName, width, height, turningCallback) {
  var p = document.getElementById("TurnCardDiv" + "_" + index);
  if (p && p.children) {
    try {
      p.children.TurnCardIframe.contentWindow.window.SetPoker(pokerName, width, height, turningCallback);
      return true;
    }
    catch (e) {
      console.error("Poker Error => " + e);
      return false;
    }
  }
}
function UpdatePokerSize(index, width, height) {
  var p = document.getElementById("TurnCardDiv" + "_" + index);
  if (p && p.children) {
    try { p.children.TurnCardIframe.contentWindow.window.Size(width, height); }
    catch (e) { console.error("Poker Error => " + e); }
  }
}
function UpdateCornerSize(index, scale) {
  var p = document.getElementById("TurnCardDiv" + "_" + index);
  if (p && p.children) {
    try { p.children.TurnCardIframe.contentWindow.window.UpdateCornerSize(scale); }
    catch (e) { console.error("Corner Error => " + e); }
  }
}
function GetTurnCardIFrameString(id) {
  var src = './TurnCard/TurnCard.html';
  return '<iframe frameborder="0"' +
    'noresize="noresize"' +
    'id="' + id + '"' +
    'src="' + src + '"' +
    'frameborder="0">' +
    '</iframe>\n';
}
function SetDistanceCallback(index, callback) {
  var p = document.getElementById("TurnCardDiv" + "_" + index);
  if (p && p.children) {
    try { p.children.TurnCardIframe.contentWindow.window.DistanceCallback = callback; }
    catch (e) { console.error("Poker Error => " + e); }
  }
}
//---------------- 翻牌 ----------------------

function IsSideBoardActive() {
  return window.parent["IsSideBoardActive"];
}

var SideBoardCallback;
function RegisterSideBoardCallback(callback) {
  SideBoardCallback = callback;
}
function SetSideBoardActive(active, token) {
  var data = { Action: "SetSideBoardActive", Params: [active, token] };
  window.parent.postMessage(data, '*');

  if (SideBoardCallback)
    SideBoardCallback(active);
}

function RegisterOnGameWindowChange(callback) {
  if (window.parent && window.parent != window) {
    if (window.parent["RegisterOnGameWindowChange"])
      window.parent["RegisterOnGameWindowChange"](callback);
  }
}

function AddGameWindow(token, getOpenIndexCallback) {
  if (window.parent && window.parent != window) {
    window.parent.Token = token;
    return window.parent["AddGameWindow"](getOpenIndexCallback);
  }
  // var data = { Action: "AddGameWindow", Params: [token] };
  // window.parent.postMessage(data, '*');
}
function RemoveGameWindow() {
  if (RemoveTableID && OpenTableID > -1)
    RemoveTableID(OpenTableID);

  let url = new URL(window.location.href);
  var params = url.searchParams;
  var data = { Action: "RemoveGameWindow", Params: [params.get('wIndex')] };
  window.parent.postMessage(data, '*');
}
//目前開多桌的數量
function GetMultiTableCount() {
  if (window.parent && window.parent != window)
    return window.parent["GetDataCount"]();
  return 1;
}

var IsUnityApp = false;
var OnWindowUpdateUICallback;
function RegisterWindowUpdateUI(callback) {
  IsUnityApp = true;
  OnWindowUpdateUICallback = callback;
}
async function UpdateUI() {
  // console.log("------------ Update UI");
  await delay(1);

  let curCount = GetMultiTableCount();
  // console.log("Window Count = " + curCount);
  if (curCount > 1)
    SetCloseWindowBtnActive(true);
  else
    SetCloseWindowBtnActive(false);
}

function SetCloseWindowBtnActive(active) {
  let ele = document.getElementById("CloseWindowBtn");
  if (ele) {
    if (active) ele.style.display = "block";
    else ele.style.display = "none";
  }

  if (OnWindowUpdateUICallback) {
    // console.error("------ Send Close Window Active : " + active);
    OnWindowUpdateUICallback("UpdateCloseWindowBtnActive", active);
  }
}

//重新載入頁面
function ReloadPage() {
  if (window.parent && window.parent != window)
    window.parent["ReloadPage"]();
  else
    location.reload(true);
}


function GetLobbyLoginData() {
  if (window.parent && window.parent != window) {
    if (window.parent["GetLobbyLoginData"]) {
      let data = window.parent["GetLobbyLoginData"]()
      // console.log("Get LobbyLoginData : " + data);
      return data;
    }
  }
  return null;
}
function SetLobbyLoginData(data) {
  if (window.parent && window.parent != window) {
    if (window.parent["SetLobbyLoginData"]) {
      // console.log("Set LobbyLoginData : " + data);
      window.parent["SetLobbyLoginData"](data);
    }
  }
}
function SetConnectIDExpire(windowIndex, curSocketConnectID) {
  if (window.parent && window.parent != window) {
    if (window.parent["SetConnectIDExpire"])
      window.parent["SetConnectIDExpire"](windowIndex, curSocketConnectID);
  }
}

function OpenURL(url, openType = "_blank") {
  if (window.parent && window.parent != window) {
    if (window.parent["OpenURL"])
      window.parent["OpenURL"](url, openType);
  }
  else {
    window.open(url, openType);
  }
}


var GlobalCallbacks = [];
function RegisterBroadcastCallback(windowIndex, callback) {
  if (window.parent && window.parent != window) {
    if (window.parent["RegisterBroadcastCallback"])
      window.parent["RegisterBroadcastCallback"](windowIndex, callback);

    GlobalCallbacks[windowIndex] = callback;
  }
  else    //手機
  {
    GlobalCallbacks[windowIndex] = callback;
  }
}

function PostActionToParentWindow(action, ...params) {
  if (window.parent && window.parent != window) {
    let url = new URL(window.location.href);
    let pData = [];
    for (var i = 0; i < params.length; i++) {
      pData.push(params[i]);
    }
    let data = { Action: action, Params: pData };
    window.parent.postMessage(data, '*');
    return true;
  }
  return false;
}

function Logout() { ExeTS("Logout"); }
function ClearStorage() { ExeTS("ClearStorage"); }
function ExeTS(action, ...params) {
  // console.log(`ExeTS : ${action}`);
  for (var i = 0; i < GlobalCallbacks.length; i++) {
    if (GlobalCallbacks[i])
      GlobalCallbacks[i](action, ...params);
  }
}

function RemoveUrlParam(key) {
  var url = window.location.href;
  var updatedUrl = RemoveWebsiteUrlParam(url, key);
  window.history.replaceState(null, null, updatedUrl);

  if (window.parent && window.parent != window) {
    if (window.parent["RemoveUrlParam"])
      window.parent["RemoveUrlParam"](key);
  }
}
function RemoveWebsiteUrlParam(url, paramKey) {
  if (url) {
    var result = url.split("?")[0],
      param,
      params_arr = [],
      queryString = (url.indexOf("?") !== -1) ? url.split("?")[1] : "";
    if (queryString !== "") {
      params_arr = queryString.split("&");
      for (var i = params_arr.length - 1; i >= 0; i -= 1) {
        param = params_arr[i].split("=")[0];
        if (param === paramKey) {
          params_arr.splice(i, 1);
        }
      }
      if (params_arr.length) result = result + "?" + params_arr.join("&");
    }
    return result;
  }
  return url;
}

async function GetImageBitmapData(url, callback, errorCallback) {
  try {
    const response = await fetch(url); // Fetch the image data
    const blob = await response.blob(); // Convert the response to a Blob
    const imageBitmap = await createImageBitmap(blob); // Convert the Blob to an ImageBitmap
    callback(imageBitmap);
  } catch (error) {
    // console.error('Error:', error);
    errorCallback(error);
  }
}
