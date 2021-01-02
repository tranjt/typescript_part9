import React from "react";
import { Field, Formik, Form } from "formik";
import * as Yup from 'yup';
import { Grid, Button } from "semantic-ui-react";
import { useStateValue, } from "../state";
import { TextField, DiagnosisSelection } from "../AddPatientModal/FormField";
import { HospitalEntry } from '../types';


export type HospitalEntryFormValues = Omit<HospitalEntry, "id">;

interface Props {
  onCancel: () => void;
  onSubmit: (values: HospitalEntryFormValues) => void;
}

const HospitalEntrySchema = Yup.object().shape({
  description: Yup.string()
    .required("Field is required"),
  date: Yup.string()
    .required("Field is required")
    .matches(/^\d{4}-\d{2}-\d{2}$/, "Date is not valid, use format (YYYY-MM-DD)"),
  specialist: Yup.string()
    .required("Field is required"),
  discharge: Yup.object().shape({
    date: Yup.string()
      .required("Field is required")
      .matches(/^\d{4}-\d{2}-\d{2}$/, "Date is not valid, use format (YYYY-MM-DD)"),      
    criteria: Yup.string()
      .required("Field is required")
  })
});


const AddHospitalEntryForm: React.FC<Props> = ({ onSubmit, onCancel }) => {
  const [{ diagnosisList }] = useStateValue();

  return (
    <Formik
      initialValues={{
        type: "Hospital",
        description: "",
        date: "",
        specialist: "",
        discharge: {
          date: "",
          criteria: ""
        }
      }}
      onSubmit={onSubmit}
      validationSchema={HospitalEntrySchema}
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
              label="Date Of Birth"
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
            <fieldset>
              <legend>Discharge</legend>
              <Field
                label="Discharge date"
                placeholder="YYYY-MM-DD"
                name="discharge.date"
                component={TextField}
              />
              <Field
                label="Criteria"
                placeholder="criteria"
                name="discharge.criteria"
                component={TextField}
              />
            </fieldset>
            <DiagnosisSelection
              setFieldValue={setFieldValue}
              setFieldTouched={setFieldTouched}
              diagnoses={Object.values(diagnosisList)}
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
                  Add Entry
                </Button>
              </Grid.Column>
            </Grid>
          </Form>
        );
      }}
    </Formik>
  );
};

export default AddHospitalEntryForm;