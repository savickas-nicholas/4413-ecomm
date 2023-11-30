import { useEffect, useRef } from 'react';
import axios from '../util/httpCaller';
import { useHref } from 'react-router';

const usageTracker = () => {
    const startTimeRef = useRef(Date.now());
    const href = useHref()

    useEffect(() => {
        // Function to send pageID, time spent on the page & the date to the backend
        const sendTimeToBackend = async (timeSpent, pageIdentifier) => {
            try {
                console.log("Sending: " + pageIdentifier)
                axios.post('/api/usage', 
                    { timeSpent, pageIdentifier, date: new Date() }

                ).then(res => {

                    if (res.status != 201)
                        console.error('Failed to send usage statistics');
                }).catch(err => {

                    console.error('Error sending usage statistics', err);
                })
            } catch (error) {
                console.error('Error with usage statistics', error);
            }
        };

        // Calculate time spent when the component unmounts or on page change
        const calculateTimeSpent = () => {
            const endTime = Date.now();
            const timeSpentInSeconds = Math.floor((endTime - startTimeRef.current) / 1000);

            if (timeSpentInSeconds != 0) {
                sendTimeToBackend(timeSpentInSeconds, href);
            }
        };

        // Event listener for component unmount
        const handleComponentChange = () => {
            calculateTimeSpent();
        };

        // Attach the event listener for component unmount & page changes
        window.addEventListener('beforeunload', handleComponentChange);

        startTimeRef.current = Date.now();

        // Clean up the event listeners when the component unmounts, send last remaining usage statistic
        return () => {
            calculateTimeSpent();
            window.removeEventListener('beforeunload', handleComponentChange);
        };
    }, [window.location.pathname]);
};

export default usageTracker;