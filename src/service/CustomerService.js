export class CustomerService {

    getCustomers() {
        return fetch('customers.json').then(res => res.json())
                .then(d => d.data);
    }
  
}