class IonArrow extends HTMLElement {
    constructor() {
        super();

        //const isActiveOnHover = true;
        // Class active - added on hover in main.ts
        const angleDefault = '0deg' /* down */
        const angleActive = '180deg' /* up */
        const colorDefault = '#222222'
        const colorActive = '#008df9'
        const thickness = '2px'
        const arrowWidth = '14px'

        const shadow = this.attachShadow({ mode: 'open' });

        const wrapper = document.createElement('div');
        wrapper.classList.add('arrow');

        const bar1 = document.createElement('div');
        bar1.classList.add('bar', 'bar-1');
        const bar2 = document.createElement('div');
        bar2.classList.add('bar', 'bar-2');

        wrapper.append(bar1, bar2);

        const style = document.createElement('style');
        style.textContent = `
      .arrow {
        width: `+ arrowWidth + `;
        height: `+ arrowWidth + `;
        position: relative;
        transform: rotate(`+ angleDefault + `);       
        transition: transform 0.3s ease;
        display: inline-block;
        
      }

      .bar {
        position: absolute;
        width: 63%;
        height: `+ thickness + `;
        background-color: `+ colorDefault + `;
        transition: background-color 0.3s ease, top 0.3s ease;
        top: 60%;
        left: auto;
      }

      .bar-1 {
        transform: rotate(45deg);
        left: 0;
      }

      .bar-2 {
        transform: rotate(-45deg);
        right: 0;
      }

      :host-context(.active) .arrow {
        transform: rotate(`+ angleActive + `);
      }

      :host-context(.active) .bar {
        top: 35%;
        background-color: `+ colorActive + `;
      }
    `;

        shadow.append(style, wrapper);
    }
}

customElements.define('ion-arrow', IonArrow);