/**
 * Swaps the position of 2 items in an array.
 *
 * @param items The array containing the items to be swapped.
 * @param firstIndex The index of the first item to be swapped.
 * @param secondIndex The index of the second item to be swapped.
 */
function swap<ItemType>(
	items: ItemType[],
	firstIndex: number,
	secondIndex: number,
) {
	const temp = items[firstIndex]
	items[firstIndex] = items[secondIndex]
	items[secondIndex] = temp
}

/**
 * Partitions and sorts an array.
 *
 * @param items The items to be sorted.
 * @param valueAccessor A method to retrieve the sort value from an item.
 * @param leftIndex The index of the left side item in the comparison.
 * @param rightIndex The index of the right side item in the comparison.
 * @returns The index at which the partition ended.
 */
function partition<ItemType, ValueType>(
	items: ItemType[],
	valueAccessor: (item: ItemType) => ValueType,
	leftIndex: number,
	rightIndex: number,
) {
	// Grab a central value as the pivot
	const pivot = valueAccessor(items[Math.floor((rightIndex + leftIndex) / 2)])

	// Loop over all items until the indeces meet at the pivot
	while (leftIndex <= rightIndex) {
		while (valueAccessor(items[leftIndex]) < pivot) {
			leftIndex += 1
		}

		while (valueAccessor(items[rightIndex]) > pivot) {
			rightIndex -= 1
		}

		if (leftIndex <= rightIndex) {
			swap<ItemType>(items, leftIndex, rightIndex)
			leftIndex += 1
			rightIndex -= 1
		}
	}

	return leftIndex
}

/**
 * Sorts an array using the Quick Sort algorithm.
 *
 * @param items The items to be sorted.
 * @param valueAccessor A method to retrieve the sort value from an item.
 * @param leftIndex The index of the left side item in the comparison.
 * @param rightIndex The index of the right side item in the comparison.
 * @returns The sorted array.
 */
export function quicksort<ItemType = number, ValueType = ItemType>(
	items: ItemType[],
	valueAccessor: (item: ItemType) => ValueType = item => item as unknown as ValueType,
	leftIndex: number = 0,
	rightIndex: number | null = null,
) {
	if (!rightIndex) {
		rightIndex = items.length - 1
	}

	let index = null

	if (items.length > 1) {
		index = partition<ItemType, ValueType>(items, valueAccessor, leftIndex, rightIndex)

		if (leftIndex < index - 1) {
			quicksort<ItemType, ValueType>(items, valueAccessor, leftIndex, index - 1)
		}

		if (index < rightIndex) {
			quicksort<ItemType, ValueType>(items, valueAccessor, index, rightIndex)
		}
	}

	return items
}
