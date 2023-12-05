import React from 'react';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import SalesReport from "./SalesReport";
import UsageReport from "./UsageReport";
import './report.scss';


export default function Analytics() {


    return (
        <Tabs
            defaultActiveKey="sales"
            id="uncontrolled-tab-example"
            className="mb-3"
        >
            <Tab eventKey="sales" title="Sales">
                <SalesReport />
            </Tab>
            <Tab eventKey="usage" title="Usage">
                <UsageReport />
            </Tab>
        </Tabs>
    )
}