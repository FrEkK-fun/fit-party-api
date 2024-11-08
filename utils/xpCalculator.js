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

// Group sessions by day
const groupSessionsByDay = (sessions) => {
	// Filter sessions that have not been synced
	const unsyncedSessions = sessions.filter((session) => !session.isSynced);

	// Group sessions by day
	const groupedSessions = unsyncedSessions.reduce((acc, session) => {
		const sessionDate = new Date(session.timestamp);
		const day = sessionDate.toDateString();

		if (!acc[day]) {
			acc[day] = [];
		}

		acc[day].push(session);

		return acc;
	}, {});

	return groupedSessions;
};

// Calculate total XP for each day
const calcTotalXpForDay = (sessions) => {
	const groupedSessions = groupSessionsByDay(sessions);

	const totalXp = Object.keys(groupedSessions).reduce((acc, day) => {
		const dailyXp = groupedSessions[day].reduce((total, session) => {
			total += calcXpForSession(session.intensity);

			return total;
		}, 0);

		acc[day] = dailyXp;

		return acc;
	}, {});

	return totalXp;
};

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

const calcXpViewValue = (sessions) => {
	const weeklyXp = adjustMaxXpPerDay(sessions);

	const totalXp = Object.values(weeklyXp).reduce((total, dailyXp) => {
		total += dailyXp;

		return total;
	}, 0);

	return totalXp;
};

module.exports = { calcXpViewValue };
