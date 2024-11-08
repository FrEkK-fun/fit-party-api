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

const calcTotalXpForDay = (sessions) => {
	const currentDate = new Date();
	currentDate.setHours(0, 0, 0, 0);

	const totalXp = sessions.reduce((total, session) => {
		const sessionDate = new Date(session.timestamp);
		sessionDate.setHours(0, 0, 0, 0);

		if (sessionDate.getTime() === currentDate.getTime()) {
			total += calcXpForSession(session.intensity);
		}

		return total;
	}, 0);

	return totalXp;
};

const adjustMaxXpPerDay = (sessions) => {
	const totalXp = calcTotalXpForDay(sessions);
	const max = 3;

	if (totalXp >= max) {
		return max;
	}

	return totalXp;
};

module.exports = { adjustMaxXpPerDay };
