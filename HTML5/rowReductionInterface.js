var emptyMatrix = new Matrix("fillInMatrix", 2, 3);

var selectNumRows = document.getElementById("selectNumRows_ComboBox");
var selectNumCols = document.getElementById("selectNumCols_ComboBox");
var rc = [2,3];
var placeholders = ["row", "column"];
var elems = [selectNumRows, selectNumCols];
for (var i=0; i<2; i++) {
  var elem = elems[i];
  var option = document.createElement('option');
  option.text = placeholders[i];
  elem.appendChild(option);
  for (var j=2; j<6; j++) {
    option = document.createElement('option');
    option.value = ''+j;
    option.text = ''+j;
    elem.appendChild(option);
  }
  elem.value = ''+rc[i];       // need jess to force update of matrices somehow...
}

var matrix = new Matrix("rowReduceMatrix", Matrix.rows(emptyMatrix), Matrix.cols(emptyMatrix));
dragAndDrop("#rowReduceMatrix.matrix.column")
var parent = matrix.matrix.parentNode;

parent.style.top = '20px';
parent.style.left = '30px';
parent.style.width = ''+ (Matrix.width(matrix)+350) +'px';
parent.style.height = ''+ Math.max((Matrix.height(matrix)+50), 300) +'px';

var interface = document.createElement('div');
interface.style.position = 'absolute';
interface.style.top = '0px';
console.log("Matrix.width+50: " + (Matrix.width(matrix)+50));
interface.style.left = ''+Math.max((Matrix.width(matrix)+50), 300)+'px';
interface.style.width = '300px';
interface.style.height = ''+Matrix.height(matrix)+'px';
console.log("Matrix.height: " + Matrix.height(matrix));
interface.style.outline = '2px solid black';
interface.setAttribute('id', 'interface');
interface.setAttribute('class', 'container');

form = document.createElement('form');
selectRowOpLabel = document.createElement('label');
selectRowOpLabel.style.position = 'absolute';
selectRowOpLabel.style.top = '8px';
selectRowOpLabel.style.left = '40px';
selectRowOpLabel.style.width = '100px';
selectRowOpLabel.style.height = '22px';
selectRowOpLabel.textContent = 'row operation';
form.appendChild(selectRowOpLabel);
selectRowOp = document.createElement('div');
selectRowOp.style.position = 'absolute';
selectRowOp.style.top = '10px';
selectRowOp.style.left = '138px';
selectRowOp.style.width = '160px';
selectRowOp.style.display = 'inline-block';
selectRowOp.setAttribute('id', 'selectRowOperation_ComboBox');
selectRowOp.setAttribute('class', 'CTATComboBox');

var value = ["0", "1", "2"]; // href or something??
var i_ = String.fromCharCode(8320+1);
var j_ = String.fromCharCode(8320+2);
//var text = ["k*row\uᵢ", "row\uᵢ <-> row\uⱼ", "row\uᵢ = row\uᵢ + k*row\uⱼ"];
var text = ["k*row"+i_, "row"+i_ +"<-> row"+j_, "row"+i_ +"= row"+i_ +"+ k*row"+j_];

// function show(i) {
//   var ids_ = ["multipleOfRow", "rowInterchange", "addMultipleOfAnotherRowToRow"];
//   for (var j=0; j<3; j++) {
//     var elem = document.getElementById(ids_[j]);
//     if (elem) {
//       if (j != i) {
//         elem.style.visibility = 'hidden';
//         children = elem.childNodes;
//         for (var k=0; k<children.length; k++) {
//           children[k].style.visibility = 'hidden';
//         }
//       }
//       else {
//         elem.style.visibility = 'visible';
//         children = elem.childNodes;
//         for (var k=0; k<children.length; k++) {
//           children[k].style.visibility = 'visible';
//         }
//       }
//     }
//   }
// }
// function updateShow(value) {
//   console.log("updateShow(value: " + value + ")");
//   switch(value) {
//     case "0":
//       console.log("option 0");
//       show(0);
//       this.textContent = text[0];
//       break;
//     case "1":
//       console.log("option 1");
//       show(1);
//       this.textContent = text[1];
//       break;
//     case "2":
//       console.log("option 2");
//       show(2);
//       this.textContent = text[2];
//       break;
//   }
// }

