import React, { useState, useEffect, useRef } from 'react';
import { TreeTable } from 'primereact/treetable';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { ColumnGroup } from 'primereact/columngroup';
import { Row } from 'primereact/row';
import { InputText } from 'primereact/inputtext';
import { Toast } from 'primereact/toast';
import { CanvaService } from '../../service/CanvaService';
import axios from 'axios';
import './Pourtefeuille.css';
function Pourtefeuille() {
    const [nodes, setNodes] = useState([]);
    const [expandedRows, setExpandedRows] = useState([]);
    const canvaService = new CanvaService();
    const toast = useRef(null);

    
    useEffect(() => {
        canvaService.getCanvas().then(data =>  setNodes(data));
    }, []); 

   
    const onRowEditComplete = (e) => {
        let _nodes = [...nodes];
        let { newData, index } = e;
        console.log(newData);
        _nodes[index] = newData;

        setNodes(_nodes);
    }


    const onRowGroupExpand = (event) => {
        console.log(event.data);
        //toast.current.show({ severity: 'info', summary: 'Row Group Expanded', detail: 'Value: ' + event.data.agregats, life: 3000 });
    }

    const onRowGroupCollapse = (event) => {
        console.log(event.data);
        //toast.current.show({ severity: 'success', summary: 'Row Group Collapsed', detail: 'Value: ' + event.data.agregats, life: 3000 });
    }

    const headerTemplate = (data) => {
        return (
            <React.Fragment>
                <span className="image-text">{data.parent.agregats}</span>
            </React.Fragment>
        );
    }

    const footerTemplate = (data) => {
        return (
            <React.Fragment>
                <td colSpan="4" style={{ textAlign: 'right' }}>Total Customers</td>
            </React.Fragment>
        );
    }

    const textEditor = (options) => {
        return <InputText type="text"  value={options.value} onChange={(e) => options.editorCallback(e.target.value)} />;
    }

    const headerGroup = (
        <ColumnGroup>
            <Row>
                <Column className='text-center'header="N°" rowSpan={2} style={{ width: '3.5em' }}/>
                <Column className='text-center'header="AGREGATS" rowSpan={2} />
                <Column className='text-center'header="Comptes SCF" rowSpan={2} style={{ width: '3.9em' }} />
                <Column className='text-center'header="Mois" colSpan={2} style={{ width: '11em' }}/>
                <Column className='text-center'header="Evolution" colSpan={2} style={{ width: '11em' }} />
                <Column className='text-center'header="Cumul" colSpan={2} style={{ width: '11em' }} />
                <Column className='text-center'header="Evolution" colSpan={2} style={{ width: '11em' }} />
            </Row>
            <Row>
                <Column className='text-center'header="Jan-21" style={{ width: '5.5em' }}/>
                <Column className='text-center'header="Jan-22"/>
                <Column className='text-center'header="Val"/>
                <Column className='text-center'header="%"/>
                <Column className='text-center'header="Jan-21" />
                <Column className='text-center'header="Jan-22"/>
                <Column className='text-center'header="Val"/>
                <Column className='text-center'header="%"/>
            </Row>
        
        </ColumnGroup>
    );
  return (
    <div>
        <div className='container text-center '>
            <h1 className='text-capitalize'>TABLEAU DE BORD MENSUEL</h1>
            <div className='row'>
                <div className='col-lg-6'>
                    <h3 >Mois: <span className='spanC'>Janvier</span> </h3>
                </div>
                <div className='col-lg-6'>
                    <h3>Année: <span className='spanC'>2022</span> </h3>
                </div>
            </div>

            <div className='row'>
                <div className='col-lg-6'>
                    <h3>GROUPE: <span className='spanC'>A.C.S</span> </h3>
                </div>
                <div className='col-lg-6'>
                    <h3>EPE ou Groupe : <span className='spanC'>PORTEFEUILLE</span> </h3>
                </div>
            </div>
            <h1 className='text-capitalize'>En millions de DA</h1>
        </div>
        <div className="card">
            <DataTable value={nodes} editMode="row" dataKey="n" onRowEditComplete={onRowEditComplete} headerColumnGroup={headerGroup} rowGroupMode="subheader" groupRowsBy="parent.n" sortMode="single" 
            sortField="parent.n" sortOrder={1}
            expandableRowGroups expandedRows={expandedRows} onRowToggle={(e) => setExpandedRows(e.data)}
            onRowExpand={onRowGroupExpand} onRowCollapse={onRowGroupCollapse} 
            rowGroupHeaderTemplate={headerTemplate} rowGroupFooterTemplate={footerTemplate}>
                <Column  field="n"  style={{ width: '5%' }} ></Column>
                <Column  field="agregats"></Column>
                <Column  field="comptesSCF"></Column>
                <Column  field="moisD" editor={(options) => textEditor(options)} style={{ width: '5%' }}></Column>
                <Column  field="moisF" editor={(options) => textEditor(options)}></Column>
                <Column  field="evolutionval" editor={(options) => textEditor(options)}></Column>
                <Column  field="evolutionpro" editor={(options) => textEditor(options)}></Column>
                <Column  field="cumulD" editor={(options) => textEditor(options)}></Column>
                <Column  field="cumulF" editor={(options) => textEditor(options)}></Column>
                <Column  field="evolutionvallast" editor={(options) => textEditor(options)}></Column>
                <Column  field="evolutionprolast" editor={(options) => textEditor(options)}></Column>     
                <Column rowEditor headerStyle={{ width: '10%', minWidth: '8rem' }} bodyStyle={{ textAlign: 'center' }}></Column>          
            </DataTable>
        </div>
        {/* <div className="card">
                <h5>Expandable Row Groups</h5>
                <p>Group customers by their representative.</p>
                <DataTable value={customers} rowGroupMode="subheader" groupRowsBy="representative.name"
                    sortMode="single" sortField="representative.name" sortOrder={1} responsiveLayout="scroll"
                    expandableRowGroups expandedRows={expandedRows} onRowToggle={(e) => setExpandedRows(e.data)}
                    onRowExpand={onRowGroupExpand} onRowCollapse={onRowGroupCollapse}
                    rowGroupHeaderTemplate={headerTemplate} rowGroupFooterTemplate={footerTemplate}>
                    <Column field="name" header="Name"></Column>
                    <Column field="country" header="Country" body={countryBodyTemplate}></Column>
                    <Column field="company" header="Company"></Column>
                    <Column field="status" header="Status" body={statusBodyTemplate}></Column>
                    <Column field="date" header="Date"></Column>
                </DataTable>
            </div> */}
    </div>
  )
}

export default Pourtefeuille;