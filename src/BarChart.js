import React from "react";
import { ResponsiveBar } from "@nivo/bar";

// It's not necessary to have 3 separate chart functions. A future iteration could eliminate redundant code consolidate into one
// The differences between the charts could be applied where implemented.

export function StarshipCostChart ({data}) {
    return (
        <ResponsiveBar
            data={data}
            keys={["starship_cost"]}
            indexBy="title"
            margin={{ top: 50, right: 130, bottom: 50, left: 120 }}
            valueScale={{type: "linear"}}
            axisBottom={{
                legend: "Film",
                legendPosition: "middle",
                legendOffset: 32
            }}
            axisLeft={{
                legend: "cost (millions of credits)",
                legendPosition: "middle",
                legendOffset: -80
            }}
        />
    );
}

export function StarshipCostChartWithoutDeathStar ({data}) {
    return (
        <ResponsiveBar
            data={data}
            keys={["total_cost_no_ds"]}
            indexBy="title"
            margin={{ top: 50, right: 130, bottom: 50, left: 60 }}
            valueScale={{type: "linear"}}
            axisBottom={{
                legend: "Film",
                legendPosition: "middle",
                legendOffset: 32
            }}
            axisLeft={{
                legend: "cost (millions of credits)",
                legendPosition: "middle",
                legendOffset: -40
            }}
        />
    );
}

export function StarshipCountsChart ({data}) {
    return (
        <ResponsiveBar
            data={data}
            keys={["known_cost_count", "unknown_cost_count"]}
            indexBy="title"
            margin={{ top: 50, right: 220, bottom: 50, left: 60 }}
            valueScale={{type: "linear"}}
            axisBottom={{
                legend: "Film",
                legendPosition: "middle",
                legendOffset: 32
            }}
            axisLeft={{
                legend: "# of starships",
                legendPosition: "middle",
                legendOffset: -40
            }}
            legends={[
                {
                    dataFrom: "keys",
                    anchor: "bottom-right",
                    direction: "column",
                    justify: false,
                    translateX: 100,
                    translateY: 0,
                    itemsSpacing: 2,
                    itemWidth: 100,
                    itemHeight: 20,
                    itemDirection: "left-to-right",
                    itemOpacity: 0.85,
                    symbolSize: 20,
                    effects: [
                        {
                            on: "hover",
                            style: {
                                itemOpacity: 1
                            }
                        }
                    ]
                }
            ]}
        />
    );
}