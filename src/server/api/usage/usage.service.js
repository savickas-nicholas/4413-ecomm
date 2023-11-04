
import jwt from "jsonwebtoken";
import Usage from "./usage.model"
import config from "../../config/environment"

const createUsageStatistics = async (startDateText, endDateText) => {
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

const addNewUsageStatistic = async (token, timeSpent, pageViewed) => {
    const decoder = jwt.verify(token, config.secrets.session)
    const userId = decoder._id;

    const usage = {
        userId,
        timeSpent: parseInt(timeSpent),
        pageViewed,
        date: new Date()
    };

    await Usage.create(usage)
    return;
}

export { createUsageStatistics, addNewUsageStatistic };