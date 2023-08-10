import '../../Styles/Tree.css'
import React, { useLayoutEffect, useEffect, useState } from "react";
import { GetTreeData, SelectedContext } from "../../services/api";
import * as am5 from "@amcharts/amcharts5";
import * as am5hierarchy from "@amcharts/amcharts5/hierarchy";
import am5themes_Animated from "@amcharts/amcharts5/themes/Animated";
import { useNavigate } from "react-router-dom";
import ChatLog from "./ChatLog";
import HistoryBar from './HistoryBar';

function Tree() {
  const [treeData, setTreeData] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [selectedId, setSeletedId] = useState("");
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [chatLog, setChatLog] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const fetchedTreeData = await GetTreeData();
        console.log(fetchedTreeData);
        setTreeData(fetchedTreeData);
        setIsLoading(false); // Data loading is complete
      } catch (error) {
        console.error("데이터를 불러오는 중 오류가 발생했습니다:", error);
        setIsLoading(false); // Data loading is complete (even in case of error)
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    if (!isLoading) {
      // Execute graph-related code only when data loading is complete
      let root = am5.Root.new("chartdiv");
      const myTheme = am5.Theme.new(root);

      myTheme.rule("Label").setAll({
        fill: am5.color(0xff0000),
        fontSize: "1em",
      });

      root.setThemes([am5themes_Animated.new(root), myTheme]);

      var container = root.container.children.push(
        am5.Container.new(root, {
          width: am5.percent(100),
          height: am5.percent(100),
          layout: root.verticalLayout,
        })
      );

      // Create series
      var series = container.children.push(
        am5hierarchy.Tree.new(root, {
          singleBranchOnly: false,
          downDepth: 1,
          initialDepth: Infinity,
          valueField: "value",
          categoryField: "question",
          childDataField: "childs",
          paddingTop: "3",
          paddingBottom: "100",
        })
      );

      series.circles.template.setAll({
        radius: 25,
      });
      series.outerCircles.template.setAll({
        radius: 26.1,
      });
      series.nodes.template.setAll({
        draggable: true,
      });
      series.nodes.template.set(
        "tooltipText",
        "question: {question} \n\n\n answer: [bold]{answer}[/]"
      );
      series.nodes.template.setAll({
        toggleKey: "none",
        // cursorOverStyle: "default",
      });
      // series
      //   .get("colors")
      //   .set("colors", [
      //     am5.color(0x095256),
      //     am5.color(0x087f8c),
      //     am5.color(0x5aaa95),
      //     am5.color(0x86a873),
      //     am5.color(0xbb9f06),
      //   ]);

      series.nodes.template.events.on("click", function (ev) {
        console.log(ev.target.dataItem.dataContext.question);
        console.log(ev.target.dataItem.dataContext.answer);
        setChatLog({
          question: ev.target.dataItem.dataContext.question,
          answer: ev.target.dataItem.dataContext.answer,
        });
        setIsChatOpen(true);
      });
      series.nodes.template.events.on("dblclick", function (ev) {
        console.log(ev.target.dataItem.dataContext.id);
        setSeletedId(ev.target.dataItem.dataContext.id);
      });

      series.data.setAll([treeData]);
      series.set("selectedDataItem", series.dataItems[0]);

      series.appear(1000, 100);

      return () => {
        root.dispose();
      };
    }
  }, [isLoading, treeData]);

  useEffect(() => {
    if (selectedId) {
      SelectedId();
    }
  }, [selectedId]);

  const SelectedId = async () => {
    try {
      const response = await SelectedContext(selectedId);
      console.log(response);

      navigate(`/channel/${response.channelId}`, {
        state: {
          msgId: selectedId,
        },
      });
    } catch (error) {
      console.error("데이터를 서버로 전송하는 중 오류가 발생했습니다:", error);
    }
  };

  return (
    <div className="HistoryWrap">
      <div className="HistoryBar">
        <HistoryBar />
      </div>

      <div className="HistoryMainWrap">
        <div id="chartdiv"></div>
        {isChatOpen && (
          <ChatLog chatLog={chatLog} setIsChatOpen={setIsChatOpen} />
        )}
      </div>
    </div>
  );
}
export default Tree;


// <div id="chartdiv"></div>
//         {isChatOpen && (
//           <ChatLog chatLog={chatLog} setIsChatOpen={setIsChatOpen} />
//         )}

// <div style={{ display: "flex" }}>
//       <div
//         id="chartdiv"
//         style={{ width: "100%", height: "80vh", marginTop: "10vh" }}
//       ></div>
//       {isChatOpen && (
//         <ChatLog chatLog={chatLog} setIsChatOpen={setIsChatOpen} />
//       )}
//     </div>