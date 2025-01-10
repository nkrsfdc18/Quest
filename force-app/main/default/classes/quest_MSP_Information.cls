/**
 * @description       : 
 * @author            : ChangeMeIn@UserSettingsUnder.SFDoc
 * @group             : 
 * @last modified on  : 01-09-2025
 * @last modified by  : ChangeMeIn@UserSettingsUnder.SFDoc
**/
public with sharing class quest_MSP_Information {
    @AuraEnabled
    public static void createCase(Map<String,String> newCase) {
        System.debug(newCase);
        Case addCase = new Case(
            FullName__c = newCase.get('FisrtName') + ' ' + newCase.get('LastName'),
            Status = 'New',
            Origin = 'Web',
            company__c = newCase.get('Company'),
            Phone__c = newCase.get('Phone'),
            Email__c = newCase.get('Email'),
            Description = newCase.get('Looking')
        );

        insert addCase;

        System.debug(addCase);
    }
}