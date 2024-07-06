interface Lecturer {
  name: string;
  surname: string;
  position: string;
  company: string;
  experience: number;
  courses: string[];
  contacts: string[];
}

class School {
  // implement 'add area', 'remove area', 'add lecturer', and 'remove lecturer' methods

  private _areas: Area[] = [];
  private _lecturers: Lecturer[] = []; // Name, surname, position, company, experience, courses, contacts


  constructor(areas: Area[], lecturers: Lecturer[]) {
    this._areas = areas;
    this._lecturers = lecturers;
  }

  get areas(): Area[] {
    return this._areas;
  }

  get lecturers(): Lecturer[] {
    return this._lecturers;
  }

  public addArea(area: Area): void {
    if (!this._areas.find(a => a._name === area._name)) {
      this._areas.push(area);
    } else {
      console.log(`The ${area._name} area is already exists.`);
    }
  }

  public removeArea(areaName: string): void {
    const index = this._areas.findIndex(a => a._name === areaName);
    if (index !== -1) {
      this._areas.splice(index, 1);
    } else {
      console.log(`The ${areaName} is not found.`);
    }
  }

  public addLecturer(lecturer: Lecturer): void {
    if (!this._lecturers.find(l => l.name === lecturer.name && l.surname === lecturer.surname)) {
      this._lecturers.push(lecturer);
    } else {
      console.log(`Lecturer ${lecturer.name} ${lecturer.surname} already exists.`);
    }
  }

  public removeLecturer(name: string, surname: string): void {
    const index = this._lecturers.findIndex(l => l.name === name && l.surname === surname);
    if (index !== -1) {
      this._lecturers.splice(index, 1);
    } else {
      console.log(`Lecturer ${name} ${surname} not found.`);
    }
  }

}

class Area {
  // implement getters for fields and 'add/remove level' methods
  public _levels: Level[] = [];
  public _name: string;

  constructor(name: string, level: Level[]) {
    this._name = name;
    this._levels = level;
  }

  get levels(): Level[] {
    return this._levels
  }

  get name(): string {
    return this._name;
  }

  public addLevel(level: Level): void {
    if (!this._levels.find(l => l._name === level._name)) {
      this._levels.push(level);
    } else {
      console.log(`Level ${level._name} already exists.`);
    }
  }

  public removeLevel(name: string): void {
    const index = this._levels.findIndex(l => l._name === name);
    if (index !== -1) {
      this._levels.splice(index, 1);
    } else {
      console.log(`Level ${name} not found.`);
    }
  }

}

class Level {
  // implement getters for fields and 'add/remove group' methods

  public _groups: Group[] = [];
  public _name: string;
  public _description: string;

  constructor(name: string, description: string, groups: Group[]) {
    this._name = name;
    this._description = description;
    this._groups = groups;
  }

  public addGroup(group: Group): void {
    if (!this._groups.find(g => g._name === group._name)) {
      this._groups.push(group);
    } else {
      console.log(`Group ${group._name} already exists.`);
    }
  }

  public removeGroup(name: string): void {
    const index = this._groups.findIndex(g => g._name === name);
    if (index !== -1) {
      this._groups.splice(index, 1);
    } else {
      console.log(`Group ${name} not found.`);
    }
  }
}

class Group {
  // implement getters for fields and 'add/remove student' and 'set status' methods
  public _name: string;
  public _area: string;
  public _level: string;
  public _status: string;
  public _students: Student[] = []; // Modify the array so that it has a valid toSorted method*

  constructor(name: string, area: string, level: string, status: string, students: Student[]) {
    this._name = name;
    this._area = area;
    this._level = level;
    this._status = status;
    this._students = students;
  }

  public get name(): string {
    return this._name;
  }

  public get area(): string {
    return this._area;
  }

  public get level(): string {
    return this._level;
  }

  public get status(): string {
    return this._status;
  }

  public get students(): Student[] {
    return this._students;
  }

  public addStudent(student: Student): void {
    if (!this._students.find(s => s._id === student._id)) {
      this._students.push(student);
    } else {
      console.log(`Student with id ${student._id} already exists.`);
    }
  }

  public removeStudent(studentId: string): void {
    const index = this._students.findIndex(s => s._id === studentId);
    if (index !== -1) {
      this._students.splice(index, 1);
    } else {
      console.log(`Student with id ${studentId} not found.`);
    }
  }

  public setStatus(status: string): void {
    this._status = status;
  }


  public showPerformance(): Student[] {
    const sortedStudents = [...this._students].sort((a, b) => b.getPerformanceRating() - a.getPerformanceRating());
    return sortedStudents;
  }
}

interface Grade {
  workName: string;
  mark: number;
}

interface Visit {
  lesson: string;
  present: boolean;
}

class Student {
  // implement 'set grade' and 'set visit' methods
  public _id: string;
  public _firstName: string;
  public _lastName: string;
  public _birthYear: number;
  public _grades: Grade[] = []; // workName: mark
  public _visits: Visit[] = []; // lesson: present

  constructor(id: string, firstName: string, lastName: string, birthYear: number) {
    this._id = id;
    this._firstName = firstName;
    this._lastName = lastName;
    this._birthYear = birthYear;
  }

  public get fullName(): string {
    return `${this._lastName} ${this._firstName}`;
  }

  public set fullName(value: string) {
    [this._lastName, this._firstName] = value.split(' ');
  }

  public get age(): number {
    return new Date().getFullYear() - this._birthYear;
  }


  public getPerformanceRating(): number {
    const gradeValues = this._grades.map(grade => grade.mark);

    if (!gradeValues.length) return 0;

    const averageGrade = gradeValues.reduce((sum, grade) => sum + grade, 0) / gradeValues.length;
    const attendancePercentage = (this._visits.filter(visit => visit.present).length / this._visits.length) * 100;

    return (averageGrade + attendancePercentage) / 2;
  }

}

