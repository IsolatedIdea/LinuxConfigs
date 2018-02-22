var app = angular.module("DyslexieFont", ['ngSanitize', 'ui.select']).config([
    '$compileProvider',
    function ($compileProvider)
    {
        $compileProvider.imgSrcSanitizationWhitelist(/^\s*(https?|ftp|mailto|chrome-extension):/);
        // Angular before v1.2 uses $compileProvider.urlSanitizationWhitelist(...)
    }
]);
app.controller("core", function ($scope, $http) {


    var sync, elem, code, style;
    $scope.fontsize = 12;
    $scope.linehight = 1;
    $scope.charspace = 1;
    $scope.extStatus = false;
    $scope.liecenceKey = false;
    $scope.backgroundColor = {};
    //$scope.backgroundColour.selected = '';
    $scope.textColor = {};
    //$scope.textColour.selected = '';
    $scope.disabled = undefined;
    $scope.color = {};
    $scope.color.selected = '';
    $scope.fontType = {};
    $scope.textcolors = [

        {
            name: 'Blue1',
            value: 'Blue1',
            url: 'assets/img/letters-color-1.png'
        },
        {
            name: 'Blue2',
            value: 'Blue2',
            url: 'assets/img/letters-color-2.png'
        },
        {
            name: 'Blue3',
            value: 'Blue3',
            url: 'assets/img/letters-color-3.png'
        },
        {
            name: 'Red',
            value: 'Red',
            url: 'assets/img/letters-color-4.png'
        },
        {
            name: 'Gray1',
            value: 'Gray1',
            url: 'assets/img/letters-color-5.png'
        },
        {
            name: 'Gray2',
            value: 'Gray2',
            url: 'assets/img/letters-color-6.png'
        },
        {
            name: 'Black',
            value: 'Black',
            url: 'assets/img/letters-color-7.png'
        },
        {
            name: 'None',
            value: 'None',
            url: 'assets/img/letters-color-8.png'
        },
    ];
    $scope.backgroundcolors = [

        {name: 'Yellow1',
            url: 'assets/img/background-color-1.png',
            value: 'Yellow1'
        },
        {
            name: 'Yellow2',
            value: 'Yellow2',
            url: 'assets/img/background-color-2.png'
        },
        {
            name: 'Yellow3',
            value: 'Yellow3',
            url: 'assets/img/background-color-3.png'
        },
        {
            name: 'Pink',
            value: 'Pink',
            url: 'assets/img/background-color-4.png'
        },
        {
            name: 'Blue',
            value: 'Blue',
            url: 'assets/img/background-color-5.png'
        },
        {
            name: 'Green',
            value: 'Green',
            url: 'assets/img/background-color-6.png'
        },
        {
            name: 'Gray',
            value: 'Gray',
            url: 'assets/img/background-color-7.png'
        },
        {
            name: 'None',
            value: 'None',
            url: 'assets/img/background-color-8.png'
        },
    ];
    $scope.fontTypes = [
        {
            name: 'Dyslexie aQ',
            value: 'Italic',
            url: 'assets/img/font2.png'
        },{
            name: 'Dyslexie aq',
            value: 'Bold',
            url: 'assets/img/font1.png'
        }
    ];
    //$scope.showOption = true;
    $scope.init = function () {

        //alert(window.location.href);
        /**var views = chrome.extension.getViews({ type: "popup" });
         if(views.length !== 1){
         window.close();
         return false;
         }**/


        chrome.storage.sync.get({
            booleans: false,
            backgroundcolor: '',
            textcolor: '',
            fontsize: '',
            lineHight: '',
            liecenceKey: '',
            charSpace: '',
            fontType: ''
        }, function (items) {
            //items.booleans = true;
            console.log(items);
            if (items.liecenceKey != '') {
                $scope.liecenceKey = true;
                $scope.showOption = true;
                $scope.extStatus = true;
                document.getElementById("loginDiv").style.display = 'none';
                document.getElementById("greenButton").style.display = 'block';
                //document.getElementById('likeDyslexieFont').checked = 1;
                //document.getElementById('messageDyslexieFont').innerHTML = "On";
                var element = document.getElementById("logoCentre");
                
                element.classList.remove("logo_centre");
                //alert(x);
                $scope.$apply(function () {
                    //$scope.textColor = $scope.textColor;
                });
            } else {
                console.log(items);
                $scope.extStatus = false;
                $scope.showOption = false;
                $scope.liecenceKey = false;
                document.getElementById("greenButton").style.display = 'none';
                
                //document.getElementById('likeDyslexieFont').checked = 0;
               // document.getElementById('messageDyslexieFont').innerHTML = "Off";
                //document.getElementById('logoCentre').addClass('logo_centre');
                //logoCentrelogo_centre
                //alert('fdgsdfgvdf');
                var element = document.getElementById("logoCentre");
                
                element.classList.add("logo_centre");
                $scope.$apply(function () {
                    //$scope.textColor = $scope.textColor;
                });
                return false;

            }


            if (items.backgroundcolor) {

                setBackgroundColorOption(items.backgroundcolor);
            }
            if (items.textcolor) {
                //alert("sfdfd");
                setTextColorOption(items.textcolor);
            }
            if (items.fontsize) {
                $scope.fontsize = items.fontsize;
            }
            if (items.lineHight) {
                $scope.linehight = items.lineHight;
            }
            if (items.charSpace) {
                $scope.charspace = items.charSpace;
            }
            if (items.fontType == 'Bold') {
                $scope.fontType = {
                    name: 'Dyslexie aq',
                    value: 'Bold',
                    url: 'assets/img/font1.png'
                };
                $scope.$apply(function () {
                    //$scope.textColor = $scope.textColor;
                });
            } else if (items.fontType == 'Italic') {

                $scope.fontType = {
                    name: 'Dyslexie aQ',
                    value: 'Italic',
                    url: 'assets/img/font2.png'
                };

                $scope.$apply(function () {
                    //$scope.textColor = $scope.textColor;
                });
            }
            if (!items.booleans) {
                // alert(items.booleans);
                $scope.extStatus = true;
              
                document.getElementById('messageDyslexieFont').innerHTML = "On";
                $scope.DyslexieFont();
            } else {
                
                $scope.extStatus = true;
                document.getElementById('messageDyslexieFont').innerHTML = "On";
                // $scope.DyslexieFont();
            }

        });
        $scope.$apply(function () {
            //$scope.textColor = $scope.textColor;
        });
    };
    function setBackgroundColorOption(colorcode) {
        switch (colorcode) {
            case '#FFFADC':
                $scope.backgroundColor =
                        {
                            name: 'Yellow1',
                            url: 'assets/img/background-color-1.png',
                            value: 'Yellow1'
                        };
                break;
            case '#FFF8C1':
                $scope.backgroundColor =
                        {
                            name: 'Yellow1',
                            url: 'assets/img/background-color-1.png',
                            value: 'Yellow1'
                        };
                break;
            case '#FFF49A':
                $scope.backgroundColor =
                        {
                            name: 'Yellow3',
                            url: 'assets/img/background-color-3.png',
                            value: 'Yellow3'
                        };
                break;
            case '#FADBEB':
                $scope.backgroundColor =
                        {
                            name: 'Pink',
                            url: 'assets/img/background-color-4.png',
                            value: 'Pink'
                        };
                break;
            case '#D2ECFB':
                $scope.backgroundColor =
                        {
                            name: 'Blue',
                            url: 'assets/img/background-color-5.png',
                            value: 'Blue'
                        };
                break;
            case '#D0E5A1':
                $scope.backgroundColor =
                        {
                            name: 'Green',
                            url: 'assets/img/background-color-6.png',
                            value: 'Green'
                        };
                break;
            case '#D9D9D9':
                $scope.backgroundColor =
                        {
                            name: 'Gray',
                            url: 'assets/img/background-color-7.png',
                            value: 'Gray'
                        };
                break;
            default:
                $scope.backgroundColor =
                        {

                        };

        }
             $scope.$apply(function () {
                    //$scope.textColor = $scope.textColor;
                });
    }
    function setTextColorOption(colorcode) {
        //alert(colorcode)
        switch (colorcode) {

            case '#004F9E':
                $scope.textColor =
                        {
                            name: 'Blue1',
                            value: 'Blue1',
                            url: 'assets/img/letters-color-1.png'
                        };
                break;
            case '#174193':
                $scope.textColor =
                        {
                            name: 'Blue2',
                            value: 'Blue2',
                            url: 'assets/img/letters-color-2.png'
                        };
                break;
            case '#253080':
                $scope.textColor =
                        {
                            name: 'Blue3',
                            value: 'Blue3',
                            url: 'assets/img/letters-color-3.png'
                        };
                break;
            case '#A42423':
                $scope.textColor =
                        {
                            name: 'Red',
                            value: 'Red',
                            url: 'assets/img/letters-color-4.png'
                        };
                break;
            case '#575757':
                $scope.textColor =
                        {
                            name: 'Gray1',
                            value: 'Gray1',
                            url: 'assets/img/letters-color-5.png'
                        };
                break;
            case '#3C3C3C':
                $scope.textColor =
                        {
                            name: 'Gray2',
                            value: 'Gray2',
                            url: 'assets/img/letters-color-6.png'
                        };
                break;
            case '#1D1D1B':
                $scope.textColor =
                        {
                            name: 'Black',
                            value: 'Black',
                            url: 'assets/img/letters-color-7.png'
                        };
                break;
            default:
                $scope.textColor =
                        {

                        };

        }
        //alert($scope.textColor.name);
          $scope.$apply(function () {
                    //$scope.textColor = $scope.textColor;
                });
    }

    /**
     * Adds Saves the Optoins
     */
    $scope.DyslexieFont = function () { // Saves options to chrome.storage
        console.log("fesdgsfdg");

        checkBox = document.getElementById('likeDyslexieFont').checked;


        chrome.storage.sync.set({
            booleans: checkBox
        }, function () { // Update status to let user know options were saved.
            if (checkBox) {
                $scope.extStatus = true;
                document.getElementById('messageDyslexieFont').innerHTML = "On";
                document.getElementById('likeDyslexieFont').checked =1;
                $scope.init();
                
            } else {
                $scope.extStatus = false;
                document.getElementById('messageDyslexieFont').innerHTML = "Off";
                document.getElementById('likeDyslexieFont').checked =0;

                //window.close();
                
            }
            
            reload();


            //window.close();
        });
    };
    $scope.changeFontTypeDyslexic = function (fontType) { // Saves options to chrome.storage

        console.log(fontType);

        changeFontType(fontType);
    };
    function changeFontType(fontType) {
        chrome.storage.sync.set({
            fontType: fontType
        }, function () {

            reload();
        });
    }
    ;
    $scope.changIncreaseFontDyslexic = function () { // Saves options to chrome.storage

        console.log("increasing");
        ++($scope.fontsize);

        changeFont($scope.fontsize);
    };
    $scope.changeDecreaseFontDyslexic = function () { // Saves options to chrome.storage

        console.log("decreasing");

        (--($scope.fontsize) < 12) ? changeFont($scope.fontsize = 12) : changeFont($scope.fontsize)
    };
    $scope.changIncreaseLineHeightDyslexic = function () { // Saves options to chrome.storage

        console.log("increasing line height");
        ++($scope.linehight);
        changeLineHight($scope.linehight);
    };
    $scope.changeDecreaseLineHeightDyslexic = function () { // Saves options to chrome.storage

        console.log("decreasing line height");

        (--($scope.linehight) < 1) ? changeLineHight($scope.linehight = 1) : changeLineHight($scope.linehight);
        //changeLineHight($scope.linehight);
    };
    $scope.changIncreaseCharSpaceDyslexic = function () { // Saves options to chrome.storage

        console.log("increasing line height");
        ++($scope.charspace);
        changeCharSpace($scope.charspace);
    };
    $scope.changeDecreaseCharSpaceDyslexic = function () { // Saves options to chrome.storage

        console.log("decreasing line height");
        (--($scope.charspace) < 1) ? changeCharSpace(0) : changeCharSpace($scope.charspace)



    };
    $scope.changeBackgroundColorDyslexic = function (color) { // Saves options to chrome.storage

        console.log(color);
        switch (color) {
            case 'Yellow1':
                changeBackgroundColor('#FFFADC');
                break;
            case 'Yellow2':
                changeBackgroundColor('#FFF8C1');
                break;
            case 'Yellow3':
                changeBackgroundColor('#FFF49A');
                break;
            case 'Pink':
                changeBackgroundColor('#FADBEB');
                break;
            case 'Blue':
                changeBackgroundColor('#D2ECFB');
                break;
            case 'Green':
                changeBackgroundColor('#D0E5A1');
                break;
            case 'Gray':
                changeBackgroundColor('#D9D9D9');
                break;
            default:
                changeBackgroundColor('#FFFFFF');
        }


    };
    function changeBackgroundColor(color) {
        chrome.storage.sync.set({
            backgroundcolor: color
        }, function () {
            chrome.tabs.getSelected(null, function (tab) {
                console.log(color);
                //code = 'document.body.id="Dyslexic";document.body.style.backgroundColor="' + color + '"';
                code="var css = 'body , p,pre , code, aside, a, h1, h2, h3, h4, h5, input, ul, span, font, strong, div  { background-color:"+color+"!important; }', bkStyleElem = document.getElementById('DyslexieBkCol');if( bkStyleElem)(document.head || document.documentElement).removeChild(bkStyleElem); head = document.head || document.getElementsByTagName('head')[0], style = document.createElement('style'); style.type = 'text/css';style.setAttribute('id', 'DyslexieBkCol'); if (style.styleSheet) {style.styleSheet.cssText = css; } else {style.appendChild(document.createTextNode(css)); } head.appendChild(style);";
                //code='document.body.style.backgroundColor="red"';
                chrome.tabs.executeScript(null, {
                    code: code
                });
            });
        });
    }
    ;
    $scope.changeTextColorDyslexic = function (color) { // Saves options to chrome.storage

        console.log(color);
        switch (color) {
            case 'Blue1':
                changeTextColor('#004F9E');
                break;
            case 'Blue2':
                changeTextColor('#174193');
                break;
            case 'Blue3':
                changeTextColor('#253080');
                break;
            case 'Red':
                changeTextColor('#A42423');
                break;
            case 'Gray1':
                changeTextColor('#575757');
                break;
            case 'Gray2':
                changeTextColor('#3C3C3C');
                break;
            case 'Black':
                changeTextColor('#1D1D1B');
                break;
            default:
                changeTextColor('#1D1D1B');
        }


    };
    function changeTextColor(color) {
        //createNewStyle();
        chrome.storage.sync.set({
            textcolor: color
        }, function () {
            chrome.tabs.getSelected(null, function (tab) {
                console.log(color);
                //code = 'document.body.style.color="' + color + '"';
                code="var css = 'p,pre , code, aside, a, h1, h2, h3, h4, h5, input, ul, span, font, strong, div  { color:"+ color+"!important; }', head = document.head || document.getElementsByTagName('head')[0], style = document.createElement('style'); style.type = 'text/css'; if (style.styleSheet) {style.styleSheet.cssText = css; } else {style.appendChild(document.createTextNode(css)); } head.appendChild(style);";
                chrome.tabs.executeScript(null, {
                    code: code
                });
            });
        });
        $scope.$apply(function () {
                    //$scope.textColor = $scope.textColor;
                });
    }
    ;
    function reload() {
        chrome.tabs.getSelected(null, function (tab) {
            code = 'window.location.reload();';
            chrome.tabs.executeScript(tab.id, {
                code: code
            }, function () {
                //alert($scope.extStatus);
                if ($scope.extStatus === false)
                   // window.close();
                       $scope.showAllOptions(false);
            });
            if($scope.liecenceKey == false){
				window.close();
				}
        });
    }
    function changeFont(fontsize) {
        chrome.storage.sync.set({
            fontsize: fontsize
        }, function () {
            chrome.tabs.getSelected(null, function (tab) {
                console.log(fontsize);
                //code = 'document.getElementById("Dyslexic").style.fontSize="' + fontsize + 'px"';
               code = code="var css = 'p,pre , code, aside, a, h1, h2, h3, h4, h5, input, ul, span, font, strong, div  { font-size:"+fontsize+"px!important; }', head = document.head || document.getElementsByTagName('head')[0], style = document.createElement('style'); style.type = 'text/css'; if (style.styleSheet) {style.styleSheet.cssText = css; } else {style.appendChild(document.createTextNode(css)); } head.appendChild(style);";
                chrome.tabs.executeScript(null, {
                    code: code
                });
            });
        });
    }
    function changeLineHight(lineHight) {
        chrome.storage.sync.set({
            lineHight: lineHight
        }, function () {
            chrome.tabs.getSelected(null, function (tab) {
                console.log(lineHight);
                code = 'document.body.style.lineHeight="' + lineHight + 'px"';
                //code='document.body.style.backgroundColor="red"';
                chrome.tabs.executeScript(null, {
                    code: code
                });
            });
        });
    }
    function changeCharSpace(charSpace) {
        chrome.storage.sync.set({
            charSpace: charSpace
        }, function () {
            chrome.tabs.getSelected(null, function (tab) {
                console.log(charSpace);
                code = 'document.body.style.letterSpacing="' + charSpace + 'px"';
                //code='document.body.style.backgroundColor="red"';
                chrome.tabs.executeScript(null, {
                    code: code
                });
            });
        });
    }
    function changeFont1() {
        chrome.tabs.executeScript(null, {
            file: "'assets/js/app/getPagesSource.js"
        }, function () {
            if (chrome.extension.lastError) {

                console.log(chrome.extension.lastError);
            }
        });
        chrome.extension.onMessage.addListener(function (request, sender) {
            if (request.action == "getSource") {
                var html = request.source;
                document = request.source;
                document.body.style = 'font-size:' + $scope.fontsize + 'px;'
                console.log(html);
            }



        });
    }
    ;

    $scope.showAllOptions = function (param) {
        console.log(param);
        if (param === true && $scope.extStatus === true) {
            $scope.showOption = true;
            
        } else {
            $scope.showOption = false;
            document.getElementById('Dexlecia').style.height = "45px"; 
            document.getElementById('frames').style.height = "45px"; 
            $scope.$apply(function(){});
        }


    };
    $scope.checkLicenceKey = function (userid, licencekey) {

        if (userid && licencekey) {
            // alert(userid+licencekey);
            var id_license_extra = 2;
            var key = 'MH5niRvDdY7zFLZc';
            var url = 'https://my.dyslexiefont.com/licensecodechecker/api.php';
//           
            var data = {
                'user-id': parseInt(userid),
                'licensecode': licencekey,
                'id_license_extra': 2,
                'key': 'MH5niRvDdY7zFLZc'
            };

            var serializedData = $.param(data);
            $scope.loading = true;
            $http({
                method: 'POST',
                url: url,
                data: serializedData,
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                }}).then(function (result) {
                $scope.loading = false;
                $scope.liecenceErrorMsg = '';
                if (result.data.code == 200) {
                    chrome.storage.sync.set({
                        liecenceKey: licencekey
                    }, function () {
                        $scope.liecenceKey = true;
                        $scope.init();
                    }
                    )
                } else {
                    $scope.liecenceError = true;
                    $scope.liecenceErrorMsg = result.data.message;
                }
                //alert(result.data.message);
            }, function (error) {
                console.log(error);
            });

        } else if (userid) {

            $scope.userIdError = false;
            $scope.liecenceError = true;
            //alert("Please enter user name");

        } else if (licencekey) {

            $scope.userIdError = true;
            $scope.liecenceError = false;
            //alert("Please enter user name");

        } else if (!(userid && licencekey)) {
            $scope.userIdError = true;
            $scope.liecenceError = true;
            //alert("Please enter user name & licence code");
        } else {
            $scope.liecenceError = true;
            $scope.userIdError = false;
            //alert("Please enter user name and licence code");
        }


    }
      $scope.logout = function(){
		  
		  
		  chrome.storage.sync.set({
            liecenceKey: ''
        }, function () {
			$scope.liecenceKey = false;
			$scope.extStatus = true;
              
               $scope.extStatus = false;
                document.getElementById('messageDyslexieFont').innerHTML = "Off";
                document.getElementById('likeDyslexieFont').checked =0;
                $scope.DyslexieFont();
           // reload();
        });
		  
		  }

    function createNewStyle() {
                var css = 'h1 { background: red; }',
                head = document.head || document.getElementsByTagName('head')[0],
                style = document.createElement('style');
                style.setAttribute("id", "DyslexieBkCol");
                bkStyleElem = document.getElementById("DyslexieBkCol");
                 if( bkStyleElem)(document.head || document.documentElement).removeChild(elem);
                style.type = 'text/css';
                if (style.styleSheet) {
            style.styleSheet.cssText = css;
            } else {
            style.appendChild(document.createTextNode(css));
            }

             head.appendChild(style);

             }


});
