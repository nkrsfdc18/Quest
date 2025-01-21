import { LightningElement } from 'lwc';
import HOME_PAGE_TITLE from '@salesforce/label/c.Partner_Site_Home_Page_Title';
import HOME_PAGE_SUB_TITLE from '@salesforce/label/c.Partner_Site_Home_Page_Sub_Title';
import HOME_PAGE_CONTENT from '@salesforce/label/c.Partner_Site_Home_Page_Banner_Content';
import APPLY_NOW_BTN from '@salesforce/label/c.Partner_Site_Home_ApplyNow_Btn';
import MSP_BTN from '@salesforce/label/c.Partner_Site_Home_MSP_Btn';
import FIND_PARTNER_BTN from '@salesforce/label/c.Partner_Site_Home_FindPartner_Btn';
import SIGN_IN_BTN from '@salesforce/label/c.Partner_Site_Home_SignIn_Btn';


export default class Quest_HomePage_Banner extends LightningElement {

    labels = {
        homePageTiltle : HOME_PAGE_TITLE,
        homePageSubtitle : HOME_PAGE_SUB_TITLE,
        homePageContent : HOME_PAGE_CONTENT,
        applyNowBtn : APPLY_NOW_BTN,
        mspBtn : MSP_BTN,
        findPartnerBtn : FIND_PARTNER_BTN,
        signInBtn : SIGN_IN_BTN
    }
}