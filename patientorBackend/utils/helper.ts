/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/restrict-plus-operands */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { NewPatientEntry, Gender, Entry, EntryType } from '../types';


const isString = (text: any): text is string => {
  return typeof text === 'string' || text instanceof String;
};

const parseName = (name: any): string => {
  if (!name || !isString(name)) {
    throw new Error('Incorrect or missing date:' + name);
  }
  return name;
};

const isDate = (date: string): boolean => {
  return Boolean(Date.parse(date));
};

const parseDate = (date: any): string => {
  if (!date || !isString(date) || !isDate(date)) {
    throw new Error('Incorrect or missing date:' + date);
  }
  return date;
};

const parseSSN = (ssn: any): string => {
  if (!ssn || !isString(ssn)) {
    throw new Error('Incorrect or missing ssn:' + ssn);
  }
  return ssn;
};

const isGender = (param: any): param is Gender => {
  return Object.values(Gender).includes(param);
};
const parseGender = (gender: any): string => {
  if (!gender || !isGender(gender)) {
    throw new Error('Incorrect or missing gender:' + gender);
  }
  return gender;
};

const parseOccupation = (occupation: any): string => {
  if (!occupation || !isString(occupation)) {
    throw new Error('Incorrect or missing occupation:' + occupation);
  }
  return occupation;
};

const isEntryType = (param: any): param is EntryType => {
  return Object.values(EntryType).includes(param);
};

const parseEntries = (entries: any): Entry[] => {
  if (entries.length > 0) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call
    entries.forEach((entry: Entry) => {
      if (!isEntryType(entry.type)) {
        throw new Error('Incorrect entry type:' + entry.type);
      }    
    });
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return entries;
  }
  return [];
};

export const toNewPatientEntry = (object: any): NewPatientEntry => {
  return {
    name: parseName(object.name),
    dateOfBirth: parseDate(object.dateOfBirth),
    ssn: parseSSN(object.ssn),
    gender: parseGender(object.gender),
    occupation: parseOccupation(object.occupation),
    entries: parseEntries(object.entries)
  };
};


