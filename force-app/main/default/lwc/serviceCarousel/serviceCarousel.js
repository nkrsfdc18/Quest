import { LightningElement, track } from 'lwc';

export default class ServiceCarousel extends LightningElement {
    @track activeTabId = 1; // Default active tab is the first one
    @track tabs = [
        { id: 1, name: 'Microsoft Platform Management' },
        { id: 2, name: 'Database Management' },
        { id: 3, name: 'Performance Monitoring' },
        { id: 4, name: 'Unified Endpoint Management' },
        { id: 5, name: 'Data Protection' }
    ];
    @track services = [
        {
            id: 1,
            name: 'Microsoft Platform Management',
            description: 'Quest expert consulting services are ready to help you achieve your next migration, management, and security goals across any Microsoft platform. Our team of specialists tailors solutions to meet your specific organizational needs. No matter how complex and no matter where – on premises, cloud or hybrid – Quest is your go-to partner to remove the complexity and risk when you migrate, manage and secure your Microsoft infrastructure.',
            imgUrl: 'https://www.quest.com/images/patterns/ZigZag/6-column/966826582.jpg',
            link: 'https://www.quest.com/services/microsoft-platform-management-services/'
        },
        {
            id: 2,
            name: 'Database Management',
            description: 'Quest database management solutions deliver automation to simplify your enterprise and take on your organization’s next initiative. But you can’t always do it alone. Our experienced consultants will assess your database environment and provide you with expert assistance implementing and managing our database management solutions. We help you manage and operate on-premises, cloud and hybrid databases. We help you control the chaos now and prepare your for what’s next in this data-driven world.',
            imgUrl: 'https://www.quest.com/images/patterns/ZigZag/6-column/1128252197.jpg',
            link: 'https://support.quest.com/consulting-services/database-management'
        },
        {
            id: 3,
            name: 'Performance Monitoring',
            description: 'Our expert consultants help you get the most out of your Quest performance monitoring solutions. They’ll help you identify and resolve performance issues with centralized visibility into your physical databases and virtual infrastructure. By implementing best practices in performance monitoring solutions, we can help you speed deployment, reduce costs and reach your business goals faster. Experience more uptime and better performance today and tomorrow.',
            imgUrl: 'https://www.quest.com/images/patterns/ZigZag/6-column/is537541822.jpg',
            link:'https://support.quest.com/consulting-services/performance-monitoring'
        },
        {
            id: 4,
            name: 'Unified Endpoint Management',
            description: 'KACE by Quest products help you discover, manage and secure endpoints accessing your network for a more secure environment. Look to our expert consultants to help guide you through the proper implementation of a comprehensive solution designed specifically for your organization. We’ll help you take control of your network-connected environment. Prepare for and protect against the next cyber-attack, while reducing costs and speeding time to value.',
            imgUrl:'https://www.quest.com/images/patterns/ZigZag/6-column/is838089884.jpg',
            link:'https://support.quest.com/consulting-services/endpoint-systems-management'
        },
        {
            id: 5,
            name:'Data Protection',
            description:'Quest data protection products help over 76,000 organizations worldwide manage, optimize and protect their ever-growing data and IT infrastructure. Our expert consultants take the time to learn about your unique data protection challenges and design solutions that help you streamline backup and recovery, recover unused storage, and develop robust business continuity strategies. Our consultants will help minimize implementation time and prepare you for what’s next.',
            imgUrl:'https://www.quest.com/images/patterns/ZigZag/6-column/is1053499704.jpg',
            link:'https://support.quest.com/consulting-services/endpoint-systems-management'
        }
    ];

    // Compute classes for the tabs
    get tabClasses() {
        return this.tabs.map((tab) => ({
            id: tab.id,
            name: tab.name,
            className: tab.id === this.activeTabId ? 'splide__slide tab-active' : 'splide__slide'
        }));
    }

    // Handle tab click to change the active tab
    handleTabClick(event) {
        this.activeTabId = parseInt(event.target.dataset.id, 10);
    }

    // Get the active service based on the selected tab
    get visibleServices() {
        return this.services.filter((service) => service.id === this.activeTabId);
    }
}