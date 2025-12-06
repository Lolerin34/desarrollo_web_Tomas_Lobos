document.addEventListener("DOMContentLoaded", async () => {
  try {
    const resp = await fetch("/api/estadisticas");
    if (!resp.ok) throw new Error("No se pudo cargar /api/estadisticas");
    const data = await resp.json();

    console.log("Datos recibidos:", data);

    // Gráfico de línea: Avisos por día
    Highcharts.chart("lineChart", {
      chart: { type: "line", backgroundColor: "#fefefe" },
      title: { text: "Avisos por día" },
      xAxis: {
        type: "category",
        title: { text: "Fecha" },
        labels: { rotation: -45 },
      },
      yAxis: { title: { text: "Cantidad de avisos" } },
      series: [{
        name: "Avisos",
        color: "#0077b6",
        data: data.line.map(p => [p.name, p.y])
      }],
      credits: { enabled: false },
    });

    // Gráfico de torta: Distribución por tipo
    Highcharts.chart("pieChart", {
      chart: { type: "pie", backgroundColor: "#fefefe" },
      title: { text: "Distribución por tipo" },
      tooltip: { pointFormat: "<b>{point.percentage:.1f}%</b> ({point.y} avisos)" },
      accessibility: { point: { valueSuffix: "%" } },
      plotOptions: {
        pie: {
          allowPointSelect: true,
          cursor: "pointer",
          dataLabels: {
            enabled: true,
            format: "<b>{point.name}</b>: {point.y}"
          }
        }
      },
      series: [{
        name: "Cantidad",
        colorByPoint: true,
        data: data.pie
      }],
      credits: { enabled: false },
    });

    // Gráfico de barras: Avisos por mes y tipo
    const series = Object.entries(data.bars).map(([tipo, arr]) => ({
      name: tipo,
      data: arr.map(x => [x.name, x.y])
    }));

    Highcharts.chart("barChart", {
      chart: { type: "column", backgroundColor: "#fefefe" },
      title: { text: "Avisos por mes y tipo" },
      xAxis: {
        type: "category",
        title: { text: "Mes" },
        labels: { rotation: -45 }
      },
      yAxis: { title: { text: "Cantidad" } },
      tooltip: { shared: true },
      series,
      credits: { enabled: false },
    });
  } catch (err) {
    console.error("Error cargando estadísticas:", err);
    alert("Error cargando los gráficos de estadísticas.");
  }
});
