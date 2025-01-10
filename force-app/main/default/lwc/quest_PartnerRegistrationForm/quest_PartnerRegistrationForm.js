import { LightningElement, track, wire } from 'lwc';
import createRegistrationRecord from '@salesforce/apex/Quest_HandlePartnerRegistration.createPartnerRegistrationRecord';
import getCountryPicklistValues from '@salesforce/apex/Quest_HandlePartnerRegistration.getCountryPicklistValues';
import getStatePicklistValues from '@salesforce/apex/Quest_HandlePartnerRegistration.getStatePicklistValues';
import getIndustryPicklistValues from '@salesforce/apex/Quest_HandlePartnerRegistration.getIndustryPicklistValues';
import getRegionPicklistValues from '@salesforce/apex/Quest_HandlePartnerRegistration.getRegionPicklistValues';
import getEmployeesPicklistValues from '@salesforce/apex/Quest_HandlePartnerRegistration.getEmployeesPicklistValues';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';

export default class Quest_PartnerRegistrationForm extends LightningElement {

    formSubmited = false;
    isLoading = false;
    formSuccessfullySubmitted = false;

    // Object to Store Form Details
    partnerRegistrationFormDetails = {};
    countries = [];
    states = [];
    industries = [];
    regions = [];
    employees = [];

    connectedCallback() {
        this.fetchCountries();
        this.fetchState();
        this.fetchIndustry();
        // this.fetchRegion();
        //this.fetchEmployees();
    }

    handleChange(event) {
        event.preventDefault();
        //console.log('In handleChange function...');

        // Dynamically updating the Record fields
        const field = event.target.name;
        this.partnerRegistrationFormDetails[field] = event.target.value;

        //console.log('Partner Registration Details: ',JSON.stringify(this.partnerRegistrationFormDetails));
    }

    handleSumbit(event) {
        event.preventDefault();
        console.log('In handleSubmit function...');

        // Select all checkboxes in the 'Markets Served' section by class
        const marketCheckboxes = this.template.querySelectorAll('.markets-served');

        // Select all checkboxes in the 'Solution Area of Interest' section by class
        const solutionCheckboxes = this.template.querySelectorAll('.solution-area');

        // Check if at least one checkbox is selected in 'Markets Served'
        const isMarketChecked = Array.from(marketCheckboxes).some((checkbox) => checkbox.checked);

        // Check if at least one checkbox is selected in 'Solution Area of Interest'
        const isSolutionChecked = Array.from(solutionCheckboxes).some((checkbox) => checkbox.checked);

        if (!isMarketChecked) {
            event.preventDefault();
            this.showToast('Required Field', 'Please select at least one market.', 'error');
        } else if (!isSolutionChecked) {
            event.preventDefault();
            this.showToast('Required Field', 'Please select at least one solution area of interest.', 'error');
        } else {
            this.formSubmited = true;
            this.isLoading = true;

            console.log('Before Submit Details: ', JSON.stringify(this.partnerRegistrationFormDetails));

            const partnerRegistration = this.partnerRegistrationFormDetails;

            // Call the Apex Method to create Partner Registration Record in CRM
            createRegistrationRecord({ partnerRegistration })
                .then((result) => {
                    const sfRecord = result;
                    console.log('Record Submitted Successfully', sfRecord);

                    //Resetting the Form Details in JS
                    this.partnerRegistrationFormDetails = {};
                    this.isLoading = false;
                    this.formSubmited = true;
                    this.formSuccessfullySubmitted = true;
                    //console.log('After Submit Details',JSON.stringify(this.partnerRegistrationFormDetails));
                })
                .catch((error) => {
                    this.isLoading = false;
                    this.formSubmited = false;
                    console.log('Error occured while submitting the Form.');
                    console.log(error);
                })
        }
    }

    // Fetch Country Picklist Values
    fetchCountries() {
        getCountryPicklistValues()
            .then((result) => {
                // Map the returned Object to an array of label-value pairs
                this.countries = Object.keys(result).map((key) => ({
                    label: key,
                    value: result[key]
                }));
                console.log('Countries: ', result);
            })
            .catch((error) => {
                console.error('Error fetching country picklist values:', error);
            })
    }

    // Fetch State Picklist Values
    fetchState() {
        getStatePicklistValues()
            .then((result) => {
                // Map the returned Object to an array of label-value pairs
                this.states = Object.keys(result).map((key) => ({
                    label: key,
                    value: result[key]
                }));
            })
            .catch((error) => {
                console.error('Error fetching state picklist values:', error);
            })
    }

    // Fetch State Picklist Values
    fetchIndustry() {
        getIndustryPicklistValues()
            .then((result) => {
                // Map the returned Object to an array of label-value pairs
                this.industries = Object.keys(result).map((key) => ({
                    label: key,
                    value: result[key]
                }));
            })
            .catch((error) => {
                console.error('Error fetching industry picklist values:', error);
            })
    }

    // Fetch State Picklist Values
    fetchRegion() {
        getRegionPicklistValues()
            .then((result) => {
                // Map the returned Object to an array of label-value pairs
                this.regions = Object.keys(result).map((key) => ({
                    label: key,
                    value: result[key]
                }));
            })
            .catch((error) => {
                console.error('Error fetching Region picklist values:', error);
            })
    }

    // Fetch State Picklist Values
    fetchEmployees() {
        getEmployeesPicklistValues()
            .then((result) => {
                // Map the returned Object to an array of label-value pairs
                this.employees = Object.keys(result).map((key) => ({
                    label: key,
                    value: result[key]
                }));
            })
            .catch((error) => {
                console.error('Error fetching employees picklist values:', error);
            })
    }

    // Function to display toast message
    showToast(title, message, variant) {
        const evt = new ShowToastEvent({
            title: title,
            message: message,
            variant: variant, // 'success', 'error', 'warning', 'info'
            mode: 'dismissable', // Make the toast dismissable
        });
        this.dispatchEvent(evt);
    }
}