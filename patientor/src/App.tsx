import React from "react";
import axios from "axios";
import { Route, Link, Switch, useRouteMatch } from "react-router-dom";
import { Button, Divider, Header, Container } from "semantic-ui-react";

import { apiBaseUrl } from "./constants";
import { useStateValue, setPatientList, updatePatientInfo } from "./state";
import { Patient, Diagnosis } from "./types";

import PatientListPage from "./PatientListPage";
import PatientInfo from "./components/PatientInfo";

const App: React.FC = () => {
  const [{ patients }, dispatch] = useStateValue();
  const [diagnosisList, setDiagnosisList] = React.useState<Diagnosis[]>([]);
  React.useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    axios.get<void>(`${apiBaseUrl}/ping`);

    const fetchPatientList = async () => {
      try {
        const { data: patientListFromApi } = await axios.get<Patient[]>(
          `${apiBaseUrl}/patients`
        );

        dispatch(setPatientList(patientListFromApi));
      } catch (e) {
        console.error(e);
      }
    };

    const fetchDiagnosisList = async () => {
      return await axios.get<Diagnosis[]>(
        `${apiBaseUrl}/diagnoses`
      );
    };

    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    fetchPatientList();

    fetchDiagnosisList()
      .then((res) => {
        setDiagnosisList(res.data);
      }).catch((error) => {
        console.error(error);
      });
  }, [dispatch]);

  const fetchPatientInfo = async (id: string) => {
    return await axios.get<Patient>(
        `${apiBaseUrl}/patients/${id}`
      );      
  };

  const containsSSN = (id: string): boolean => {
    return "ssn" in patients[id];
  };

  const handleFullPatientInfo = (id: string): Patient => {

    if (!containsSSN(id)) {   
      fetchPatientInfo(id)
      .then((res) => {
        dispatch(updatePatientInfo(res.data));
      }).catch((error) => {
        console.error(error);
      });
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
            <PatientInfo patient={patient} diagnosisList={diagnosisList} />
          </Route>
          <Route path="/" render={() => <PatientListPage />} />
        </Switch>
      </Container>
    </div>
  );
};

export default App;
