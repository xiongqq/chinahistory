var timeList = ["夏", "商", "周", "春秋", "战国", "秦", "西汉", "东汉", "三国", "西晋", "东晋", "南北朝", "隋", "唐", "五代十国", "北宋", "南宋", "元", "明", "清"]
var columnDivList = ["政治", "经济", "军事", "文化", "社会"];
var timeListIndexNow = 0;
var timeFromUrl = getURLparameter("dynasty");
var ifAnimation = false;
var now2Dor3D = "2D";
var hasSetInterval2D = false;
var hasSetInterval3D = false;
var timer2D = null;
var timer3D = null;

if (timeFromUrl != "null") {
    ifAnimation = false;
    for (var i = 0; i < timeList.length; i++) {
        if (timeList[i] == timeFromUrl.trim()) {
            timeListIndexNow = i;
            break;
        }
    }
}
else {
    timeListIndexNow = 0;
    ifAnimation = true;
}
convert2D();

function fillColumnDiv() {
    for (var i = 0; i < columnDivList.length; i++) {
        var columnDiv = document.getElementById(columnDivList[i]);
        columnDiv.innerHTML = "";
        //var content2 = returnTXTJsonByName(columnDivList[i]);
        for (content2 in returnTXTJsonByName(timeList[timeListIndexNow])[columnDivList[i]]) {
            var a = document.createElement("a");
            a.setAttribute('href', 'contentPage.html?dynasty=' + timeList[timeListIndexNow] + "&level1=" + columnDivList[i] + "&level2=" + content2 + "&level3=null&level4=null&ifContent=null");
            a.innerHTML = content2.split("（")[0];
            columnDiv.appendChild(a);
        }
    }
    pictureDivUpdate();//更新右侧图片
}


