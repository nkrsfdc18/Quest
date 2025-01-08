import { LightningElement, track } from 'lwc';

export default class OverviewOfServices extends LightningElement {
    @track activeSection = 'standard'; // Tracks the currently active section
    @track isSidebarVisible = true; // Tracks sidebar visibility, default is visible

    // Sidebar toggle handler
    toggleSidebar() {
        this.isSidebarVisible = !this.isSidebarVisible; // Toggle sidebar visibility
    }

    // Button styling getters
    get standardButtonClass() {
        return this.activeSection === 'standard'
            ? 'active-button'
            : 'inactive-button';
    }
    get support24x7ButtonClass() {
        return this.activeSection === '24x7'
            ? 'active-button'
            : 'inactive-button';
    }
    get premierButtonClass() {
        return this.activeSection === 'premier'
            ? 'active-button'
            : 'inactive-button';
    }

    // Section visibility getters
    get isStandardVisible() {
        return this.activeSection === 'standard';
    }
    get is24x7Visible() {
        return this.activeSection === '24x7';
    }
    get isPremierVisible() {
        return this.activeSection === 'premier';
    }

    // Handles button clicks to switch sections
    handleButtonClick(event) {
        this.activeSection = event.target.dataset.id;
    }
}