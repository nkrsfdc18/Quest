import { LightningElement,track} from 'lwc';
import LocatorHero from "@salesforce/contentAssetUrl/locatorhero";
import getAllPartnerAccounts from '@salesforce/apex/Quest_HandlePartnerLocatorPage.getPartnerAccounts';
import getSearchedAccounts from '@salesforce/apex/Quest_HandlePartnerLocatorPage.getSearchedAccounts';
import getFilteredAccounts from '@salesforce/apex/Quest_HandlePartnerLocatorPage.getFilteredAccounts';
import getPartnerAcountsBasedOnTypeAndCountry from '@salesforce/apex/Quest_HandlePartnerLocatorPage.getPartnerAcountsBasedOnTypeAndCountry';
import getNumberofAccountCatagories from '@salesforce/apex/Quest_HandlePartnerLocatorPage.getNumberofAccountCatagories';
import getCountryPicklistValues from '@salesforce/apex/Quest_HandlePartnerLocatorPage.getCountryPicklistValues';
import getFilteredPartnerAccounts from '@salesforce/apex/Quest_HandlePartnerLocatorPage.getFilteredPartnerAccounts';
import getFilteredPartnerAccount from '@salesforce/apex/Quest_HandlePartnerLocatorPage.getFilteredPartnerAccount';


export default class Quest_Partner_Locator extends LightningElement {

    partnerAccounts = [];
    filters = [];
    countries = [];
    totalPartners = 0;
    searchVariable='';
    filterApplied = false;
    activeSortLink = 'partner-tier'; // Default active link
    pageSize = 8;
    currentPage = 1;
    totalPages;
    prevbtnActive = false;
    nxtbtnActive = true;
    noRecordsFound = false;
    showMoreSolutions = false;
    showMoreServices = false;
    partnerType = '';
    selectedCountry = '';
    numberofAccountCatagories = null;

    distributorPlus;
    erwinKorea;
    globalPartner;
    silverPlus;
    goldPlus;
    erwinDiamond;
    platinumPlus;

    migrationManager;
    kaceSMAService;
    kaceSMAImplementation;
    kaceAssetManagement;
    identityManager;
    groupWiseMigrator;
    coexistenceManager;
    assetManager;
    activeRoles;
    migrationManagerforExchange;
    migrationManagerforOffice365;
    migratorforNotestoExchange;
    rapidRecovery;
    recoveryManagerforADForestEdition;
    oneIdentitySafeguard;
    activeDirectoryPro;
    exchangePro;
    power365;
    notesMigrator;
    notesIntegration;
    syslogng;
    technicalSpecialist;
    implementationProfessional;
    kaceSDAcoreImplementation;
    kaceSDAAdvancedImplementation;
    onDemandDirectory;
    onDemandDomainMove;
    onDemandM365;
    onDemandRecovery;
    archiveShuttleOperator;
    erwinDataIntelligenceImplementationProfessional;


    dataProtection;
    databaseManagement;
    databaseReplication;
    performanceMonitoring;
    microsoftPlatformManagement;
    activeDirectoryManagement;
    identityGovernanceAdministration;
    logManagement;
    identityAccessManagement;
    privilegedAccessManagement;
    erwinDataIntelligence;
    erwinDataModeler;
    erwinEvolve;

    get logoUrl() {
        return LocatorHero;
    }
    get partnerTierClass() {
        return `sort-link partner-tier ${this.activeSortLink == 'partner-tier' ? 'active' : ''}`;
    }

    get companyNameClass() {
        return `sort-link company-name ${this.activeSortLink == 'company-name' ? 'active' : ''}`;
    }

    connectedCallback() {
        this.fetchCountries();
        //this.getAllPartnerAccountsFromCRM(this.activeSortLink);
        //this.fetchPartnerAccounts(this.activeSortLink,this.partnerType,this.selectedCountry,this.filters);
        this.getFilteredAccountFromCRM(this.filters,this.activeSortLink,this.partnerType,this.selectedCountry,this.searchVariable);
    }

