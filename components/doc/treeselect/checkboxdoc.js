import { DocSectionCode } from '@/components/doc/common/docsectioncode';
import { DocSectionText } from '@/components/doc/common/docsectiontext';
import { TreeSelect } from '@/components/lib/treeselect/TreeSelect';
import { useEffect, useState } from 'react';
import { NodeService } from '../../../service/NodeService';

export function CheckboxDoc(props) {
    const [nodes, setNodes] = useState(null);
    const [selectedNodeKeys, setSelectedNodeKeys] = useState(null);

    useEffect(() => {
        NodeService.getTreeNodes().then((data) => setNodes(data));
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    const introCode = {
        basic: `
{
    '0-0': {
        partialChecked: false,
        checked: true
    }
}
        `
    };

    const code = {
        basic: `
<TreeSelect value={selectedNodeKeys} onChange={(e) => setSelectedNodeKeys(e.value)} options={nodes} metaKeySelection={false}  
    className="md:w-20rem w-full" selectionMode="checkbox" display="chip" placeholder="Select Items"></TreeSelect>
        `,
        javascript: `
import React, { useState, useEffect } from "react";
import { TreeSelect } from 'primereact/treeselect';
import { NodeService } from './service/NodeService';

export default function CheckboxDemo() {
    const [nodes, setNodes] = useState(null);
    const [selectedNodeKeys, setSelectedNodeKeys] = useState(null);
    
    useEffect(() => {
        NodeService.getTreeNodes().then((data) => setNodes(data));
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    return (
        <div className="card flex justify-content-center">
            <TreeSelect value={selectedNodeKeys} onChange={(e) => setSelectedNodeKeys(e.value)} options={nodes} 
                metaKeySelection={false} className="md:w-20rem w-full" selectionMode="checkbox" display="chip" placeholder="Select Items"></TreeSelect>
        </div>    
    );
}
        `,
        typescript: `
import React, { useState, useEffect } from "react";
import { TreeSelect, TreeSelectChangeEvent } from 'primereact/treeselect';
import { TreeNode } from 'primereact/treenode';
import { NodeService } from './service/NodeService';

export default function CheckboxDemo() {
    const [nodes, setNodes] = useState<TreeNode[] | null>(null);
    const [selectedNodeKeys, setSelectedNodeKeys] = useState<string[]>(null);
    
    useEffect(() => {
        NodeService.getTreeNodes().then((data) => setNodes(data));
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    return (
        <div className="card flex justify-content-center">
            <TreeSelect value={selectedNodeKeys} onChange={(e: TreeSelectChangeEvent) => setSelectedNodeKeys(e.value)} options={nodes} 
                metaKeySelection={false} className="md:w-20rem w-full" selectionMode="checkbox" display="chip" placeholder="Select Items"></TreeSelect>
        </div>
    );
}
        `,
        data: `
/* NodeService */
{
    key: '0',
    label: 'Documents',
    data: 'Documents Folder',
    icon: 'pi pi-fw pi-inbox',
    children: [
        {
            key: '0-0',
            label: 'Work',
            data: 'Work Folder',
            icon: 'pi pi-fw pi-cog',
            children: [
                { key: '0-0-0', label: 'Expenses.doc', icon: 'pi pi-fw pi-file', data: 'Expenses Document' },
                { key: '0-0-1', label: 'Resume.doc', icon: 'pi pi-fw pi-file', data: 'Resume Document' }
            ]
        },
        {
            key: '0-1',
            label: 'Home',
            data: 'Home Folder',
            icon: 'pi pi-fw pi-home',
            children: [{ key: '0-1-0', label: 'Invoices.txt', icon: 'pi pi-fw pi-file', data: 'Invoices for this month' }]
        }
    ]
},
...
`
    };

    return (
        <>
            <DocSectionText {...props}>
                <p>
                    Selection of multiple nodes via checkboxes is enabled by configuring <i>selectionMode</i> as <i>checkbox</i>.
                </p>
                <p>
                    In checkbox selection mode, value binding should be a key-value pair where key is the node key and value is an object that has <i>checked</i> and <i>partialChecked</i> properties to represent the checked state of a node obje to
                    indicate selection.
                </p>
            </DocSectionText>
            <DocSectionCode code={introCode} hideToggleCode import hideCodeSandbox hideStackBlitz />
            <div className="card flex justify-content-center">
                <TreeSelect
                    value={selectedNodeKeys}
                    onChange={(e) => setSelectedNodeKeys(e.value)}
                    options={nodes}
                    metaKeySelection={false}
                    className="md:w-20rem w-full"
                    selectionMode="checkbox"
                    display="chip"
                    placeholder="Select Items"
                ></TreeSelect>
            </div>
            <DocSectionCode code={code} service={['NodeService']} />
        </>
    );
}
