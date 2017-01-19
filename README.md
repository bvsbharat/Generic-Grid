# Generic-grid
Pure java Script grid with minimal code 

			var i, j, rows = [],row, entry,keys,objKeys,tempData;	
				keys = this.getColoumnsKeys(data);
				keys.sort();

			// Create header row.
			rows.push([]);
			row = rows[rows.length - 1];
			row.push('(index)');
			for (i = 0; i < keys.length; i++) {
				row.push(keys[i]);
			}

			var body = document.getElementsByTagName('body')[0];
			var tbl = document.createElement('table');
			//tbl.style.width = '100%';
			tbl.setAttribute('border', '1');
			var tbdy = document.createElement('tbody');					

			for (var i = 0; i< data.length; i++) {
					var tr = document.createElement('tr');

				for (var j = 0; j < keys.length; j++) {
						var td = document.createElement('td');
						td.appendChild(document.createTextNode(data[i][keys[j]]))						
						tr.appendChild(td)					
				}

				tbdy.appendChild(tr);
			}

			tbl.appendChild(tbdy);
			body.appendChild(tbl)