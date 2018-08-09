(function(){
	// SVG要素の幅と高さを求める
    var dataWidth;
	var svgEle = document.getElementById("myGraph");
	var svgWidth = window.getComputedStyle(svgEle, null).getPropertyValue("width");
	var svgHeight = window.getComputedStyle(svgEle, null).getPropertyValue("height");
	svgWidth = parseFloat(svgWidth);	// 値は単位付きなので単位を削除する
	svgHeight = parseFloat(svgHeight);	// 値は単位付きなので単位を削除する
	var blockSize = 30;	// ブロックのサイズ
	var heatMap;	// ヒートマップオブジェクトを格納する変数
	var color;	// ヒートマップの色を処理する関数を入れる変数
	var maxValue;	// データの最大値
	var dataSet = [ ];	// データセット
    let drawstring = true;
	let svgary = [];
	// データを読み込む
	d3.text("out_100_100_mankara1.csv", function(error, plainText){
		let data = d3.csv.parseRows(plainText);
		dataWidth = data[0].length;
		for(let i=0;i<data.length;i++){
		    for(let j=0;j<data[0].length;j++){
                dataSet.push(data[i][j]);
            }
        }
        // var temp = plainText.split(",");	// カンマで分割し代入
        // // dataWidth = temp.length;
		// for(var i=0; i<temp.length; i++){
		// 	dataSet[i] = parseInt(temp[i]);	// 正数にして代入
		// }
		drawHeatMap();
	});
    function drawColmnFix(){

    }
	// ヒートマップを表示する関数
	function drawHeatMap(){
		// ヒートマップに表示するカラーを自動計算
		color = d3.interpolate("#ffffff", "#ffaaaa");	// 青色から黄色に補間

        maxValue = d3.max(dataSet);	// 最大値を求める

        // colmnfix = d3.select(#colmnFix)
        //     .selectAll("rect")
        //     .data()

		// ヒートマップの準備
		heatMap = d3.select("#myGraph")
			.selectAll("rect")   // rect要素を指定
			.data(dataSet)    // データを設定
		// ヒートマップを表示
		heatMap.enter()
			.append("rect")  // rect要素を追加
			// .attr("class", "block")	// CSSクラスを追加
            // .attr("class",function(d, i) { // X座標を設定
             //    return "block x" + (i % dataWidth) + " y" + parseInt(i / dataWidth);
            // })
            // .attr("class",function(d, i) { // X座標を設定
            //     return "y" + (i / dataWidth);
            // })
			.attr("x", function(d, i) { // X座標を設定
				return (i % dataWidth) * blockSize;
			})
			.attr("y", function(d, i) { // Y座標を設定
				return Math.floor(i/dataWidth)*blockSize;
			})
			.attr("width", function(d, i) {	// 横幅を設定
				return blockSize;
			})
			.attr("height", function(d, i) {	// 縦幅を設定
				return blockSize;
			})
			.style("fill", function(d, i){	// 色を表示
			    if(d == 0) return "#9599ff";
			    if(d==1) return "#e1e9ff"
			    // if(d > 10) return color(1);
				return color(Math.log10(d/5));
			})
            .attr("stroke-width",0)
            // .on("mouseover", function(d,i){
            //     // console.log("aaa");
            //      document.getElementById("headfix").innerHTML = d;
            //      d3.selectAll(".x"+(i % dataWidth)).attr("style","fill:rgb(0,255,0)");
            //      d3.selectAll(".y"+parseInt(i / dataWidth)).attr("style","fill:rgb(0,255,0)");
            // })
            // .on("mouseout",function(d,i){
            //     d3.selectAll(".x"+(i % dataWidth)).style("fill",function(d, i){	// 色を表示
            //         if(d == 0) return "#9599ff";
            //         if(d==1) return "#e1e9ff"
            //         // if(d > 10) return color(1);
            //         return color(Math.log10(d/5));
            //     });
            //     d3.selectAll(".y"+parseInt(i / dataWidth)).style("fill",function(d, i){	// 色を表示
            //         if(d == 0) return "#9599ff";
            //         if(d==1) return "#e1e9ff"
            //         // if(d > 10) return color(1);
            //         return color(Math.log10(d/5));
            //     });
            // })

        // マップ内に文字を追加
        if(drawstring==true) {
            heatMap.enter()
                .append("text")	// text要素を追加
                .attr("class", "name")	// CSSクラスを追加
                .attr("x", function (d, i) { // X座標を設定
                    return (i % dataWidth) * blockSize + blockSize / 2;
                })
                .attr("y", function (d, i) { // Y座標を設定
                    return Math.floor(i / dataWidth) * blockSize + blockSize / 2;
                })
                .attr("text-anchor", "middle")
                .attr("fill", "black")
                .attr("dy", "0.35em")	// 表示位置を調整
                .text(function (d, i) {  // 文字を表示する
                    return d;	// 領域内に表示する文字を返す
                })
        }

        heatMap.enter()
            .append("rect")  // rect要素を追加
            .call(function(elements){
                elements.each(function(d,i){
                    svgary.push(d3.select(this));
                })
            })
            // .attr("class", "block")	// CSSクラスを追加
            .attr("class",function(d, i) { // X座標を設定
                return "block x" + (i % dataWidth) + " y" + parseInt(i / dataWidth);
            })
            // .attr("class",function(d, i) { // X座標を設定
            //     return "y" + (i / dataWidth);
            // })
            .attr("x", function(d, i) { // X座標を設定
                return (i % dataWidth) * blockSize;
            })
            .attr("y", function(d, i) { // Y座標を設定
                return Math.floor(i/dataWidth)*blockSize;
            })
            .attr("width", function(d, i) {	// 横幅を設定
                return blockSize;
            })
            .attr("height", function(d, i) {	// 縦幅を設定
                return blockSize;
            })
            .style("fill", function(d, i){	// 色を表示
                	    if(d == 0) return "#9599ff";
                	    if(d==1) return "#e1e9ff"
                	    // if(d > 10) return color(1);
                		return color(Math.log10(d/5));
                	})
            .style("fill-opacity","0.0")
            .attr("stroke-width",0)
            .on("mouseover", function(d,i){
                // console.log("aaa");
                document.getElementById("headfix").innerHTML = d;
                let cx = i % dataWidth;
                let cy = parseInt(i / dataWidth);
                for(let j=0;j<cx;j++){
                    svgary[cy*dataWidth+j].attr("style","fill:rgb(0,255,0)")
                        .style("fill-opacity","0.3");
                    if(cy-cx+j >= 0) svgary[(cy-cx+j)*dataWidth+j].attr("style","fill:rgb(0,255,0)")
                        .style("fill-opacity","0.3");

                }
                for(let j=0;j<cy;j++){
                    svgary[j*dataWidth+cx].attr("style","fill:rgb(0,255,0)")
                        .style("fill-opacity","0.3");
                }
                // d3.selectAll(".x"+(i % dataWidth)).attr("style","fill:rgb(0,255,0)")
                //     .style("fill-opacity","0.3");
                // d3.selectAll(".y"+cy).attr("style","fill:rgb(0,255,0)").style("fill-opacity","0.3");
            })
            .on("mouseout",function(d,i){
                // d3.selectAll(".x"+(i % dataWidth)).style("fill-opacity","0.0")
                // d3.selectAll(".y"+cy).style("fill",function(d, i){	// 色を表示
                //     if(d == 0) return "#9599ff";
                //     if(d==1) return "#e1e9ff"
                //     // if(d > 10) return color(1);
                //     return color(Math.log10(d/5));
                // });
                let cx = i % dataWidth;
                let cy = parseInt(i / dataWidth);
                for(let j=0;j<cx;j++){
                    svgary[cy*dataWidth+j].attr("style","fill:rgb(0,255,0)")
                        .style("fill-opacity","0.0");
                    if(cy-cx+j >= 0) svgary[(cy-cx+j)*dataWidth+j].attr("style","fill:rgb(0,255,0)")
                        .style("fill-opacity","0.0");

                }
                for(let j=0;j<cy;j++){
                    svgary[j*dataWidth+cx].attr("style","fill:rgb(0,255,0)")
                        .style("fill-opacity","0.0");
                }
            })

    }
    // // d3イベント内でないと機能しない
    // d3.select( "#myGraph" ).on( "click", function() {
    //
    //     // 対象となる要素を取得
    //     var element = document.getElementById( "myGraph" ) ;
    //
    //     // 要素内におけるマウス座標を取得
    //     // ( この場合、[this]でも受け入れてくれます )
    //     var coordinates = d3.mouse( element ) ;
    //     // console.log(coordinates[0]/blockSize);
    //     // console.log(dataSet[parseInt(coordinates[1]/blockSize)*dataWidth+parseInt(coordinates[0]/blockSize)]);
    //     document.getElementById("headfix").innerHTML = '('+ parseInt(coordinates[0]/blockSize)+','+parseInt(coordinates[1]/blockSize)+
    //         ') = '+
    //         dataSet[parseInt(coordinates[1]/blockSize)*dataWidth+parseInt(coordinates[0]/blockSize)];
    // } ) ;
    // ボタンにイベントを割り当て
    // document.getElementById("sizeUP").onclick = function(){
    //     blockSize=6;
    //     svgary = [];
    //     drawstring = false;
    //     console.log("AAA");
    //     heatMap.remove();
    //     drawHeatMap();
    // }
    $(function() {
        $('#mode input[type=radio]').change( function() {
            console.log(this.value);
            if(this.value === "normal"){
                blockSize=30;
                drawstring = true;
            }else if(this.value === "tiny"){
                blockSize=6;
                drawstring = false;
            }else if(this.value === "huge"){
                blockSize=60;
                drawstring = true;
            }

            svgary = [];

            console.log("AAA");
            heatMap.remove();
            drawHeatMap();
        });
    })
    // mouseover時の動作

})();

