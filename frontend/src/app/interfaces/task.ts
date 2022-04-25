export interface ITask {
    id:number;
    name: string;
    description: string;
    date_of_start: Date;
    date_of_end: Date;
    status: string;
    completion_date: Date;
    weekly_task: boolean;
    monthly_goal: boolean;
    hasNote: boolean;
    noteHeader: string;
    noteDetail: string;
    noteImportance: string
}

