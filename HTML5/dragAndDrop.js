Element.prototype.hasClassName = function(name) {
  var str = "(?:^|\\s+)" + name + "(?:\\s+|$)";
  return new RegExp(str).test(this.className);
};

Element.prototype.addClassName = function(name) {
  if (!this.hasClassName(name)) {
    this.className = this.className ? [this.className, name].join(' ') : name;
  }
};

Element.prototype.removeClassName = function(name) {
  if (this.hasClassName(name)) {
    var str = "(?:^|\\s+)" + name + "(?:\\s+|$)";
    this.className = this.className.replace(new RegExp(str, "g"), "");
  }
};

// global dragAndDropSelector;

// Matrix Row Reduction Interface
var dragAndDrop = function (selector) {
  var rows_ = document.querySelectorAll(selector); //'#matrix.column'
  var dragSrcEv_ = null;
 //  [].forEach.call(rows_, row => {
 //    console.log("row.id, row.class : " + row.id + ", " + row.className);
 //  });

  this.dragStartHandler = function(event) {
    console.log("DragStart");
    event.preventDefault();
    event.dataTransfer.effectAllowed = 'move';
    event.dataTransfer.setData('text/html', this.innerHTML);
    dragSrcEv_ = this;
    this.addClassName('moving');
  };

  this.dragOverHandler = function(event) {
    console.log("DragOver");
    event.preventDefault();
    if (event.preventDefault) {
      event.preventDefault();
    }
    this.addClassName('over');
    event.dataTransfer.dropEffect = 'move';
    return false;
  };

  this.dragEnterHandler = function(event) {
    console.log("DragEnter");
    event.preventDefault();
    this.addClassName('over');
  };

  this.dragLeaveHandler = function(event) {
    console.log("DragLeave");
    event.preventDefault();
    this.removeClassName('over');
  };

  this.dropHandler = function(event) {
    console.log("Drop");
    event.preventDefault();
    if (event.stopPropagation) {
      event.stopPropagation();
    }

    if (dragSrcEv_ != this) {
      dragSrcEv_.innerHTML = this.innerHTML;
      this.innerHTML = event.dataTransfer.getData('text/html');
    }
    // [].forEach.call(rows_, row => {
    //   row.removeClassName('over');
    //   row.removeClassName('moving');
    //   console.log("removed 'over','moving' from: " + row.id + ", " + row.className);
    // });
    return false;
  };

  this.dragEndHandler = function(event) {
    console.log("DragEnd");
    event.preventDefault();
    [].forEach.call(rows_, row => {
      row.removeClassName('over');
      row.removeClassName('moving');
      console.log("removed 'over','moving' from: " + row.id + ", " + row.className);
    });
  };

  [].forEach.call(rows_, row => {
    console.log("row.className: " + row.className + ", row.id: " + row.id);
    row.setAttribute('draggable', 'true');
    row.style.cursor = 'move';
    row.addEventListener('dragstart', this.dragStartHandler, false);
    row.addEventListener('dragenter', this.dragEnterHandler, false);
    row.addEventListener('dragover', this.dragOverHandler, false);
    row.addEventListener('dragleave', this.dragLeaveHandler, false);
    row.addEventListener('drop', this.dropHandler, false);
    row.addEventListener('dragend', this.dragEndHandler, false);
  });
}
