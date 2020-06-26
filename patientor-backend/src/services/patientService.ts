import patients from '../../data/patients';
import { v1 as uuid } from 'uuid';

import { Patient, NewPatient, PublicPatient, NewEntry } from '../types';


const getPatients = (): PublicPatient[] => {
    return patients.map(({ id, name, dateOfBirth, gender, occupation }) => ({
        id,
        name,
        dateOfBirth,
        gender,
        occupation
    }));
};

const addPatient = ( patient: NewPatient ): Patient => {
    const id: string = uuid();
        const newPatient = {
        id,
        entries: [],
        ...patient
    };
    
    
    patients.push(newPatient);
    return newPatient;
};

const findById = (id: string): Patient | undefined => {
    const patient = patients.find(p => p.id === id);
    return patient;
};

const addEntry = (entry: NewEntry, id: string): Patient => {
    const entryId: string = uuid();
    const newEntry = {
        id: entryId,
        ...entry
    };
    const patient = findById(id);
    if (patient) {
        patient.entries.push(newEntry);
        return patient;
    } else {
        throw new Error("Invalid patient id");
    }
};

export default {
    getPatients,
    addPatient,
    findById,
    addEntry
};