<script>
    import { activeFile, boxes, labels } from '../stores.js';
	import { onMount } from 'svelte';
    import colors from 'tailwindcss/colors'
    

    
	let canvas, ctx, canvasO, ctxO, offsetX, offsetY;
    let width = 600, height = 600;
    
	onMount(async () => {
        ctx = canvas.getContext('2d');
        ctxO = canvasO.getContext('2d');
		const image = new Image();
		image.src = $activeFile;
		image.onload = () => {
			ctx.fillStyle = ctx.createPattern(image, 'no-repeat'); 
			ctx.fillRect(0, 0, image.width, image.height)
		};
        var bounding = canvas.getBoundingClientRect();
        offsetX = bounding.left; 
        offsetY = bounding.top;
	})

    
    activeFile.subscribe((val) => {
        //currentValue == $comparedProducts
        console.log("val: "+val)
        console.log(canvas)
        
        if (canvas) {
            ctx = canvas.getContext('2d');
            ctx.clearRect(0, 0, width, height);
            const image = new Image();
            image.src = val;
            image.onload = () => {
                ctx.fillStyle = ctx.createPattern(image, 'no-repeat'); 
                ctx.fillRect(0, 0, image.width, image.height)
            };
        }
    });

    function updateFile(canvas){
        console.log("change file: " + $activeFile)
        // ctx = canvas.getContext('2d');
		// const image = new Image();
		// image.src = $activeFile;
		// image.onload = () => {
		// 	ctx.fillStyle = ctx.createPattern(image, 'no-repeat'); 
		// 	ctx.fillRect(0, 0, image.width, image.height)
		// };
        // var bounding = canvas.getBoundingClientRect();
        // offsetX = bounding.left; 
        // offsetY = bounding.top;
    }


    

    // let previousX = Infinity
    // let previousY = Infinity
    // let startX = Infinity
    // let startY = Infinity
    // let colorHue = 0
    // let isPressed = false

    // function drawCircle(centerX, centerY){
    //     ctx.beginPath();
    //     ctx.arc(centerX, centerY,   5, 0, 2 * Math.PI, false);
    //     ctx.fillStyle = 'green';
    //     ctx.fill();
    //     ctx.lineWidth = 1;
    //     ctx.strokeStyle = '#003300';
    //     ctx.stroke();
    // }
    // function drawRect(startX, startY, endX, endY, permanent=false){
    //     var correctedX = endX - offsetX;
    //     var correctedY = endY - offsetY;


    //     if (!permanent) {
    //         ctxO.clearRect(0, 0, canvasO.width, canvasO.height); 

    //         ctxO.beginPath();
    //         ctxO.lineWidth=2;
    //         ctxO.strokeStyle="red";
    //         ctxO.rect(startX, startY, correctedX - startX, correctedY -startY);  
    //         ctxO.stroke();            
    //     }else{
    //         ctx.beginPath();
    //         ctx.lineWidth=2;
    //         ctx.strokeStyle="red";
    //         ctx.rect(startX, startY, correctedX - startX, correctedY -startY);  
    //         ctx.stroke();   
    //     }

    // }
    
    // function onMouseMove (event) {
    //     if (!isPressed) {
    //         return
    //     }
    //     drawRect(startX, startY, event.clientX,  event.clientY)   
    // }

    // function onMouseDown (event) {
    //     console.log(event)
    //     isPressed = true;

    //     var x = event.clientX - offsetX;
    //     var y = event.clientY - offsetY;

    //     startX = x;
    //     startY = y;

    //     drawCircle(x, y)
    //     addEventListener('mousemove', onMouseMove)
    //     addEventListener('mouseup', onMouseUp)
    // }

    // function onMouseUp (event) {
        
    //     drawRect(startX, startY, event.clientX,  event.clientY, true)  

    //     removeEventListener('mousemove', onMouseMove)
    //     removeEventListener('mouseup', onMouseUp)
    // }

    
var lineOffset = 4;
var anchrSize = 2;

var mousedown = false;
var clickedArea = {box: -1, pos:'o'};
var editingBoxId = -1;
var x1 = -1;
var y1 = -1;
var x2 = -1;
var y2 = -1;


var tmpBox = null;

function onDblClick(e){
    if (editingBoxId != -1) {
        $boxes[editingBoxId].lineWidth = 1;
        editingBoxId = -1;
        redraw()
    }

    clickedArea = findCurrentArea(e.offsetX, e.offsetY);
    x1 = e.offsetX;
    y1 = e.offsetY;
    x2 = e.offsetX;
    y2 = e.offsetY;
    console.log(clickedArea.box)
    if (clickedArea.box != -1) {
        console.log($boxes)
        editingBoxId = clickedArea.box;
        $boxes[editingBoxId]['lineWidth'] = 4;
        console.log($boxes)

        redraw();
        $boxes = $boxes;
    }
}

