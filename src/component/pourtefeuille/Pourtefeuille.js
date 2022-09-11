import React, { useState, useEffect } from 'react';
import { TreeTable } from 'primereact/treetable';
import { Column } from 'primereact/column';
import { ColumnGroup } from 'primereact/columngroup';
import { Row } from 'primereact/row';
import { InputText } from 'primereact/inputtext';
import { NodeService } from '../../service/NodeService';
import axios from 'axios';
import './Pourtefeuille.css';
function Pourtefeuille() {
    const [nodes, setNodes] = useState([]);
    const nodeservice = new NodeService();

    
    useEffect(() => {
        nodeservice.getTreeTableNodes().then(data =>  setNodes(data));
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    const onEditorValueChange = (options, value) => {
        let newNodes = JSON.parse(JSON.stringify(nodes));
        let editedNode = findNodeByKey(newNodes, options.node.key);
        editedNode.data[options.field] = value;
        setNodes(newNodes);
        console.log("data :"+nodes[0]);
       axios.put("http://localhost:8080/api/canva",nodes[0]).then(res => console.log("message "+res.data))
    }
    const onRowEditComplete = (e) => {
        let _nodes = [...nodes];
        let { newData, index } = e;

        _nodes[index] = newData;
        console.log(newData);
        setNodes(_nodes);
    }

    const findNodeByKey = (nodes, key) => {
        let path = key.split('-');
        let node;

        while (path.length) {
            let list = node ? node.children : nodes;
            node = list[parseInt(path[0], 10)];
            path.shift();
        }

        return node;
    }

    const inputTextEditor = (options) => {
        return (
            <InputText type="text" value={options.rowData[options.field]} style={{ width: '5.5em' }}
                onChange={(e) => onEditorValueChange(options, e.target.value)} />
        );
    }
    


    const typeEditor = (options) => {
        return inputTextEditor(options);
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
            <TreeTable value={nodes} headerColumnGroup={headerGroup}>
                <Column className='text-center' field="n" expander  ></Column>
                <Column className='text-center' field="agregats"></Column>
                <Column className='text-center' field="comptesSCF"></Column>
                <Column className='text-center' field="moisD"editor={typeEditor}></Column>
                <Column className='text-center' field="moisF"editor={typeEditor}></Column>
                <Column className='text-center' field="evolutionval"editor={typeEditor}></Column>
                <Column className='text-center' field="evolutionpro"editor={typeEditor}></Column>
                <Column className='text-center' field="cumulD" editor={typeEditor}></Column>
                <Column className='text-center' field="cumulF"editor={typeEditor}></Column>
                <Column className='text-center' field="evolutionvallast"editor={typeEditor}></Column>
                <Column className='text-center' field="evolutionprolast"editor={typeEditor}></Column>               
            </TreeTable>
        </div>
    </div>
  )
}

export default Pourtefeuille;