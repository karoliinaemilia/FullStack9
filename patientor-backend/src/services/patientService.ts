import patients from '../../data/patients';
import { v1 as uuid } from 'uuid';

import { Patient, NewPatient, PatientWithoutSSN } from '../types';


const getPatients = (): PatientWithoutSSN[] => {
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
        ...patient
    };
    patients.push(newPatient);
    return newPatient;
};

export default {
    getPatients,
    addPatient
};