for (var i=0; i<3; i++) {
  var option = document.createElement('option');
  option.value = value[i]; // href or something??
  option.text = text[i];
  selectRowOp.appendChild(option);
}
form.appendChild(selectRowOp);

var multipleOfRow = document.createElement('div');
multipleOfRow.style.position = 'absolute';
multipleOfRow.style.top = '33px';
multipleOfRow.style.left = '50px';
multipleOfRow.style.width = '250px';
multipleOfRow.style.height = '' +(Matrix.height(matrix)-33)+'px';
multipleOfRow.style.display = 'inline-block';
multipleOfRow.style.visibility = 'visible';
// multipleOfRow.style.background = 'red';
multipleOfRow.setAttribute('id', 'multipleOfRow');
multipleOfRow.setAttribute('class', 'container');

var multiple = document.createElement('div');
multiple.style.position = 'absolute';
multiple.style.display = 'inline-block';
multiple.style.top = '11px';
multiple.style.left = '88px';
multiple.style.width = '22px';
multiple.style.height = '22px';
multiple.setAttribute('id', 'multipleOfRow_multiple_CTATTextInput');
multiple.setAttribute('class', 'CTATTextInput');
multipleOfRow.appendChild(multiple);

var row = document.createElement('div');
row.style.position = 'absolute';
row.style.display = 'inline-block';
row.style.top = '10px';
row.style.left = '110px';
row.style.width = '100px';
row.style.height = '22px';
row.setAttribute('id', 'multipleOfRow_row_CTATComboBox');
row.setAttribute('class', 'CTATComboBox');
for (var i=0; i<Matrix.rows(matrix); i++) {
  var option = document.createElement('option');
  option.text = ''+(i+1);
  option.value = i;
  option.setAttribute('class', 'option');
  row.appendChild(option);
}
multipleOfRow.appendChild(row);

form.appendChild(multipleOfRow);

var rowInterchange = document.createElement('div');
rowInterchange.style.position = 'absolute';
rowInterchange.style.top = '33px';
rowInterchange.style.left = '50px';
rowInterchange.style.width = '250px';
rowInterchange.style.height = '' +(Matrix.height(matrix)-33)+'px';
rowInterchange.style.display = 'inline-block';
rowInterchange.style.visibility = 'hidden';
// rowInterchange.style.background = 'green';
rowInterchange.setAttribute('id', 'rowInterchange');
rowInterchange.setAttribute('class', 'container');

var rowA = document.createElement('div');
rowA.style.position = 'absolute';
rowA.style.top = '10px';
rowA.style.left = '110px';
rowA.style.width = '100px';
rowA.style.height = '22px';
rowA.setAttribute('id', 'rowInterchange_rowA_CTATComboBox');
rowA.setAttribute('class', 'CTATComboBox');
for (var i=0; i<Matrix.rows(matrix); i++) {
  var option = document.createElement('option');
  option.text = ''+(i+1);
  option.value = i;
  option.setAttribute('class', 'option');
  rowA.appendChild(option);
}
rowInterchange.appendChild(rowA);

var rowB = document.createElement('div');
rowB.style.position = 'absolute';
rowB.style.top = '42px';
rowB.style.left = '110px';
rowB.style.width = '100px';
rowB.style.height = '22px';
rowB.setAttribute('id', 'rowInterchange_rowB_CTATComboBox');
rowB.setAttribute('class', 'CTATComboBox');
for (var i=0; i<Matrix.rows(matrix); i++) {
  var option = document.createElement('option');
  option.text = ''+(i+1);
  option.value = i;
  option.setAttribute('class', 'option');
  rowB.appendChild(option);
}
rowInterchange.appendChild(rowB);