    handleSearch(event) {
        //event.preventDefault();
        this.searchVariable = event.target.value;
    }

    handleSubmitSearch(){
        const inputParameter = this.searchVariable;
        console.log('Search Key: ',inputParameter)
        this.getFilteredAccountFromCRM(this.filters,this.activeSortLink,this.partnerType,this.selectedCountry,this.searchVariable);
        // getSearchedAccounts({ inputParameter })
        //     .then((result) => {
        //         console.log('Searched Partner Accounts: ',result);
        //         this.partnerAccounts = result;
        //     })
        //     .catch((error) => {
        //         this.accounts = [];
        //         console.error('Error fetching searched accounts:', error);
        //     });
    }

    handleMultiFilters(event) {
        event.preventDefault();
        console.log('Event: ',event)
        const inputValue = event.target.dataset.value;
        const inputKey = event.target.dataset.key;
        console.log('Search Key: ',inputKey);
        console.log('Search Value: ',inputValue);

        const filterExists = this.filters.find(filter => filter.value === inputValue && filter.key === inputKey);
        console.log('FilterExist: ',filterExists);
        if(!filterExists) {
            console.log('Adding new filter:', inputKey,inputValue);
            //this.filters.push({ key: inputKey, value: inputValue });
            this.filters.push({ key: inputKey, value: inputValue });
        }

        // Update the UI
        this.filters = [...this.filters];
        console.log('Updated Filter List: ',JSON.stringify(this.filters));

        this.filterApplied = true;

        this.getFilteredAccountFromCRM(this.filters,this.activeSortLink,this.partnerType,this.selectedCountry,this.searchVariable);
    }


    handleRegionFilters(event) {

        const inputValue = event.target.dataset.value;
        const inputKey = event.target.dataset.key;
        console.log('Search Key: ',inputKey);
        console.log('Search Value: ',inputValue);
        
        // Find the Region key in the list and replace its value
        const regionItemIndex = this.filters.findIndex(item => item.key === 'Region');
        console.log('Index: ',regionItemIndex);
        if (regionItemIndex !== -1) {
            console.log('RegionItem before update: ', JSON.stringify(this.filters[regionItemIndex]));
            this.filters[regionItemIndex].value = inputValue; 
        } else {
            // If "Region" doesn't exist, add it to the list
            this.filters.push({ key: inputKey, value: inputValue });
        }

        // Update the UI
        this.filters = [...this.filters];
        console.log('Updated Filter List: ',JSON.stringify(this.filters));

        this.filterApplied = true;

        this.getFilteredAccountFromCRM(this.filters,this.activeSortLink,this.partnerType,this.selectedCountry,this.searchVariable);
    }

    handleFilters(event) {

        const inputValue = event.target.dataset.value;
        const inputKey = event.target.dataset.key;
        console.log('Search Key: ',inputKey);
        console.log('Search Value: ',inputValue);
        
        // Find the Partner Tier key in the list and replace its value
        const tierItemIndex = this.filters.findIndex(item => item.key === 'Partner Tier');
        console.log('Index: ',tierItemIndex);
        if (tierItemIndex !== -1) {
            console.log('RegionItem before update: ', JSON.stringify(this.filters[tierItemIndex]));
            this.filters[tierItemIndex].value = inputValue; 
        } else {
            // If "Tier" doesn't exist, add it to the list
            this.filters.push({ key: inputKey, value: inputValue });
        }

        // Update the UI
        this.filters = [...this.filters];
        console.log('Updated Filter List: ',JSON.stringify(this.filters));

        this.filterApplied = true;

        this.getFilteredAccountFromCRM(this.filters,this.activeSortLink,this.partnerType,this.selectedCountry,this.searchVariable);
    }

