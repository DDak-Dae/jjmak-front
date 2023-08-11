import React, { useEffect, useRef } from "react";
import * as d3 from "d3";
import cloud from "d3-cloud";

function WordCloud({ wordCloudList }) {
  const wordCloudRef = useRef(null);
  const svgRef = useRef(null);
  const wordGRef = useRef(null); // 새로운 useRef 추가

  useEffect(() => {
    console.log(wordCloudList);
    const data = wordCloudList;
    // const data = [
    //   '게임', '게임개발', '어드레서블', '유니티', '몬스터',
    //   '애니메이션', '개발자', '클래스', '컴포넌트', '브로드케스팅'
    // ];

    const words = data.map((word, index) => ({
      text: word,
      size: 55 - index * 5,
      color: `rgb(${Math.random() * 85 + 85}, ${Math.random() * 85 + 85}, ${
        Math.random() * 85 + 85
      })`,
    }));

    // 워드클라우드 생성
    const wordCloudLayout = cloud()
      .size([390, 390])
      .words(words)
      .padding(5)
      .rotate(() => 0)
      .fontSize((d) => d.size)
      .on("end", draw);

    wordCloudLayout.start();

    // 워드클라우드 그리기
    function draw(words) {
      const wordG = d3.select(wordGRef.current); // 기존의 <g> 요소를 선택

      // 기존의 워드클라우드 삭제
      wordG.selectAll("*").remove();

      // 새로운 워드클라우드 그리기
      const newWordG = wordG
        .selectAll("text")
        .data(words)
        .enter()
        .append("text")
        .style("font-size", (d) => d.size + "px")
        .style("fill", (d) => d.color)
        .style("font-weight", "bold")
        .attr("text-anchor", "middle")
        .attr(
          "transform",
          (d) => `translate(${d.x}, ${d.y})rotate(${d.rotate})`
        )
        .text((d) => d.text);

      // 애니메이션 추가 (선택적 사용)
      newWordG
        .style("opacity", 0)
        .transition()
        .duration(1000)
        .delay((d, i) => i * 30)
        .style("opacity", 1);
    }
  }, [wordCloudList]);

  return (
    <div id="wordcloud" ref={wordCloudRef}>
      <svg ref={svgRef} style={{ width: "100%", height: "40vh" }}>
        <g ref={wordGRef} transform="translate(190, 200)" />
      </svg>
    </div>
  );
}

export default WordCloud;

// const data = [
//   '게임', '게임개발', '어드레서블', '유니티', '몬스터',
//   '애니메이션', '개발자', '클래스', '컴포넌트', '브로드케스팅'
// ];
