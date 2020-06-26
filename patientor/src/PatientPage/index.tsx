import React from "react";
import axios from "axios";
import { Icon, Button } from "semantic-ui-react";
import { useParams } from "react-router-dom"

import { EntryFormValues } from "../AddEntryModal/AddEntryForm";
import { Patient, Gender, Entry } from "../types";
import { apiBaseUrl } from "../constants";
import { useStateValue, getOnePatient, addEntry } from "../state";
import AddEntryModal from "../AddEntryModal";
import ShowEntry from "./ShowEntry";

const PatientPage: React.FC = () => {
    const [{currentPatient}, dispatch] = useStateValue();

    const [modalOpen, setModalOpen] = React.useState<boolean>(false);
    const [error, setError] = React.useState<string | undefined>();

    const openModal = (): void => setModalOpen(true);

    const closeModal = (): void => {
      setModalOpen(false);
      setError(undefined);
    };
    const { id } = useParams<{ id: string }>()

    
    
    React.useEffect(() => {
        const fetchPatient = async () => {
            try {
            const { data: patientFromApi } = await axios.get<Patient>(
                `${apiBaseUrl}/patients/${id}`
            );
            dispatch(getOnePatient(patientFromApi));
            } catch (e) {
                console.error(e);
            }
        };
        if (!currentPatient || currentPatient.id !== id) 
        fetchPatient();
    }, [dispatch]);

        const submitNewEntry = async (values: EntryFormValues) => {
        try {
          const { data: updatedPatient } = await axios.post<Patient>(
            `${apiBaseUrl}/patients/${id}/entries`,
            values
          );
          dispatch(addEntry(updatedPatient));
          closeModal();
        } catch (e) {
          console.error(e.response.data);
          setError(e.response.data.error);
        }
      };
      
    const getIcon = (gender: Gender | undefined) => {
        if (gender === "female") {
            return <Icon name="venus" />
        } else if (gender === "male") {
            return <Icon name="mars" />
        }
    }


    return (
        <div>
            <h2>{currentPatient?.name} {getIcon(currentPatient?.gender)}</h2>
            <p>ssn: {currentPatient?.ssn}</p>
            <p>occupation: {currentPatient?.occupation}</p>
            {currentPatient?.entries && currentPatient?.entries.length > 0 ? <div>
                <h3>entries</h3>
                {currentPatient?.entries.map(entry => (
                    <div>
                    <ShowEntry entry={entry} />
                    <br/>
                    </div>
                ))}
                </div> : <p>no entries</p>
            }
        
        <AddEntryModal
        modalOpen={modalOpen}
        onSubmit={submitNewEntry}
        error={error}
        onClose={closeModal}
      />
      <Button onClick={() => openModal()}>Add New Entry</Button>
        </div>
    )
}

export default PatientPage