    // Handle removing a filter
    removeFilter(event) {
        const value = event.target.closest('p').dataset.value;
        const key = event.target.closest('p').dataset.key;
        console.log('Datasets: ',event.target.dataset);

        console.log('Removed Key: ',key);
        console.log('Removed Value: ',value);

        // Filter out the removed filter
        this.filters = this.filters.filter(filter => filter.value !== value || filter.key !== key);
        console.log('Filter List after removing a value: ',JSON.stringify(this.filters));

        if(this.filters.length == 0) {
            this.filterApplied = false;
        }

        this.getFilteredAccountFromCRM(this.filters,this.activeSortLink,this.partnerType,this.selectedCountry,this.searchVariable);
    }

    clearFilter() {
        this.filters = [];
        this.filterApplied = false;

        this.getFilteredAccountFromCRM(this.filters,this.activeSortLink,this.partnerType,this.selectedCountry,this.searchVariable);
    }

    getAllPartnerAccountsFromCRM(sortVariable) {
        console.log('Sort Variable',sortVariable)

        getAllPartnerAccounts({sortVariable})
        .then((result) => {
            console.log('Partner Accounts: ',result);
            this.partnerAccounts = result;
            this.totalPartners = this.partnerAccounts.length;
            if(this.totalPartners > 0) {
                this.noRecordsFound = false;
            } else {
                this.noRecordsFound = true;
            }
        })
        .catch((error) => {
            this.accounts = [];
            console.error('Error fetching accounts:', error);
        });

        getNumberofAccountCatagories()
        .then((result) => {
            console.log('Number of Partner Catagories ',result);
            this.numberofAccountCatagories = result;
            this.distributorPlus = result.PartnerTier['Distributor +']  ?? 0;
            this.platinumPlus = result.PartnerTier['Platinum +']  ?? 0;
            this.goldPlus = result.PartnerTier['Gold +']  ?? 0;
            this.silverPlus = result.PartnerTier['Silver +']  ?? 0;
            this.erwinDiamond = result.PartnerTier['erwin Diamond']  ?? 0;
            this.erwinKorea = result.PartnerTier['erwin Korea'];
            this.globalPartner = result.PartnerTier['Global Partner']  ?? 0;

            this.migrationManager = result.Services['Migration Manager for AD']  ?? 0;
            this.kaceSMAService = result.Services['KACE SMA Service Desk Implementation']  ?? 0;
            this.kaceSMAImplementation = result.Services['KACE SMA Implementation - excludes Service Desk']  ?? 0;
            this.kaceAssetManagement = result.Services['KACE Asset Management Implementation for AMA or SMA'] ?? 0;
            this.identityManager = result.Services['Identity Manager']  ?? 0;
            this.groupWiseMigrator = result.Services['GroupWise Migrator']  ?? 0;
            this.coexistenceManager = result.Services['Coexistence Manager for Notes']  ?? 0;
            this.assetManager = result.Services['Asset Manager']  ?? 0;
            this.activeRoles = result.Services['Active Roles']  ?? 0;

            this.dataProtection = result.Solutions['Data Protection']  ?? 0;
            this.databaseManagement = result.Solutions['Information Management - Database Management']  ?? 0;
            this.databaseReplication = result.Solutions['Information Management - Database Replication']  ?? 0;
            this.performanceMonitoring = result.Solutions['Information Management - Performance Monitoring']  ?? 0;
            this.microsoftPlatformManagement = result.Solutions['Microsoft Platform Management']  ?? 0;
            this.activeDirectoryManagement = result.Solutions['One Identity - Active Directory Management']  ?? 0;
            this.identityGovernanceAdministration = result.Solutions['One Identity - Identity Governance & Administration']  ?? 0;
            this.logManagement = result.Solutions['One Identity - Log Management (syslog-ng)']  ?? 0;
            this.identityAccessManagement = result.Solutions['One Identity - Identity & Access Management (OneLogin)']  ?? 0;
            this.privilegedAccessManagement = result.Solutions['One Identity - Privileged Access Management']  ?? 0;
            this.erwinDataIntelligence = result.Solutions['erwin Data Intelligence']  ?? 0;
            this.erwinDataModeler = result.Solutions['erwin Data Modeler']  ?? 0;

        })
        .catch((error) => {
            console.error('Error fetching accounts:', error);
        });
    }

