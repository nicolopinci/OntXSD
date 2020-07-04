document.getElementById("addW").addEventListener("click", addTab, false);
document.addEventListener("DOMContentLoaded", createTwoContainers, false);

// Elements creation and manipulation
function addTab() {
  var workspaceTab = createTabElement();
  var newContainer = createContainerElement();
  
}

function createTabElement() {
  var workspaceTab = document.createElement("li");
  workspaceTab.appendChild(document.createTextNode("Workspace "+document.getElementsByClassName("tabsGroup")[0].children[0].childElementCount));
  workspaceTab.id = "tab"+document.getElementsByClassName("tabsGroup")[0].children[0].childElementCount;
  workspaceTab.className ="ws";
  workspaceTab.style.display = "none";
  document.getElementsByClassName("tabsGroup")[0].children[0].appendChild(workspaceTab);

  return workspaceTab;
}



function createContainerElement() {

  body = document.getElementsByTagName("body")[0];

  let dialogDiv = document.createElement("div");
  dialogDiv.id = "dialog"+(document.getElementsByClassName("tabsGroup")[0].children[0].childElementCount-1);
  dialogDiv.className = "dialog";
  
  
  let dialogTitlebar = document.createElement("div");
  dialogTitlebar.className = "titlebar";
  
  let closeButton = document.createElement("button");
  closeButton.className = "close";
  closeButton.name = "close";
  closeButton.innerHTML = "×";
  
  let minimizeButton = document.createElement("button");
  minimizeButton.className = "minimize";
  minimizeButton.name = "minimize";
  minimizeButton.innerHTML = "_";
  
  
  dialogDiv.appendChild(dialogTitlebar);
  dialogDiv.appendChild(closeButton);
  dialogDiv.appendChild(minimizeButton);

  
  let container0 = document.getElementById("container");

  var newContainer = document.createElement("div");
  newContainer.innerHTML = container0.innerHTML;
  newContainer.className = "container";
  newContainer.style.display = "none";
  newContainer.id = "ctab"+(document.getElementsByClassName("tabsGroup")[0].children[0].childElementCount-1);
  
  dialogDiv.appendChild(newContainer);
  dialogDiv.style.display = "inherit";
  body.appendChild(dialogDiv);
  
  dragElement(dialogDiv);
  dialogDiv.addEventListener("click", activateFocus);
  closeButton.addEventListener("click", closeWindow);
  minimizeButton.addEventListener("click", minimizeWindow);  

    
	return newContainer;
}

function closeWindow() {
  this.parentNode.remove();
}

function minimizeWindow() {
  let dialogBox = this.parentNode;
  if(dialogBox.style.resize === "none") {
    dialogBox.style.height = "40vh";
    dialogBox.style.width = "40vw";
    dialogBox.style.overflow = "scroll";
    dialogBox.style.resize = "both";
  }
  else {
    dialogBox.style.height = "32px";
    dialogBox.style.width = "256px";
    dialogBox.style.overflow = "hidden";
    dialogBox.style.resize = "none";
  }
}



function activateFocus() {
  let zIndexMax = 0;
  for(var i=0; i<document.querySelectorAll(".dialog").length; ++i) {
    if(parseInt(document.querySelectorAll(".dialog")[i].style.zIndex) > zIndexMax) {
        zIndexMax = parseInt(document.querySelectorAll(".dialog")[i].style.zIndex);
    }
  }
  this.style.zIndex = parseInt(zIndexMax+1);
  
  // Normalize indexes
  let zIndexMin = Number.POSITIVE_INFINITY;
  for(var i=0; i<document.querySelectorAll(".dialog").length; ++i) {
    if(parseInt(document.querySelectorAll(".dialog")[i].style.zIndex) < zIndexMin) {
        zIndexMin = parseInt(document.querySelectorAll(".dialog")[i].style.zIndex);
    }
  }
  
  for(var i=0; i<document.querySelectorAll(".dialog").length; ++i) {
         document.querySelectorAll(".dialog")[i].style.zIndex = parseInt(document.querySelectorAll(".dialog")[i].style.zIndex - zIndexMin);
  }
}

/*
 * Designed by ZulNs, @Gorontalo, Indonesia, 7 June 2017
 * Extended by FrankBuchholz, Germany, 2019
*/

function dragElement(elmnt) {
  var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
  if (document.querySelector("#"+elmnt.id + " .titlebar")) {
    // if present, the header is where you move the DIV from:
    document.querySelector("#"+elmnt.id + " .titlebar").onmousedown = dragMouseDown;
    //document.getElementById(elmnt.id + "titlebar").onmousedown = dragMouseDown;
  } else {
    // otherwise, move the DIV from anywhere inside the DIV:
    elmnt.onmousedown = dragMouseDown;
  }

  function dragMouseDown(e) {
    e = e || window.event;
    e.preventDefault();
    // get the mouse cursor position at startup:
    pos3 = e.clientX;
    pos4 = e.clientY;
    document.onmouseup = closeDragElement;
    // call a function whenever the cursor moves:
    document.onmousemove = elementDrag;
  }

  function elementDrag(e) {
    e = e || window.event;
    e.preventDefault();
    // calculate the new cursor position:
    pos1 = pos3 - e.clientX;
    pos2 = pos4 - e.clientY;
    pos3 = e.clientX;
    pos4 = e.clientY;
    // set the element's new position:
    elmnt.style.top = Math.max((elmnt.offsetTop - pos2), 0) + "px";
    elmnt.style.left = Math.max((elmnt.offsetLeft - pos1), 0) + "px";
  }

  function closeDragElement() {
    // stop moving when mouse button is released:
    document.onmouseup = null;
    document.onmousemove = null;
  }
}
/* */

function createPlusSign(containerID) {
  let plusLi = document.createElement("li"); // create a list element (as the other graphs)
  let plusButton = document.createElement("div"); // create a div to put the + sign
  plusButton.className = "graphPreview addNewGraph";
  plusLi.appendChild(plusButton); // add the button to the list (as the other graphs)
  document.querySelector("#"+containerID + " .graphs ul").appendChild(plusLi); // append the list element to the list
  plusButton.id = "plus"+"_"+containerID;
  plusButton.addEventListener("click", addCustomGraph, false); // add action when the user clicks on the button
}


function createTwoContainers() {
  var evObj = document.createEvent('Events');
  evObj.initEvent("click", true, false);
  document.getElementById("addW").dispatchEvent(evObj);

evObj.initEvent("click", true, false);
  document.getElementById("addW").dispatchEvent(evObj);

	
  
}

