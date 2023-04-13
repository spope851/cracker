import { Ratings } from "@/types"
import { ResponsivePie } from "@nivo/pie"
import React from "react"

const PieChart: React.FC<{
  data: Ratings
}> = ({
  data: { countNegTwo, countNegOne, countZero, countPlusOne, countPlusTwo },
}) => {
  const pieData = [
    {
      id: "-2",
      label: "not very good (-2)",
      value: countNegTwo,
      color: "red",
    },
    {
      id: "0",
      label: "meh (0)",
      value: countZero,
      color: "yellow",
    },
    {
      id: "+1",
      label: "great (+1)",
      value: countPlusOne,
      color: "paleGreen",
    },
    {
      id: "-1",
      label: "not great (-1)",
      value: countNegOne,
      color: "lightCoral",
    },
    {
      id: "+2",
      label: "excellent (+2)",
      value: countPlusTwo,
      color: "lime",
    },
  ]

  return (
    <ResponsivePie
      data={pieData}
      colors={{ datum: "data.color" }}
      margin={{ top: 20, right: 60, bottom: 0, left: 60 }}
      innerRadius={0.5}
      padAngle={0.7}
      cornerRadius={3}
      activeOuterRadiusOffset={8}
      borderWidth={1}
      borderColor={{
        from: "color",
        modifiers: [["darker", 0.2]],
      }}
      arcLinkLabelsSkipAngle={10}
      arcLinkLabelsTextColor="#333333"
      arcLinkLabelsThickness={2}
      arcLinkLabelsColor={{ from: "color" }}
      arcLabelsSkipAngle={10}
      arcLabelsTextColor={{
        from: "color",
        modifiers: [["darker", 2]],
      }}
    />
  )
}

export default PieChart
