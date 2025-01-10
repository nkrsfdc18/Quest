public with sharing class Quest_HandlePartnerLocatorPage {

    @AuraEnabled(cacheable=true)
    public static List<Account> getPartnerAccounts(String sortVariable) {

        Account[] partnerAccounts;
        if(sortVariable == 'partner-tier') {

            partnerAccounts = [SELECT Id, Name,IsPartner, Solutions__c,Services__c,Region__c,Partner_Tier__c,
                                BillingStreet,BillingCity,BillingState,BillingPostalCode,BillingCountry,BillingStateCode,BillingCountryCode,Phone,Sort_by_Partner_Tier__c
                                FROM Account 
                                WHERE IsPartner = true
                                ORDER BY Sort_by_Partner_Tier__c ASC];

        } else {
            partnerAccounts = [SELECT Id, Name,IsPartner, Solutions__c,Services__c,Region__c,Partner_Tier__c,
                                BillingStreet,BillingCity,BillingState,BillingPostalCode,BillingCountry,Phone,BillingStateCode,BillingCountryCode
                                FROM Account 
                                WHERE IsPartner = true
                                ORDER BY Name ASC];
        }

        system.debug('Partner Accounts: '+partnerAccounts);

        return partnerAccounts;
    }

    @AuraEnabled(cacheable=true)
    public static List<Account> getSearchedAccounts(String inputParameter) {

        Account[] SearchedAccounts = [SELECT Id, Name,IsPartner, Solutions__c,Services__c,Region__c,Partner_Tier__c,
        BillingStreet,BillingCity,BillingState,BillingPostalCode,BillingCountry,Phone,BillingStateCode,BillingCountryCode
                                        FROM Account 
                                        WHERE IsPartner = true AND (Name Like:('%' + inputParameter + '%') 
                                        OR BillingStreet Like:('%' + inputParameter + '%') 
                                        OR BillingCity Like:('%' + inputParameter + '%') 
                                        OR BillingState Like:('%' + inputParameter + '%') 
                                        OR BillingCountry Like:('%' + inputParameter + '%')
                                        OR BillingPostalCode Like:('%' + inputParameter + '%')
                                        OR Solutions__c INCLUDES (:inputParameter) 
                                        OR Services__c INCLUDES (:inputParameter))];

                                        system.debug('Searched Accounts: '+SearchedAccounts);

        return SearchedAccounts;
    }

    @AuraEnabled(cacheable=true)
    public static List<Account> getSolutionAccounts(String inputValue, String inputKey) {

        List<Account> returnAccounts;
        if(inputKey == 'Solution') {
            returnAccounts = [SELECT Id, Name,IsPartner, Solutions__c,Services__c,Region__c,Partner_Tier__c,
                                BillingStreet,BillingCity,BillingState,BillingPostalCode,BillingCountry,Phone
                                FROM Account 
                                WHERE IsPartner = true AND (Solutions__c INCLUDES (:inputValue))];
        }else if(inputKey == 'Services') {
            returnAccounts = [SELECT Id, Name,IsPartner, Solutions__c,Services__c,Region__c,Partner_Tier__c,
                                BillingStreet,BillingCity,BillingState,BillingPostalCode,BillingCountry,Phone
                                FROM Account 
                                WHERE IsPartner = true AND (Services__c INCLUDES (:inputValue))];
        } else if(inputKey == 'Partner Tier') {
            returnAccounts = [SELECT Id, Name,IsPartner, Solutions__c,Services__c,Region__c,Partner_Tier__c,
                                BillingStreet,BillingCity,BillingState,BillingPostalCode,BillingCountry,Phone
                                FROM Account 
                                WHERE IsPartner = true AND Partner_Tier__c =:inputValue];
        } else if(inputKey == 'Region') {
            returnAccounts = [SELECT Id, Name,IsPartner, Solutions__c,Services__c,Region__c,Partner_Tier__c,
                                BillingStreet,BillingCity,BillingState,BillingPostalCode,BillingCountry,Phone
                                FROM Account 
                                WHERE IsPartner = true AND Region__c =:inputValue];
        }
        system.debug('Searched Accounts: '+returnAccounts);

        return returnAccounts;
    }

    @AuraEnabled(cacheable=true)
    public static List<Account> getFilteredAccounts(Map<String,List<String>> filterMap,String sortVariable,String partnerType,String selectedCountry,String inputParameter) {

        system.debug('Filter List Map: '+filterMap);

        String query = 'SELECT Id, Name,IsPartner, Solutions__c,Services__c,Region__c,Partner_Tier__c,BillingStreet,BillingCity,BillingState,BillingPostalCode,BillingCountry,BillingStateCode,BillingCountryCode,Phone,Partner_Sub_Type__c FROM Account WHERE IsPartner = true ';

        List<String> conditions = new List<String>();

        if((filterMap != null && filterMap.containsKey('Solution') &&  filterMap.get('Solution').size() > 0) ||
            (filterMap.containsKey('Services') &&  filterMap.get('Services').size() > 0)) {

                if(filterMap.containsKey('Solution') &&  filterMap.get('Solution').size() > 0) {
                    for (String value : filterMap.get('Solution')) {
                        conditions.add('Solutions__c INCLUDES (\'' +value+ '\')');
                    }
                }
                if(filterMap.containsKey('Services') &&  filterMap.get('Services').size() > 0) {
                    for (String value : filterMap.get('Services')) {
                        conditions.add('Services__c INCLUDES (\'' +value+ '\')');
                    }
                }
                query += 'AND ' + String.join(conditions, ' AND ');
        }
        
        if(filterMap != null && filterMap.containsKey('Region') &&  filterMap.get('Region').size() > 0) {

            List<String> quotedRegionValues = new List<String>();
            for (String value : filterMap.get('Region')) {
                quotedRegionValues.add('\'' + value + '\'');  // Add single quotes around each value
            }

            query += 'AND Region__c IN '+quotedRegionValues;
        }
        if(filterMap != null && filterMap.containsKey('Partner Tier') &&  filterMap.get('Partner Tier').size() > 0) {

            List<String> quotedRegionValues = new List<String>();
            for (String value : filterMap.get('Partner Tier')) {
                quotedRegionValues.add('\'' + value + '\'');  // Add single quotes around each value
            }

            query += 'AND Partner_Tier__c IN '+quotedRegionValues;
        }

        if(partnerType != '' && partnerType != 'all'  && selectedCountry == '') {
            if(partnerType == 'Managed Services Providers' || partnerType == 'US Federal Resellers') {
                query += 'AND Partner_Sub_Type__c = \''+partnerType+'\' ';
            } else {
                query += 'AND Partner_Type__c = \''+partnerType+'\' ';
            }
        } else if ((partnerType == '' || partnerType == 'all') && selectedCountry != '') {
            query += 'AND BillingCountryCode = \''+selectedCountry+'\' ';
        } else if(partnerType != '' && partnerType != 'all'  && selectedCountry != '') {

            if(partnerType == 'Managed Services Providers' || partnerType == 'US Federal Resellers') {
                query += 'AND BillingCountryCode = \''+selectedCountry+'\' AND Partner_Sub_Type__c = \''+partnerType+'\' ';
            } else {
                query += 'AND BillingCountryCode = \''+selectedCountry+'\' AND Partner_Type__c = \''+partnerType+'\' ';
            }
        }

        // Adding the inputParameter filter
        if (inputParameter != null && inputParameter != '') {
    
            query += 'AND (Name LIKE \'%' + inputParameter + '%\' ' +
                    'OR BillingStreet LIKE \'%' + inputParameter + '%\' ' +
                    'OR BillingCity LIKE \'%' + inputParameter + '%\' ' +
                    'OR BillingState LIKE \'%' + inputParameter + '%\' ' +
                    'OR BillingCountry LIKE \'%' + inputParameter + '%\' ' +
                    'OR BillingPostalCode LIKE \'%' + inputParameter + '%\' ' +
                    'OR Solutions__c INCLUDES (\'' + inputParameter + '\') ' +
                    'OR Services__c INCLUDES (\'' + inputParameter + '\')) ';
        }

        if(sortVariable == 'partner-tier') {
            query += 'ORDER BY Sort_by_Partner_Tier__c ASC';
        } else {
            query += 'ORDER BY Name ASC';
        }

        // Execute the query
        List<Account> filteredPartnerAccounts = Database.query(query);

        system.debug('Filtered Partner Accounts: '+filteredPartnerAccounts);

        return filteredPartnerAccounts;
    }

    @AuraEnabled(cacheable=true)
    public static List<Account> getPartnerAcountsBasedOnTypeAndCountry(String partnerType,String selectedCountry,String sortVariable){

        String query = 'SELECT Id, Name,IsPartner, Solutions__c,Services__c,Region__c,Partner_Tier__c,BillingStreet,BillingCity,BillingState,BillingPostalCode,BillingCountry,Phone,Partner_Type__c,BillingStateCode,BillingCountryCode FROM Account WHERE IsPartner = true ';
        
        if(partnerType != '' && partnerType != 'all'  && selectedCountry == '') {
            query += 'AND Partner_Type__c = \''+partnerType+'\' ';
        } else if ((partnerType == '' || partnerType == 'all') && selectedCountry != '') {
            query += 'AND BillingCountryCode = \''+selectedCountry+'\' ';
        } else if(partnerType != '' && partnerType != 'all'  && selectedCountry != '') {
            query += 'AND BillingCountryCode = \''+selectedCountry+'\' AND Partner_Type__c = \''+partnerType+'\' ';
        }

        if(sortVariable == 'partner-tier') {
            query += 'ORDER BY Sort_by_Partner_Tier__c ASC';
        } else {
            query += 'ORDER BY Name ASC';
        }

        // // Execute the query
        List<Account> partnerAccounts = Database.query(query);

        system.debug('Filtered Partner Accounts: '+partnerAccounts);

        return partnerAccounts;
    }

    @AuraEnabled(cacheable=true)
    public static Account getPartnerAccount(String accountId){

        return [SELECT Id, Name,IsPartner, Solutions__c,Services__c,Region__c,Partner_Tier__c,
                BillingStreet,BillingCity,BillingState,BillingPostalCode,BillingCountry,Phone,Sort_by_Partner_Tier__c,BillingStateCode,BillingCountryCode,Partner_Detail_Video__c
                FROM Account 
                WHERE IsPartner = true
                AND Id =: accountId];
    }

    @AuraEnabled(cacheable=true)
    public static Map<String, Map<String, Integer>> getNumberofAccountCatagories(){

        // Query accounts where IsPartner = true
        List<Account> accs = [SELECT Id, Solutions__c, Services__c, Region__c, Partner_Tier__c 
                                FROM Account 
                                WHERE IsPartner = true];

        // Maps to store counts for each field
        Map<String, Integer> solutionCountMap = new Map<String, Integer>();
        Map<String, Integer> serviceCountMap = new Map<String, Integer>();
        Map<String, Integer> regionCountMap = new Map<String, Integer>();
        Map<String, Integer> partnerTierCountMap = new Map<String, Integer>();

        // Process accounts in a single loop
        for (Account acc : accs) {
            // Count Solutions__c (multi-select picklist)
            if (acc.Solutions__c != null) {
                for (String solution : acc.Solutions__c.split(';')) {
                    if (!solutionCountMap.containsKey(solution)) {
                        solutionCountMap.put(solution, 1);
                    } else {
                        solutionCountMap.put(solution, solutionCountMap.get(solution) + 1);
                    }
                }
            }

            // Count Services__c (multi-select picklist)
            if (acc.Services__c != null) {
                for (String service : acc.Services__c.split(';')) {
                    if (!serviceCountMap.containsKey(service)) {
                        serviceCountMap.put(service, 1);
                    } else {
                        serviceCountMap.put(service, serviceCountMap.get(service) + 1);
                    }
                }
            }

            // Count Region__c (picklist)
            if (acc.Region__c != null) {
                if (!regionCountMap.containsKey(acc.Region__c)) {
                    regionCountMap.put(acc.Region__c, 1);
                } else {
                    regionCountMap.put(acc.Region__c, regionCountMap.get(acc.Region__c) + 1);
                }
            }

            // Count Partner_Tier__c (picklist)
            if (acc.Partner_Tier__c != null) {
                if (!partnerTierCountMap.containsKey(acc.Partner_Tier__c)) {
                    partnerTierCountMap.put(acc.Partner_Tier__c, 1);
                } else {
                    partnerTierCountMap.put(acc.Partner_Tier__c, partnerTierCountMap.get(acc.Partner_Tier__c) + 1);
                }
            }
        }

        // Combine results into a single map
        Map<String, Map<String, Integer>> resultMap = new Map<String, Map<String, Integer>>{
            'Solutions' => solutionCountMap,
            'Services' => serviceCountMap,
            'Region' => regionCountMap,
            'PartnerTier' => partnerTierCountMap
        };

        return resultMap;
        
    }

    @AuraEnabled(cacheable=true)
    public static Map<String, String> getCountryPicklistValues() {

        Map<String,String> countryPickListMap = new Map<String,String>();

        // Get Country picklist values
        Schema.DescribeFieldResult countryField = Account.BillingCountryCode.getDescribe();
        List<Schema.PicklistEntry> countryEntries = countryField.getPicklistValues();

        for (Schema.PicklistEntry entry : countryEntries) {
            countryPickListMap.put(entry.getLabel(),entry.getValue());
        }

        return countryPickListMap;
    }
    
    @AuraEnabled(cacheable=true)
    public static List<Account> getFilteredPartnerAccounts(String sortVariable,String partnerType,String selectedCountry, Map<String,List<String>> filterMap) {

        String query = 'SELECT Id, Name,IsPartner, Solutions__c,Services__c,Region__c,Partner_Tier__c,BillingStreet,BillingCity,BillingState,BillingPostalCode,BillingCountry,BillingStateCode,BillingCountryCode,Phone FROM Account WHERE IsPartner = true ';

        List<String> conditions = new List<String>();

        if(filterMap != null && (filterMap.containsKey('Solution') &&  filterMap.get('Solution').size() > 0) ||
            (filterMap.containsKey('Services') &&  filterMap.get('Services').size() > 0)) {

                if(filterMap.containsKey('Solution') &&  filterMap.get('Solution').size() > 0) {
                    for (String value : filterMap.get('Solution')) {
                        conditions.add('Solutions__c INCLUDES (\'' +value+ '\')');
                    }
                }
                if(filterMap.containsKey('Services') &&  filterMap.get('Services').size() > 0) {
                    for (String value : filterMap.get('Services')) {
                        conditions.add('Services__c INCLUDES (\'' +value+ '\')');
                    }
                }
                query += 'AND ' + String.join(conditions, ' AND ');
        }

        if(filterMap != null && filterMap.containsKey('Region') &&  filterMap.get('Region').size() > 0) {

            List<String> quotedRegionValues = new List<String>();
            for (String value : filterMap.get('Region')) {
                quotedRegionValues.add('\'' + value + '\'');  // Add single quotes around each value
            }

            query += 'AND Region__c IN '+quotedRegionValues;
        }

        if(filterMap != null && filterMap.containsKey('Partner Tier') &&  filterMap.get('Partner Tier').size() > 0) {

            List<String> quotedRegionValues = new List<String>();
            for (String value : filterMap.get('Partner Tier')) {
                quotedRegionValues.add('\'' + value + '\'');  // Add single quotes around each value
            }

            query += 'AND Partner_Tier__c IN '+quotedRegionValues;
        }

        if(partnerType != '' && selectedCountry != '') {
            query += 'AND BillingCountryCode = \''+selectedCountry+'\' AND Partner_Type__c = \''+partnerType+'\' ';
        } else if(partnerType != '' && selectedCountry == '') {
            query += 'AND Partner_Type__c = \''+partnerType+'\' ';
        } else if (partnerType == '' && selectedCountry != '') {
            query += 'AND BillingCountryCode = \''+selectedCountry+'\' ';
        }

        if(sortVariable == 'partner-tier') {
            query += 'ORDER BY Sort_by_Partner_Tier__c ASC';
        } else {
            query += 'ORDER BY Name ASC';
        }

        // Execute the query
        List<Account> filteredPartnerAccounts = Database.query(query);

        system.debug('Filtered Partner Accounts: '+filteredPartnerAccounts);

        return filteredPartnerAccounts;
    }

    @AuraEnabled(cacheable=true)
    public static List<Account> getFilteredPartnerAccount(String sortVariable,String partnerType,String selectedCountry) {

        String query = 'SELECT Id, Name,IsPartner, Solutions__c,Services__c,Region__c,Partner_Tier__c,BillingStreet,BillingCity,BillingState,BillingPostalCode,BillingCountry,BillingStateCode,BillingCountryCode,Phone FROM Account WHERE IsPartner = true ';

        // List<String> conditions = new List<String>();

        // if(filterMap != null && (filterMap.containsKey('Solution') &&  filterMap.get('Solution').size() > 0) ||
        //     (filterMap.containsKey('Services') &&  filterMap.get('Services').size() > 0)) {

        //         if(filterMap.containsKey('Solution') &&  filterMap.get('Solution').size() > 0) {
        //             for (String value : filterMap.get('Solution')) {
        //                 conditions.add('Solutions__c INCLUDES (\'' +value+ '\')');
        //             }
        //         }
        //         if(filterMap.containsKey('Services') &&  filterMap.get('Services').size() > 0) {
        //             for (String value : filterMap.get('Services')) {
        //                 conditions.add('Services__c INCLUDES (\'' +value+ '\')');
        //             }
        //         }
        //         query += 'AND ' + String.join(conditions, ' AND ');
        // }

        // if(filterMap != null && filterMap.containsKey('Region') &&  filterMap.get('Region').size() > 0) {

        //     List<String> quotedRegionValues = new List<String>();
        //     for (String value : filterMap.get('Region')) {
        //         quotedRegionValues.add('\'' + value + '\'');  // Add single quotes around each value
        //     }

        //     query += 'AND Region__c IN '+quotedRegionValues;
        // }

        // if(filterMap != null && filterMap.containsKey('Partner Tier') &&  filterMap.get('Partner Tier').size() > 0) {

        //     List<String> quotedRegionValues = new List<String>();
        //     for (String value : filterMap.get('Partner Tier')) {
        //         quotedRegionValues.add('\'' + value + '\'');  // Add single quotes around each value
        //     }

        //     query += 'AND Partner_Tier__c IN '+quotedRegionValues;
        // }

        if(partnerType != '' && selectedCountry != '') {
            query += 'AND BillingCountryCode = \''+selectedCountry+'\' AND Partner_Type__c = \''+partnerType+'\' ';
        } else if(partnerType != '' && selectedCountry == '') {
            query += 'AND Partner_Type__c = \''+partnerType+'\' ';
        } else if (partnerType == '' && selectedCountry != '') {
            query += 'AND BillingCountryCode = \''+selectedCountry+'\' ';
        }

        if(sortVariable == 'partner-tier') {
            query += 'ORDER BY Sort_by_Partner_Tier__c ASC';
        } else {
            query += 'ORDER BY Name ASC';
        }

        // Execute the query
        List<Account> filteredPartnerAccounts = Database.query(query);

        system.debug('Filtered Partner Accounts: '+filteredPartnerAccounts);

        return filteredPartnerAccounts;
    }
}