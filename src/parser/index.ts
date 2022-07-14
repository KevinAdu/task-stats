import { UserSerie } from 'react-charts';

export type Datum = {week: string; count: number;};
export function parseYearlyTaskFile(taskFile: string): UserSerie<Datum>[] {
  const weeklyTasks = taskFile.split(/\n\n/);
  const map: UserSerie<Datum>[] = []
  weeklyTasks.forEach((week: string) => {
    const weekTasks = week.split(/\n/);
    
    const taskTypeCounts = weekTasks.slice(2).map(taskTypeCount => taskTypeCount.split('-'));

    taskTypeCounts.forEach((taskTypeCount) => {
      const regex = new RegExp(/\* /);
      let taskType = taskTypeCount[0].trim();
      let taskCount = taskTypeCount[1].trim();

      taskType = (regex.test(taskType)) ? taskType.slice(2) : taskType;


      const hasLabel = map.findIndex((dataPoint) => dataPoint.label === taskType);
      hasLabel > -1 ? map[hasLabel].data.push({count: Number(taskCount), week: weekTasks[0]}) : map.push(
        {
          label: taskType,
          data: [{
            count: Number(taskCount),
            week: weekTasks[0]
          }]
        }
      )
        
    });
  });

  return map;
}
