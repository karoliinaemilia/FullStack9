import React from "react";
import axios from "axios";
import { Icon, Card } from "semantic-ui-react";

import { Diagnosis, Entry, HealthCheckRating, HealthCheckEntry, HospitalEntry, OccupationalHealthcareEntry } from "../types";
import { useStateValue } from "../state";

const assertNever = (value: never): never => {
    throw new Error(
      `Unhandled discriminated union member: ${JSON.stringify(value)}`
    );
  };

const ShowEntry: React.FC<{ entry: Entry }> = ({ entry }) => {
    const [{diagnoses}] = useStateValue();

    const getDiagnosis = (code: string) => {
        if (diagnoses) {
            const diagnosis = Object.values(diagnoses).find((d: Diagnosis | undefined) => d?.code === code)
    
            return <p>{diagnosis?.code} {diagnosis?.name}</p>
        }
        return null
    }

    switch (entry.type) {
        case "Hospital":
            return <ShowHospitalEntry entry={entry} getDiagnosis={getDiagnosis} />
        case "OccupationalHealthcare":
            return <ShowOccupationalEntry entry={entry} getDiagnosis={getDiagnosis}/>
        case "HealthCheck":
            return <ShowHealthCheckEntry entry={entry} getDiagnosis={getDiagnosis}/>
        default:
            return assertNever(entry)
           
    }
}

const ShowHospitalEntry: React.FC<{entry: HospitalEntry, getDiagnosis: Function}> = ({entry, getDiagnosis}) => {
    return (
        <div>
            <Card>
            <Card.Content>
                <Card.Header>{entry.date} <Icon name="hospital" /></Card.Header>
                <Card.Description><i>{entry.description}</i></Card.Description>
                {entry.diagnosisCodes ? <ul>{entry.diagnosisCodes?.map(code => (
                            <li>{getDiagnosis(code)}</li>
                        ))}</ul>
                : null
                }
                <b>Discharged on: {entry.discharge.date}</b> <br/>
                <i>{entry.discharge.criteria}</i>
            </Card.Content>
            </Card>
        </div>
    )
}

const ShowOccupationalEntry: React.FC<{entry: OccupationalHealthcareEntry, getDiagnosis: Function}> = ({entry, getDiagnosis}) => {
    return (
        <div>
            <Card>
            <Card.Content>
                <Card.Header>
                {entry.date} <Icon name="stethoscope" /> {entry.employerName}</Card.Header>
                <Card.Description><i>{entry.description}</i></Card.Description>
                {entry.diagnosisCodes ? <ul>{entry.diagnosisCodes?.map(code => (
                            <li>{getDiagnosis(code)}</li>
                        ))}</ul>
                : null
                }
                {entry.sickLeave ? <div><h4>Sick leave</h4><p>From: {entry.sickLeave.startDate} <br/> To: {entry.sickLeave.endDate}</p></div> : null}
            </Card.Content>
            </Card>
        </div>
    )
}

const ShowHealthCheckEntry: React.FC<{entry: HealthCheckEntry, getDiagnosis: Function}> = ({entry, getDiagnosis}) => {
    const getHealthIcon = (rating: HealthCheckRating) => {
        console.log(rating)
        switch (rating) {
            case 3:
                return <Icon name="heart" color="orange" /> 
            case 2:
                return <Icon name="heart" color="yellow" /> 
            case 1:
                return <Icon name="heart" color="green" /> 
            case 4:
                return <Icon name="heart" color="red" /> 
            default:
                return null
        }
    }

    return (
        <div>
            <Card>
                <Card.Content>
                <Card.Header>{entry.date} <Icon name="doctor" /></Card.Header>
                {getHealthIcon(entry.healthCheckRating)}
                <Card.Description><i>{entry.description}</i></Card.Description>
                {entry.diagnosisCodes ? <ul>{entry.diagnosisCodes?.map(code => (
                            <li>{getDiagnosis(code)}</li>
                        ))}</ul>
                : null
                }
                </Card.Content>
            </Card>
        </div>
    )
}

export default ShowEntry