function onMouseDown(e) {
    if (editingBoxId != -1) {
        $boxes[editingBoxId].lineWidth = 1;
        editingBoxId = -1;
        redraw()
    }
    mousedown = true;
    clickedArea = findCurrentArea(e.offsetX, e.offsetY);
    x1 = e.offsetX;
    y1 = e.offsetY;
    x2 = e.offsetX;
    y2 = e.offsetY;
    addEventListener('mouseup', onMouseUp)
    addEventListener('mousemove', onMouseMove)
};

function onMouseUp(e) {
	if (clickedArea.box == -1 && tmpBox != null) {
        $boxes.push(tmpBox);
    } else if (clickedArea.box != -1) {
        var selectedBox = $boxes[clickedArea.box];
        if (selectedBox.x1 > selectedBox.x2) {
            var previousX1 = selectedBox.x1;
            selectedBox.x1 = selectedBox.x2;
            selectedBox.x2 = previousX1;
        }
        if (selectedBox.y1 > selectedBox.y2) {
            var previousY1 = selectedBox.y1;
            selectedBox.y1 = selectedBox.y2;
            selectedBox.y2 = previousY1;
        }
    }
    clickedArea = {box: -1, pos:'o'};
    tmpBox = null;
    mousedown = false;
    removeEventListener('mouseup', onMouseUp)
    removeEventListener('mousemove', onMouseMove)
};
// document.getElementById("canvas").onmouseout = function(e) {
// 	if (clickedArea.box != -1) {
//   	var selectedBox = $boxes[clickedArea.box];
//     if (selectedBox.x1 > selectedBox.x2) {
//     	var previousX1 = selectedBox.x1;
//       selectedBox.x1 = selectedBox.x2;
//       selectedBox.x2 > previousX1;
//     }
//     if (selectedBox.y1 > selectedBox.y2) {
//     	var previousY1 = selectedBox.y1;
//       selectedBox.y1 = selectedBox.y2;
//       selectedBox.y2 > previousY1;
//     }
//   }
//   mousedown = false;
//   clickedArea = {box: -1, pos:'o'};
//   tmpBox = null;
// };

let xOffset, yOffset;
var xCenter, yCenter;

function onMouseMove(e) {
  if (mousedown && clickedArea.box == -1) {
    x2 = e.offsetX;
    y2 = e.offsetY;
    redraw();
  } else if (mousedown && clickedArea.box != -1) {
    x2 = e.offsetX;
    y2 = e.offsetY;
    xOffset = x2 - x1;
    yOffset = y2 - y1;
    x1 = x2;
    y1 = y2;

    if (clickedArea.pos == 'i'  ||
        clickedArea.pos == 'tl' ||
        clickedArea.pos == 'l'  ||
        clickedArea.pos == 'bl') {
      $boxes[clickedArea.box].x1 += xOffset;
    }
    if (clickedArea.pos == 'i'  ||
        clickedArea.pos == 'tl' ||
        clickedArea.pos == 't'  ||
        clickedArea.pos == 'tr') {
      $boxes[clickedArea.box].y1 += yOffset;
    }
    if (clickedArea.pos == 'i'  ||
        clickedArea.pos == 'tr' ||
        clickedArea.pos == 'r'  ||
        clickedArea.pos == 'br') {
      $boxes[clickedArea.box].x2 += xOffset;
    }
    if (clickedArea.pos == 'i'  ||
        clickedArea.pos == 'bl' ||
        clickedArea.pos == 'b'  ||
        clickedArea.pos == 'br') {
      $boxes[clickedArea.box].y2 += yOffset;
    }
    redraw();
  }
}

function redraw() {
  // canvas.width = canvas.width;
  var context = canvasO.getContext('2d');
  context.clearRect(0, 0, width, height);
  context.beginPath();
  for (var i = 0; i < $boxes.length; i++) {
    drawBoxOn($boxes[i], context);
  }
  if (clickedArea.box == -1) {
    tmpBox = newBox(x1, y1, x2, y2);
    if (tmpBox != null) {
      drawBoxOn(tmpBox, context);
    }
  }
}

