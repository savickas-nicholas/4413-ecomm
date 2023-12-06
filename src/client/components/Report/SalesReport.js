import React, { useState, useEffect } from 'react';
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUserPlus, faSackDollar, faHandHoldingDollar, faTags, faBuilding } from '@fortawesome/free-solid-svg-icons';
import http from '../../util/httpCaller';


export default function SalesReport() {

    const [orders, setOrders] = useState([]);
    const [brandCounts, setBrandCounts] = useState([]);

    useEffect(() => {
        http.get('/api/orders/').then(res => {
            setOrders(res.data.orders);
        }).catch(err => {
            console.error(err.message);
        })
    }, [])

    useEffect(() => { getBrandOrderCounts(); }, [orders]);

    function getCumulativeRevenue() {
        let cumulativeRevenue = 0;

        return orders.map((order) => {
            cumulativeRevenue += order.price;
            const date = new Date(order.createdAt);
            return {
                date: date.getFullYear() + "-" + date.getMonth() + "-" + date.getDay(),
                cumulativeRevenue,
            };
        });
    }

    function getBrandOrderCounts() {
        try {
            const allVehicleIds = orders.flatMap((order) => order.vehicles);
            const brandPromises = allVehicleIds.map(async (id) => {
                const res = await http.get(`/api/vehicles/${id}`);
                return res.data.vehicle.brand;
            });
            
            Promise.all(brandPromises).then(brands => {
                const brandCountMap = brands.reduce((countMap, brand) => {
                    countMap[brand] = (countMap[brand] || 0) + 1;
                    return countMap;
                }, {});

                const brandCountArray = Object.entries(brandCountMap).map(([brand, count]) => ({
                    brand,
                    count,
                }));

                setBrandCounts(brandCountArray);
            })
        } catch (err) {
            console.error(err.message);
        }
    }

    const getMinPrice = () => {
        return orders.reduce((acc, order) => { return order.price < acc ? order.price : acc }, Number.MAX_SAFE_INTEGER);
    }

    const getMaxPrice = () => {
        return orders.reduce((acc, order) => { return order.price > acc ? order.price : acc }, 0.0);
    }

    const getTotalRevenue = () => {
        return orders.reduce((acc, order) => { return acc + order.price }, 0.0);
    }

    const getAverageRevenue = () => {
        return getTotalRevenue() / Math.max(1, orders.length);
    }

    const getMostPopularBrand = () => {
        const brandCount = brandCounts.reduce((acc, brandCount) => {
            return brandCount.count > acc.count ? brandCount : acc;
        }, { brand: '', count: 0 })
        return brandCount.brand;
    }

    return (
        <div>
            <div className="dashboardContainer">
                <div className="dashboardStatistic">
                    <div className="card statisticContainer">
                        <FontAwesomeIcon icon={faUserPlus} /> 
                        <span className="statistic">{orders.length} <span className="statisticTitle">Total Sales</span></span>
                    </div>
                    <div className="card statisticContainer">
                        <FontAwesomeIcon icon={faSackDollar} /> 
                        <span className="statistic">${Math.round(getTotalRevenue())} <span className="statisticTitle">Total Revenue</span></span>
                    </div>
                    <div className="card statisticContainer">
                        <FontAwesomeIcon icon={faHandHoldingDollar} /> 
                        <span className="statistic">${Math.round(getAverageRevenue())} <span className="statisticTitle">Average Purchase Value</span></span>
                    </div>
                    <div className="card statisticContainer">
                        <FontAwesomeIcon icon={faTags} /> 
                        <span className="statistic">${Math.round(getMinPrice())} <span className="statisticTitle">Minimum Purchase Value</span></span>
                    </div>
                    <div className="card statisticContainer">
                        <FontAwesomeIcon icon={faTags} /> 
                        <span className="statistic">${Math.round(getMaxPrice())} <span className="statisticTitle">Maximum Purchase Value</span></span>
                    </div>
                </div>
                <div>
                    <div className="dashboardHeader">Sales KPI Dashboard</div>
                    <SalesLineGraph data={getCumulativeRevenue()}  />
                </div>
            </div>
            <div className="dashboardContainer">
                <div>
                    <div className="dashboardHeader">Brand Performance Indicators</div>
                    <BrandsBarGraph data={brandCounts} />
                </div>
                <div className="dashboardStatistic">
                    <div className="card statisticContainer">
                        <FontAwesomeIcon icon={faBuilding} /> 
                        <span className="statistic">{getMostPopularBrand()} <span className="statisticTitle">Most Popular Brand</span></span>
                    </div>
                </div>
            </div>
        </div>
    )
}

const SalesLineGraph = ({ data }) => {
    return (
        <LineChart width={800} height={400} data={data} margin={{ top: 20, right: 30, left: 20, bottom: 10 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="cumulativeRevenue" name="Cumulative Revenue" stroke="#8884d8" activeDot={{ r: 8 }} />
        </LineChart>
    );
}

const BrandsBarGraph = ({ data }) => {
    return (
        <BarChart width={600} height={400} data={data}>
            <XAxis dataKey="brand" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="count" name="Brand Sales" fill="#8884d8" />
        </BarChart>
    );
}