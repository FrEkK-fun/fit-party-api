const calcLevel = (xp, goal) => {
	let level = 1;
	let xpNeededForNextLevel = 2;

	while (xp >= xpNeededForNextLevel) {
		xp -= xpNeededForNextLevel;
		level += 1;
		xpNeededForNextLevel = level * 2;
	}

	if (goal.done) {
		level += 1;
	}

	return level;
};

module.exports = { calcLevel };
