const dateSuffix = date => {
    let dateString = date.toString();

    const lastChar = dateString.charAt(dateString.length - 1);

    if (lastChar === "1" && dateString !== "11") {
        dateString = `${dateString}st`;
    }
    else if (lastChar === "2" && dateString !== "12") {
        dateString = `${dateString}nd`;
    }
    else if (lastChar === "3" && dateString !== "13") {
        dateString = `${dateString}rd`;
    }
    else {
        dateString = `${dateString}th`;
    }

    return dateString;
};

function formatDate(timestamp) {
    const allMonths = {
        0: "Jan",
        1: "Feb",
        2: "Mar",
        3: "Apr",
        4: "May",
        5: "Jun",
        6: "Jul",
        7: "Aug",
        8: "Sep",
        9: "Oct",
        10: "Nov",
        11: "Dec"
    };

    const dateObject = new Date(timestamp);

    const month = allMonths[dateObject.getMonth()];

    const day = dateSuffix(dateObject.getDate());

    const year = dateObject.getFullYear();

    const hour = dateObject.getHours();

    const minutes = dateObject.getMinutes();

    const finalDate = `${month} ${day}, ${year} at ${hour}:${minutes}`;

    return finalDate;
};

module.exports = formatDate;