    getFilteredAccountFromCRM(filters,sortVariable,partnerType,selectedCountry,inputParameter) {

        getNumberofAccountCatagories()
        .then((result) => {
            console.log('Number of Partner Catagories ',result);
            this.numberofAccountCatagories = result;
            this.distributorPlus = result.PartnerTier['Distributor +']  ?? 0;
            this.platinumPlus = result.PartnerTier['Platinum +']  ?? 0;
            this.goldPlus = result.PartnerTier['Gold +']  ?? 0;
            this.silverPlus = result.PartnerTier['Silver +']  ?? 0;
            this.erwinDiamond = result.PartnerTier['erwin Diamond']  ?? 0;
            this.erwinKorea = result.PartnerTier['erwin Korea'];
            this.globalPartner = result.PartnerTier['Global Partner']  ?? 0;

            this.migrationManager = result.Services['Migration Manager for AD']  ?? 0;
            this.kaceSMAService = result.Services['KACE SMA Service Desk Implementation']  ?? 0;
            this.kaceSMAImplementation = result.Services['KACE SMA Implementation - excludes Service Desk']  ?? 0;
            this.kaceAssetManagement = result.Services['KACE Asset Management Implementation for AMA or SMA'] ?? 0;
            this.identityManager = result.Services['Identity Manager']  ?? 0;
            this.groupWiseMigrator = result.Services['GroupWise Migrator']  ?? 0;
            this.coexistenceManager = result.Services['Coexistence Manager for Notes']  ?? 0;
            this.assetManager = result.Services['Asset Manager']  ?? 0;
            this.activeRoles = result.Services['Active Roles']  ?? 0;

            this.migrationManagerforExchange = result.Services['Migration Manager for Exchange']  ?? 0;
            this.migrationManagerforOffice365 = result.Services['Migration Manager for Office 365']  ?? 0;
            this.migratorforNotestoExchange = result.Services['Migrator for Notes to Exchange']  ?? 0;
            this.rapidRecovery = result.Services['Rapid Recovery']  ?? 0;
            this.recoveryManagerforADForestEdition = result.Services['Recovery Manager for AD Forest Edition']  ?? 0;
            this.oneIdentitySafeguard = result.Services['One Identity Safeguard']  ?? 0;
            this.activeDirectoryPro = result.Services['Active Directory Pro']  ?? 0;
            this.exchangePro = result.Services['Exchange Pro']  ?? 0;
            this.power365 = result.Services['Power 365']  ?? 0;
            this.notesMigrator = result.Services['Notes Migrator']  ?? 0;
            this.notesIntegration = result.Services['Notes Integration']  ?? 0;
            this.syslogng = result.Services['syslog-ng']  ?? 0;
            this.technicalSpecialist = result.Services['One Identity - Identity & Access Management (OneLogin) - Technical Specialist']  ?? 0;
            this.implementationProfessional = result.Services['One Identity - Identity & Access Management (OneLogin) - Implementation Professional']  ?? 0;
            this.kaceSDAcoreImplementation = result.Services['KACE SDA Core Implementation']  ?? 0;
            this.kaceSDAAdvancedImplementation = result.Services['KACE SDA Advanced Implementation']  ?? 0;
            this.onDemandDirectory = result.Services['On Demand Migration for Active Directory']  ?? 0;
            this.onDemandDomainMove = result.Services['On Demand Migration for Domain Move']  ?? 0;
            this.onDemandM365 = result.Services['On Demand Migration for M365']  ?? 0;
            this.onDemandRecovery = result.Services['On Demand Recovery']  ?? 0;
            this.archiveShuttleOperator = result.Services['Archive Shuttle Operator Readiness']  ?? 0;
            this.erwinDataIntelligenceImplementationProfessional = result.Services['erwin Data Intelligence Suite Implementation Professional Certification']  ?? 0;

            this.dataProtection = result.Solutions['Data Protection']  ?? 0;
            this.databaseManagement = result.Solutions['Information Management - Database Management']  ?? 0;
            this.databaseReplication = result.Solutions['Information Management - Database Replication']  ?? 0;
            this.performanceMonitoring = result.Solutions['Information Management - Performance Monitoring']  ?? 0;
            this.microsoftPlatformManagement = result.Solutions['Microsoft Platform Management']  ?? 0;
            this.activeDirectoryManagement = result.Solutions['One Identity - Active Directory Management']  ?? 0;
            this.identityGovernanceAdministration = result.Solutions['One Identity - Identity Governance & Administration']  ?? 0;
            this.logManagement = result.Solutions['One Identity - Log Management (syslog-ng)']  ?? 0;
            this.identityAccessManagement = result.Solutions['One Identity - Identity & Access Management (OneLogin)']  ?? 0;
            this.privilegedAccessManagement = result.Solutions['One Identity - Privileged Access Management']  ?? 0;
            this.erwinDataIntelligence = result.Solutions['erwin Data Intelligence']  ?? 0;
            this.erwinDataModeler = result.Solutions['erwin Data Modeler']  ?? 0;
            this.erwinEvolve = result.Solutions['erwin Evolve']  ?? 0;

        })
        .catch((error) => {
            console.error('Error fetching accounts:', error);
        });

        let filterMap = {};

        // Iterate over filters and group values by key
        filters.forEach(filter => {
            if (!filterMap[filter.key]) {
                // Initialize an array if the key doesn't exist
                filterMap[filter.key] = [];
            }
            // Push the value into the array for the given key
            filterMap[filter.key].push(filter.value);
        });

        console.log('Apex Map with Multiple Values: ', JSON.stringify(filterMap));

        getFilteredAccounts({ filterMap,sortVariable,partnerType,selectedCountry,inputParameter})
            .then((result) => {
                console.log('Filtered Partner Accounts: ',result);
                this.partnerAccounts = result;
                this.totalPartners = this.partnerAccounts.length;
                if(this.totalPartners > 0) {
                    this.noRecordsFound = false;
                } else {
                    this.noRecordsFound = true;
                }
            })
            .catch((error) => {
                this.accounts = [];
                console.error('Error fetching Filtered accounts:', error);
            });
    }

