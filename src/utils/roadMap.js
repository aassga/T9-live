export function getRoadArray(roadData) {
  return convertToBigRoad(roadData);
}

export function convertToBigRoad(scores) {
  var sc = scores.split(',');
  var result = initBoard(6, sc.length);
  var columnIndex = 0;
  var rowIndex = 0;
  var last = "";
  var bp = false;
  var pp = false;
  var current = "";
  var tieCount = 0;
  for (var i = 0; i < sc.length; i++) {
    if (result.length <= rowIndex || result[rowIndex].length <= columnIndex)
      break;
    bp = false;
    pp = false;
    current = (Number(sc[i]) % 100).toString();
    switch (current) {
      case "5":
        bp = true;
        current = "1";
        break;
      case "6":
        bp = true;
        current = "2";
        break;
      case "7":
        bp = true;
        current = "3";
        break;
      case "9":
        pp = true;
        current = "1";
        break;
      case "10":
        pp = true;
        current = "2";
        break;
      case "11":
        pp = true;
        current = "3";
        break;
      case "13":
        bp = true;
        pp = true;
        current = "1";
        break;
      case "14":
        bp = true;
        pp = true;
        current = "2";
        break;
      case "15":
        bp = true;
        pp = true;
        current = "3";
        break;
      default:
        break;
    }

    if (current === last) {     //是否跟上一個一樣(莊閒和)
      if (current !== "3") {  //且不是 和
        if (rowIndex < 5) { //小於5格
          var rowDataN = result[rowIndex + 1];
          var rowDataB = "";
          if (rowIndex > 0)
            rowDataB = result[rowIndex - 1];
          if ((rowDataN[columnIndex] === "") && (rowDataB[columnIndex] !== "")) {  //下面格子是空的可以寫 且 上面格子不行為空(沒出現長龍)
            rowIndex++; //繼續往下面格子畫
          }
          else if (rowIndex == 0) //在第一排(不須檢查長龍)
          {
            rowIndex++;
          }
          else {
            columnIndex++;
          }
        } else {
          columnIndex++;
        }
      }
    }

    if (current !== last && last !== "") {  //是否跟上一個不同(莊閒和)
      if (current !== "3") {              //且不是 和
        var lastResult = result[rowIndex][columnIndex].split('_');
        if (lastResult[0] === current) {//?? 現在的跟最後一個
          if (rowIndex < 5) {         //小於格數繼續寫
            var rowDataN = result[rowIndex + 1];
            var rowDataB = "";
            if (rowIndex > 0)
              rowDataB = result[rowIndex - 1];
            if ((rowDataN[columnIndex] === "") && (rowDataB[columnIndex] !== "")) //下面格子是空的可以寫 且 上面格子不行為空(沒出現長龍)
            {
              rowIndex++;
            }
            else {
              columnIndex++;
            }
          } else {                    //大於格數換行
            columnIndex++;
          }
        }
        else {
          for (var index = 0; index < result[0].length; index++) {
            if (result[0][index] === "") {
              columnIndex = index;
              break;
            }
          }
          rowIndex = 0;
        }
        tieCount = 0;
      }
    }

    var pairStatus = "0";
    switch (current) {
      case "1":
        if (bp) {
          pairStatus = "1";
        }
        if (pp) {
          pairStatus = "2";
        }
        if (bp && pp) {
          pairStatus = "3";
        }
        var rowResult1 = result[rowIndex];
        rowResult1[columnIndex] = "1_" + pairStatus + "_" + tieCount;

        break;
      case "2":
        if (bp) {
          pairStatus = "1";
        }
        if (pp) {
          pairStatus = "2";
        }
        if (bp && pp) {
          pairStatus = "3";
        }
        var rowResult2 = result[rowIndex];
        if (rowResult2 && rowResult2.length > columnIndex)
          rowResult2[columnIndex] = "2_" + pairStatus + "_" + tieCount;

        break;
      case "3":
        if (last === "") {
          result[rowIndex][columnIndex] = "3_0_0";
          break;
        }
        var temp = result[rowIndex][columnIndex].split('_');
        tieCount++;
        var rowResult3 = result[rowIndex];
        rowResult3[columnIndex] = temp[0] + "_" + temp[1] + "_" + tieCount;
        break;
      default:
        break;
    }
    last = current;
  }

  return result;
}

export function initBoard(rowCount, colCount) {
  var result = [];
  for (var i = 0; i < rowCount; i++) {
    result[i] = [];
    for (var j = 0; j < colCount; j++) {
      result[i][j] = "";
    }
  }
  return result;
}

//好路推薦
export function GoodRoadRecommendedOrder(scores) {

  var replaceArray = ['5', '6', '7', '9', '10', '11', '13', '14', '15'];
  for (var i = 0; i < replaceArray.length; i++) {
    var replaceItem = replaceArray[i];
    switch (replaceItem) {
      case '5':
      case '9':
      case '13':
        scores = scores.replace(new RegExp(replaceItem, "g"), '1');
        break;
      case '6':
      case '10':
      case '14':
        scores = scores.replace(new RegExp(replaceItem, "g"), '2');
        break;
      case '7':
      case '11':
      case '15':
        scores = scores.replace(new RegExp(replaceItem, "g"), '3');
        break;
      default:
        break;
    }
  }
  scores = scores.replace(new RegExp("3", "g"), '');
  scores = scores.replace(new RegExp(",", "g"), '');

  var isGoodRoad = 0;

  //長莊
  if (new RegExp("11$").test(scores))
    isGoodRoad = 1;

  //長閒
  if (new RegExp("22$").test(scores))
    isGoodRoad = 1;

  //長和
  if (new RegExp("33$").test(scores))
    isGoodRoad = 1;

  // //長莊
  // if (new RegExp("1111$").test(scores))
  //     isGoodRoad = 2;

  // //長閒
  // if (new RegExp("2222$").test(scores))
  //     isGoodRoad = 2;

  // //一房兩聽(莊)
  // if (new RegExp("122122$").test(scores))
  //     isGoodRoad = 5;

  // //一房兩聽(閒)
  // if (new RegExp("211211$").test(scores))
  //     isGoodRoad = 5;

  // //逢莊黐
  // if (new RegExp("11112112$").test(scores))
  //     isGoodRoad = 5;

  // //逢閒黐
  // if (new RegExp("221222211$").test(scores))
  //     isGoodRoad = 5;

  // //逢莊黐
  // if (new RegExp("12+1{2,}2+12+1{2,}$").test(scores))
  //     isGoodRoad = 5;

  // //逢閒黐
  // if (new RegExp("21+2{2,}1+21+2{2,}$").test(scores))
  //     isGoodRoad = 5;

  // //大路單跳
  // if (new RegExp("1212$").test(scores) || new RegExp("2121$").test(scores))
  //     isGoodRoad = 5;

  // //拍拍黐
  // if (new RegExp("1{2,}2221{2,}$").test(scores) || new RegExp("2{2,}1112{2,}$").test(scores))
  //     isGoodRoad = 6;

  return isGoodRoad;
}
