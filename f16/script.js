const canvas = document.getElementById('drawing');
const toolbar = document.getElementById('toolbarDraw');
const ctx = canvas.getContext('2d');
/* localStorage */
set_font_size = function(size) {
	localStorage.getItem("font_size");
  data = localStorage.setItem('font_size', size);
}
set_all_extra_info = function(extraInfoVal) {
	localStorage.getItem("all_extra_info");
  data = localStorage.setItem('all_extra_info', extraInfoVal);
}
// Retrieve
var fontSize = localStorage.getItem('font_size');
var allExtraInfo = localStorage.getItem('all_extra_info');
if(fontSize == null) {
  set_font_size(16);
} else {
  $("#textSlider").val(fontSize);
  $('body').css("font-size", fontSize + "px");
  $('#fontSize').text(fontSize);
}
if(allExtraInfo == null) {
  set_all_extra_info(true);
  $('#info-all').prop('checked', true);
} else {
  if(allExtraInfo == 'true') {
    $('#info-all').prop('checked', true);
  } else {
    $('#info-all').trigger('change');
    $('.all-others').prop('checked', false);
    $('.fullinfo').css({"display": "none"});
  }
}
/*alert(allExtraInfo);
document.getElementById("test").innerHTML = 
localStorage.getItem("all_extra_info");*/
/* localStorage */

/* Settings */
/* Fullscreen */
var elem = document.documentElement;
function openFullscreen() {
  if (document.fullscreenElement || document.webkitFullscreenElement ||
    document.mozFullScreenElement) {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      } else if (document.webkitExitFullscreen) { /* Safari */
        document.webkitExitFullscreen();
      } else if (document.msExitFullscreen) { /* IE11 */
        document.msExitFullscreen();
      }
  } else {
    if (elem.requestFullscreen) {
      elem.requestFullscreen();
    } else if (elem.webkitRequestFullscreen) { /* Safari */
      elem.webkitRequestFullscreen();
    } else if (elem.msRequestFullscreen) { /* IE11 */
      elem.msRequestFullscreen();
    }
  }
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
/* Fullscreen */
$("#textSlider").on("input",function () {
	$('body').css("font-size", $(this).val() + "px");
	$('#fontSize').text($(this).val());
  set_font_size($(this).val());
});
/* Settings */

/* Checkboxes */
$('.startlist').change(function() {
    var $this = $(this);
  	if ($this.prop('checked')) {
    	$("label[for='"+$this.attr("id")+"']").addClass("startlabelGreen");
  	} else {
		$("label[for='"+$this.attr("id")+"']").removeClass("startlabelGreen");
	}
});
$(".uncheckstart").on("click", function() {
	$('.startlist').prop('checked', false);
	$('.startlabel').removeClass("startlabelGreen");
});

$('.aarlist').change(function() {
  var $this = $(this);
  if ($this.prop('checked')) {
    $("label[for='"+$this.attr("id")+"']").addClass("startlabelGreen");
  } else {
  $("label[for='"+$this.attr("id")+"']").removeClass("startlabelGreen");
}
});
$("#uncheckaar").on("click", function() {
  $('.aarlist').prop('checked', false);
  $('.aarlabel').removeClass("startlabelGreen");
});

$('.tacanlist').change(function() {
  var $this = $(this);
  if ($this.prop('checked')) {
    $("label[for='"+$this.attr("id")+"']").addClass("startlabelGreen");
  } else {
  $("label[for='"+$this.attr("id")+"']").removeClass("startlabelGreen");
}
});
$("#unchecktacan").on("click", function() {
  $('.tacanlist').prop('checked', false);
  $('.tacanlabel').removeClass("startlabelGreen");
});

$('#info-all').change(function() {
    var $this = $(this);
  	if ($this.prop('checked')) {
    	$('.all-others').prop('checked', true);
      set_all_extra_info(true);
		$('.fullinfo').css({"display": "block"});
  	} else {
		  $('.all-others').prop('checked', false);
		  $('.fullinfo').css({"display": "none"});
      set_all_extra_info(false);
	  }
});
$('.all-others').change(function() {
  var getId = $(this).attr('id'); 
	$('#'+getId+'div').toggle();
});
/* Checkboxes */

/* Images enlarged */
$("img").on("click", function() {
    var src = this.src;
    $("#overlay").css("display", "flex");
	$("#overlayContent").prepend('<img src="'+src+'" />')
});
$("#overlay").on("click", function() {
    $("#overlay").css("display", "none");
	$("#overlayContent").html('')
});
/* Images enlarged */

