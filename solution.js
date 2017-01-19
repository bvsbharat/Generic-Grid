(function (window, undefined) {
	"use strict";

	var document = window.document;

	window.GenricGrid = function () {};

	GenricGrid.prototype = {

		gridWrapper:'',

		init: function (targetID,data) {
			this.setgridWrapper(targetID);
			this.printTable(data);
		},

		setgridWrapper:function(id){
			this.gridWrapper = document.getElementById(id) || document.getElementsByTagName('body')[0];
		},

		printTable: function (data) {

			var keys = this.getColoumnsKeys(data),
				tbl = this.createElement('table'),
				tblhead = this.createElement('thead'),
				tbdy = this.createElement('tbody'),
				tr = this.createElement('tr');

			// Simply console.log if an `object` type wasn't passed.
			if (typeof data !== "object") {
				console.log(data);
				return;
			}

			tblhead.appendChild(this.createRow(data, keys, "th"));
			tbl.appendChild(tblhead);

			for (var i = 0; i < data.length; i++) {
				tbdy.appendChild(this.createRow(data, keys, "td", i));
			}

			tbl.appendChild(tbdy);
			this.gridWrapper.appendChild(tbl);

		},

		createRow: function (data, keys, cellType, i) {
			var tr = this.createElement("tr");
			for (var j = 0; j < keys.length; j++) {
				var cell = this.createElement(cellType);

				if (i !== undefined) {
					if (data[i][keys[j]]) {
						cell.appendChild(document.createTextNode(data[i][keys[j]]));
					} else {
						cell.appendChild(document.createTextNode("N/A"));
					}
				} else {
					cell.appendChild(document.createTextNode(keys[j]));
					this.eventBinding(cell);
				}

				tr.appendChild(cell);
			}
			return tr;
		},

		getColoumnsKeys: function (records) {
			var keys = JSON.stringify(records).replace(/\W(\w+)":(?=.*\b\1:?)/g, " ").match(/\w*":/g).map(function (ele) {
				return ele.split('":')[0];
			});
			return keys;
		},

		eventBinding: function (ele) {
			var f_sl = 1,
				self = this,
				columName;
			ele.addEventListener("click", function () {
				f_sl *= -1;
				var n = self.prevAll(ele).length;
				if (!columName) {
					columName = ele.innerText;
				}
				ele.innerText = " ";
				if (f_sl >= 1) {
					ele.innerHTML = columName + " <span>&#9650;</span>";
				} else {
					ele.innerHTML = columName + " <span>&#9660;</span>";
				}

				self.sortTable(f_sl, n);
			});
		},

		sortTable: function (f, n) {

			var rows = this.gridWrapper.querySelectorAll("tbody tr"),
				self = this;
			rows = Array.from(rows);

			rows.sort(function (a, b) {

				var A = self.getVal(a, n);
				var B = self.getVal(b, n);

				if (A < B) {
					return -1 * f;
				}
				if (A > B) {
					return 1 * f;
				}
				return 0;
			});

			for (var i = 0; i < rows.length; i++) {
				var el = this.gridWrapper.querySelector("tbody");
				el.appendChild(rows[i]);
			}
		},

		getVal: function (elm, n) {
			var v = "";
			if (elm.querySelectorAll("td")[n]) {
				v = elm.querySelectorAll("td")[n].innerText.toUpperCase();
			}

			if (!isNaN(v)) {
				v = parseInt(v, 10);
			}
			return v;
		},

		createElement: function (element) {
			return document.createElement(element);
		},

		prevAll: function (element) {
			var result = [];
			while (element = element.previousElementSibling)
				result.push(element);
			return result;
		}

	};


}(window));
