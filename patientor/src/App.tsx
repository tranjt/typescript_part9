import React from "react";
import axios from "axios";
import { Route, Link, Switch, useRouteMatch } from "react-router-dom";
import { Button, Divider, Header, Container } from "semantic-ui-react";

import { apiBaseUrl } from "./constants";
import { useStateValue, setPatientList, updatePatientInfo, setDiagonsisList } from "./state";
import { Patient } from "./types";
import patientService from './service/patient';
import PatientListPage from "./PatientListPage";
import PatientInfo from "./components/PatientInfo";


const App: React.FC = () => {
  const [{ patients }, dispatch] = useStateValue();
  React.useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    axios.get<void>(`${apiBaseUrl}/ping`);   
    
    patientService.fetchPatientList()
      .then((res) => {
        dispatch(setPatientList(res.data));
      }).catch((error) => {
        console.error(error);
      });

    patientService.fetchDiagnosisList()
      .then((res) => {        
        dispatch(setDiagonsisList(res.data));
      }).catch((error) => {
        console.error(error);
      });

  }, [dispatch]);


  const containsSSN = (id: string): boolean => {
    return "ssn" in patients[id];
  };

  const handleFullPatientInfo = (id: string): Patient => {
    if (!containsSSN(id)) {
      patientService.fetchPatientInfo(id)
        .then((res) => {
          dispatch(updatePatientInfo(res.data));
        }).catch((error) => {
          console.error(error);
        });
    }
    return patients[id];
  };

  const patientMatch = useRouteMatch<{ id: string }>("/patients/:id");
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