function convert2D() {
    now2Dor3D = "2D";
    require([
        "esri/config",
        "esri/Map",
        "esri/views/MapView",
        "esri/widgets/Expand",
        "esri/request",
        "esri/layers/FeatureLayer",
        "esri/layers/support/Field",
        "esri/Graphic"
    ], function (
        esriConfig,
        Map,
        MapView,
        Expand,
        request,
        FeatureLayer,
        Field,
        Graphic
    ) {
            document.getElementById("mapDiv2D").style.display = "";
            document.getElementById("mapDiv3D").style.display = "none";
            var map = new Map({
                basemap: "terrain"
            });
            var view = new MapView({
                center: [-41.647, 36.41],
                zoom: 3,
                map: map,
                container: "mapDiv2D",
                popup: {
                    defaultPopupTemplateEnabled: true
                }
            });
            var timeDiv = document.getElementById("timeDiv");
            timeDiv.innerHTML = "";
            for (var i = 0; i < timeList.length; i++) {
                var div = document.createElement("div");
                div.setAttribute('id', timeList[i]);
                div.setAttribute('class', 'timeDiv_ele');
                div.innerHTML = timeList[i];
                timeDiv.appendChild(div);
                //点击事件
                document
                    .getElementById(timeList[i])
                    .addEventListener("click", function (event) {
                        ifAnimation = false;
                        timeNameNow = event.target.attributes.id.nodeValue;
                        timeListIndexNow = timeList.indexOf(timeNameNow);
                        //console.log(returnShpJsonByName("北宋"));
                        addShapefileToMap(returnShpJsonByName(timeNameNow));
                        timeDivItemChange(timeNameNow);
                        fillColumnDiv();
                    });
            }

            function addShapefileToMap(featureCollection) {
                // add the shapefile to the map and zoom to the feature collection extent
                // if you want to persist the feature collection when you reload browser, you could store the
                // collection in local storage by serializing the layer using featureLayer.toJson()
                // see the 'Feature Collection in Local Storage' sample for an example of how to work with local storage
                var sourceGraphics = [];

                var layers = featureCollection.layers.map(function (layer) {
                    var graphics = layer.featureSet.features.map(function (feature) {
                        return Graphic.fromJSON(feature);
                    });
                    sourceGraphics = sourceGraphics.concat(graphics);
                    var featureLayer = new FeatureLayer({
                        objectIdField: "FID",
                        source: graphics,
                        fields: layer.layerDefinition.fields.map(function (field) {
                            return Field.fromJSON(field);
                        })
                    });
                    return featureLayer;
                    // associate the feature with the popup on click to enable highlight and zoom to
                });
                map.removeAll();
                map.addMany(layers);
                view.goTo(sourceGraphics);
            }

            //时间轴中仅当前年代高亮
            function timeDivItemChange(timeName) {
                for (var i = 0; i < timeList.length; i++) {
                    document.getElementById(timeList[i]).className = "timeDiv_ele";
                }
                document.getElementById(timeName).className = "timeDiv_ele_onclick";
            }

            //版图演变按钮点击事件
            //document
            //    .getElementById("columnDiv_ele_btyb")
            //    .addEventListener("click", function (event) {
            //        if (ifAnimation == true) {
            //            ifAnimation = false;
            //        }
            //        else {
            //            timeListIndexNow = (timeListIndexNow + 1) % timeList.length;
            //            ifAnimation = true;
            //        }
            //    });

            //循环展示图层
            clearInterval(timer2D);
            clearInterval(timer3D);
            timer2D = setInterval(setIntervalShowShp, 3500);
            function setIntervalShowShp() {
                if (ifAnimation) {
                    addShapefileToMap(returnShpJsonByName(timeList[timeListIndexNow]));
                    timeDivItemChange(timeList[timeListIndexNow]);
                    timeListIndexNow = (timeListIndexNow + 1) % timeList.length;
                    fillColumnDiv();
                }
            }
            if (hasSetInterval2D == false) {
                if (hasSetInterval2D == false) {
                    hasSetInterval2D = true;
                    fillColumnDiv();
                }
            }
            if (timeFromUrl != "null") {
                addShapefileToMap(returnShpJsonByName(timeList[timeListIndexNow]));
                timeDivItemChange(timeList[timeListIndexNow]);
            }

        });
}

