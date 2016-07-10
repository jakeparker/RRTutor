'use strict';

class Table {
  constructor(rows, cols) {
    this.rows = rows;
    this.cols = cols;
    this.data = [];
    for (var i=0; i<this.rows; i++) {
      var row = [];
      for (var j=0; j<this.cols; j++) {
        row.push(null);
      }
      this.data.push(row);
    }
  }
  static rows(table) {
    return table.rows;
  }
  static cols(table) {
    return table.cols;
  }
  static appendElem(table, row, col, elem) {
    table.data[row][col] = elem;
  }
  static removeElem(table, row, col) {
    table.data[row][col] = null;
  }
  static appendRow(table, row) {
    var tableRow = [];
    for (var i=0; i<table.cols; i++) {
      tableRow.push(null);
    }
    for (var j=0; j<row.length; j++) {
      tableRow[j] = row[j];
    }
    table.data.push(tableRow);
  }
  static getCell(table, i, j) {
    return table.data[i][j].slice(0);
  }
  static getRow(table, i) {
    return table.data[i].slice(0);
  }
  static getCol(table, j) {
    var col;
    for (var i=0; i<table.rows; i++) {
      col.push(table.data[i][j]);
    }
    return col;
  }
  static vectorAddition(table, a, b) {
    var A = table.data[a];
    var B = table.data[b];
    var sum = [];
    for (var j=0; j<table.cols; j++) {
      sum.push(A[j] + B[j]);
    }
    return sum;
  }
  static scalarMultiplication(table, a, k) {
    var A = table.data[a];
    var product = [];
    for (var j=0; j<table.cols; j++) {
      product.push(k * A[j]);
    }
    return product;
  }
  static rowInterchange(table, a, b) {
    var row = table.data[a].slice(0);
    table.data[a] = table.data[b].slice(0);
    table.data[b] = row;
  }
  static multipleOfRow(table, a, k) {
    for (var j=0; j<table.cols; j++) {
      table.data[a][j] = k * table.data[a][j];
    }
  }
  static addRows(table, a, b) {
    for (var j=0; j<table.cols; j++) {
      table.data[a][j] += table.data[b][j];
    }
  }
  static addMultipleOfAnotherRowToRow(table, a, b, k) {
    var product = Table.scalarMultiplication(table, b, k);
    for (var j=0; j<table.cols; j++) {
      table.data[a][j] += product[j];
    }
  }
  static reset(table, n, m) {
    table.data = [];
    for (var i=0; i<table.rows; i++) {
      var row = [];
      for (var j=0; j<table.cols; j++) {
        row.push(null);
      }
      table.data.push(row);
    }
  }
}

