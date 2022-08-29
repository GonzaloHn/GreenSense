$(document).ready(function(){
const line_energy = $('#line-chart-energy');
const line_chart_energy = new Chart(line_energy, {
    type: 'line',
    data: {
        labels: ["a", "b", "c", "d", "e", "f", "g"],
        datasets: [{
            label: 'My First Dataset',
            data: [65, 59, 80, 81, 56, 55, 40],
            fill: false,
            borderColor: 'rgb(241, 198, 7)',
            tension: 0.1
        }]
    },
    options: {
        scales: {
            y: {
                beginAtZero: true
            }
        },
        plugins: {
            legend: {
                display: false
            }
        },
    },
});

const line_air = $('#line-chart-air');
const line_chart_air = new Chart(line_air, {
    type: 'line',
    data: {
        labels: ["aa", "bb", "cc", "dd", "ee", "ff", "gg"],
        datasets: [{
            label: 'My First Dataset',
            data: [70, 13, 1, 1, 1, 100, 30],
            fill: false,
            borderColor: 'rgb(51, 255, 215)',
            tension: 0.1
        }]
    },
    options: {
        scales: {
            y: {
                beginAtZero: true
            }
        },
        plugins: {
            legend: {
                display: false
            }
        },
    },
});

const line_weight = $('#line-chart-weight');
const line_chart_weight = new Chart(line_weight, {
    type: 'line',
    data: {
        labels: ["aaa", "bbb", "ccc", "ddd", "eee", "fff", "ggg"],
        datasets: [{
            label: 'My First Dataset',
            data: [30, 50, 89, 69, 10, 0, 40],
            fill: false,
            borderColor: 'rgb(241, 7, 7)',
            tension: 0.1
        }]
    },
    options: {
        scales: {
            y: {
                beginAtZero: true
            }
        },
        plugins: {
            legend: {
                display: false
            }
        },
    },
});
$("#hide-a-g").hide();
$("#hide-t-g").hide();

$("#change-g").click(function(){
    if ($("#hide-e-g").is(":visible")){
        $("#hide-e-g").hide();
        $("#hide-a-g").show();
        $("#hide-a-g").removeClass("none");
    }
    else if ($("#hide-a-g").is(":visible")){
        $("#hide-a-g").hide();
        $("#hide-t-g").show();
    }
    else if ($("#hide-t-g").is(":visible")){
        $("#hide-t-g").hide();
        $("#hide-e-g").show();
    }
});
});