
var firestore = firebase.firestore()
// var reason_of_death = "brain stroke"
// async function showReasonDropDown()
// {
//   var reason_data = await firestore.collection("reasons").get();
//   var options = ""
//   reason_data.forEach(doc=>
//     {
//         options += `<option value="${doc.data().reason}">${doc.data().reason}</option>`
//     })
//     console.log(options)
//   var dropdown_reason = document.querySelector('.dropdown_reason')
//   dropdown_reason.innerHTML = `
//   <h4>Filter by Reason of death</h4>
//   <select>
//   ${options}
//   </select>
//   `
//   var elems = document.querySelectorAll('select');
// M.FormSelect.init(elems);
// }
async function initChart()
{
//    showReasonDropDown()
    var querySnapshotMale = await firestore.collection("death_records").where("sex","==","male").get()
    var querySnapshotFemale = await firestore.collection("death_records").where("sex","==","female").get()
    show_sex_chart([{"sex":"Male","count":querySnapshotMale.docs.length},{"sex":"Female","count":querySnapshotFemale.docs.length}])
    var querySnapshot0_30 = await firestore.collection("death_records").where("age",">=",0).where("age","<=",20).get()
    var querySnapshot30_50 = await firestore.collection("death_records").where("age",">",20).where("age","<=",50).get()
    var querySnapshot50_110 = await firestore.collection("death_records").where("age",">",50).where("age","<=",110).get()
    // console.log(querySnapshot0_30.docs.length)
    // console.log(querySnapshot30_50.docs.length)
    // console.log(querySnapshot50_110.docs.length)
    show_age_chart([{"type":"Teen","count":querySnapshot0_30.docs.length},{"type":"Adult","count":querySnapshot30_50.docs.length},{"type":"Old","count":querySnapshot50_110.docs.length}])
var querySnapshotReasonOfDeath = await firestore.collection("reasons").get()
var datas = []
var data = querySnapshotReasonOfDeath.forEach(async(doc)=>{
var d =  await firestore.collection("death_records").where("reason","==",doc.data().reason).get()
datas.push({"reason":doc.data().reason,"count":d.docs.length})
show_reason_of_death_chart(datas)
})
var querySnapshotResident = await firestore.collection("residents").get()
var datas = []
var data = querySnapshotResident.forEach(async(doc)=>{
var d =  await firestore.collection("death_records").where("resident","==",doc.data().resident).get()
datas.push({"resident":doc.data().resident,"count":d.docs.length})
show_resident_chart(datas)
})
} 
function show_reason_of_death_chart(data) {
    am4core.ready(function() {
        
        // Themes begin
        am4core.useTheme(am4themes_animated);
        // Themes end
        
        var chart = am4core.create("chartdiv_reason", am4charts.XYChart);
        chart.padding(40, 40, 40, 40);
        // console.log(data)
        chart.data = data
        var categoryAxis = chart.yAxes.push(new am4charts.CategoryAxis());
        categoryAxis.renderer.grid.template.location = 0;
        categoryAxis.dataFields.category = "reason";
        categoryAxis.renderer.minGridDistance = 1;
        categoryAxis.renderer.inversed = true;
        categoryAxis.renderer.grid.template.disabled = true;
        
        var valueAxis = chart.xAxes.push(new am4charts.ValueAxis());
        valueAxis.min = 0;
        
        var series = chart.series.push(new am4charts.ColumnSeries());
        series.dataFields.categoryY = "reason";
        series.dataFields.valueX = "count";
        series.tooltipText = "{valueX.value}"
        series.columns.template.strokeOpacity = 0;
        series.columns.template.column.cornerRadiusBottomRight = 5;
        series.columns.template.column.cornerRadiusTopRight = 5;
        
        var labelBullet = series.bullets.push(new am4charts.LabelBullet())
        labelBullet.label.horizontalCenter = "left";
        labelBullet.label.dx = 10;
        labelBullet.label.text = "{values.valueX.workingValue.formatNumber('#.0as')}";
        labelBullet.locationX = 1;
        
        // as by default columns of the same series are of the same color, we add adapter which takes colors from chart.colors color set
        series.columns.template.adapter.add("fill", function(fill, target){
          return chart.colors.getIndex(target.dataItem.index);
        });
        
        categoryAxis.sortBySeries = series;
       

        
        }); 
}
function show_resident_chart(data) {
    am4core.ready(function() {
        
        // Themes begin
        am4core.useTheme(am4themes_animated);
        // Themes end
        
        var chart = am4core.create("chartdiv_resident", am4charts.XYChart);
        chart.padding(40, 40, 40, 40);
        console.log(data)
        chart.data = data
        var categoryAxis = chart.yAxes.push(new am4charts.CategoryAxis());
        categoryAxis.renderer.grid.template.location = 0;
        categoryAxis.dataFields.category = "resident";
        categoryAxis.renderer.minGridDistance = 1;
        categoryAxis.renderer.inversed = true;
        categoryAxis.renderer.grid.template.disabled = true;
        
        var valueAxis = chart.xAxes.push(new am4charts.ValueAxis());
        valueAxis.min = 0;
        
        var series = chart.series.push(new am4charts.ColumnSeries());
        series.dataFields.categoryY = "resident";
        series.dataFields.valueX = "count";
        series.tooltipText = "{valueX.value}"
        series.columns.template.strokeOpacity = 0;
        series.columns.template.column.cornerRadiusBottomRight = 5;
        series.columns.template.column.cornerRadiusTopRight = 5;
        
        var labelBullet = series.bullets.push(new am4charts.LabelBullet())
        labelBullet.label.horizontalCenter = "left";
        labelBullet.label.dx = 10;
        labelBullet.label.text = "{values.valueX.workingValue.formatNumber('#.0as')}";
        labelBullet.locationX = 1;
        
        // as by default columns of the same series are of the same color, we add adapter which takes colors from chart.colors color set
        series.columns.template.adapter.add("fill", function(fill, target){
          return chart.colors.getIndex(target.dataItem.index);
        });
        
        categoryAxis.sortBySeries = series;

        
        
        
        }); 
}
function show_sex_chart(data)
{
    am4core.ready(function() {

        // Themes begin
        am4core.useTheme(am4themes_animated);
        // Themes end
        
        // Create chart instance
        var chart = am4core.create("chartdiv_sex", am4charts.PieChart);
        
        // Add data
        // chart.data = [ {
        //   "sex": "Male",
        //   "count": 501
        // },
        // {
        //   "sex": "Female",
        //   "count": 51
        // } ];
        chart.data = data
        // Set inner radius
        chart.innerRadius = am4core.percent(50);
        
        // Add and configure Series
        var pieSeries = chart.series.push(new am4charts.PieSeries());
        pieSeries.dataFields.value = "count";
        pieSeries.dataFields.category = "sex";
        pieSeries.slices.template.stroke = am4core.color("#fff");
        pieSeries.slices.template.strokeWidth = 2;
        pieSeries.slices.template.strokeOpacity = 1;
        
        // This creates initial animation
        pieSeries.hiddenState.properties.opacity = 1;
        pieSeries.hiddenState.properties.endAngle = -90;
        pieSeries.hiddenState.properties.startAngle = -90;
        
        }); // end am4core.ready()
} 
function show_age_chart(data)
{
    am4core.ready(function() {

        // Themes begin
        am4core.useTheme(am4themes_animated);
        // Themes end
        
        // Create chart instance
        var chart = am4core.create("chartdiv_age", am4charts.PieChart);
        
        // Add data
        // chart.data = [ {
        //   "sex": "Male",
        //   "count": 501
        // },
        // {
        //   "sex": "Female",
        //   "count": 51
        // } ];
        chart.data = data
        // Set inner radius
        chart.innerRadius = am4core.percent(50);
        
        // Add and configure Series
        var pieSeries = chart.series.push(new am4charts.PieSeries());
        pieSeries.dataFields.value = "count";
        pieSeries.dataFields.category = "type";
        pieSeries.slices.template.stroke = am4core.color("#fff");
        pieSeries.slices.template.strokeWidth = 2;
        pieSeries.slices.template.strokeOpacity = 1;
        
        // This creates initial animation
        pieSeries.hiddenState.properties.opacity = 1;
        pieSeries.hiddenState.properties.endAngle = -90;
        pieSeries.hiddenState.properties.startAngle = -90;
        
        }); // end am4core.ready()
} 

