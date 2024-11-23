const calcLevel = (xp, goal) => {
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

	// Add bonus level if goal is completed
	if (goal.done) {
		level += 1;
	}

	return level;
};

module.exports = { calcLevel };
