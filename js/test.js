(function(){
    heads = ["Id", "Name"];
    tr = d3.select("#NameList").select("thead").append("tr");
    tr.selectAll("th").data(heads).enter().append("th").text(function(d){return d;});

    datas = [[0, "山田"],[1, "鈴木"],[2, "高橋"]];
    d3.select("#NameList").select("tbody")
        .selectAll("tr")
        .data(datas)
        .enter()
        .append("tr")
        .selectAll("td")
        .data(function(row){return row;})
        .enter()
        .append("td")
        .text(function(col){return col;});          //   ↓
})();

