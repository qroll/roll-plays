import moment from "moment";

export const displayTime = date => {
    let time = moment(date);
    return time.isSame(moment(), "year")
        ? time.isSame(moment(), "day")
            ? time.format("h:mma")
            : time.format("D MMM")
        : time.format("D MMM Y");
};
