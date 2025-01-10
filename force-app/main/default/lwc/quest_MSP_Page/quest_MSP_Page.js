import { LightningElement } from 'lwc';
import DataProtection from "@salesforce/contentAssetUrl/data_protectionjpg"
import Unified from "@salesforce/contentAssetUrl/unifiedjpg"
import Office365 from "@salesforce/contentAssetUrl/officepng"
import Access from "@salesforce/contentAssetUrl/accessjpg"
import Finalist1 from "@salesforce/contentAssetUrl/finalist1jpg"
import Finalist2 from "@salesforce/contentAssetUrl/finalist2jpg"

import QuestLogo from "@salesforce/contentAssetUrl/questlogowhitesvg";


export default class Quest_msp extends LightningElement {

    index = 0;

    // connectedCallback() invokes automatically when a lwc component is added into DOM.
    connectedCallback() {

        //This event is to used to decrease or increase the padding of the nav element based on the it's position relative to viewport.
        window.addEventListener("scroll", () => {
            //grabbing nav element
            const nav = this.template.querySelector("nav")

            // getting Rect top value of the nav element. getBoundingClienetTect() returns the position of an element relative to viewport.
            const rect = nav.getBoundingClientRect();

            // using this condition because when navbar reachs to scroll position of 72px it will get stick to top.
            if(rect.top === 72) {
                //changing the padding of navbar when it becomes sticky or fixed at top.
                nav.style.padding = "30px 0";
            } else {
                //changing the padding of navbar when it's not fixed at top.
                nav.style.padding = "50px 0"
            }
            this.displayBtn()
        })

    }
    
    get DataProtectionUrl() {
        return DataProtection;
    }
    get UnifiedUrl() {
        return Unified;
    }
    get Office365Url() {
        return Office365;
    }
    get AccessUrl() {
        return Access;
    }
    get Finalist1Url() {
        return Finalist1;
    }
    get Finalist2Url() {
        return Finalist2;
    }
    get QuestLogoUrl() {
        return QuestLogo;
    }

    handleDotActiveBg(element) {
       this.template.querySelector(".active").classList.remove("active");
       element.classList.add("active");
    }

    handlePrev() {

        if(this.index == 0) {
            this.displayBtn();
            return;
        }
        const cards = this.template.querySelectorAll(".carousel-card");
        
        this.index--;
        this.displayBtn();
        cards[this.index].style.transform = `translateX(${(-this.index * 100)}%)`
        cards[this.index + 1].style.transform = `translateX(${(-this.index * 100)}%)`

        const element = this.template.querySelectorAll(".dot-btn");
        this.handleDotActiveBg(element[this.index]);
    }
    handleNext() {

        if(this.index >= 3) {
            this.displayBtn();
            return;
        }
        const cards = this.template.querySelectorAll(".carousel-card");
        this.index++;
        this.displayBtn();
        cards[this.index].style.transform = `translateX(${-this.index * 100}%)`
        cards[this.index - 1].style.transform = `translateX(${-this.index * 100}%)`

        const element = this.template.querySelectorAll(".dot-btn");
        this.handleDotActiveBg(element[this.index]);

    }

    handlePagination(event) {

        const cards = this.template.querySelectorAll(".carousel-card");
        this.index = event.target.dataset.index;
        this.displayBtn();
        cards.forEach(card => {
            card.style.transform = `translateX(${(-this.index) * 100}%)`
        })
        this.handleDotActiveBg(event.target);

    }

    displayBtn() {
        const prevBtn = this.template.querySelector(".prev-btn");
        const nextBtn = this.template.querySelector(".next-btn");

        if(this.index == 0) {
            prevBtn.style.display = "none"
        } else {
            prevBtn.style.display = "block"
        }
        if(this.index == 3) {
            nextBtn.style.display = "none"
        } else {
            nextBtn.style.display = "block"
        }
    }

    scrollToSection(event) {
        // Get the section to scroll to from the clicked link's data-section attribute
        const sectionId = event.target.getAttribute('data-section');
        console.log(sectionId);
        // const targetElement = this.template.querySelector(`#${sectionId}`);
        const targetElement = this.template.querySelector(`.${sectionId}`);
        console.log(targetElement);

        if (targetElement) {
            const elementTop = targetElement.offsetTop;
            const windowHeight = window.innerHeight;
            let scrollPosition;
            if(sectionId == 'overview') {
                const elementHeight = targetElement.offsetHeight;
                // Calculate the scroll position so the section is centered
                scrollPosition = elementTop - (windowHeight - elementHeight) / 2;
                // const scrollPosition = elementTop - windowHeight  / 2;
            } else {
                const offset = 160;
                scrollPosition = elementTop - offset;
            }


            // Scroll smoothly to the calculated position
            window.scrollTo({
                top: scrollPosition,
                behavior: 'smooth'
            });
        }
    }
}