/* Notepad drawing */
let drawColor = `#FFFFFF`
const canvasOffsetX = canvas.offsetLeft;
const canvasOffsetY = canvas.offsetTop;
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
let isPainting = false;
let lineWidth = 3;
let startX;
let startY;
toolbar.addEventListener('click', e => {
  if (e.target.id === 'clear') {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  }
});
toolbar.addEventListener('change', e => {
  if(e.target.id === 'stroke') {
    drawColor = e.target.value;
  }
  if(e.target.id === 'lineWidth') {
    lineWidth = e.target.value;
  } 
});
const drawM = (e) => {
  e.preventDefault()
  if(!isPainting) {
    return;
  }
  ctx.lineWidth = lineWidth;
  ctx.lineCap = 'round';
  ctx.strokeStyle = drawColor;
  ctx.lineTo(e.clientX - canvasOffsetX, e.clientY);
  ctx.stroke();
}
const drawT = (e) => {
  e.preventDefault()
  if(!isPainting) {
    return;
  }
  ctx.lineWidth = lineWidth;
  ctx.lineCap = 'round';
  ctx.strokeStyle = drawColor;
  ctx.lineTo(e.touches[0].clientX, e.touches[0].clientY);
  ctx.stroke();
}
const startDm = (e) => {
  isPainting = true;
  startX = e.clientX;
  startY = e.clientY;
}
const startDt = (e) => {
  e.preventDefault()
  isPainting = true;
  startX = e.touches[0].clientX;
  startY = e.touches[0].clientY;
}
const endD = (e) => {
  e.preventDefault()
  isPainting = false;
  ctx.stroke();
  ctx.beginPath();
}
canvas.addEventListener('mousedown', startDm);
canvas.addEventListener('mouseup', endD);
canvas.addEventListener('mousemove', drawM);
canvas.addEventListener('touchstart', startDt);
canvas.addEventListener('touchend', endD);
canvas.addEventListener('touchmove', drawT);

$("#drawBtn").on("click", function() {
  $("#drawing").toggle();
  $("#toolbarDraw").toggle();
  $("#drawBtn").removeClass('inputActive')
});
$(".inputActive").on("click", function() {
  alert('b')
  $("#drawing").toggle();
  $("#toolbarDraw").toggle();
});
$("#drawInput").on("focusin", function() {
  $("#drawBtn").addClass('inputActive')
});
$("#clearInput").on("click", function() {
  $("#drawInput").val('');
  $("#drawBtn").removeClass('inputActive')
});
/* Notepad drawing */

// Kneeboard 
$("#kneeFolderBtn").on("click", function() {
  $("#folderSidebar").toggle()
});
$("#kneeBtn").on("click", function() {
  $("#kneeboard").toggle()
  $("#kneeFolderBtn").toggle()
});
document.querySelector("#uploader").addEventListener("change", e => {
  $("#kneeFolderBtn").toggle()
  const list = document.getElementById("kneeboard")
  list.style.display = "block"
  list.innerHTML = ""
  const sidebar = document.createElement("div")
  sidebar.id = "folderSidebar"
  sidebar.style.cssText = "position: fixed; left: 0; top: 0; width: 200px; padding: 10px; overflow-y: auto;"
  const content = document.createElement("div")
  content.id = "imageContent"
  content.style.cssText = "flex: 1;"
  list.style.display = "flex"
  list.appendChild(sidebar)
  list.appendChild(content)

  const folders = new Map()
  const rootFiles = []
  
  for (const file of e.target.files) {
    if (!file.type.startsWith("image/")) continue
    
    let relativePath = file.webkitRelativePath || ""
    try {
      relativePath = decodeURIComponent(relativePath)
    } catch (e) {
      // If decode fails, use original path
    }
    if (relativePath) {
      let pathParts = relativePath.split(/[\/\\]/).filter(part => part && !part.includes(':'))  
      pathParts = pathParts.map(part => {
        return part.replace(/^(primary|emulated|sdcard\d*):?/, '')
      }).filter(part => part)
      
      if (pathParts.length > 1) {
        const folderName = pathParts[pathParts.length - 2] 
        if (!folders.has(folderName)) {
          folders.set(folderName, [])
        }
        folders.get(folderName).push(file)
      } else if (pathParts.length === 1) {
        rootFiles.push(file)
      }
    } else {
      rootFiles.push(file)
    }
  }

  rootFiles.sort((a, b) => a.name.localeCompare(b.name))
  folders.forEach((files, folderName) => {
    files.sort((a, b) => a.name.localeCompare(b.name))
  })

  function displayImages(files) {
    content.innerHTML = ""
    files.forEach(file => {
      const reader = new FileReader()
      reader.onload = () => {
        const img = document.createElement("img")
        const div = document.createElement("div")
        div.classList.add("imageContainer")
        img.src = reader.result
        div.style.textAlign = "center"
        div.appendChild(img)
        content.appendChild(div)
      }
      reader.readAsDataURL(file)
    })
  }

  if (rootFiles.length > 0) {
    const rootItem = document.createElement("div")
    rootItem.textContent = `📁 Start (${rootFiles.length})`
    rootItem.style.cssText = "padding: 8px; cursor: pointer; margin-bottom: 5px; background: #000; border-radius: 4px; font-weight: bold;"
    rootItem.addEventListener("click", () => {
      document.querySelectorAll("#folderSidebar > div").forEach(el => el.style.background = "#222")
      rootItem.style.background = "#000"
      displayImages(rootFiles)
    })
    sidebar.appendChild(rootItem)
  }

  folders.forEach((files, folderName) => {
    const folderItem = document.createElement("div")
    folderItem.textContent = `📁 ${folderName} (${files.length})`
    folderItem.style.cssText = "padding: 8px; cursor: pointer; margin-bottom: 5px; background: #222; border-radius: 4px;"
    folderItem.addEventListener("click", () => {
      document.querySelectorAll("#folderSidebar > div").forEach(el => el.style.background = "#222")
      folderItem.style.background = "#000"
      displayImages(files)
    })
    sidebar.appendChild(folderItem)
  })

  if (rootFiles.length > 0) {
    displayImages(rootFiles)
  } else if (folders.size > 0) {
    const firstFolder = folders.values().next().value
    displayImages(firstFolder)
    sidebar.querySelector("div").style.background = "#000"
  }
})