form.appendChild(rowInterchange);

var addMultipleOfAnotherRowToRow = document.createElement('div');
addMultipleOfAnotherRowToRow.style.position = 'absolute';
addMultipleOfAnotherRowToRow.style.top = '33px';
addMultipleOfAnotherRowToRow.style.left = '50px';
addMultipleOfAnotherRowToRow.style.width = '250px';
addMultipleOfAnotherRowToRow.style.height = '' +(Matrix.height(matrix)-33)+'px';
addMultipleOfAnotherRowToRow.style.display = 'inline-block';
addMultipleOfAnotherRowToRow.style.visibility = 'hidden';
// addMultipleOfAnotherRowToRow.style.background = 'blue';
addMultipleOfAnotherRowToRow.setAttribute('id', 'addMultipleOfAnotherRowToRow');
addMultipleOfAnotherRowToRow.setAttribute('class', 'container');

var rowA = document.createElement('div');
rowA.style.position = 'absolute';
rowA.style.top = '10px';
rowA.style.left = '110px';
rowA.style.width = '100px';
rowA.style.height - '22px';
rowA.setAttribute('id', 'addMultipleOfAnotherRowToRow_rowA_CTATComboBox');
rowA.setAttribute('class', 'CTATComboBox');
for (var i=0; i<Matrix.rows(matrix); i++) {
  var option = document.createElement('option');
  option.text = ''+(i+1);
  option.value = i;
  option.setAttribute('class', 'option');
  rowA.appendChild(option);
}
addMultipleOfAnotherRowToRow.appendChild(rowA);

rowBLabel = document.createElement('label');
rowBLabel.style.position = 'absolute';
rowBLabel.style.top = '40px';
rowBLabel.style.left = '66px';
rowBLabel.style.width = '22px';
rowBLabel.style.height = '22px';
rowBLabel.textContent = '+';
addMultipleOfAnotherRowToRow.appendChild(rowBLabel);

var multiple = document.createElement('div');
multiple.style.position = 'absolute';
multiple.style.top = '43px';
multiple.style.left = '88px';
multiple.style.width = '22px';
multiple.style.height = '22px';
multiple.setAttribute('id', 'addMultipleOfAnotherRowToRow_multiple_CTATTextInput');
multiple.setAttribute('class', 'CTATTextInput');
addMultipleOfAnotherRowToRow.appendChild(multiple);

var rowB = document.createElement('div');
rowB.style.position = 'absolute';
rowB.style.top = '42px';
rowB.style.left = '110px';
rowB.style.width = '100px';
rowB.style.height = '22px';
rowB.setAttribute('id', 'addMultipleOfAnotherRowToRow_rowB_CTATComboBox');
rowB.setAttribute('class', 'CTATComboBox');
for (var i=0; i<Matrix.rows(matrix); i++) {
  var option = document.createElement('option');
  option.text = ''+(i+1);
  option.value = i;
  option.setAttribute('class', 'option');
  rowB.appendChild(option);
}
addMultipleOfAnotherRowToRow.appendChild(rowB);

form.appendChild(addMultipleOfAnotherRowToRow);




interface.appendChild(form);

parent.appendChild(interface);

// function fx(e)
// {
//  var k=String.fromCharCode(e.which);
//
//  if(k.match(/\d/))
//  {
//    var r=String.fromCharCode(8320+Number(k));
//    try{//IE
//          document.selection.createRange().text=r;
//         }
//      catch(x)
//      {//others
//        var o         = e.target
//        var intStart  = o.selectionStart;
//        var intEnd    = o.selectionEnd;
//        o.value = (o.value).substring(0, intStart) + r + (o.value).substring(intEnd, o.value.length);
//                    o.selectionStart=o.selectionEnd=intStart+r.length;
//                    o.focus();
//      }
//      return false;
//  }
//  return true;
// }
//
//
// $('input').keypress(fx);
