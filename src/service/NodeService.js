
export class NodeService {

    getTreeTableNodes() {
        return fetch('http://localhost:8080/api/canva').then(res => res.json())
                .then(d => d.root);
    }

    getTreeNodes() {
        return fetch('data/treenodes.json').then(res => res.json())
                .then(d => d.root);
    }
}