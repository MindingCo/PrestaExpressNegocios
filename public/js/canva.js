var cant= document.getElementById('valu').innerHTML;
var ctx = document.getElementById('myChart').getContext('2d');
var myChart = new Chart(ctx, {
  type: 'line',
  data: {
    labels: ['Vie.8,Noviembre 2018', 'Sab.9,Noviembre 2018', 'Dom.10,Noviembre 2018', 'Lun.11,Noviembre 2018', 'Mar.12,Noviembre 2018', 'Mie.13,Noviembre 2018', 'Jue.14,Noviembre 2018'],
    datasets: [{
      label: 'Pagos Clientes',
      data: [cant,150,250,180,100,50,190],
      backgroundColor: "rgba(255,153,0,0.2)",
      borderColor: "rgba(179,11,198,1)",
    }]
  }
});
