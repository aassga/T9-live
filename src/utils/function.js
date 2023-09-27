
function ForceReloadJS(src) {
  var currentDate = (new Date()).getTime();
  var element = document.createElement("script");
  element.type = "text/javascript";
  element.src = src + "?t=" + currentDate;
  document.body.appendChild(element);
}

function ForceReloadCSS(src) {
  var currentDate = (new Date()).getTime();
  var element = document.createElement("link");
  element.setAttribute("rel", "stylesheet");
  element.setAttribute("type", "text/css");
  element.setAttribute("href", (src + "?t=" + currentDate));
  document.getElementsByTagName("head")[0].appendChild(element);
}

function GetUrlParamValue(key) {
  if (window.location) {
    var search = location.search;
    if (!search || search == "") {
      return "";
    }
    if (search.length > 1) {
      search = search.slice(1);
      var searchArr = search.split("&");
      var length_1 = searchArr.length;
      for (var i = 0; i < length_1; i++) {
        var str = searchArr[i];
        if (str) {
          var arr = str.split("=");
          if (arr[0] == key && arr.length > 1) {
            return arr[1];
          }
        }
      }
    }
  }
  return "";
}

function MatchParam(key, paramValue) {
  let value = GetUrlParamValue(key);
  return (value && value.toLowerCase() == paramValue.toLowerCase());
}