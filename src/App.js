import React, { useEffect, useState } from 'react';

function App() {
  const [tables, setTables] = useState([]);
  const [selectedTable, setSelectedTable] = useState(null);
  const [tableData, setTableData] = useState([]);

  useEffect(() => {
    const fetchTables = async () => {
      try {
        const response = await fetch('http://localhost:5000/tables');
        if (!response.ok) throw new Error('Failed to fetch tables');
        const data = await response.json();
        setTables(data);
      } catch (error) {
        console.error('Error fetching tables:', error);
      }
    };

    fetchTables();
  }, []);

  const handleTableSelect = async (tableName) => {
    setSelectedTable(tableName);
    try {
      const response = await fetch(`http://localhost:5000/table_data/${tableName}`);
      if (!response.ok) throw new Error('Failed to fetch table data');
      const data = await response.json();
      console.log('Fetched data:', data); // Log para verificar los datos
      setTableData(data);
    } catch (error) {
      console.error('Error fetching table data:', error);
    }
  };

  return (
    <div>
      <h1>Selecciona una Tabla</h1>
      <select onChange={(e) => handleTableSelect(e.target.value)}>
        <option value="">Seleccionar tabla</option>
        {tables.map((table, index) => (
          <option key={index} value={table}>{table}</option>
        ))}
      </select>

      {selectedTable && (
        <div>
          <h2>Datos de {selectedTable}</h2>
          {tableData.length > 0 ? ( // Verificar si hay datos para mostrar
            <table>
              <thead>
                <tr>
                  {Object.keys(tableData[0]).map((key, index) => (
                    <th key={index}>{key}</th> // Encabezados basados en las claves de los datos
                  ))}
                </tr>
              </thead>
              <tbody>
                {tableData.map((row, rowIndex) => (
                  <tr key={rowIndex}>
                    {Object.values(row).map((value, valueIndex) => (
                      <td key={valueIndex}>{value}</td> // Valores basados en los valores de cada fila
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p>No hay datos disponibles para esta tabla.</p> // Mensaje si no hay datos
          )}
        </div>
      )}
    </div>
  );
}

export default App;
