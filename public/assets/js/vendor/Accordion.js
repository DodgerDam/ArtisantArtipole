/**
 * Accordion
 */
const Accordion = () => {
    /**
     * On Open Accordion
     *
     * @param {HTMLElement} accordion
     */
    function __onOpenAccordion(event) {
        let $button = event.target.firstElementChild;
        let $accordion = $button.nextElementSibling;
        console.log('show', $button, $accordion)
        $button.setAttribute('aria-selected', 'true');
        $button.setAttribute('aria-expanded', 'true');
        $button.classList.add('is-open');
        $accordion.setAttribute('aria-hidden', 'false');
    }
    /**
     * On Close Accordion
     *
     * @param {HTMLElement} accordion
     */
    function __onCloseAccordion(event) {
        let $button = event.target.firstElementChild;
        let $accordion = $button.nextElementSibling;
        $button.setAttribute('aria-selected', 'false');
        $button.setAttribute('aria-expanded', 'false');
        $button.classList.remove('is-open');
        $accordion.setAttribute('aria-hidden', 'true');
    }
    UIkit.util.on('.uk-accordion', 'show', function(e) { __onOpenAccordion(e) });
    UIkit.util.on('.uk-accordion', 'hide', function(e) { __onCloseAccordion(e) });
}
export default Accordion;