import { LightningElement } from 'lwc';
import NetworkQuest from "@salesforce/contentAssetUrl/networkquestbluesvg";
import GPSFixedQuest from "@salesforce/contentAssetUrl/gpsfixedquestblue";
import CertificateQuest from "@salesforce/contentAssetUrl/certificatequestbluesvg";
import DealQuest from "@salesforce/contentAssetUrl/dealteamworkquestbluesvg";
import AmericanExpress from "@salesforce/contentAssetUrl/americanexpresspng";
import Barclays from "@salesforce/contentAssetUrl/barclayspng";
import Ford from "@salesforce/contentAssetUrl/fordpng";
import Toyota from "@salesforce/contentAssetUrl/toyotapng";

export default class Quest_Homepage_briefContent extends LightningElement {
    get NetworkQuestUrl() {
        return NetworkQuest;
    }
    get GPSFixedQuestUrl() {
        return GPSFixedQuest;
    }
    get CertificateQuestUrl() {
        return CertificateQuest;
    }
    get DealQuestUrl() {
        return DealQuest;
    }
    get AmericanExpresstUrl() {
        return AmericanExpress;
    }
    get BarclaysUrl() {
        return Barclays;
    }
    get FordUrl() {
        return Ford;
    }
    get ToyotaUrl() {
        return Toyota;
    }
}