function convert3D() {
    now2Dor3D = "3D";
    require([
        "esri/config",
        "esri/Map",
        "esri/views/MapView",
        "esri/widgets/Expand",
        "esri/request",
        "esri/layers/FeatureLayer",
        "esri/layers/support/Field",
        "esri/Graphic"
    ], function (
        esriConfig,
        Map,
        MapView,
        Expand,
        request,
        FeatureLayer,
        Field,
        Graphic
    ) {
            document.getElementById("mapDiv2D").style.display = "none";
            document.getElementById("mapDiv3D").style.display = "";
            var map = new Map({
                basemap: "satellite"
            });
            var view = new MapView({
                center: [-41.647, 36.41],
                zoom: 3,
                map: map,
                container: "mapDiv3D",
                popup: {
                    defaultPopupTemplateEnabled: true
                }
            });
            var timeDiv = document.getElementById("timeDiv");
            timeDiv.innerHTML = "";
            for (var i = 0; i < timeList.length; i++) {
                var div = document.createElement("div");
                div.setAttribute('id', timeList[i]);
                div.setAttribute('class', 'timeDiv_ele');
                div.innerHTML = timeList[i];
                timeDiv.appendChild(div);
                //点击事件
                document
                    .getElementById(timeList[i])
                    .addEventListener("click", function (event) {
                        ifAnimation = false;
                        timeNameNow = event.target.attributes.id.nodeValue;
                        timeListIndexNow = timeList.indexOf(timeNameNow);
                        //console.log(returnShpJsonByName("北宋"));
                        addShapefileToMap(returnShpJsonByName(timeNameNow));
                        timeDivItemChange(timeNameNow);
                        fillColumnDiv();
                    });
            }

            function addShapefileToMap(featureCollection) {
                // add the shapefile to the map and zoom to the feature collection extent
                // if you want to persist the feature collection when you reload browser, you could store the
                // collection in local storage by serializing the layer using featureLayer.toJson()
                // see the 'Feature Collection in Local Storage' sample for an example of how to work with local storage
                var sourceGraphics = [];

                var layers = featureCollection.layers.map(function (layer) {
                    var graphics = layer.featureSet.features.map(function (feature) {
                        return Graphic.fromJSON(feature);
                    });
                    sourceGraphics = sourceGraphics.concat(graphics);
                    var featureLayer = new FeatureLayer({
                        objectIdField: "FID",
                        source: graphics,
                        fields: layer.layerDefinition.fields.map(function (field) {
                            return Field.fromJSON(field);
                        })
                    });
                    return featureLayer;
                    // associate the feature with the popup on click to enable highlight and zoom to
                });
                map.removeAll();
                map.addMany(layers);
                view.goTo(sourceGraphics);
            }

            //时间轴中仅当前年代高亮
            function timeDivItemChange(timeName) {
                for (var i = 0; i < timeList.length; i++) {
                    document.getElementById(timeList[i]).className = "timeDiv_ele";
                }
                document.getElementById(timeName).className = "timeDiv_ele_onclick";
            }

            //版图演变按钮点击事件
            //document
            //    .getElementById("columnDiv_ele_btyb")
            //    .addEventListener("click", function (event) {
            //        if (ifAnimation == true) {
            //            ifAnimation = false;
            //        }
            //        else {
            //            timeListIndexNow = (timeListIndexNow + 1) % timeList.length;
            //            ifAnimation = true;
            //        }
            //    });

            //循环展示图层
            clearInterval(timer2D);
            clearInterval(timer3D);
            timer3D = setInterval(setIntervalShowShp, 3500);
            function setIntervalShowShp() {
                if (ifAnimation) {
                    addShapefileToMap(returnShpJsonByName(timeList[timeListIndexNow]));
                    timeDivItemChange(timeList[timeListIndexNow]);
                    timeListIndexNow = (timeListIndexNow + 1) % timeList.length;
                    fillColumnDiv();
                }
            }
            if (hasSetInterval3D == false) {
                if (hasSetInterval3D == false) {
                    hasSetInterval3D = true;
                    fillColumnDiv();
                }
            }
            if (timeFromUrl != "null") {
                addShapefileToMap(returnShpJsonByName(timeList[timeListIndexNow]));
                timeDivItemChange(timeList[timeListIndexNow]);
            }

        });
}

function switch2Dor3D() {
    timeListIndexNow = 0;
    clearInterval(timer2D);
    clearInterval(timer3D);
    if (now2Dor3D == "2D") {
        convert3D();
    }

    else {
        convert2D();
    }
}

function getURLparameter(parameterName) {
    var urlParameter = location.search; //获取url中"?"符后的字串
    var parameterContent1 = urlParameter.split(parameterName + "=")[1];
    if (parameterContent1.indexOf("&") != -1) {
        return decodeURI(parameterContent1.split("&")[0]);
    }
    else {
        return decodeURI(parameterContent1);
    }
}

