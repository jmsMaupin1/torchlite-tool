//format an array of data to [[], [], [], ...x] (x define by dataPerRow) for ViewportList
export const formatArray = (data, dataPerRow) => {
	let tmp1 = [];
	let result = [];

	data.forEach((item, key) => {
		if (tmp1.length >= dataPerRow) {
			result.push(tmp1);
			tmp1 = [];
		}

		tmp1.push(item);
		//add last row to result if we parse all the data
		if (key === data.length - 1) result.push(tmp1);
	});

	return result;
};
