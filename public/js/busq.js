function filtrar()
		{
			var tb = document.getElementById('tabla');
			var tab = document.getElementById('in').value.toLowerCase();
      var celdas="";
			var found=false;
			var comparar="";

			// Recorremos todas las filas con contenido de la tabla
			for (var i = 1; i < tb.rows.length; i++)
			{
				celdas = tb.rows[i].getElementsByTagName('td');
				found = false;
				// Recorremos todas las celdas
				for (var j = 0; j < celdas.length && !found; j++)
				{
					comparar = celdas[j].innerHTML.toLowerCase();
					// Buscamos el texto en el contenido de la celda
					if (tab.length == 0 || (comparar.indexOf(tab) > -1))
					{
						found = true;
					}
				}
				if(found)
				{
					tb.rows[i].style.display = '';
				} else {
					// si no ha encontrado ninguna coincidencia, esconde la
					// fila de la tabla
					tb.rows[i].style.display = 'none';
				}
			}
		}
