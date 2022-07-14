
import './App.css';
import taskFile2019 from 'bundle-text:./tasks/2019.txt';
import taskFile2020 from 'bundle-text:./tasks/2020.txt';
import taskFile2021 from 'bundle-text:./tasks/2021.txt';
import { parseYearlyTaskFile, Datum } from './parser';
import React from 'react';
import { AxisOptions, Chart } from 'react-charts';

function App() {
  const data = React.useMemo(() => parseYearlyTaskFile(taskFile2019), []);
  
  // parseYearlyTaskFile(taskFile2020);
  // parseYearlyTaskFile(taskFile2021);
  const primaryAxis = React.useMemo(
    (): AxisOptions<Datum> => ({
      getValue: datum => datum.week,
    }),
    []
  )

  const secondaryAxes = React.useMemo(
    (): AxisOptions<Datum>[] => [
      {
        elementType: 'line',
        getValue: datum => datum.count,
      },
    ],
    []
  )

  return (
    <div style={{height: 800, width: 1400}}>
    <Chart
      options={{
        data,
        primaryAxis,
        secondaryAxes,
      }}
    />
    </div>
  );
}

export default App;
