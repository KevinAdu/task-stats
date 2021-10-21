// eslint-disable-next-line import/no-webpack-loader-syntax
import taskFile2019 from '!!raw-loader!../tasks/2019.txt';
// eslint-disable-next-line import/no-webpack-loader-syntax
import taskFile2020 from '!!raw-loader!../tasks/2020.txt';
// eslint-disable-next-line import/no-webpack-loader-syntax
import taskFile2021 from '!!raw-loader!../tasks/2021.txt';


function parseYearlyTaskFile(taskFile: string) {
  const weeklyTasks = taskFile.split(/\n\n/);
  const taskTypeMap = {};
  const weeklyTaskBreakdown = weeklyTasks.map((week: string) => {
    const weekTasks = week.split(/\n/);
    const taskTypeCounts = weekTasks.slice(2).map(taskTypeCount => taskTypeCount.split('-'));
    
    const taskTypeCountsArray = taskTypeCounts.map((taskTypeCount) => {
      const regex = new RegExp(/\* /);
      let taskType = taskTypeCount[0].trim();
      let taskCount = taskTypeCount[1].trim();

      taskType = (regex.test(taskType)) ? taskType.slice(2) : taskType;

      return {
        [taskType]: taskCount
      }
    });
    
    taskTypeCountsArray.forEach(typeCount => { 
      Object.assign(taskTypeMap, typeCount)
    })
    const taskTypesAndTotal = {
      total: weekTasks.slice(1)[0].split(': ')[1],
      ...taskTypeMap,
    }
    return {[weekTasks[0]]: taskTypesAndTotal}
  });

  return weeklyTaskBreakdown;
}
export function readFiles() {
  console.log(parseYearlyTaskFile(taskFile2019));
  console.log(parseYearlyTaskFile(taskFile2020));
  console.log(parseYearlyTaskFile(taskFile2021));
}
