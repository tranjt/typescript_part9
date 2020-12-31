import { Entry, HealthCheckRating } from '../types';
import { v4 as uuidv4 } from 'uuid';


const isString = (text: any): text is string => {
  return typeof text === 'string' || text instanceof String;
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

const parseDescription = (description: any): string => {
  if (!description || !isString(description)) {
    throw new Error('Incorrect or missing description:' + description);
  }
  return description;
};

const parseSpecialist = (specialist: any): string => {
  if (!specialist || !isString(specialist)) {
    throw new Error('Incorrect or missing specialist:' + specialist);
  }
  return specialist;
};

const parseDiagnosisCodes = (diagnosisCodes: any): string[] | undefined => {
  if (diagnosisCodes) {
    diagnosisCodes.forEach((diagnosis: any) => {
      if (!isString(diagnosis)) {
        throw new Error('Incorrect diagnosis code:' + diagnosis);
      }
      return diagnosis;
    });
  }
  return diagnosisCodes;
};

const isDischarge = (discharge: any): { date: string, criteria: string } | undefined => {
  if (discharge) {
    if (!isDate(discharge.date)) {
      throw new Error('Incorrect or missing date:' + discharge.date);
    }
    if (!isString(discharge.criteria)) {
      throw new Error('Incorrect or missing criteria:' + discharge.criteria);
    }
    return discharge;
  }
  throw new Error('Incorrect or missing discharge:' + discharge);
}


const parseDischarge = (discharge: any): { date: string, criteria: string } => {
  if (!discharge || !isDischarge(discharge)) {
    throw new Error('Incorrect or missing discharge:' + discharge);
  }
  return discharge;
};


const isHealthCheckRating = (param: any): boolean => {
  return param in HealthCheckRating;
};

const parseHealthCheckRating = (healthCheckRating: any): number => {
  if (isHealthCheckRating(healthCheckRating)) {
    return healthCheckRating;
  } else {
    throw new Error('Incorrect or missing healthCheckRating: ' + healthCheckRating);
  }
};

const parseEmployerName = (employerName: any): string => {
  if (!employerName || !isString(employerName)) {
    throw new Error('Incorrect or missing employerName:' + employerName);
  }
  return employerName;
};


const isSickLeave = (sickLeave: any): { startDate: string; endDate: string } | undefined => {
  if (sickLeave) {
    if (!isDate(sickLeave.startDate)) {
      throw new Error('Incorrect or missing date:' + sickLeave.startDate);
    }
    if (!isDate(sickLeave.endDate)) {
      throw new Error('Incorrect or missing date:' + sickLeave.endDate);
    }
    return sickLeave;
  }
  throw new Error('Incorrect or missing sickLeave:' + sickLeave);
}


const parseSickLeave = (sickLeave: any): { startDate: string; endDate: string } | undefined => {
  if (!sickLeave || !isSickLeave(sickLeave)) {
    throw new Error('Incorrect or missing employerName:' + sickLeave);
  }
  return sickLeave;
};


export const newHostpitalEntry = (object: any): Entry => {
  return {
    type: object.type,
    description: parseDescription(object.description),
    date: parseDate(object.date),
    specialist: parseSpecialist(object.specialist),
    diagnosisCodes: parseDiagnosisCodes(object.diagnosisCodes),
    discharge: parseDischarge(object.discharge),
    id: uuidv4()
  };
};

export const newHealthCheckEntry = (object: any): Entry => {
  return {
    type: object.type,
    description: parseDescription(object.description),
    date: parseDate(object.date),
    specialist: parseSpecialist(object.specialist),
    diagnosisCodes: parseDiagnosisCodes(object.diagnosisCodes),
    healthCheckRating: parseHealthCheckRating(object.healthCheckRating),
    id: uuidv4()
  };
};


export const newOccupationalHealthcareEntry = (object: any): Entry => {
  return {
    type: object.type,
    description: parseDescription(object.description),
    date: parseDate(object.date),
    specialist: parseSpecialist(object.specialist),
    diagnosisCodes: parseDiagnosisCodes(object.diagnosisCodes),
    employerName: parseEmployerName(object.employerName),
    sickLeave: parseSickLeave(object.sickLeave),
    id: uuidv4()
  };
};