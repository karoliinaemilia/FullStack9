import React from "react";
import moment from 'moment'
import { Grid, Button } from "semantic-ui-react";
import { Field, Formik, Form } from "formik";

import { TextField, NumberField, DiagnosisSelection } from "../AddPatientModal/FormField";
import { HealthCheckEntry, HealthCheckRating } from "../types";
import { useStateValue } from "../state";

/*
 * use type Patient, but omit id and entries,
 * because those are irrelevant for new patient object.
 */
export type EntryFormValues = Omit<HealthCheckEntry, "id">;

interface Props {
  onSubmit: (values: EntryFormValues) => void;
  onCancel: () => void;
}

export const AddEntryForm: React.FC<Props> = ({ onSubmit, onCancel }) => {
    const [{diagnoses}] = useStateValue()
  return (
    <Formik
      initialValues={{
        type: "HealthCheck",
        description: "",
        date: "",
        specialist: "",
        diagnosisCodes: [],
        healthCheckRating: HealthCheckRating.Healthy
      }}
      onSubmit={onSubmit}
      validate={values => {
        const requiredError = "Field is required";
        const errors: { [field: string]: string } = {};
        if (!values.description) {
          errors.description = requiredError;
        } else if (values.description.length < 10) {
          errors.description = "Description is too short"
        } else if (values.description.length > 250) {
          errors.description = "Description is too long"
        }
        if (!values.date) {
          errors.date = requiredError;
        } else if (!moment(values.date, "YYYY-MM-DD", true).isValid()) {
          errors.date = "Date is not correctly formatted"
        }
        if (!values.specialist) {
          errors.specialist = requiredError;
        } else if (values.specialist.length < 3) {
          errors.specialist = "Specialist name is too short"
        } else if (values.specialist.length > 50) {
          errors.specialist = "Specialist name is too long"
        }
        if (!values.healthCheckRating) {
          errors.healthCheckRating = requiredError
        } else if(values.healthCheckRating > 4 || values.healthCheckRating < 1) {
          errors.healthCheckRating = "Rating must be a number between 1 and 4"
        }
        return errors;
      }}
    >
      {({ isValid, dirty, setFieldValue, setFieldTouched }) => {
        return (
          
          <Form className="form ui">
            <Field
              label="Description"
              placeholder="Description"
              name="description"
              component={TextField}
            />
            <Field
              label="Date"
              placeholder="YYYY-MM-DD"
              name="date"
              component={TextField}
            />
            <Field
              label="Specialist"
              placeholder="Specialist"
              name="specialist"
              component={TextField}
            />
            <Field
              label="HealthCheckRating"
              name="healthCheckRating"
              component={NumberField}
              min={1}
              max={4}
            />
            <DiagnosisSelection
                setFieldValue={setFieldValue}
                setFieldTouched={setFieldTouched}
                diagnoses={Object.values(diagnoses)}
          /> 
            <Grid>
              <Grid.Column floated="left" width={5}>
                <Button type="button" onClick={onCancel} color="red">
                  Cancel
                </Button>
              </Grid.Column>
              <Grid.Column floated="right" width={5}>
                <Button
                  type="submit"
                  floated="right"
                  color="green"
                  disabled={!dirty || !isValid}
                >
                  Add
                </Button>
              </Grid.Column>
            </Grid>
          </Form>
        );
      }}
    </Formik>
  );
};

export default AddEntryForm;
