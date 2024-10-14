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
    <div className="App">
      <header className="App-header">
        <h1>Tablas Disponibles</h1>
        <select className="select-table" onChange={(e) => handleTableSelect(e.target.value)}>
          <option value="">Seleccionar tabla</option>
          {tables.map((table, index) => (
            <option key={index} value={table}>{table}</option>
          ))}
        </select>
      </header>

      {selectedTable && (
        <div className="table-container">
          <h2>Datos de {selectedTable}</h2>
          {tableData.length > 0 ? (
            <table className="styled-table">
              <thead>
                <tr>
                  {Object.keys(tableData[0]).map((key, index) => (
                    <th key={index}>{key}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {tableData.map((row, rowIndex) => (
                  <tr key={rowIndex}>
                    {Object.values(row).map((value, valueIndex) => (
                      <td key={valueIndex}>{value}</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p>No hay datos disponibles.</p>
          )}
        </div>
      )}
    </div>
  );
}

export default App;
