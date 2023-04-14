import './App.css';
import './customized-color.css';
import {useState, useRef, useEffect} from 'react';
import {db} from './firebase-config';
import {ref, onValue, child, get} from '../node_modules/firebase/database';

function App() {

  const [init, updateInit] = useState(true);
  const [macAddress, updateMacAddress] = useState([]);
  const [tempFlowRate, updateTempFlowRate] = useState([]);
  const [totalConsumption, updateTotalConsumption] = useState([]);

  useEffect(() => {
    loadData();
    updateInit(false);
    refreshInit();
  },[init]);

  const loadData = () => {

    // get macAddress. GET THE VALUE OF THE KEY. UPDATE useRef macAddress.
    const tempFlowRateRef = ref(db, 'sensors/tempFlowRate/');
    onValue(tempFlowRateRef, (snapshot) => {
      const dataMacAddress = snapshot.val();
      const dataMacAddressKey = Object.keys(dataMacAddress);
      const datatempFlowRate = Object.values(dataMacAddress);
      updateMacAddress(dataMacAddressKey);
      updateTempFlowRate(datatempFlowRate);
    });
    console.log(macAddress);
    console.log(tempFlowRate);

    const totalConsumptionRef = ref(db, 'sensors/total-volume/')
    onValue(totalConsumptionRef, (snapshot) => {
      const dataTotalConsumption = snapshot.val();
      const dataTotalConsumptionVal = Object.values(dataTotalConsumption);
      updateTotalConsumption(dataTotalConsumptionVal);
    })
  }

  const refreshInit = () => {
    updateInit(true);
  }

  return (
    <div className="main">
      <h1 class="emp">Mac Address: {macAddress}</h1>
      <h1 class="border">Current Flow Rate: {tempFlowRate}</h1>
      <h1 class="emp">Mac Address: {macAddress}</h1>
      <h1 class="border">Total Consumption: {totalConsumption}</h1>
    </div>
  );
}

export default App;
