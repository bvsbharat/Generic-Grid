(function (window, undefined ) {
	'use strict';
var document = window.document, SEPARATOR = '│';

	window.GenricGrid = function () {
	}

	GenricGrid.prototype = {

		init: function (data, keys) {
			this.printTable(data, keys);
		},

		getColoumnsKeys: function (records) {

			var keys = JSON.stringify(records).replace(/\W(\w+)":(?=.*\b\1:?)/g, " ").match(/\w*":/g).map(function (ele) {
				return ele.split('":')[0];
			});

			return keys;
		},

		repeatString: function (amount, str) {
			str = str || ' ';
			return Array.apply(0, Array(amount)).join(str);
		},

		getFormattedString: function (value, isHeaderValue) {
			if (isHeaderValue) {} else if (typeof value === 'string') {
				// Wrap strings in inverted commans.
				return '"' + value + '"';
			} else if (typeof value === 'function') {
				// Just show `function` for a function.
				return 'function';
			}
			return value + '';
		},

		getColoredAndFormattedString: function (value, isHeaderValue) {
			var colorFn;
			if (isHeaderValue) {} else if (typeof value === 'number' || typeof value === 'boolean') {
				colorFn = "blue";
			} else if (typeof value === 'string') {
				colorFn = "red";
			} else if (typeof value === 'undefined') {
				colorFn = "white";
			}

			value = this.getFormattedString(value, isHeaderValue);
			if (colorFn) {
				return value + '';
			} else {
				return value + '';
			}
		},

		printRows: function (rows) {
			if (!rows.length) return;
			var row, rowString,
				i, j,
				padding,
				tableWidth = 0,
				numCols = rows[0].length;

			// For every column, calculate the maximum width in any row.
			for (j = 0; j < numCols; j++) {
				var maxLengthForColumn = 0;
				for (i = 0; i < rows.length; i++) {
					maxLengthForColumn = Math.max(this.getFormattedString(rows[i][j], !i || !j).length, maxLengthForColumn);
				}
				// Give some more padding to biggest string.
				maxLengthForColumn += 4;
				tableWidth += maxLengthForColumn;

				// Give padding to rows for current column.
				for (i = 0; i < rows.length; i++) {
					padding = maxLengthForColumn - this.getFormattedString(rows[i][j], !i || !j).length;
					// Distribute padding - 1 in starting, rest at the end.
					rows[i][j] = ' ' + this.getColoredAndFormattedString(rows[i][j], !i || !j) + this.repeatString(padding - 1);
				}
			}

			// HACK: Increase table width just by 1 to make it look good.
			tableWidth += 1;

			console.log(this.repeatString(tableWidth, '='))
			for (i = 0; i < rows.length; i++) {
				row = rows[i];
				rowString = '';
				for (var j = 0; j < row.length; j++) {
					rowString += row[j] + SEPARATOR;
				}
				console.log(rowString);
				// Draw border after table header.
				if (!i) {
					console.log(this.repeatString(tableWidth, '-'))
				}
			}
			console.log(this.repeatString(tableWidth, '='))
		},

		printTable: function (data, keys) {
			var i, j, rows = [],
				row, entry,
				objKeys,
				tempData;

			// Simply console.log if an `object` type wasn't passed.
			if (typeof data !== 'object') {
				console.log(data);
				return;
			}

			// If an object was passed, create data from its properties instead.
			if (!(data instanceof Array)) {
				tempData = [];
				// `objKeys` are now used to index every row.
				objKeys = Object.keys(data);
				for (var key in data) {
					// Avoiding `hasOwnProperty` check because Chrome shows prototype properties
					// as well.
					tempData.push(data[key]);
				}
				data = tempData;
			}

			// Get the keys from first data entry if custom keys are not passed.
			if (!keys) {
				keys = this.getColoumnsKeys(data);
				keys.sort();
			}

			// Create header row.
			rows.push([]);
			row = rows[rows.length - 1];
			row.push('(index)');
			for (i = 0; i < keys.length; i++) {
				row.push(keys[i]);
			}

			for (j = 0; j < data.length; j++) {
				entry = data[j];
				rows.push([]);
				row = rows[rows.length - 1];
				// Push entry for 1st column (index).
				row.push(objKeys ? objKeys[j] : j);
				for (i = 0; i < keys.length; i++) {
					row.push(entry[keys[i]]);
				}
			}

			this.printRows(rows);
		}

	}


}(window));