function pictureDivUpdate() {//更新右侧图片
    var pictureDiv = document.getElementById("pictureDiv");
    pictureDiv.innerHTML = "";
    var divList = returnTXTJsonByName("四个典型")[timeList[timeListIndexNow]];
    for (title in divList) {
        var content = divList[title];
        var div = document.createElement("div");
        div.setAttribute('id', timeList[timeListIndexNow] + "_"+ title+"_div");
        var img = document.createElement("img");
        img.setAttribute('src', "../img/contentImg/" + content.split("<img>")[1]);
        img.setAttribute('id', timeList[timeListIndexNow] + "_" + title + "_img");
        var label = document.createElement("label");
        label.setAttribute('id', timeList[timeListIndexNow] + "_" + title + "_label");
        label.innerHTML = title;
        div.appendChild(img);
        div.appendChild(label);
        pictureDiv.appendChild(div);
        document
            .getElementById(timeList[timeListIndexNow] + "_" + title+"_div")
            .addEventListener("click", function (event) {
                console.log(event);
                var dynasty_level1 = event.target.attributes.id.nodeValue;
                dynasty = dynasty_level1.split("_")[0];
                level1 = dynasty_level1.split("_")[1];
                window.location.href = "contentPage.html?dynasty=四个典型&level1=" + dynasty + "&level2=" + level1 +"&level3=null&level4=null&ifContent=true";
            });
        document
            .getElementById(timeList[timeListIndexNow] + "_" + title + "_img")
            .addEventListener("click", function (event) {
                console.log(event);
                var dynasty_level1 = event.target.attributes.id.nodeValue;
                dynasty = dynasty_level1.split("_")[0];
                level1 = dynasty_level1.split("_")[1];
                window.location.href = "contentPage.html?dynasty=四个典型&level1=" + dynasty + "&level2=" + level1 + "&level3=null&level4=null&ifContent=true";
            });
        document
            .getElementById(timeList[timeListIndexNow] + "_" + title + "_label")
            .addEventListener("click", function (event) {
                console.log(event);
                var dynasty_level1 = event.target.attributes.id.nodeValue;
                dynasty = dynasty_level1.split("_")[0];
                level1 = dynasty_level1.split("_")[1];
                window.location.href = "contentPage.html?dynasty=四个典型&level1=" + dynasty + "&level2=" + level1 + "&level3=null&level4=null&ifContent=true";
            });

    }
}

function searchKeyword() {
    for (var i = 0; i < timeList.length; i++) {
        var keyword = document.getElementById("searchDiv_input").value.toString().trim();
        if (keyword == "") {
            alert("输入的关键词为空");
            return;
        }
        var contentList = returnTXTJsonByName(timeList[i]);
        for (level1 in contentList) {
            if (typeof (contentList[level1]) == "string" && level1 == keyword) {
                window.location.href = "../page/contentPage.html?dynasty=" + timeList[i] + "&level1=" + level1 + "&level2=null&level3=null&level4=null&ifContent=true";
                return;
            }
            else if (typeof (contentList[level1]) == "object") {
                for (level2 in contentList[level1]) {
                    if (typeof (contentList[level1][level2]) == "string" && level2 == keyword) {
                        window.location.href = "../page/contentPage.html?dynasty=" + timeList[i] + "&level1=" + level1 + "&level2=" + level2 + "&level3=null&level4=null&ifContent=true";
                        return;
                    }
                    else if (typeof (contentList[level1][level2]) == "object") {
                        for (level3 in contentList[level1][level2]) {
                            if (typeof (contentList[level1][level2][level3]) == "string" && level3 == keyword) {
                                window.location.href = "../page/contentPage.html?dynasty=" + timeList[i] + "&level1=" + level1 + "&level2=" + level2 + "&level3=" + level3 + "&level4=null&ifContent=true";
                                return;
                            }
                            else if (typeof (contentList[level1][level2][level3]) == "object") {
                                for (level4 in contentList[level1][level2][level3]) {
                                    //console.log(level1 + level2 + level3 + level4);
                                    if (typeof (contentList[level1][level2][level3][level4]) == "string" && level4 == keyword) {
                                        window.location.href = "../page/contentPage.html?dynasty=" + timeList[i] + "&level1=" + level1 + "&level2=" + level2 + "&level3=" + level3 + "&level4=" + level4 + "&ifContent=true";
                                        return;
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    }
    alert("未搜索到相关内容，将跳转百度百科搜索。");
    window.location.href = "https://baike.baidu.com/item/" + keyword;
    return;
}


