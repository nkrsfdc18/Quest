import { LightningElement, track, wire } from 'lwc';
import createRegistrationRecord from '@salesforce/apex/Quest_HandlePartnerRegistration.createPartnerRegistrationRecord';
import getCountryPicklistValues from '@salesforce/apex/Quest_HandlePartnerRegistration.getCountryPicklistValues';
import getStatePicklistValues from '@salesforce/apex/Quest_HandlePartnerRegistration.getStatePicklistValues';
import getIndustryPicklistValues from '@salesforce/apex/Quest_HandlePartnerRegistration.getIndustryPicklistValues';
import getRegionPicklistValues from '@salesforce/apex/Quest_HandlePartnerRegistration.getRegionPicklistValues';
import getEmployeesPicklistValues from '@salesforce/apex/Quest_HandlePartnerRegistration.getEmployeesPicklistValues';

export default class Quest_PartnerRegistrationForm extends LightningElement {

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

        console.log('Before Submit Details: ',JSON.stringify(this.partnerRegistrationFormDetails));

        const partnerRegistration = this.partnerRegistrationFormDetails;

        // Call the Apex Method to create Partner Registration Record in CRM
        createRegistrationRecord({partnerRegistration})
            .then((result) => {
                const sfRecord = result;
                console.log('Record Submitted Successfully',sfRecord);

                //Resetting the Form Details in JS
                this.partnerRegistrationFormDetails = {};
                //console.log('After Submit Details',JSON.stringify(this.partnerRegistrationFormDetails));
            })
            .catch((error) =>{
                console.log('Error occured while submitting the Form.');
                console.log(error);
            })
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
                console.log('Countries: ',result);
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
}