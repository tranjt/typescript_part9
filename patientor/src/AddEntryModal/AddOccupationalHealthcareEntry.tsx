import React from "react";
import { Field, Formik, Form } from "formik";
import moment from "moment";
import * as Yup from "yup";
import { Grid, Button } from "semantic-ui-react";
import { useStateValue, } from "../state";
import { TextField, DiagnosisSelection } from "../AddPatientModal/FormField";
import { OccupationalHealthcareEntry } from '../types';


export type OccupationalHealthcareEntryFormValues = Omit<OccupationalHealthcareEntry, "id">;

interface Props {
  onCancel: () => void;
  onSubmit: (values: OccupationalHealthcareEntryFormValues) => void;
}

const OccupationalHealthcareSchema  = Yup.object().shape({
  description: Yup.string()
    .required("Field is required"),
  date: Yup.string()
    .required("Field is required")
    .matches(/([12]\d{3}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01]))/, "Date is not valid, use format (YYYY-MM-DD)"),
  specialist: Yup.string()
    .required("Field is required"),
  employerName: Yup.string()
    .required("Field is required"),
  sickLeave: Yup.object().shape({
    startDate: Yup.string()
      .required("Field is required")
      .matches(/([12]\d{3}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01]))/, "Date is not valid, use format (YYYY-MM-DD)"),
    endDate: Yup.string()
      .required("Field is required")
      .matches(/([12]\d{3}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01]))/, "Date is not valid, use format (YYYY-MM-DD)")
      .test("is-greater", "End date should be greater than start date", function(value) {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        const { startDate } = this.parent;
        const formatedValue = moment(value, "YYYY-MM-DD");
        const formatedstartDate = moment(startDate, "YYYY-MM-DD");
        return moment(formatedValue).isSameOrAfter(moment(formatedstartDate));
      }),
  })
});

const AddOccupationalHealthcareEntry: React.FC<Props> = ({ onSubmit, onCancel }) => {
  const [{ diagnosisList }] = useStateValue();

  return (
    <Formik
      initialValues={{
        type: "OccupationalHealthcare",
        description: "",
        date: "",
        specialist: "",
        employerName: "",
        sickLeave: {
          startDate: "",
          endDate: ""
        }
      }}
      onSubmit={onSubmit}
      validationSchema={OccupationalHealthcareSchema}
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
            <Field
              label="EmployerName"
              placeholder="EmployerName"
              name="employerName"
              component={TextField}
            />
            <fieldset>
              <legend>SickLeave</legend>
              <Field
                label="start date"
                placeholder="YYYY-MM-DD"
                name="sickLeave.startDate"
                component={TextField}
              />
              <Field
                label="end date"
                placeholder="YYYY-MM-DD"
                name="sickLeave.endDate"
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



export default AddOccupationalHealthcareEntry;