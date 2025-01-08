import { LightningElement, track, wire } from 'lwc';
import createRegistrationRecord from '@salesforce/apex/Quest_HandlePartnerRegistration.createPartnerRegistrationRecord';

export default class Quest_Partner_Registration extends LightningElement {

    partnerRegistrationRecord = {
        FirstName: '',
        LastName: '',
        Company: ''
    };

    handleChange(event) {
        event.preventDefault();

        console.log('In Handle Change...')

        // Dynamically updating the Record fields
        const field = event.target.name;
        this.partnerRegistrationRecord[field] = event.target.value;

        console.log(field,event.target.value);
        console.log('Registration Form: ',JSON.stringify(this.partnerRegistrationRecord));
    }

    handleSubmit(event) {
        event.preventDefault();
        console.log('Companyt',this.partnerRegistrationRecord.Company);
        this.partnerRegistrationRecord['Status'] = 'New';
        console.log('Before Submit Record: ',JSON.stringify(this.partnerRegistrationRecord));

        let partnerRegistration = this.partnerRegistrationRecord;
        // Calling the Apex Method to create Partner Registration Record in CRM
        createRegistrationRecord({partnerRegistration})
            .then((result) => {
                let newRecord = result;
                console.log('Record created successfully: ',newRecord);
                this.partnerRegistrationRecord = {}; // Resetting the Form Values
                console.log('After Submit Record: ',JSON.stringify(this.partnerRegistrationRecord));
            })
            .catch((error) => {
                console.log('Error Occured while creating Record in CRM: ',error);
            })
    }
}