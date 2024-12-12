import React from "react";
import supplierData from '../mockdata/masterdata.json';



const RiskDetailsPopup = ({ supplier, closePopup }) => {

  const getRiskColor = (riskValue) => {
    if (riskValue === 'High') {
      return 'bg-red-500 text-black';
    } else if (riskValue === 'Medium') {
      return 'bg-yellow-500 text-black';
    } else if (riskValue === 'Low') {
      return 'bg-green-500 text-black';
    } else {
      return 'bg-gray-300 text-gray-800'; 
    }
  };

  if (!supplier) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-4xl w-full max-h-[80vh] overflow-y-auto">
        <span className="text-xl font-bold mb-4 pr-5">Supplier Risk Details - {supplier.supplierName}</span>
        <span className={`inline-block px-2 rounded-full pl-3 ${getRiskColor(supplier.overAllRisk)}`}>
              {supplier.overAllRisk}
        </span>
        <br/>
        <br/>

            <h3 className="text-lg font-semibold mb-2">Country Risk</h3>
            <div className="w-full text-left text-sm">
              <div>
                {Object.entries(supplier.countryRisk || {}).map(([key, value]) => (
                  <div key={key}>
                    {key === 'overAll' &&<>
                      <span className="pr-4 font-medium capitalize">{key} - {value}</span>
                      <span className={`inline-block px-2 rounded-full ${getRiskColor(supplier.countryRisk.overAllInd)}`}>
                        {supplier.countryRisk.overAllInd}
                      </span>
                      <div>{supplierData.definitions.country.overall}</div>
                      </>
                    }
                    {key === 'demographicPressures' &&
                    <>
                    <span className="pr-4 font-medium capitalize">{key} - {value}</span>
                    <span className={`inline-block px-2 rounded-full ${getRiskColor(supplier.countryRisk.demographicPressuresInd)}`}>
                        {supplier.countryRisk.demographicPressuresInd}
                      </span>
                      <div>{supplierData.definitions.country.demographicPressures}</div>
                    </>
                    }
                    {key === 'economy' &&
                    <>
                    <span className="pr-4 font-medium capitalize">{key} - {value}</span>
                    <span className={`inline-block px-2 rounded-full ${getRiskColor(supplier.countryRisk.economyInd)}`}>
                        {supplier.countryRisk.economyInd}
                      </span>
                      <div>{supplierData.definitions.country.economy}</div>
                      </>
                    }
                    {key === 'stateLegitimacy' &&
                    <>
                    <span className="pr-4 font-medium capitalize">{key} - {value}</span>
                    <span className={`inline-block px-2 rounded-full ${getRiskColor(supplier.countryRisk.stateLegitimacyInd)}`}>
                        {supplier.countryRisk.stateLegitimacyInd}
                      </span>
                      <div>{supplierData.definitions.country.stateLegitimacy}</div>
                      </>
                    }
                    {key === 'securityAppratus' &&
                    <>
                    <span className="pr-4 font-medium capitalize">{key} - {value}</span>
                    <span className={`inline-block px-2 rounded-full ${getRiskColor(supplier.countryRisk.securityAppratusInd)}`}>
                        {supplier.countryRisk.securityAppratusInd}
                      </span>
                      <div>{supplierData.definitions.country.securityAppratus}</div>
                      </>
                    }
                    {key === 'externalIntervention' &&
                    <>
                    <span className="pr-4 font-medium capitalize">{key} - {value}</span>
                    <span className={`inline-block px-2 rounded-full ${getRiskColor(supplier.countryRisk.externalInterventionInd)}`}>
                        {supplier.countryRisk.externalInterventionInd}
                      </span>
                      <div>{supplierData.definitions.country.externalIntervention}</div>
                      </>
                    }
                    {key === 'economicInequality' &&
                     <>
                    <span className="pr-4 font-medium capitalize">{key} - {value}</span>
                     <span className={`inline-block px-2 rounded-full ${getRiskColor(supplier.countryRisk.economicInequalityInd)}`}>
                         {supplier.countryRisk.economicInequalityInd}
                       </span>
                      <div>{supplierData.definitions.country.economicInequality}</div>
                      </>
                    }
                    {key === 'refugeeCrisis' &&
                    <>
                    <span className="pr-4 font-medium capitalize">{key} - {value}</span>
                    <span className={`inline-block px-2 rounded-full ${getRiskColor(supplier.countryRisk.refugeeCrisisInd)}`}>
                        {supplier.countryRisk.refugeeCrisisInd}
                      </span>
                      <div>{supplierData.definitions.country.refugeeCrisis}</div>
                      </>
                    }
                    <br/>
                    
                  </div>
                ))}
              </div>
            </div>

            <h3 className="text-lg font-semibold mb-2">Natural Hazard Risk</h3>
            <div className="w-full text-left text-sm">
              <div>
                {Object.entries(supplier.naturalHazardRisk || {}).map(([key, value]) => (
                   <div key={key}>
                   {key === 'overAll' &&<>
                     <span className="pr-4 font-medium capitalize">{key} - {value}</span>
                     <span className={`inline-block px-2 rounded-full ${getRiskColor(supplier.naturalHazardRisk.overAllInd)}`}>
                       {supplier.naturalHazardRisk.overAllInd}
                     </span>
                     <div>{supplierData.definitions.naturalHazard.overall}</div>
                     </>
                   }
                   {key === 'earthquakes' &&
                   <>
                   <span className="pr-4 font-medium capitalize">{key} - {value}</span>
                   <span className={`inline-block px-2 rounded-full ${getRiskColor(supplier.naturalHazardRisk.earthquakesInd)}`}>
                       {supplier.naturalHazardRisk.earthquakesInd}
                     </span>
                     <div>{supplierData.definitions.naturalHazard.earthquakes}</div>
                   </>
                   }
                   {key === 'tsunami' &&
                   <>
                   <span className="pr-4 font-medium capitalize">{key} - {value}</span>
                   <span className={`inline-block px-2 rounded-full ${getRiskColor(supplier.naturalHazardRisk.tsunamiInd)}`}>
                       {supplier.naturalHazardRisk.tsunamiInd}
                     </span>
                     <div>{supplierData.definitions.naturalHazard.tsunami}</div>
                     </>
                   }
                   {key === 'coatalFlooding' &&
                   <>
                   <span className="pr-4 font-medium capitalize">{key} - {value}</span>
                   <span className={`inline-block px-2 rounded-full ${getRiskColor(supplier.naturalHazardRisk.coatalFloodingInd)}`}>
                       {supplier.naturalHazardRisk.coatalFloodingInd}
                     </span>
                     <div>{supplierData.definitions.naturalHazard.coatalFlooding}</div>
                     </>
                   }
                   {key === 'cyclones' &&
                   <>
                   <span className="pr-4 font-medium capitalize">{key} - {value}</span>
                   <span className={`inline-block px-2 rounded-full ${getRiskColor(supplier.naturalHazardRisk.cyclonesInd)}`}>
                       {supplier.naturalHazardRisk.cyclonesInd}
                     </span>
                     <div>{supplierData.definitions.naturalHazard.cyclones}</div>
                     </>
                   }
                   {key === 'draoughts' &&
                   <>
                   <span className="pr-4 font-medium capitalize">{key} - {value}</span>
                   <span className={`inline-block px-2 rounded-full ${getRiskColor(supplier.naturalHazardRisk.draoughtsInd)}`}>
                       {supplier.naturalHazardRisk.draoughtsInd}
                     </span>
                     <div>{supplierData.definitions.naturalHazard.draoughts}</div>
                     </>
                   }
                   {key === 'seaLevelRise' &&
                    <>
                   <span className="pr-4 font-medium capitalize">{key} - {value}</span>
                    <span className={`inline-block px-2 rounded-full ${getRiskColor(supplier.naturalHazardRisk.seaLevelRiseInd)}`}>
                        {supplier.naturalHazardRisk.seaLevelRiseInd}
                      </span>
                     <div>{supplierData.definitions.naturalHazard.seaLevelRise}</div>
                     </>
                   }

                   <br/>
                   
                 </div>
                ))}
              </div>
            </div>

            <h3 className="text-lg font-semibold mb-2">Financial Risk</h3>
            <div className="w-full text-left text-sm">
              <div>
                {Object.entries(supplier.financialRisk || {}).map(([key, value]) => (
                   <div key={key}>
                   {key === 'overAll' &&<>
                     <span className="pr-4 font-medium capitalize">{key} - {value}</span>
                     <span className={`inline-block px-2 rounded-full ${getRiskColor(supplier.financialRisk.overAllInd)}`}>
                       {supplier.financialRisk.overAllInd}
                     </span>
                     <div>{supplierData.definitions.financial.overall}</div>
                     </>
                   }
                   {key === 'SSI' &&
                   <>
                   <span className="pr-4 font-medium capitalize">{key} - {value}</span>
                   <span className={`inline-block px-2 rounded-full ${getRiskColor(supplier.financialRisk.SSIInd)}`}>
                       {supplier.financialRisk.SSIInd}
                     </span>
                     <div>{supplierData.definitions.financial.SSI}</div>
                   </>
                   }
                   {key === 'SER' &&
                   <>
                   <span className="pr-4 font-medium capitalize">{key} - {value}</span>
                   <span className={`inline-block px-2 rounded-full ${getRiskColor(supplier.financialRisk.SERInd)}`}>
                       {supplier.financialRisk.SERInd}
                     </span>
                     <div>{supplierData.definitions.financial.SER}</div>
                     </>
                   }
                   
                   <br/>
                   
                 </div>
                ))}
              </div>
            </div>


            <h3 className="text-lg font-semibold mb-2">Operational Risk</h3>
            <div className="w-full text-left text-sm">
              <div>
                {Object.entries(supplier.operationalRisk || {}).map(([key, value]) => (
                  <div key={key}>
                  {key === 'overAll' &&<>
                    <span className="pr-4 font-medium capitalize">{key} - {value}</span>
                    <span className={`inline-block px-2 rounded-full ${getRiskColor(supplier.operationalRisk.overAllInd)}`}>
                      {supplier.operationalRisk.overAllInd}
                    </span>
                    <div>{supplierData.definitions.operational.overall}</div>
                    <br/>
                    </>
                  }
                  {key === 'deliveryDelays' &&
                  <>
                  <span className="pr-4 font-medium capitalize">{key} - {value}</span>
                  <span className={`inline-block px-2 rounded-full ${getRiskColor(supplier.operationalRisk.deliveryDelaysInd)}`}>
                      {supplier.operationalRisk.deliveryDelaysInd}
                    </span>
                    <div>{supplierData.definitions.operational.deliveryDelays}</div>
                    <br/>
                  </>
             
                  }
                  {key === 'qualityIssues' &&
                  <>
                  <span className="pr-4 font-medium capitalize">{key} - {value}</span>
                  <span className={`inline-block px-2 rounded-full ${getRiskColor(supplier.operationalRisk.qualityIssuesInd)}`}>
                      {supplier.operationalRisk.qualityIssuesInd}
                    </span>
                    <div>{supplierData.definitions.operational.qualityIssues}</div>
                    <br/>
                    </>
                  }
                  </div>

                ))}
                </div>
            </div>

        <div className="mt-6 text-right">
          <button
            onClick={closePopup}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default RiskDetailsPopup;
