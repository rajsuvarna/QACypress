class NlTemplatePO {

    /**
     * @param {string} url The newsletter web view URL
     * */
    constructor(url) {
        this.url = url;
    }

    /**
     * Returns an array of attributes given an element
     * @param {string} elementSelector
     * @param {string} attribute
     * @return {Promise<*>}
     */
    getLinksByElementAttribute = async (elementSelector, attribute) => {
        /**@type{array}*/
        let arrayHTML = [];
        return new Cypress.Promise((resolve) => {
            cy.get(elementSelector).each(($el, index) => {
                arrayHTML[index] = $el.attr(attribute);
                resolve(arrayHTML);
            });
        });
    }
}

export default NlTemplatePO;