    /******************************************Fetching Partner Accounts with/without Filters *********************************************/

    fetchPartnerAccounts(sortVariable,partnerType,selectedCountry,filters) {

        console.log('Sort Variable: ',sortVariable);
        console.log('Partner Type: ',partnerType);
        console.log('Selected Country: ',selectedCountry);
        console.log('Filters: ',filters);

        getNumberofAccountCatagories()
            .then((result) => {
                console.log('Number of Partner Catagories ',result);
                this.numberofAccountCatagories = result;
                this.distributorPlus = result.PartnerTier['Distributor +']  ?? 0;
                this.platinumPlus = result.PartnerTier['Platinum +']  ?? 0;
                this.goldPlus = result.PartnerTier['Gold +']  ?? 0;
                this.silverPlus = result.PartnerTier['Silver +']  ?? 0;
                this.erwinDiamond = result.PartnerTier['erwin Diamond']  ?? 0;
                this.erwinKorea = result.PartnerTier['erwin Korea'];
                this.globalPartner = result.PartnerTier['Global Partner']  ?? 0;

                this.migrationManager = result.Services['Migration Manager for AD']  ?? 0;
                this.kaceSMAService = result.Services['KACE SMA Service Desk Implementation']  ?? 0;
                this.kaceSMAImplementation = result.Services['KACE SMA Implementation - excludes Service Desk']  ?? 0;
                this.kaceAssetManagement = result.Services['KACE Asset Management Implementation for AMA or SMA'] ?? 0;
                this.identityManager = result.Services['Identity Manager']  ?? 0;
                this.groupWiseMigrator = result.Services['GroupWise Migrator']  ?? 0;
                this.coexistenceManager = result.Services['Coexistence Manager for Notes']  ?? 0;
                this.assetManager = result.Services['Asset Manager']  ?? 0;
                this.activeRoles = result.Services['Active Roles']  ?? 0;

                this.dataProtection = result.Solutions['Data Protection']  ?? 0;
                this.databaseManagement = result.Solutions['Information Management - Database Management']  ?? 0;
                this.databaseReplication = result.Solutions['Information Management - Database Replication']  ?? 0;
                this.performanceMonitoring = result.Solutions['Information Management - Performance Monitoring']  ?? 0;
                this.microsoftPlatformManagement = result.Solutions['Microsoft Platform Management']  ?? 0;
                this.activeDirectoryManagement = result.Solutions['One Identity - Active Directory Management']  ?? 0;
                this.identityGovernanceAdministration = result.Solutions['One Identity - Identity Governance & Administration']  ?? 0;
                this.logManagement = result.Solutions['One Identity - Log Management (syslog-ng)']  ?? 0;
                this.identityAccessManagement = result.Solutions['One Identity - Identity & Access Management (OneLogin)']  ?? 0;
                this.privilegedAccessManagement = result.Solutions['One Identity - Privileged Access Management']  ?? 0;
                this.erwinDataIntelligence = result.Solutions['erwin Data Intelligence']  ?? 0;
                this.erwinDataModeler = result.Solutions['erwin Data Modeler']  ?? 0;

            })
            .catch((error) => {
                console.error('Error fetching accounts:', error);
        });

        let filterMap = {
            'dummy': ['dummy']
        };
        if(filters.length > 0 ) {

            // Iterate over filters and group values by key
            filters.forEach(filter => {
            if (!filterMap[filter.key]) {
                // Initialize an array if the key doesn't exist
                filterMap[filter.key] = [];
            }
            // Push the value into the array for the given key
            filterMap[filter.key].push(filter.value);

            console.log('Apex Map with Multiple Values: ', JSON.stringify(filterMap));
        });

        getFilteredPartnerAccount({sortVariable,partnerType,selectedCountry})
            .then((result) => {
                console.log('Filtered Partner Accounts: ',result);
                this.partnerAccounts = result;
                this.totalPartners = this.partnerAccounts.length;
                if(this.totalPartners > 0) {
                    this.noRecordsFound = false;
                } else {
                    this.noRecordsFound = true;
                }
            })
            .catch((error) => {
                this.accounts = [];
                console.error('Error fetching Partner Accounts:', error);
            });

        }
    }

