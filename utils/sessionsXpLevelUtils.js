const { getWeek, startOfWeek } = require("date-fns");
const moment = require("moment");

// Set xp values
const calcXpForSession = (intensity) => {
	let xp = 0;
	if (intensity === "Easy") {
		xp = 1;
	} else if (intensity === "Medium") {
		xp = 2;
	} else if (intensity === "Hard") {
		xp = 3;
	}

	return xp;
};

// Format timestamps
function parseTimestamp(timestamp) {
	if (Date.parse(timestamp)) {
		return new Date(timestamp);
	} else {
		// Parse the timestamp with the format "DD.MM.YYYY HH.mm.ss"
		return moment(timestamp, "DD.MM.YYYY HH.mm.ss").toDate();
	}
}

// Resolve week numbers
function getWeekNumber(timestamp) {
	const date = parseTimestamp(timestamp);
	const startOfWeekDate = startOfWeek(date, { weekStartsOn: 1 });
	return getWeek(startOfWeekDate);
}

// Group sessions by week
const bulkSessionsPerWeek = (sessions) => {
	const sessionsPerWeek = [];
	sessions.forEach((session) => {
		const week = getWeekNumber(session.timestamp);
		if (!sessionsPerWeek[week]) {
			sessionsPerWeek[week] = [];
		}
		sessionsPerWeek[week].push(session);
	});

	return sessionsPerWeek;
};

// Group sessions by day
const groupSessionsByDay = (sessions) => {
	const sameDaySessions = sessions.reduce((acc, session) => {
		const sessionDate = new Date(session.timestamp);
		const day = sessionDate.toDateString();

		if (!acc[day]) {
			acc[day] = [];
		}

		acc[day].push(session);

		return acc;
	}, {});

	return sameDaySessions;
};

// Calculate total XP for each day
const calcTotalXpForDay = (sessions) => {
	const sameDaySessions = groupSessionsByDay(sessions);

	const totalXp = Object.keys(sameDaySessions).reduce((acc, day) => {
		const dailyXp = sameDaySessions[day].reduce((total, session) => {
			total += calcXpForSession(session.intensity);

			return total;
		}, 0);

		acc[day] = dailyXp;

		return acc;
	}, {});

	return totalXp;
};

// Adjust total XP for each day to max daily XP
const adjustMaxXpPerDay = (sessions) => {
	const totalXp = calcTotalXpForDay(sessions);
	const adjustedXp = { ...totalXp };
	const maxDailyXp = 3;

	// Check each day's total XP and adjust if necessary
	Object.keys(adjustedXp).forEach((day) => {
		if (adjustedXp[day] > maxDailyXp) {
			adjustedXp[day] = maxDailyXp;
		}
	});

	return adjustedXp;
};

// Calculate total XP for the week, adjusted for max daily XP
const calcXpViewValue = (sessions) => {
	const weeklyXp = adjustMaxXpPerDay(sessions);

	const totalXp = Object.values(weeklyXp).reduce((total, dailyXp) => {
		total += dailyXp;

		return total;
	}, 0);

	return totalXp;
};

// Calculate level
function calcLevel(xp) {
	let level = 1;
	let totalXpNeeded = 0; // Running total of XP needed for all levels
	let currentLevelCost = 2; // Base XP cost for level 2

	while (true) {
		// Calculate total XP needed for next level (include all previous costs)
		totalXpNeeded += currentLevelCost;

		// Check if player has enough total XP
		if (xp < totalXpNeeded) {
			break;
		}

		// Level up and increase cost for next level
		level += 1;
		currentLevelCost = level * 2;
	}

	return level;
}

module.exports = { calcXpViewValue, calcLevel, bulkSessionsPerWeek };