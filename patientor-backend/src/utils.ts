/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/restrict-plus-operands */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { NewPatient, Gender, NewEntry, HealthCheckRating, Discharge, SickLeave } from './types';

const toNewEntry = (object: any): NewEntry => {
    switch (object.type) {
        case "Hospital":
            return {
                type: "Hospital",
                description: parseDescription(object.description),
                date: parseDate(object.date),
                specialist: parseSpecialist(object.specialist),
                diagnosisCodes: parseDiagnosisCodes(object.diagnosisCodes),
                discharge: parseDischarge(object.discharge)
            };
        case "OccupationalHealthcare":
            return {
                type: "OccupationalHealthcare",
                description: parseDescription(object.description),
                date: parseDate(object.date),
                specialist: parseSpecialist(object.specialist),
                diagnosisCodes: parseDiagnosisCodes(object.diagnosisCodes),
                employerName: parseName(object.employerName),
                sickLeave: parseSickLeave(object.sickLeave)
            };
        case "HealthCheck":
            return {
                type: "HealthCheck",
                description: parseDescription(object.description),
                date: parseDate(object.date),
                specialist: parseSpecialist(object.specialist),
                diagnosisCodes: parseDiagnosisCodes(object.diagnosisCodes),
                healthCheckRating: parseHealthCheckRating(object.healthCheckRating)
            };
        default:
            throw new Error('Incorrect or missing type' + object.type);
    }
    
};

const parseSickLeave = (leave: any): SickLeave => {
    if (leave && (!leave.startDate || !isString(leave.startDate) || !leave.endDate || !isString(leave.endDate))) {
        throw new Error('Incorrect or missing sick leave: ' + leave);
    }

    return leave;
};

const parseDischarge = (discharge: any): Discharge => {
    if (!discharge || !discharge.date || !isString(discharge.date) || !discharge.description || !isString(discharge.description)) {
        throw new Error('Incorrect or missing discharge: ' + discharge);
    }

    return discharge;
};


const parseHealthCheckRating = (rating: any): HealthCheckRating => {
    if (!rating || !isRating(rating)) {
        throw new Error('Incorrect or missing health check rating: ' + rating);
    }
    return rating;
};

const isRating = (param: any): param is HealthCheckRating => {
    return Object.values(HealthCheckRating).includes(param);
};

const parseDescription = (description: any): string => {
    if (!description || !isString(description)) {
        throw new Error('Incorrect or missing description: ' + description);
      }
  
      return description;
};

const parseSpecialist = (specialist: any): string => {
    if (!specialist || !isString(specialist)) {
        throw new Error('Incorrect or missing specialist: ' + specialist);
      }
  
      return specialist;
};

const parseDiagnosisCodes = (diagnosisCodes: any): string[] => {
    if (diagnosisCodes && diagnosisCodes.length > 0) {
        diagnosisCodes.forEach((diagnosisCode: any) => {
            if (!isString(diagnosisCode)) {
                throw new Error("Incorrect diagnosis code: " + diagnosisCode);
            }
        });
    }
  
    return diagnosisCodes;
};

const toNewPatient = (object: any): NewPatient => {
    return {
        name: parseName(object.name),
        dateOfBirth: parseDate(object.dateOfBirth),
        ssn: parseSSN(object.ssn),
        gender: parseGender(object.gender),
        occupation: parseOccupation(object.occupation)
    };
};

const parseName = (name: any): string => {
    if (!name || !isString(name)) {
      throw new Error('Incorrect or missing name: ' + name);
    }

    return name;
};

const isString = (text: any): text is string => {
    return typeof text === 'string' || text instanceof String;
};

const parseDate = (date: any): string => {
    if (!date || !isString(date) || !isDate(date)) {
        throw new Error('Incorrect or missing date: ' + date);
    }

    return date;
};

const isDate = (dateOfBirth: string): boolean => {
    return Boolean(Date.parse(dateOfBirth));
};

const parseSSN = (ssn: any): string => {
    if (!ssn || !isString(ssn)) {
        throw new Error('Incorrect or missing ssn: ' + ssn);
    }

    return ssn;
};

const parseOccupation = (occupation: any): string => {
    if (!occupation || !isString(occupation)) {
        throw new Error('Incorrect or missing occupation: ' + occupation);
    }
    return occupation;
};

const parseGender = (gender: any): Gender => {
    if (!gender || !isGender(gender)) {
        throw new Error('Incorrect or missing gender: ' + gender);
    }
    return gender;
};

const isGender = (param: any): param is Gender => {
    return Object.values(Gender).includes(param);
};

export default {
    toNewPatient,
    toNewEntry
};