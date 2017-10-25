export const handleScroll= (event, offset) => {

	let currentOffset = event.nativeEvent.contentOffset.y;
	// let difference = offset - currentOffset;
    // let direction = currentOffset > offset ? 'down' : 'up';

    // console.log(offset, currentOffset, difference, direction, 'what we got');

    offset = currentOffset;

    // if(direction == 'up' && difference < 10)
    // 	direction= 'down';

    direction= (offset < 100) ? 'up' : 'down';

    // console.log(offset, direction, 'final result');

    return {offset, direction};
}

export const limitString= (string, limit) => {

	if(string.length <= limit)
		return string;

	return `${string.substring(0,limit)}...`;
}