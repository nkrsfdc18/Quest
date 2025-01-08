import { LightningElement, track, wire } from 'lwc';
import ADMPartnerDetail from "@salesforce/contentAssetUrl/ADMPartnerDetailpng";
import getPartnerAccount from '@salesforce/apex/Quest_HandlePartnerLocatorPage.getPartnerAccount';
// import getAccountImage from "@salesforce/apex/Quest_HandlePartnerLocatorPage.getAccountImage";
import { CurrentPageReference } from 'lightning/navigation';

export default class PartnerDetailsPage extends LightningElement {
    
    get ADMUrl() {
        return ADMPartnerDetail;
    }

    mapMarkers;
    zoomLevel;
    listView;
    accountId;
    partnerAccount = null;
    video = false;
    videoUrl;
    accountImage;

    @wire(CurrentPageReference)
    currentPageReference;

    connectedCallback() {


        this.accountId = this.currentPageReference.state.Id;
        console.log('AccountId: ',this.accountId);

        // getAccountImage({accountId: this.accountId})
        //     .then((result) => {
        //         console.log("This is accountImage " + result);
        //         if(result) {
        //             this.accountImage = result;
        //             console.log("Account Image : " + this.accountImage)
        //         } else {
        //             console.log("No Image Found")
        //         }
        //     })
        //     .catch((error) => {
        //         this.accountImage;
        //         console.error('Error fetching partner accounts:', error);
        //     })

        getPartnerAccount({accountId: this.accountId})
            .then((result) => {
                this.partnerAccount = result;
                this.updateMapMarkers(this.partnerAccount);
                if(this.partnerAccount.Partner_Detail_Video__c) {
                    this.videoUrl = this.partnerAccount.Partner_Detail_Video__c;
                    this.video = true;
                } else {
                    this.video = false
                }
            })
            .catch((error) => {
                this.partnerAccount = [];
                console.error('Error fetching partner accounts:', error);
            });

    }

    updateMapMarkers(partnerAccount) {
        this.mapMarkers = [
            {
                location: {
                    City: partnerAccount.BillingCity,
                    State: partnerAccount.BillingState,
                    Country: partnerAccount.BillingCountry,
                    PostalCode: partnerAccount.BillingPostalCode,
                    Street: partnerAccount.BillingStreet,
                },
            },
        ];
        this.zoomLevel = 6;
        this.listView = "visible";
    }

    showModal() {
        const modal = this.template.querySelector(".modal");
        const overlay = this.template.querySelector(".overlay");
        modal.classList.add("show");
        overlay.classList.add("overlay-bg");
        document.body.style.overflow = "hidden";
        
    }

    hideModal() {
        const modal = this.template.querySelector(".modal");
        const overlay = this.template.querySelector(".overlay");
        modal.classList.remove("show");
        overlay.classList.remove("overlay-bg");
        document.body.style.overflow = "auto";
    }

    showVideoModal() {
        const modal = this.template.querySelector(".video .modal");
        const overlay = this.template.querySelector(".video .overlay");
        modal.classList.add("show");
        overlay.classList.add("overlay-bg");
        document.body.style.overflow = "hidden";
        overlay.style.overflowY = "auto";
    }

    hideVideoModal() {
        const modal = this.template.querySelector(".video .modal");
        const overlay = this.template.querySelector(".video .overlay");
        modal.classList.remove("show");
        overlay.classList.remove("overlay-bg");
        document.body.style.overflow = "auto";
    }
}