    /*****************************************Sorting***************************************/

    handleSorting(event) {
        event.preventDefault();

        // Set the active link based on the clicked element's data-id
        this.activeSortLink = event.target.dataset.id;

        console.log('Partner Account List: ',this.partnerAccounts);

        console.log('Active Sorting: ',event.target.dataset.id);

        this.getFilteredAccountFromCRM(this.filters,this.activeSortLink,this.partnerType,this.selectedCountry,this.searchVariable);

        // if(this.partnerType != '' || this.selectedCountry != '') {

        //     const partnerType = this.partnerType;
        //     const selectedCountry = this.selectedCountry;
        //     const sortVariable = this.activeSortLink;

        //     this.getAccountsBasedOnTypeAndCountry(partnerType,selectedCountry,sortVariable);
        // } else {
        //     this.getAllPartnerAccountsFromCRM(this.activeSortLink);
        // }

    }


    /***************************************Pagination**********************************/

    // Getter for paginated data
    get paginatedAccounts() {
        const start = (this.currentPage - 1) * this.pageSize;
        const end = start + this.pageSize;
        return this.partnerAccounts.slice(start, end);
    }

    // Getter for the displayed record range
    get recordRange() {
        if(this.partnerAccounts.length > 0) {
            const start = (this.currentPage - 1) * this.pageSize + 1;
            const end = Math.min(this.currentPage * this.pageSize, this.partnerAccounts.length);
            return `${start}–${end}`;
        } else {
            return 0;
        }
    }

    
    // Method to go to the previous page
    prevPage() {
        this.totalPages = Math.ceil(this.partnerAccounts.length / this.pageSize);

        if (this.currentPage > 1) {
            this.currentPage--;
        }
        if(this.currentPage == 1) {
            this.prevbtnActive = false;
        }
        if(this.currentPage < this.totalPages) {
            this.nxtbtnActive = true;
        }
    }

