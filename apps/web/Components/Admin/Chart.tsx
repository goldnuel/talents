"use client"

import { useState, useEffect } from "react";
import dayjs from 'dayjs';
import { Label, PolarRadiusAxis, RadialBar, RadialBarChart } from "recharts";

//UI Components and Libs
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/Components/ui/card";
import { ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from "@/Components/ui/chart";


export const description = "A radial chart showing total voters between yesterday and today.";
export default function Chart({ votesToday, votesYesterday, totalUsers6Months }: ChartProps) {

    const [chartDay, setChartDay] = useState<string | null>(null);
    const chartData = [{ yesterday: votesYesterday, today: votesToday }]

    const chartConfig = {
        yesterday: {
            label: "Yesterday",
            color: "hsl(var(--chart-2))",
        },
        today: {
            label: "Today",
            color: "hsl(var(--chart-1))",
        },
    } satisfies ChartConfig
    const totalVisitors = chartData[0].yesterday + chartData[0].today

    //Functions
    useEffect(() => {
        const today = dayjs();
        const todayFormatted = today.format("D MMM");
        const yearFormatted = today.format("YYYY");

        setChartDay(`Yesterday - Today (${todayFormatted}) ${yearFormatted}`);
    }, []);

    return (
        <Card className="flex flex-col mt-5">
            <CardHeader className="items-center pb-0">
                <CardTitle>Radial Chart - Stacked</CardTitle>
                <CardDescription>{chartDay}</CardDescription>
            </CardHeader>
            <CardContent className="flex flex-1 items-center pb-0">
                <ChartContainer config={chartConfig} className="mx-auto mt-10 w-full h-[250px] aspect-square">
                    <RadialBarChart data={chartData} endAngle={180} innerRadius={100} outerRadius={180}>
                        <ChartTooltip cursor={false} content={<ChartTooltipContent hideLabel />} />
                        <PolarRadiusAxis tick={false} tickLine={false} axisLine={false}>
                            <Label
                                content={({ viewBox }) => {
                                    if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                                        return (
                                            <text x={viewBox.cx} y={viewBox.cy} textAnchor="middle">
                                                <tspan x={viewBox.cx} y={(viewBox.cy || 0) - 20} className="fill-white font-bold text-2xl md:text-3xl xl:text-4xl">
                                                    {totalVisitors.toLocaleString()}
                                                </tspan>
                                                <tspan x={viewBox.cx} y={(viewBox.cy || 0) + 8} className="fill-white">
                                                    Votes
                                                </tspan>
                                            </text>
                                        )
                                    }
                                }}
                            />
                        </PolarRadiusAxis>
                        <RadialBar dataKey="today" stackId="a" cornerRadius={8} fill={chartConfig.today.color} className="stroke-[4px] stroke-transparent" />
                        <RadialBar dataKey="yesterday" fill={chartConfig.yesterday.color} stackId="a" cornerRadius={8} className="stroke-[4px] stroke-transparent" />
                    </RadialBarChart>
                </ChartContainer>
            </CardContent>
            <CardFooter className="flex-col gap-2">
                <div className="leading-none">
                    <span className="font-semibold text-sm md:text-base xl:text-lg">{totalUsers6Months}</span> Total number of users for the last 6 months
                </div>
            </CardFooter>
        </Card>
    )
}