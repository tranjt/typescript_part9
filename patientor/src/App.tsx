import React from "react";
import axios from "axios";
import { Route, Link, Switch, useRouteMatch } from "react-router-dom";
import { Button, Divider, Header, Container } from "semantic-ui-react";

import { apiBaseUrl } from "./constants";
import { useStateValue } from "./state";
import { Patient } from "./types";

import PatientListPage from "./PatientListPage";
import PatientInfo from "./components/PatientInfo";

const App: React.FC = () => {
  const [{ patients }, dispatch] = useStateValue();
  React.useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    axios.get<void>(`${apiBaseUrl}/ping`);

    const fetchPatientList = async () => {
      try {
        const { data: patientListFromApi } = await axios.get<Patient[]>(
          `${apiBaseUrl}/patients`
        );
        dispatch({ type: "SET_PATIENT_LIST", payload: patientListFromApi });
      } catch (e) {
        console.error(e);
      }
    };
    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    fetchPatientList();
  }, [dispatch]);

  const fetchPatientInfo = async (id: string) => {
    try {
      const { data: patientFromApi } = await axios.get<Patient>(
        `${apiBaseUrl}/patients/${id}`
      );
      dispatch({ type: "UPDATE_PATIENT_INFO", payload: patientFromApi });      
    } catch (e) {
      console.error(e);
    }
  };

  const containsSSN = (id: string): boolean => {
    return "ssn" in patients[id];
  };

  const handleFullPatientInfo = (id: string): Patient => {
    if (!containsSSN(id)) {
      // eslint-disable-next-line @typescript-eslint/no-floating-promises
      fetchPatientInfo(id);
    }
    return patients[id];
  }; 

  const patientMatch = useRouteMatch<{ id: string }>('/patients/:id');
  const patient = patientMatch
    ? handleFullPatientInfo(patientMatch.params.id)
    : null;


  return (
    <div className="App">
      <Container>
        <Header as="h1">Patientor</Header>
        <Button as={Link} to="/" primary>
          Home
          </Button>
        <Divider hidden />
        <Switch>
          <Route path="/patients/:id">
            <PatientInfo patient={patient} />
          </Route>
          <Route path="/" render={() => <PatientListPage />} />
        </Switch>
      </Container>
    </div>
  );
};

export default App;