    // Method to go to the next page
    nextPage() {

        this.totalPages = Math.ceil(this.partnerAccounts.length / this.pageSize);

        if (this.currentPage < this.totalPages) {
            this.currentPage++;
        }
        if(this.currentPage > 1) {
            this.prevbtnActive = true;
        }
        if(this.currentPage == this.totalPages) {
            this.nxtbtnActive = false;
        }
    }
    /***************************************Dropdowns******************************************/

    handePartnerTypeChange(event) {

        this.partnerType = event.target.value;

        console.log('Partner Type: ',this.partnerType);

        const partnerType = this.partnerType;
        const selectedCountry = this.selectedCountry;
        const sortVariable = this.activeSortLink;

        //this.getAccountsBasedOnTypeAndCountry(partnerType,selectedCountry,sortVariable);
        this.getFilteredAccountFromCRM(this.filters,this.activeSortLink,this.partnerType,this.selectedCountry,this.searchVariable);

    }

    handeCountryChange(event) {

        this.selectedCountry = event.target.value;

        console.log('Partner Type: ',this.partnerType);

        const partnerType = this.partnerType;
        const selectedCountry = this.selectedCountry;
        const sortVariable = this.activeSortLink;

        //this.getAccountsBasedOnTypeAndCountry(partnerType,selectedCountry,sortVariable);
        this.getFilteredAccountFromCRM(this.filters,this.activeSortLink,this.partnerType,this.selectedCountry,this.searchVariable);

    }

    getAccountsBasedOnTypeAndCountry(partnerType,selectedCountry,sortVariable) {
        getPartnerAcountsBasedOnTypeAndCountry({partnerType,selectedCountry,sortVariable})
        .then((result) => {
            console.log('Filtered Partner Accounts Based On Type & Country: ',result);
            this.partnerAccounts = result;
            this.totalPartners = this.partnerAccounts.length;
            if(this.totalPartners > 0) {
                this.noRecordsFound = false;
            } else {
                this.noRecordsFound = true;
            }
        })
        .catch((error) => {
            this.accounts = [];
            console.error('Error fetching Filtered accounts Based On Type & Country:', error);
        });
    }


    /****************************************Partner Details Page************************************************/

    handlePartnerDetailsPage(event) {

        const accountId = event.currentTarget.dataset.id;

        console.log('AccountId: ',accountId);

        // Redirect to the URL with the accountId
        window.location.href = `/questpartnerportal/s/quest-partner-directory?Id=${accountId}`;
    }

    /**********************************************CountryPicklist Values ******************************************/

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

    /****************************************************** Handle Show More Functionality ***************************************/

    handleShowMoreSolutions() {
        this.showMoreSolutions = true;
    }
    handleShowLessSolutions() {
        this.showMoreSolutions = false;
    }
    handleShowMoreServices() {
        this.showMoreServices = true;
    }
    handleShowLessServices() {
        this.showMoreServices = false;
    }
    
}