function findCurrentArea(x, y) {
  for (var i = 0; i < $boxes.length; i++) {
    var box = $boxes[i];
    xCenter = box.x1 + (box.x2 - box.x1) / 2;
    yCenter = box.y1 + (box.y2 - box.y1) / 2;
    if (box.x1 - lineOffset <  x && x < box.x1 + lineOffset) {
      if (box.y1 - lineOffset <  y && y < box.y1 + lineOffset) {
        return {box: i, pos:'tl'};
      } else if (box.y2 - lineOffset <  y && y < box.y2 + lineOffset) {
        return {box: i, pos:'bl'};
      } else if (yCenter - lineOffset <  y && y < yCenter + lineOffset) {
        return {box: i, pos:'l'};
      }
    } else if (box.x2 - lineOffset < x && x < box.x2 + lineOffset) {
      if (box.y1 - lineOffset <  y && y < box.y1 + lineOffset) {
        return {box: i, pos:'tr'};
      } else if (box.y2 - lineOffset <  y && y < box.y2 + lineOffset) {
        return {box: i, pos:'br'};
      } else if (yCenter - lineOffset <  y && y < yCenter + lineOffset) {
        return {box: i, pos:'r'};
      }
    } else if (xCenter - lineOffset <  x && x < xCenter + lineOffset) {
      if (box.y1 - lineOffset <  y && y < box.y1 + lineOffset) {
        return {box: i, pos:'t'};
      } else if (box.y2 - lineOffset <  y && y < box.y2 + lineOffset) {
        return {box: i, pos:'b'};
      } else if (box.y1 - lineOffset <  y && y < box.y2 + lineOffset) {
        return {box: i, pos:'i'};
      }
    } else if (box.x1 - lineOffset <  x && x < box.x2 + lineOffset) {
      if (box.y1 - lineOffset <  y && y < box.y2 + lineOffset) {
        return {box: i, pos:'i'};
      }
    }
  }
  return {box: -1, pos:'o'};
}

function newBox(x1, y1, x2, y2) {
  var boxX1 = x1 < x2 ? x1 : x2;
  var boxY1 = y1 < y2 ? y1 : y2;
  var boxX2 = x1 > x2 ? x1 : x2;
  var boxY2 = y1 > y2 ? y1 : y2;
  if (boxX2 - boxX1 > lineOffset * 2 && boxY2 - boxY1 > lineOffset * 2) {
    return {x1: boxX1,
            y1: boxY1,
            x2: boxX2,
            y2: boxY2,
            lineWidth: 1,
            labelId: 1 };
  } else {
    return null;
  }
}

function drawBoxOn(box, context) {
  xCenter = box.x1 + (box.x2 - box.x1) / 2;
  yCenter = box.y1 + (box.y2 - box.y1) / 2;
  var labelColor = $labels.find(x => x.id === box.labelId).color
  var items = labelColor.split("-")
  var boxColor = colors[items[1]][items[2]] 

  context.strokeStyle = boxColor;
  context.fillStyle = boxColor;

  context.rect(box.x1, box.y1, (box.x2 - box.x1), (box.y2 - box.y1));
  if (box.lineWidth == 1) {
    context.lineWidth = 1;
  }else{
    context.lineWidth = 4;
  }
  
  console.log(box.lineWidth);
  context.stroke();

  context.fillRect(box.x1 - anchrSize, box.y1 - anchrSize, 2 * anchrSize, 2 * anchrSize);
  context.fillRect(box.x1 - anchrSize, yCenter - anchrSize, 2 * anchrSize, 2 * anchrSize);
  context.fillRect(box.x1 - anchrSize, box.y2 - anchrSize, 2 * anchrSize, 2 * anchrSize);
  context.fillRect(xCenter - anchrSize, box.y1 - anchrSize, 2 * anchrSize, 2 * anchrSize);
  context.fillRect(xCenter - anchrSize, yCenter - anchrSize, 2 * anchrSize, 2 * anchrSize);
  context.fillRect(xCenter - anchrSize, box.y2 - anchrSize, 2 * anchrSize, 2 * anchrSize);
  context.fillRect(box.x2 - anchrSize, box.y1 - anchrSize, 2 * anchrSize, 2 * anchrSize);
  context.fillRect(box.x2 - anchrSize, yCenter - anchrSize, 2 * anchrSize, 2 * anchrSize);
  context.fillRect(box.x2 - anchrSize, box.y2 - anchrSize, 2 * anchrSize, 2 * anchrSize);
}
const atomDropdown = document.getElementById('atomDropdown')
</script>

<div style="position: relative;">
    <canvas bind:this={canvas} id="layer1" width="600" height="600" 
      style="position: absolute; left: 0; top: 0; z-index: 0; background-color:aliceblue;"></canvas>
    <canvas bind:this={canvasO} id="layer2" width="600" height="600" 
      style="position: absolute; left: 0; top: 0; z-index: 1;" on:mousedown={onMouseDown}  on:dblclick={onDblClick}></canvas>
</div>
   

<select id="atomDropdown" class="hidden">
	<option>Test1</option>
	<option>Test2</option>
	<option>Test3</option>
</select>