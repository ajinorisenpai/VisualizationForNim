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
	// データを読み込む
	d3.text("out_100_100_mankara1.csv", function(error, plainText){
		let data = d3.csv.parseRows(plainText);
		console.log(data);
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
        ColmnFix = d3.select("#colmnfix")
            .selectAll("rect");
        ColmnFix.enter()
            .append("rect")
            .attr("class","block")
            .attr("x",function(d,i){
                return (i % dataWidth) * blockSize;
            })
    }
	// ヒートマップを表示する関数
	function drawHeatMap(){
		// ヒートマップに表示するカラーを自動計算
		color = d3.interpolate("#ffffff", "#ffaaaa");	// 青色から黄色に補間

        maxValue = d3.max(dataSet);	// 最大値を求める

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
        heatMap.enter()
            .append("text")	// text要素を追加
            .attr("class", "name")	// CSSクラスを追加
            .attr("x", function(d, i) { // X座標を設定
                return (i % dataWidth) * blockSize + blockSize/2;
            })
            .attr("y", function(d, i) { // Y座標を設定
                return Math.floor(i/dataWidth)*blockSize + blockSize/2;
            })
            .attr("text-anchor","middle")
            .attr("fill","black")
            .attr("dy", "0.35em")	// 表示位置を調整
            .text(function(d, i) {  // 文字を表示する
                return d;	// 領域内に表示する文字を返す
            })

        heatMap.enter()
            .append("rect")  // rect要素を追加
            .call(function(elements){
                elements.each(function(d,i){
                    rectlists.push()
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
                    d3.selectAll(".x"+j).filter(".y"+cy).attr("style","fill:rgb(0,255,0)")
                        .style("fill-opacity","0.3");
                    d3.selectAll(".x"+j).filter(".y"+parseInt(cy-cx+j)).attr("style","fill:rgb(0,255,0)")
                        .style("fill-opacity","0.3");

                }
                for(let j=0;j<cy;j++){
                    d3.selectAll(".y"+j).filter(".x"+cx).attr("style","fill:rgb(0,255,0)")
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
                    d3.selectAll(".x"+j).filter(".y"+cy).attr("style","fill:rgb(0,255,0)")
                        .style("fill-opacity","0.0");
                    d3.selectAll(".x"+j).filter(".y"+parseInt(cy-cx+j)).attr("style","fill:rgb(0,255,0)")
                        .style("fill-opacity","0.0");

                }
                for(let j=0;j<cy;j++){
                    d3.selectAll(".y"+j).filter(".x"+cx).attr("style","fill:rgb(0,255,0)")
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
    document.getElementById("add").onclick = function(){
        blockSize+=1;
        // color = d3.interpolateHsl("black", "yellow");	// 青色から黄色に補間
		heatMap.data(dataSet)
        
        .attr("x", function(d, i) { // X座標を設定
				return (i % 300) * blockSize;
			}) 
			.attr("y", function(d, i) { // Y座標を設定
				return Math.floor(i/300)*blockSize;
			})
			.attr("width", function(d, i) {	// 横幅を設定
				return blockSize;
			})
			.attr("height", function(d, i) {	// 縦幅を設定
				return blockSize;
			})
		.style("fill", function(d, i){	// 色を表示
			return color(d/maxValue);
		})
    }
    // mouseover時の動作

})();

