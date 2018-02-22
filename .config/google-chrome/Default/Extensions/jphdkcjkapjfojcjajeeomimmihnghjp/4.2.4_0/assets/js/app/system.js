var chrome, elem, code, style;
var fontsize =12;


var DyslexieFont = {
    Init: function() {
        checkStatus(); // Check if the check box is set.
    }
};
DyslexieFont.Init();

function checkStatus() {
    chrome.storage.sync.get({
        booleans: false ,
        backgroundcolor:'',
        textcolor:'',
        fontsize:'',
        lineHight:'',
        charSpace:'',
        liecenceKey :'',
        fontType :''
    }, function(items) {
         console.log(items);
        if(items.liecenceKey){
           
            if(document.getElementById("loginDiv") !== null)
            document.getElementById("loginDiv").style.display = 'none';
        }
       
        if(items.booleans && items.backgroundcolor){
                changeBackgroundColor(items.backgroundcolor);
            }
            if(items.booleans &&  items.textcolor){
                //console.log('textcolor:',items.textcolor)
                changeTextColor(items.textcolor);
            }
            if(items.booleans &&  items.fontsize){
                changeFontSize(items.fontsize);
            }
            if(items.booleans &&  items.lineHight){
                changeLineHeight(items.lineHight);
            }
            if(items.booleans && items.charSpace){
                changeCharSpace(items.charSpace);
            }
            if(items.booleans && items.fontType){
                
            }
             if (items.booleans ) {
            if(items.fontType == 'Italic'){
                changeFontType(items.fontType);
            }else{
                turnOnDyslexieFont();
            }
            
            
           
            setLike(1);
            setMessage("On");
        } else {
            turnOffDyslexieFont();
            setLike(0);
            setMessage("Off");
        }
    });
}


function setLike(bool) {
    if (document.getElementById("likeDyslexieFont") !== null) { // available
        document.getElementById("likeDyslexieFont").checked = bool;
    }
}


function setMessage(text) {
    if (document.getElementById("messageDyslexieFont") !== null) { // available
        document.getElementById('messageDyslexieFont').innerHTML = text;
    }
}



function turnOffDyslexieFont() {
    if (document.getElementById("DyslexieFont") !== null) { // available
        elem = document.getElementById("DyslexieFont");
        elem.parentNode.removeChild(elem);
        (document.head || document.documentElement)
        .removeChild(elem);
        reloadPage();
    }
}
function changeFontType(fontType) {
    //turnOffDyslexieFont();
    style = document.createElement('link');
    style.rel = 'stylesheet';
    style.type = 'text/css';
    style.setAttribute("id", "DyslexieFont1");
    if(fontType === 'Italic')
    style.href = chrome.extension.getURL('assets/css/DyslexieFont/accesibility_italic.css');
    (document.head || document.documentElement).appendChild(style);
         //reloadPage();
       
    }
function turnOnDyslexieFont() {
   // console.log(document);
    style = document.createElement('link');
    style.rel = 'stylesheet';
    style.type = 'text/css';
    style.setAttribute("id", "DyslexieFont");
    style.href = chrome.extension.getURL('assets/css/DyslexieFont/accesibility.css');
    (document.head || document.documentElement).appendChild(style);
}



function reloadPage() {
    //alert("dsfsd");
    chrome.tabs.getSelected(null, function(tab) {
        window.location.reload();
        chrome.tabs.executeScript(tab.id, {
            code: code
        });
    });
}
function changeBackgroundColor(color) {
    
           // document.body.style.backgroundColor = color;
           var css = 'body p, pre , code, aside, a, h1, h2, h3, h4, h5, input, ul, span, font, strong, div  { background-color:'+color+'!important; }',
            head = document.head || document.getElementsByTagName('head')[0], 
            style = document.createElement('style');
            style.type = 'text/css'; 
            style.setAttribute("id", "DyslexieBkCol");
            if (style.styleSheet)
            {style.styleSheet.cssText = css; } 
            else {style.appendChild(document.createTextNode(css)); } 
            head.appendChild(style);
        };
     function changeTextColor(color) {
        
           // document.body.style.color= color;
            //code='document.body.style.backgroundColor="red"';
            var css = 'p,pre , code, aside, a, h1, h2, h3, h4, h5, input, ul, span, font, strong, div  { color:'+color+'!important; }',
            head = document.head || document.getElementsByTagName('head')[0], 
            style = document.createElement('style');
            style.type = 'text/css'; 
            if (style.styleSheet)
            {style.styleSheet.cssText = css; } 
            else {style.appendChild(document.createTextNode(css)); } 
            head.appendChild(style);
    }
    function changeCharSpace(space) {
        
            document.body.style.letterSpacing= + space + 'px';
            
    }
    function changeLineHeight(height) {
        
            document.body.style.lineHeight= height + 'px';
            
    }
    function changeFontSize(font) {
        
          // document.body.style.fontSize = font+'px';
            var css = 'p,pre , code, aside, a, h1, h2, h3, h4, h5, input, ul, span, font, strong, div  { font-size:'+font+'px!important; }',
            head = document.head || document.getElementsByTagName('head')[0], 
             
            style = document.createElement('style');
            style.type = 'text/css'; 
            if (style.styleSheet)
            {style.styleSheet.cssText = css; } 
            else {style.appendChild(document.createTextNode(css)); } 
            head.appendChild(style);
    }
        ///alert(color);
       
      
   