class Matrix {
  constructor(parentId, rows, cols) {
    this.parent = document.getElementById(parentId);
    this.cellSpacing = 35;
    this.rowSpacing = 17;
    this.horzSpacing = 18;
    this.vertSpacing = 8.5;
    this.cellWidth = 23;
    this.cellHeight = 23;
    this.init(rows, cols);

  }
  init(rows, cells) {
    this.rows = rows;
    this.cells = cells;
    this.rowWidth =  this.cells*this.cellWidth + ( this.cells-1)*this.cellSpacing;
    this.tableWidth =  this.rowWidth;
    this.rowHeight =  this.cellHeight;
    this.tableHeight =  this.rows*this.rowHeight + (this.rows-1)*this.rowSpacing;
    this.matrixWidth =  this.tableWidth + 2*this.horzSpacing;
    this.matrixHeight =  this.tableHeight + 2*this.vertSpacing;
    this.data = [];

    this.matrix = document.createElement('div');
    this.element = this.matrix;
    this.matrix.style.position = 'absolute';
    this.matrix.style.top = '0px';
    this.matrix.style.left = '0px';
    this.matrix.style.width = ''+this.matrixWidth+'px';
    this.matrix.style.height = ''+this.matrixHeight+'px';
    this.matrix.setAttribute('id', 'matrix');
    this.matrix.setAttribute('class', 'container');

    var x = 0;
    var y = 0;
    var leftBracket = document.createElement('div');
    leftBracket.style.position = 'absolute';
    leftBracket.style.top = '0px';
    leftBracket.style.left = '0px';
    leftBracket.style.width = '8.5px';
    leftBracket.style.height = ''+this.matrixHeight+'px';
    leftBracket.setAttribute('id', 'leftBracket');
    leftBracket.setAttribute('class', 'container');

    var midBracket = document.createElement('div');
    midBracket.style.position = 'absolute';
    midBracket.style.top = 'px';
    var left = x+(this.cells-1)*this.cellWidth + (this.cells-2)*this.cellSpacing + this.cellSpacing;
    midBracket.style.left = ''+left+'px';
    midBracket.style.width = '2px';
    midBracket.style.height = ''+this.matrixHeight+'px';
    midBracket.setAttribute('id', 'midBracket');
    midBracket.setAttribute('class', 'container');

    var rightBracket = document.createElement('div');
    rightBracket.style.position = 'absolute';
    rightBracket.style.top = '0px';
    rightBracket.style.left = ''+(this.matrixWidth-8.5)+'px';
    rightBracket.style.width = '8.5px';
    rightBracket.style.height = ''+this.matrixHeight+'px';
    rightBracket.setAttribute('id', 'rightBracket');
    rightBracket.setAttribute('class', 'container');

    var leftBracketTop = document.createElement('div');
    leftBracketTop.style.position = 'absolute';
    leftBracketTop.style.top = '0px';
    leftBracketTop.style.left = '0px';
    leftBracketTop.style.width = '8.5px';
    leftBracketTop.style.height = '8.5px';
    leftBracketTop.style.background = 'url(media/svg/leftBracketTop.svg)';
    leftBracketTop.setAttribute('id', 'leftBracketTop');
    leftBracket.appendChild(leftBracketTop);

    var midBracketTop = document.createElement('div');
    midBracketTop.style.position = 'absolute';
    midBracketTop.style.top = '0px';
    midBracketTop.style.left = '0px';
    midBracketTop.style.width = '2px';
    midBracketTop.style.height = '8.5px';
    midBracketTop.style.background = 'url(media/svg/midBracketEnd.svg)';
    midBracketTop.setAttribute('id', 'midBracketTop');
    midBracket.appendChild(midBracketTop);

    var rightBracketTop = document.createElement('div');
    rightBracketTop.style.position = 'absolute';
    rightBracketTop.style.top = '0px';
    rightBracketTop.style.left = '0px';
    rightBracketTop.style.width = '8.5px';
    rightBracketTop.style.height = '8.5px';
    rightBracketTop.style.background = 'url(media/svg/rightBracketTop.svg)';
    rightBracketTop.setAttribute('id', 'rightBracketTop');
    rightBracket.appendChild(rightBracketTop);
    x = 0;
    y = 8.5;
    for (var i=0; i <this.rows; i++) {
      var cellBracket = document.createElement('div');
      cellBracket.style.position = 'absolute';
      cellBracket.style.top = ''+y+'px';
      cellBracket.style.left = ''+x+'px';
      cellBracket.style.width = '2px';
      cellBracket.style.height = '23px';
      cellBracket.style.background = 'url(media/svg/cellBracket.svg)';
      cellBracket.setAttribute('id', 'cellBracket');
      leftBracket.appendChild(cellBracket);
      var cellBracket = document.createElement('div');
      cellBracket.style.position = 'absolute';
      cellBracket.style.top = ''+y+'px';
      cellBracket.style.left = ''+x+'px';
      cellBracket.style.width = '2px';
      cellBracket.style.height = '23px';
      cellBracket.style.background = 'url(media/svg/cellBracket.svg)';
      cellBracket.setAttribute('id', 'cellBracket');
      midBracket.appendChild(cellBracket);
      var cellBracket = document.createElement('div');
      cellBracket.style.position = 'absolute';
      cellBracket.style.top = ''+y+'px';
      cellBracket.style.left = ''+(x+6.5)+'px';
      cellBracket.style.width = '2px';
      cellBracket.style.height = '23px';
      cellBracket.style.background = 'url(media/svg/cellBracket.svg)';
      cellBracket.setAttribute('id', 'cellBracket');
      rightBracket.appendChild(cellBracket);
      y = y + 23;
      if (i < (this.rows-1)) {
        var spacingBracket = document.createElement('div');
        spacingBracket.style.position = 'absolute';
        spacingBracket.style.top = ''+y+'px';
        spacingBracket.style.left = ''+x+'px';
        spacingBracket.style.width = '2px';
        spacingBracket.style.height = '17px';
        spacingBracket.style.background = 'url(media/svg/spacingBracket.svg)';
        spacingBracket.setAttribute('id', 'spacingBracket');
        leftBracket.appendChild(spacingBracket);
        var spacingBracket = document.createElement('div');
        spacingBracket.style.position = 'absolute';
        spacingBracket.style.top = ''+y+'px';
        spacingBracket.style.left = ''+x+'px';
        spacingBracket.style.width = '2px';
        spacingBracket.style.height = '17px';
        spacingBracket.style.background = 'url(media/svg/spacingBracket.svg)';
        spacingBracket.setAttribute('id', 'spacingBracket');
        midBracket.appendChild(spacingBracket);
        var spacingBracket = document.createElement('div');
        spacingBracket.style.position = 'absolute';
        spacingBracket.style.top = ''+y+'px';
        spacingBracket.style.left = ''+(x+6.5)+'px';
        spacingBracket.style.width = '2px';
        spacingBracket.style.height = '17px';
        spacingBracket.style.background = 'url(media/svg/spacingBracket.svg)';
        spacingBracket.setAttribute('id', 'spacingBracket');
        rightBracket.appendChild(spacingBracket);
        y = y + 17;
      }
    }
    var leftBracketBottom = document.createElement('div');
    leftBracketBottom.style.position = 'absolute';
    leftBracketBottom.style.top = ''+y+'px';
    leftBracketBottom.style.left = ''+x+'px';
    leftBracketBottom.style.width = '8.5px';
    leftBracketBottom.style.height = '8.5px';
    leftBracketBottom.style.background = 'url(media/svg/leftBracketBottom.svg)';
    leftBracketBottom.setAttribute('id', 'leftBracketBottom');
    leftBracket.appendChild(leftBracketBottom);
    this.matrix.appendChild(leftBracket);

    var midBracketBottom = document.createElement('div');
    midBracketBottom.style.position = 'absolute';
    midBracketBottom.style.top = ''+y+'px';
    midBracketBottom.style.left = ''+x+'px';
    midBracketBottom.style.width = '2px';
    midBracketBottom.style.height = '8.5px';
    midBracketBottom.style.background = 'url(media/svg/midBracketEnd.svg)';
    midBracketBottom.setAttribute('id', 'midBracketBottom');
    midBracket.appendChild(midBracketBottom);
    this.matrix.appendChild(midBracket);

    var rightBracketBottom = document.createElement('div');
    rightBracketBottom.style.position = 'absolute';
    rightBracketBottom.style.top = ''+y+'px';
    rightBracketBottom.style.left = ''+x+'px';
    rightBracketBottom.style.width = '8.5px';
    rightBracketBottom.style.height = '8.5px';
    rightBracketBottom.style.background = 'url(media/svg/rightBracketBottom.svg)';
    rightBracketBottom.setAttribute('id', 'rightBracketBottom');
    rightBracket.appendChild(rightBracketBottom);
    this.matrix.appendChild(rightBracket);

    y = this.vertSpacing;
    for (var i=0; i<this.rows; i++) {
      x = this.horzSpacing;
      var row = document.createElement('div');
      row.style.position = 'absolute';
      row.style.top = ''+y+'px';
      row.style.left = ''+x+'px';
      row.style.width = ''+this.rowWidth+'px';   ///
      row.style.height = ''+this.rowHeight+'px'; ///
      row.setAttribute('id', 'r'+(i+1));
      row.setAttribute('class', 'column');
      var dataRow = [];
      for (var j=0; j<this.cells; j++) {
        var cell = document.createElement('div');
        cell.style.position = 'absolute';
        cell.style.display = 'inline-block';
        cell.style.top = '0px';
        cell.style.left = ''+(this.cellWidth*j + this.cellSpacing*(j))+'px';
        cell.style.width = ''+this.cellWidth+'px';
        cell.style.height = ''+this.cellHeight+'px';
        cell.style.background = 'url(media/svg/cell.svg)';
        cell.setAttribute('id', ''+i+':'+j+'_TextField')
        cell.setAttribute('class', 'CTATTextField');
        cell.setAttribute('data-ctat-tutor', 'false');
        cell.setAttribute('data-ctat-value', ''+(i+1)+''+(j+1));
        dataRow.push(cell);
        row.appendChild(cell);
        if (j<this.cells-1) {
          var spacing = document.createElement('div');
          spacing.style.position = 'absolute';
          spacing.style.top = '0px';;
          spacing.style.left = ''+((j+1)*this.cellWidth + j*this.cellSpacing)+'px';
          spacing.style.width = '35px';
          spacing.style.height = '23px';
          spacing.style.background = 'url(media/svg/spacing.svg)';
          spacing.setAttribute('id', 's'+(j+1));
          row.appendChild(spacing);
        }
        x = x + this.cellWidth + this.cellSpacing;
      }
      this.data.push(dataRow);
      this.matrix.appendChild(row);
      y = y + this.rowHeight + this.rowSpacing;
    }
    this.parent.appendChild( this.matrix);
  }
  static rows(matrix) {
    return matrix.rows;
  }
  static cols(matrix) {
    return matrix.cells;
  }
  static width(matrix) {
    return matrix.matrixWidth;
  }
  static height(matrix) {
    return matrix.matrixHeight;
  }
  static updateCell(matrix, i, j, elem) {
    // cell.span.textContent
    matrix.data[i][j].textContent = ''+elem;
  }
  static update(matrix, table) {
    assert(matrix.rows == table.rows);
    assert(matrix.cells == table.cols);

    for (i=0; i<table.rows; i++) {
      for (j=0; j<table.cols; j++) {
        var cell = Table.getCell(table, i, j);
        Matrix.updateCell(matrix, i, j, cell);
      }
    }
  }
  static remove(matrix) {
    matrix.matrix.parentNode.removeChild(matrix.matrix);
    return matrix.matrix; // alliasing... whatever...
  }
  static reset(matrix, rows, cols) {
    matrix.matrix.parentNode.removeChild(matrix.matrix);
    matrix.init(rows, cols);
  }
}
