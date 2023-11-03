function getPostTime(postTime) {
    const createdAt = postTime; // Replace with your actual timestamp
    const createdAtDate = new Date(createdAt);
    const currentDateTime = new Date();

    // Calculate the time difference in milliseconds
    const timeDifference = currentDateTime - createdAtDate;

    // Calculate hours from milliseconds
    let time = Math.floor(timeDifference / 1000);
    if (time > 60) {
        // seconds to minutes
        time = Math.floor(timeDifference / (1000 * 60)) + " s";
    }
    if (time > 60 * 60) {
        // minutes to hours
        time = Math.floor(timeDifference / (1000 * 60 * 60)) + " m";
    }
    if (time > 60 * 60 * 24) {
        // hours to days
        time = Math.floor(timeDifference / (1000 * 60 * 60 * 24)) + " hrs";
    } else {
        // days to date
        time = createdAtDate.toString().substring(4, 24);
    }
    return time;
}

module.exports = { getPostTime };