var CTATComboBox = function $CTATComboBox$($aDescription$$, $aX$$, $aY$$, $aWidth$$, $aHeight$$) {
  CTAT.Component.Base.Clickable.call(this, "CTATComboBox", "__undefined__", $aDescription$$, $aX$$, $aY$$, $aWidth$$, $aHeight$$);
  this.setDefaultWidth(100);
  this.setDefaultHeight(22);
  var $pointer$$ = this, $combobox$$ = null;
  this.setAction("UpdateComboBox");
  var $split_character$$ = ",";
  this.setStyleHandler("SplitCharacter", function($char$$) {
    $split_character$$ = $char$$;
    $combobox$$ && ($combobox$$.innerHTML = "", this.addLabels($list_entries$$, $split_character$$));
  }.bind(this));
  var $list_entries$$ = "---,x,y,z";
  this.setStyleHandler("Labels", function($labels$$) {
    console.log("CTATComboBox.setLabels(" + $labels$$ + ")");
    $list_entries$$ = $labels$$;
    $combobox$$ && ($combobox$$.innerHTML = "", this.addLabels($list_entries$$, $split_character$$));
  }.bind(this));
  this.setStyleHandler("DropDownSize", null);
  this.setStyleHandler("DropDownWidth", null);
  this.init = function init() {
    $pointer$$.setInitialized(!0);
    $combobox$$ = document.createElement("select");
    $combobox$$.name = $pointer$$.getName();
    $combobox$$.setAttribute("id", CTATGlobalFunctions.gensym.div_id());
    $combobox$$.setAttribute("onkeypress", "return noenter(event)");
    $combobox$$.onchange = this.processComboSelection;
    $combobox$$.classList.add("CTAT-combobox");
    $combobox$$.style.zIndex = CTATGlobalFunctions.gensym.z_index();
    var $content$$ = this.getDivWrap().innerHTML;
    this.getDivWrap().innerHTML = "";
    $content$$ ? $combobox$$.innerHTML = $content$$ : this.addLabels($list_entries$$, $split_character$$);
    $pointer$$.assignEnabled(!0);
    !0 === $pointer$$.getEnabled() ? $combobox$$.disabled = !1 : $combobox$$.disabled = !0;
    $pointer$$.ctatdebug("Final location: " + $pointer$$.getX() + "," + $pointer$$.getY() + " with text: " + $pointer$$.getText());
    $pointer$$.addComponentReference($pointer$$, $combobox$$);
    $pointer$$.setComponent($combobox$$);
    $pointer$$.getDivWrap().appendChild($combobox$$);
    $pointer$$.render();
    $combobox$$.addEventListener("focus", $pointer$$.processFocus);
  };
  this.getHTMLComponent = function getHTMLComponent() {
    return $combobox$$;
  };
  this.addLabels = function $this$addLabels$($labels$$, $sep$$) {
    for (var $items$$ = $labels$$.split($sep$$ ? $sep$$ : $split_character$$), $i$$ = 0;$i$$ < $items$$.length;$i$$++) {
      this.addItem($items$$[$i$$]);
    }
  };
  this.addItem = function addItem($aValue$$) {
    $pointer$$.ctatdebug("addItem (" + $aValue$$ + ")");
    var $option$$ = document.createElement("option");
    $option$$.setAttribute("value", $aValue$$);
    $option$$.textContent = $aValue$$;
    $option$$.classList.add("CTAT-combobox--option");
    $combobox$$.appendChild($option$$);
  };
  this.valid_selection = function $this$valid_selection$() {
    return 0 <= $combobox$$.selectedIndex && !CTATGlobalFunctions.isBlank($combobox$$.value);
  };
  this.processComboSelection = function processComboSelection() {
    $pointer$$.ctatdebug("processComboSelection ()");
    $pointer$$.setInput($combobox$$.options[$combobox$$.selectedIndex].value);
    $pointer$$.valid_selection() ? $pointer$$.processAction() : this.ctatdebug("Empty component, nothing to grade");
  };
  this.UpdateComboBox = function $this$UpdateComboBox$($item$$) {
    $combobox$$.value = $item$$;
  };
};
CTATComboBox.prototype = Object.create(CTAT.Component.Base.Clickable.prototype);
CTATComboBox.prototype.constructor = CTATComboBox;
CTAT.ComponentRegistry.addComponentType("CTATComboBox", CTATComboBox);







function addCTATElement(elem) {
     var $ctat_component$$ = new CTAT.ComponentRegistry["CTATComboBox"];
     console.log("Attaching CTAT tutoring to " + $(elem).attr("id"));
     $(elem).attr("id") ? $ctat_component$$.setName($(elem).attr("id")) : (elem.id = CTATGlobalFunctions.div_id(), $ctat_component$$.setName(elem.id));
     $ctat_component$$.setDivWrapper(elem);
     $ctat_component$$.processAttributes();
     $ctat_component$$.init();
     $(elem).data("CTATComponent", $ctat_component$$);
 }


 $("#transitionEvent").html("Event <div class='CTATComboBox'></div>")
       var event = $("#transitionEvent div")
       event.attr("id", "eventFrom"+d.source.id+"To"+d.target.id);
       event.append($("<option></option>").attr("value", "").text("Select an Event"));
       $.each(['mouseDown', 'mouseUp', 'mouseMoveOutside', 'mouseMoveInside'], function(key, value) {
         event.append($("<option></option>")
          .attr("value",value)
          .text(value));
       });


// var value = ["0", "1", "2"]; // href or something??
// var i_ = String.fromCharCode(8320+1);
// var j_ = String.fromCharCode(8320+2);
// //var text = ["k*row\uᵢ", "row\uᵢ <-> row\uⱼ", "row\uᵢ = row\uᵢ + k*row\uⱼ"];
// var text = ["k*row"+i_, "row"+i_ +"<-> row"+j_, "row"+i_ +"= row"+i_ +"+ k*row"+j_];

function show(i) {
  var ids_ = ["multipleOfRow", "rowInterchange", "addMultipleOfAnotherRowToRow"];
  for (var j=0; j<3; j++) {
    var elem = document.getElementById(ids_[j]);
    if (elem) {
      if (j != i) {
        elem.style.visibility = 'hidden';
      }
      else {
        elem.style.visibility = 'visible';
      }
    }
  }
}
var selection = document.createElement('select');
selection.style.zIndex = '4';
selection.style.width = '100px';
selection.style.height = '22px';
selection.setAttribute('id', 'selectedRowOperation');
selection.setAttribute('class', 'custom-combobox');
//selection.
selection.addEventListener('change', function() {
  switch(this.value) {
    case "0":
      console.log("option 0");
      show(0);
      this.textContent = text[0];
      break;
    case "1":
      console.log("option 1");
      show(1);
      this.textContent = text[1];
      break;
    case "2":
      console.log("option 2");
      show(2);
      this.textContent = text[2];
      break;
  }
});


// for (var i=0; i<3; i++) {
//   var option = document.createElement('option');
//   option.value = value[i]; // href or something??
//   option.text = text[i];
// //  console.log("text: " + text[i]);
//   selection.appendChild(option);
// }
// selectRowOp.appendChild(selection);
// form.appendChild(selectRowOp);
