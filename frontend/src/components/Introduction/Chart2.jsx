import { useState, useRef } from "react";
import { Bar } from "react-chartjs-2";
import "chart.js/auto"; // ADD THIS

export const Chart2 = () => {
  const ref = useRef();

  const data = {
    labels: [
      "제품을 구매하거나 행동할 때 친환경적인 대안이 없거나 품질이 떨어진다", "친환경적인 행동은 시간이 많이 소비된다", "환경에 나쁜 영향을 주는 행동들이 이미 습관이 되어 바꾸기 어렵다", "친환경적인 행동은 비용이 많이 든다", "친환경적인 행동이 나의 건강에는 오히려 해가 될 수 있다", "친환경 행동을 실천하고 싶지만 방법을 잘 모른다", "친환경적 행동을 해도 환경문제가 개선되지 않을 것이라 실천의 필요를 못 느낀다","주변 사람들이 친환경적으로 행동하는 것을 비웃거나 무시한다", "기타"
    ],
    datasets: [
      {
        label: "단위: %",
        data: [
          44.1, 43.7, 41, 36.3, 33.6, 23.6, 17.9, 11.2, 1.8
        ],
        fill: true,
        backgroundColor: [
          'rgba(255, 99, 132, 0.3)',
          'rgba(54, 162, 235, 0.3)',
          'rgba(255, 206, 86, 0.3)',
          'rgba(75, 192, 192, 0.3)',
          'rgba(153, 102, 255, 0.3)',
          'rgba(255, 159, 64, 0.3)',
          'rgba(120, 159, 64, 0.3)',
          'rgba(220, 159, 64, 0.3)',
          'rgba(120, 80, 64, 0.3)'
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)',
          'rgba(120, 159, 64, 1)',
          'rgba(220, 159, 64, 1)',
          'rgba(120, 80, 64, 1)'
        ],
        borderWidth: 1,
      },
    ]
  };

  const options = {
    options: {indexAxis: 'y'}
  };

  return <Bar ref={ref} data={data} options={options.options} />;
};
export default Chart2;