import { useState, useRef } from "react";
import { Bar } from "react-chartjs-2";
import "chart.js/auto"; // ADD THIS

export const Chart2 = () => {
  const ref = useRef();

  const data = {
    labels: [
        //x 축
        "기타", "주변 사람들이 친환경적으로 행동하는 것을 비웃거나 무시한다", "친환경적 행동을 해도 환경문제가 개선되지 않을 것이라 실천의 필요를 못 느낀다", "친환경 행동을 실천하고 싶지만 방법을 잘 모른다", "친환경적인 행동이 나의 건강에는 오히려 해가 될 수 있다(예: 미세먼지 많은 날 걸어서 이동)", "환경에 나쁜 영향을 주는 행동들이 이미 습관이 되어 바꾸기 어렵다", "친환경적인 행동은 비용이 많이 든다", "친환경적인 행동(예: 대중교통 이용)은 시간이 많이 소비된다", "제품을 구매하거나 행동할 때 친환경적인 대안이 없거나 품질이 떨어진다"
    ],
    datasets: [
      {
        label: "",
        data: [
            1.8, 11.2, 17.9, 23.6, 33.6, 36.3, 41, 43.7, 44.1
        ],
        fill: true,
        borderWidth: 1, //경계선 굵기
      },
    ]
  };

  const options = {
    options: {indexAxis: 'y'},
  };

  return <Bar ref={ref} data={data} options={options.options} />;
};
export default Chart2;