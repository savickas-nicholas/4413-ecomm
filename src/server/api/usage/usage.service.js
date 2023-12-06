
import Usage from "./usage.model"

const getUsageStatistics = async (startDateText, endDateText) => {
    const startDateTimestamp = Date.parse(startDateText);
    const startDate = new Date(startDateTimestamp);

    const endDateTimestamp = Date.parse(endDateText);
    const endDate = new Date(endDateTimestamp);

    const usages = await Usage
        .find({})
        .gte('date', startDate)
        .lte('date', endDate);
    return usages;
};

const addNewUsageStatistic = async (timeSpent, pageViewed) => {
    const usage = {
        date: new Date(),
        timeSpent: parseInt(timeSpent),
        pageViewed: String(pageViewed)
    };

    await Usage.create(usage)
    return;
}

export { getUsageStatistics, addNewUsageStatistic };