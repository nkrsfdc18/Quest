public with sharing class Quest_HandlePartnerRegistration {

    @AuraEnabled
    public static Lead createPartnerRegistrationRecord(Map<String,Object> partnerRegistration) {

        system.debug('Partner Registration Debug Logs.....');
        system.debug('Partner Registration Form Details: '+partnerRegistration);

        Lead newLead = new Lead();

        /***************************** Contact Information ***************************/
        // Required Fields
        newLead.FirstName = partnerRegistration.get('FirstName').toString();
        newLead.LastName = partnerRegistration.get('LastName').toString();
        newLead.Email = partnerRegistration.get('Email').toString();
        newLead.Phone = partnerRegistration.get('Phone').toString();
        newLead.CountryCode = partnerRegistration.get('ContactCountry').toString();
        newLead.StateCode = partnerRegistration.get('ContactState').toString();
        newLead.City = partnerRegistration.get('ContactCity').toString();
        newLead.PostalCode = partnerRegistration.get('ContactPostalCode').toString();

        if(partnerRegistration.containsKey('ContactStreet-2') && partnerRegistration.get('ContactStreet-2') != null && partnerRegistration.get('ContactStreet-2').toString() != '') {
            newLead.Street = partnerRegistration.get('ContactStreet-1').toString() + ' ' + partnerRegistration.get('ContactStreet-2').toString();
        } else {
            newLead.Street = partnerRegistration.get('ContactStreet-1').toString();
        }

        // Optional Fields
        if(partnerRegistration.containsKey('Title')) {
            newLead.Title = partnerRegistration.get('Title').toString();
        }
        if(partnerRegistration.containsKey('OptOutEmail') && partnerRegistration.get('OptOutEmail').toString() == 'On') {
            newLead.HasOptedOutOfEmail = true;
        }

        /***************************** Company Information ***************************/
        // Required Fields
        newLead.Company = partnerRegistration.get('Company').toString();
        newLead.Company_Address__CountryCode__s = partnerRegistration.get('CompanyCountry').toString();
        newLead.Company_Address__StateCode__s = partnerRegistration.get('CompanyState').toString();
        newLead.Company_Address__City__s = partnerRegistration.get('CompanyCity').toString();
        newLead.Company_Address__PostalCode__s = partnerRegistration.get('CompanyPostalCode').toString();
        newLead.CompanyPhone__c = partnerRegistration.get('CompanyPhone').toString();
        newLead.Industry = partnerRegistration.get('Industry').toString();
        newLead.Website = partnerRegistration.get('Website').toString();
        newLead.NumberOfEmployees__c = partnerRegistration.get('NumberOfEmployees').toString();
        newLead.AnnualRevenue = Integer.valueOf(partnerRegistration.get('AnnualRevenue').toString());
        newLead.Region__c = partnerRegistration.get('Region').toString();

        if(partnerRegistration.containsKey('CompanyStreet-2') && partnerRegistration.get('CompanyStreet-2') != null && partnerRegistration.get('CompanyStreet-2').toString() != '') {
            newLead.Company_Address__Street__s = partnerRegistration.get('CompanyStreet-1').toString() + ' ' + partnerRegistration.get('CompanyStreet-2').toString();
        } else {
            newLead.Company_Address__Street__s = partnerRegistration.get('CompanyStreet-1').toString();
        }

        // Markets Served
        List<String> marketsServed = new List<String>();
        if(partnerRegistration.containsKey('Market-NorthAmerica') && partnerRegistration.get('Market-NorthAmerica').toString() == 'On') {
            marketsServed.add('North America');
        }
        if(partnerRegistration.containsKey('Market-LATAM') && partnerRegistration.get('Market-LATAM').toString() == 'On') {
            marketsServed.add('LATAM');
        }
        if(partnerRegistration.containsKey('Market-EMEA') && partnerRegistration.get('Market-EMEA').toString() == 'On') {
            marketsServed.add('EMEA');
        }
        if(partnerRegistration.containsKey('Market-APAC') && partnerRegistration.get('Market-APAC').toString() == 'On') {
            marketsServed.add('APAC');
        }
        newLead.Markets_Served__c = String.join(marketsServed, ';');

        // Solution Of Interest
        List<String> solutionOfInterest = new List<String>();
        if(partnerRegistration.containsKey('DataProtection') && partnerRegistration.get('DataProtection').toString() == 'On') {
            solutionOfInterest.add('Data Protection');
        }
        if(partnerRegistration.containsKey('UnifiedEndpointManagement') && partnerRegistration.get('UnifiedEndpointManagement').toString() == 'On') {
            solutionOfInterest.add('Unified Endpoint Management');
        }
        if(partnerRegistration.containsKey('MicrosoftPlatformManagement') && partnerRegistration.get('MicrosoftPlatformManagement').toString() == 'On') {
            solutionOfInterest.add('Microsoft Platform Management');
        }
        if(partnerRegistration.containsKey('InformationManagement') && partnerRegistration.get('InformationManagement').toString() == 'On') {
            solutionOfInterest.add('Information Management');
        }
        if(partnerRegistration.containsKey('OneIdentity') && partnerRegistration.get('OneIdentity').toString() == 'On') {
            solutionOfInterest.add('One Identity');
        }
        if(partnerRegistration.containsKey('FormerBalabitsolutions') && partnerRegistration.get('FormerBalabitsolutions').toString() == 'On') {
            solutionOfInterest.add('Former Balabit solutions');
        }
        if(partnerRegistration.containsKey('FormerMetalogixSolutions') && partnerRegistration.get('FormerMetalogixSolutions').toString() == 'On') {
            solutionOfInterest.add('Former Metalogix Solutions');
        }
        if(partnerRegistration.containsKey('FormerApexSQLSolutions') && partnerRegistration.get('FormerApexSQLSolutions').toString() == 'On') {
            solutionOfInterest.add('Former ApexSQL Solutions');
        }
        if(partnerRegistration.containsKey('FormerBinaryTree') && partnerRegistration.get('FormerBinaryTree').toString() == 'On') {
            solutionOfInterest.add('Former Binary Tree');
        }
        if(partnerRegistration.containsKey('MSP') && partnerRegistration.get('MSP').toString() == 'On') {
            solutionOfInterest.add('MSP (Managed Service Provider)');
        }
        if(partnerRegistration.containsKey('erwin') && partnerRegistration.get('erwin').toString() == 'On') {
            solutionOfInterest.add('erwin');
        }
        if(partnerRegistration.containsKey('OneLogin') && partnerRegistration.get('OneLogin').toString() == 'On') {
            solutionOfInterest.add('OneLogin');
        }
        if(partnerRegistration.containsKey('TechnologyPartner') && partnerRegistration.get('TechnologyPartner').toString() == 'On') {
            solutionOfInterest.add('Technology Partner');
        }
        newLead.SolutionAreaOfInterest__c = String.join(solutionOfInterest, ';');

        //Optional Fields
        if(partnerRegistration.containsKey('D&B_Number')) {
            newLead.DandBNumber__c = partnerRegistration.get('D&B_Number').toString();
        }
        if(partnerRegistration.containsKey('CEO-FirstName')) {
            newLead.CEO_Owner_FirstName__c = partnerRegistration.get('CEO-FirstName').toString();
        }
        if(partnerRegistration.containsKey('CEO-LastName')) {
            newLead.CEO_Owner_LastName__c = partnerRegistration.get('CEO-LastName').toString();
        }
        if(partnerRegistration.containsKey('CEO-Title')) {
            newLead.CEO_Owner_Title__c = partnerRegistration.get('CEO-Title').toString();
        }

        // Assign Lead Source and Status
        newLead.LeadType__c = 'Partner Registration';
        newLead.LeadSource = 'Partner Registration';

        insert newLead;
        system.debug('LeadRecord: '+ newLead);
        return newLead;
    }

    @AuraEnabled(cacheable=true)
    public static Map<String, String> getCountryPicklistValues() {

        Map<String,String> countryPickListMap = new Map<String,String>();

        // Get Country picklist values
        Schema.DescribeFieldResult countryField = Lead.CountryCode.getDescribe();
        List<Schema.PicklistEntry> countryEntries = countryField.getPicklistValues();

        for (Schema.PicklistEntry entry : countryEntries) {
            countryPickListMap.put(entry.getLabel(),entry.getValue());
        }

        return countryPickListMap;
    }

    @AuraEnabled(cacheable=true)
    public static Map<String,String> getStatePicklistValues() {

        Map<String,String> statePickListMap = new Map<String,String>();

        // Get StateCode field description
        Schema.DescribeFieldResult stateField = Lead.StateCode.getDescribe();
        List<Schema.PicklistEntry> stateEntries = stateField.getPicklistValues();

        for (Schema.PicklistEntry entry : stateEntries) {
            statePickListMap.put(entry.getLabel(),entry.getValue());
        }
        return statePickListMap;
    }

    @AuraEnabled(cacheable=true)
    public static Map<String,String> getIndustryPicklistValues() {

        Map<String,String> industryPickListMap = new Map<String,String>();

        // Get Industry field description
        Schema.DescribeFieldResult inudstryField = Lead.Industry.getDescribe();
        List<Schema.PicklistEntry> industryEntries = inudstryField.getPicklistValues();

        for (Schema.PicklistEntry entry : industryEntries) {
            industryPickListMap.put(entry.getLabel(),entry.getValue());
        }

        return industryPickListMap;
    }

    @AuraEnabled(cacheable=true)
    public static Map<String,String> getRegionPicklistValues() {

        Map<String,String> regionPickListMap = new Map<String,String>();

        // Get Region field description
        Schema.DescribeFieldResult regionField = Lead.Region__c.getDescribe();
        List<Schema.PicklistEntry> regionEntries = regionField.getPicklistValues();

        for (Schema.PicklistEntry entry : regionEntries) {
            regionPickListMap.put(entry.getLabel(),entry.getValue());
        }

        return regionPickListMap;
    }

    @AuraEnabled(cacheable=true)
    public static Map<String,String> getEmployeesPicklistValues() {

        Map<String,String> numberOfEmployeesPickListMap = new Map<String,String>();

        // Get Employees field description
        Schema.DescribeFieldResult employeesField = Lead.NumberOfEmployees__c.getDescribe();
        List<Schema.PicklistEntry> employeesEntries = employeesField.getPicklistValues();

        for (Schema.PicklistEntry entry : employeesEntries) {
            numberOfEmployeesPickListMap.put(entry.getLabel(),entry.getValue());
        }

        return numberOfEmployeesPickListMap;
    }
}