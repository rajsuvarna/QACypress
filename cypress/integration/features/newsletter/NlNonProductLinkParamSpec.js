
import NlTemplatePO from '../../../support/pageObjects/NlTemplatePO';
import NlHelper from '../../../support/helpers/NlHelper';

/// <reference types="Cypress" />

describe('Check something for something', () => {
    /** @type {NlHelper} */
    const nlHelper = new NlHelper();

    /** @type {object} */
    const nlUrlList = nlHelper.getTestData('nlUrls.json');
    //const nlUrlList = require('../../../fixtures/nlUrls')

    //hard coded and outdated test data -> new test data is in nlUrls.json
    /** @type {string} */
    //let nlUrl = "https://news.shopping.check24.de/u/gm.php?prm=VDLjGz1AeJ_766749435_6267609_1";
    let nlUrl = "https://news.shopping.check24.de/u/gm.php?prm=ID2AkvsHdU_766749435_8780241_299555&_esuh=_11_d1cab01f2527444ceee80ed99543cce9650ae8ad9d928c8fd3b446487dbaf2a7";
    /** @type {NlTemplatePO} */
    const nlTemplatePO = new NlTemplatePO(nlUrl);
    var linksArr = new Array();
    var paramValue = '';
    var resArr = new Array();
    
    // Ignore errors from the site itself
    Cypress.on('uncaught:exception', () => {
        return false;
    });
    it('C962349 Check if utm_campaign value of all non product links is the same, tested newsletter url: ',() => {
        //open nl
        //cy.visit(nlTemplatePO.url);
        cy.get(Object.values(nlUrlList)).each(value => {
            //Open Url 
            cy.visit(value);
            cy.get('a').each(($el) => {
                const hrefValue = $el.attr('href');
                //filter out all links which contain utm_campaign
                const result = hrefValue?.includes('utm_campaign') || false;
                if(result){
                    if(linksArr.length > 0){linksArr.pop()}
                    linksArr.push(hrefValue)                 
                    const res =nlHelper.extractParameterValues(linksArr,'utm_campaign');
                    paramValue = res[0].parameterValue                 
                    if (!resArr.includes(paramValue)){resArr.push(paramValue)}        
    
                    //check if all paramter values are equal to each other
                    if(resArr.length > 1){return false;}            
                }
            })
            .then(() => {
                //check if the links were found
                expect(linksArr.length).to.equal(1)
            })
        });          
    });

    it('C955682 Check if wpset value of all non product links is the same, tested newsletter url: ',() => {
        //open nl
        //cy.visit(nlTemplatePO.url);
        cy.get(Object.values(nlUrlList)).each(value => {
            //Open Url 
            cy.visit(value);
            cy.get('a').each(($el) => {
                const hrefValue = $el.attr('href');
                //filter out all links which contain wpset
                const result = hrefValue?.includes('wpset') || false;
                if(result){
                    if(linksArr.length > 0){linksArr.pop()}
                    linksArr.push(hrefValue)                
                    const res =nlHelper.extractParameterValues(linksArr,'wpset');
                    paramValue = res[0].parameterValue                     
                    if (!resArr.includes(paramValue)){resArr.push(paramValue)}        
                    
                    //check if all paramter values are equal to each other
                    if(resArr.length > 1){return false;}            
                }
            })
            .then(() => {
                //check if the links were found
                expect(linksArr.length).to.equal(1)
            })
        });      
    });
});
