$(document).ready(function() {
    // Function to get bitcoin prices from API
    function getPrices(symbols) {
        $.ajax({
            url: 'get_price.php',
            type: 'POST',
            data: {symbols: symbols},
            success: function(response) {
                // Parse JSON response and create chart
                var data = JSON.parse(response);
                var seriesData = [];
                var xCategories = [];
                for (var symbol in data) {
                    var symbolData = [];
                    for (var timestamp in data[symbol]['quotes']) {
                        symbolData.push(data[symbol]['quotes'][timestamp]['price']);
                        if (xCategories.indexOf(timestamp) === -1) {
                            xCategories.push(timestamp);
                        }
                    }
                    seriesData.push({
                        name: symbol,
                        data: symbolData
                    });
                }
                var chartOptions = {
                    chart: {
                        type: 'line'
                    },
                    series: seriesData,
                    xaxis: {
                        categories: xCategories
                    },
                    title: {
                        text: 'Bitcoin Prices'
                    }
                };
                var chart = new ApexCharts(document.querySelector("#chart"), chartOptions);
                chart.render();
            },
            error: function() {
                alert('Error occurred while getting prices.');
            }
        });
    }
    
    // Submit form on button click
    $('form').submit(function(event) {
        event.preventDefault();
        var symbols = $('#symbols').val();
        getPrices(symbols);
    });
});
