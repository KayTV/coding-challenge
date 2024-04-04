export class Employee {
  id: number;
  firstName: string;
  lastName: string;
  position: string;
  compensation?: number;
  directReports?: Array<number>;
  directReportEmployees?: Array<Employee>;
  image?: string;
}
