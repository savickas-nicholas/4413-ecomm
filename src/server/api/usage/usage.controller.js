import { addNewUsageStatistic, getUsageStatistics as getUsageStatisticsService } from "./usage.service";


const getUsageStatistics = async (req, res) => {
    // expects dates to be in ISO string format yyyy-mm-dd
    const {
        startDate, endDate
    } = req.body;
    try {
        const statistics = await getUsageStatisticsService(startDate, endDate);
        return res.status(200).json({ statistics });
    } catch (err) {
        handleError(res, err);
    }
}

const addUsageStatistic = async (req, res) => {
    const {
        timeSpent,
        pageIdentifier
    } = req.body;

    try {
        await addNewUsageStatistic(timeSpent, pageIdentifier);
        return res.status(201).send('Usage statistic added');
    } catch (err) {
        handleError(res, err);
    }
}

function handleError(res, err) {
    console.log('usage handleError --> ', err);
    return res.status(500).send(err);
}

export { getUsageStatistics, addUsageStatistic };