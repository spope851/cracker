import { DashboardDataset } from "@/types"
import { ResponsivePie } from "@nivo/pie"
import React from "react"

const PieChart: React.FC<{
  data: Partial<DashboardDataset>
}> = ({ data: { neg2, neg1, zero, one, two } }) => {
  const pieData = [
    {
      id: "-2",
      label: "not very good (-2)",
      value: neg2,
      color: "red",
    },
    {
      id: "0",
      label: "meh (0)",
      value: zero,
      color: "yellow",
    },
    {
      id: "+1",
      label: "great (+1)",
      value: one,
      color: "paleGreen",
    },
    {
      id: "-1",
      label: "not great (-1)",
      value: neg1,
      color: "lightCoral",
    },
    {
      id: "+2",
      label: "excellent (+2)",
      value: two,
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
