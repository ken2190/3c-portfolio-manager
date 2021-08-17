import React, { PureComponent } from 'react';
import { parseISO, format } from 'date-fns'

import { getLang } from '@/utils/helperFunctions';
const lang = getLang()

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine } from 'recharts';
import NoData from '@/app/Pages/Stats/Components/NoData';

import { Type_ProfitChart } from '@/types/Charts';

import { CustomTooltip } from '@/app/Components/Charts/Tooltips';

const ProfitByDay = ({ data, X }:Type_ProfitChart ) => {

    const totalProfit = (data.length > 0) ? data.map(deal => deal.profit).reduce( ( sum, profit ) => sum + profit ) : 0
    const average = totalProfit / data.length



    const renderChart = () => {
        if (data.length === 0) {
            return (<NoData />)
        } else {
            return (
            <ResponsiveContainer width="100%"  height="100%" minHeight="300px">
                <BarChart
                    width={500}
                    height={300}
                    data={data}
                    margin={{
                        top: 5,
                        right: 30,
                        left: 20,
                        bottom: 5,
                    }}

                >

                    <CartesianGrid opacity={.3} vertical={false} />
                    <XAxis
                        dataKey="utc_date"
                        axisLine={false}
                        tickLine={false}
                        minTickGap={50}
                        tickFormatter={(str) => {
                            if (str == 'auto') return ""
                            // let date = parseISO(new Date(str).toISOString())
                            // return format(date, "dd-MMM", )

                            return new Date(str).toLocaleDateString(lang, { month: '2-digit', day: '2-digit' })
                        }}
                    />

                    <ReferenceLine y={average}  stroke="var(--color-primary)" strokeWidth={2} />
                    <YAxis
                        dataKey={X}
                        tickLine={false}
                        axisLine={false}
                        tickCount={6}
                        type="number"
                    />

                     {/* TODO - pass the custom props down properly here.  */}
                    {/* @ts-ignore */}
                    <Tooltip content={ <CustomTooltip />} cursor={{ strokeDasharray: '3 3' }}/>
                    <Bar type="monotone" dataKey={X} fill="var(--color-secondary-light25)" />
                </BarChart>

            </ResponsiveContainer>)
        }
    }
    return (
        <div className="boxData stat-chart" >
            <h3 className="chartTitle">Profit by day </h3>
            {renderChart()}

        </div>
    )

}

export default ProfitByDay;