import React, { useState, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend } from 'recharts';
import http from '../../util/httpCaller';

export default function UsageReport() {

    const [usageCounts, setUsageCounts] = useState([]);

    useEffect(() => {
        const today = new Date();
        const sevenDaysAgo = new Date(today);
        const endDate = new Date(today);

        sevenDaysAgo.setDate(today.getDate() - 7);
        endDate.setDate(today.getDate() + 1);

        http.post('/api/usage/statistics', {
            startDate: formatDate(sevenDaysAgo),
            endDate: formatDate(endDate)
        }).then(res => {
            const usageStatistics = res.data.statistics;

            const averageTimePerPage = usageStatistics.reduce((accumulator, stat) => {
                const { timeSpent, pageViewed } = stat;
                
                if (pageViewed) {
                    let page = pageViewed.replace('/', '');
                    page = page.charAt(0).toUpperCase() + page.slice(1);
                    if (page === '') page = "Home";

                    if (!accumulator[page]) {
                        accumulator[page] = { total: 0, count: 0 };
                    }
                  
                    accumulator[page].total += timeSpent;
                    accumulator[page].count += 1;
                }
              
                return accumulator;
            }, {});

            const averageUsageArray = Object.entries(averageTimePerPage).map(([page, { total, count }]) => ({
                page,
                averageTime: total / count
            }));

            setUsageCounts(averageUsageArray);
        }).catch(err => {
            console.error(err.message);
        })
    }, [])

    const formatDate = (date) => {
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are 0-indexed
        const day = String(date.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    };

    return (
        <div className="dashboardContainer">
            <div>
                <div className="dashboardHeader">Website Usage Statistics</div>
                <UsagesBarGraph data={usageCounts} />
            </div>
        </div>
    )
}


const UsagesBarGraph = ({ data }) => {
    return (
        <BarChart width={600} height={400} data={data}>
            <XAxis dataKey="page" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="averageTime" name="Average Time Spent" fill="#8884d8" />
        </BarChart>
    );
}