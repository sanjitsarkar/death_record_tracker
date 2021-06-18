
var firestore = firebase.firestore()
async function initChart()
{

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

