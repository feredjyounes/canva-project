import React, { useState } from 'react';
import { TabView, TabPanel } from 'primereact/tabview';
import Pourtefeuille from '../pourtefeuille/Pourtefeuille';
import './Canva.css';
function Canva() {
    const [activeIndex, setActiveIndex] = useState(0);

  return (
    <div>
        <TabView activeIndex={activeIndex} scrollable onTabChange={(e) => setActiveIndex(e.index)}>
            <TabPanel header="Pourtefeuille">
                <Pourtefeuille/>
            </TabPanel>
            <TabPanel header="Chimie">
            </TabPanel>
            <TabPanel header="Groupes">
                Content III
            </TabPanel>
             <TabPanel header="GIPEC">
                Content II
            </TabPanel>
            <TabPanel header="GIPEC-Societe-mere">
                Content III
            </TabPanel>
            <TabPanel header="EMBAG">
                Content II
            </TabPanel>
            <TabPanel header="SACAR">
                Content III
            </TabPanel>
            <TabPanel header="ORAN-SACS">
                Content III
            </TabPanel>
            <TabPanel header="PAPCAS">
                Content III
            </TabPanel>
            <TabPanel header="PAPIREC">
                Content III
            </TabPanel>
            <TabPanel header="SACAEH">
                Content III
            </TabPanel>
            <TabPanel header="ENAVA">
                Content III
            </TabPanel>
            <TabPanel header="ENAVA-Societe-mere">
                Content III
            </TabPanel>  
            <TabPanel header="ABRAS">
                Content III
            </TabPanel>
            <TabPanel header="SACAR">
                Content III
            </TabPanel>
            <TabPanel header="SACAR">
                Content III
            </TabPanel>
        </TabView>
    </div>
  )
}

export default Canva;