// 막대 차트 그리는 코드

import { Doughnut } from "react-chartjs-2";

function testChart() {
    const expData = {
        labels: ["긍정적", "부정적", "보통"],
        datasets: [
            {
            labels: ["긍정적", "부정적", "보통"],
            data: [60, 13, 27],
            borderWidth: 2,
            hoverBorderWidth: 3,
            backgroundColor: [
                "rgba(238, 102, 121, 1)",
                "rgba(98, 181, 229, 1)",
                "rgba(255, 198, 0, 1)"
            ],
            fill: true
            }
        ]
    };

    return (
        <Doughnut
            options={{
            legend: {
                display: true,
                position: "right"
            }
            }}
            data={expData}
            height={120}
        />
    );
}

export default testChart;