"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.newOccupationalHealthcareEntry = exports.newHealthCheckEntry = exports.newHostpitalEntry = void 0;
const types_1 = require("../types");
const uuid_1 = require("uuid");
const isString = (text) => {
    return typeof text === 'string' || text instanceof String;
};
const isDate = (date) => {
    return Boolean(Date.parse(date));
};
const parseDate = (date) => {
    if (!date || !isString(date) || !isDate(date)) {
        throw new Error('Incorrect or missing date:' + date);
    }
    return date;
};
const parseDescription = (description) => {
    if (!description || !isString(description)) {
        throw new Error('Incorrect or missing description:' + description);
    }
    return description;
};
const parseSpecialist = (specialist) => {
    if (!specialist || !isString(specialist)) {
        throw new Error('Incorrect or missing specialist:' + specialist);
    }
    return specialist;
};
const parseDiagnosisCodes = (diagnosisCodes) => {
    if (diagnosisCodes) {
        diagnosisCodes.forEach((diagnosis) => {
            if (!isString(diagnosis)) {
                throw new Error('Incorrect diagnosis code:' + diagnosis);
            }
            return diagnosis;
        });
    }
    return diagnosisCodes;
};
const isDischarge = (discharge) => {
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
};
const parseDischarge = (discharge) => {
    if (!discharge || !isDischarge(discharge)) {
        throw new Error('Incorrect or missing discharge:' + discharge);
    }
    return discharge;
};
const isHealthCheckRating = (param) => {
    return param in types_1.HealthCheckRating;
};
const parseHealthCheckRating = (healthCheckRating) => {
    if (isHealthCheckRating(healthCheckRating)) {
        return healthCheckRating;
    }
    else {
        throw new Error('Incorrect or missing healthCheckRating: ' + healthCheckRating);
    }
};
const parseEmployerName = (employerName) => {
    if (!employerName || !isString(employerName)) {
        throw new Error('Incorrect or missing employerName:' + employerName);
    }
    return employerName;
};
const isSickLeave = (sickLeave) => {
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
};
const parseSickLeave = (sickLeave) => {
    if (!sickLeave || !isSickLeave(sickLeave)) {
        throw new Error('Incorrect or missing employerName:' + sickLeave);
    }
    return sickLeave;
};
const newHostpitalEntry = (object) => {
    return {
        type: object.type,
        description: parseDescription(object.description),
        date: parseDate(object.date),
        specialist: parseSpecialist(object.specialist),
        diagnosisCodes: parseDiagnosisCodes(object.diagnosisCodes),
        discharge: parseDischarge(object.discharge),
        id: uuid_1.v4()
    };
};
exports.newHostpitalEntry = newHostpitalEntry;
const newHealthCheckEntry = (object) => {
    return {
        type: object.type,
        description: parseDescription(object.description),
        date: parseDate(object.date),
        specialist: parseSpecialist(object.specialist),
        diagnosisCodes: parseDiagnosisCodes(object.diagnosisCodes),
        healthCheckRating: parseHealthCheckRating(object.healthCheckRating),
        id: uuid_1.v4()
    };
};
exports.newHealthCheckEntry = newHealthCheckEntry;
const newOccupationalHealthcareEntry = (object) => {
    return {
        type: object.type,
        description: parseDescription(object.description),
        date: parseDate(object.date),
        specialist: parseSpecialist(object.specialist),
        diagnosisCodes: parseDiagnosisCodes(object.diagnosisCodes),
        employerName: parseEmployerName(object.employerName),
        sickLeave: parseSickLeave(object.sickLeave),
        id: uuid_1.v4()
    };
};
exports.newOccupationalHealthcareEntry = newOccupationalHealthcareEntry;
